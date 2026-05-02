const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create default user
  const passwordHash = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@vitatrack.com' },
    update: {},
    create: {
      email: 'admin@vitatrack.com',
      name: 'Admin User',
      passwordHash: passwordHash,
      role: 'admin',
    },
  });

  console.log(`Created default user: ${user.email} / admin123`);

  // Create providers
  const providers = [
    {
      name: 'Dr. Sarah Jenkins',
      specialty: 'General Practitioner',
      location: 'Vita Clinic, Jakarta',
      rating: 4.8,
    },
    {
      name: 'Dr. Budi Santoso',
      specialty: 'Dentist',
      location: 'Smile Dental, Bandung',
      rating: 4.9,
    },
    {
      name: 'Alya Rahman, M.Psi',
      specialty: 'Therapist',
      location: 'Mindful Care, Online',
      rating: 5.0,
    },
    {
      name: 'Dr. Kevin Wijaya',
      specialty: 'Dermatologist',
      location: 'Skin Health Center, Surabaya',
      rating: 4.7,
    }
  ];

  for (const p of providers) {
    await prisma.provider.create({
      data: p
    });
  }

  console.log('Successfully seeded providers.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
