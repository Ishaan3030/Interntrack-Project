import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    offer: 0,
  })

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/applications/stats'
      )

      setStats(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // Convert stats → chart format
  const chartData = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interview', value: stats.interview },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Offer', value: stats.offer },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Applied" value={stats.applied} />
        <Stat label="Interview" value={stats.interview} />
        <Stat label="Rejected" value={stats.rejected} />
        <Stat label="Offer" value={stats.offer} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Application Status Chart
        </h2>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Reusable stat card component
function Stat({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="text-2xl font-bold">
        {value}
      </p>
    </div>
  )
}