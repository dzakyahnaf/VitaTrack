import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ProgressChart.css'

const data = [
  { day: 'Mon', habits: 4 },
  { day: 'Tue', habits: 3 },
  { day: 'Wed', habits: 5 },
  { day: 'Thu', habits: 2 },
  { day: 'Fri', habits: 4 },
  { day: 'Sat', habits: 3 },
  { day: 'Sun', habits: 4 },
]

export default function ProgressChart() {
  return (
    <div className="progress-chart-container">
      <h3 className="chart-title">Weekly Habit Completion</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: '#F0F4EF' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar 
              dataKey="habits" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]} 
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
