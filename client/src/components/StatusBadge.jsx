export default function StatusBadge({ status }) {
  const baseStyles =
    "inline-block px-2 py-1 text-xs font-semibold rounded-full"

  const statusStyles = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-700",
    Offer: "bg-green-100 text-green-700",
  }

  const colorClass = statusStyles[status] || "bg-gray-100 text-gray-700"

  return (
    <span className={`${baseStyles} ${colorClass}`}>
      {status || "Unknown"}
    </span>
  )
}