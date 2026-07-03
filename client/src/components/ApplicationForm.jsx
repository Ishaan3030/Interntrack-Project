import { useState } from 'react'
import axios from 'axios'

export default function AddApplicationForm() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/applications', formData)

      alert('Application added!')

      setFormData({
        company: '',
        role: '',
        status: '',
      })
    } catch (error) {
      console.error(error)
      alert('Error submitting application')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-lg"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Company
        </label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Role
        </label>

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Status
        </label>

        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Applied / Interview / Rejected"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Application
      </button>
    </form>
  )
}