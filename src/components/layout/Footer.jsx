import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <p><strong>VitaTrack</strong> &copy; 2026</p>
          <p className="footer-tagline">Your personal health & wellbeing companion.</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
        </div>
      </div>
    </footer>
  )
}
