import { useEffect, useState } from 'react'
import axios from 'axios'
import StatusBadge from './StatusBadge'

export default function ApplicationList({ refresh }) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/applications'
      )

      setApplications(res.data)
    } catch (err) {
      console.error('Failed to fetch applications:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
        await axios.put(`http://localhost:5000/applications/${id}`, {
            status: newStatus,
        });

    // refresh list
        fetchApplications();
    } catch (err) {
        console.error('Failed to update status:', err);
    }
  }

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
        'Are you sure you want to delete this application?'
    )

    if (!confirmDelete) return

    try {
        await axios.delete(`http://localhost:5000/applications/${id}`)

        // refresh list
        fetchApplications()
    } catch (err) {
        console.error('Failed to delete application:', err)
    }
 }

  useEffect(() => {
    fetchApplications()
  }, [refresh])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow">
        Loading applications...
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Applications
      </h2>

      {applications.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No applications yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-5 rounded shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">
                  {app.company}
                </h3>

                <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="text-xs px-2 py-1 rounded border bg-white"
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                </select>
              </div>

              <p className="text-gray-600 mt-2">
                Role: <span className="font-medium">{app.role}</span>
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Applied: {new Date(app.date).toLocaleDateString()}
              </p>

              <button
                onClick={() => deleteApplication(app.id)}
                className="mt-3 text-sm px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}