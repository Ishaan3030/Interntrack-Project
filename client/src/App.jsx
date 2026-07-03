import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ApplicationList from './components/ApplicationList'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-blue-600 font-semibold">
          Dashboard
        </Link>

        <Link to="/applications" className="text-blue-600 font-semibold">
          Applications
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationList />} />
      </Routes>
    </div>
  )
}
