import { useMemo, useState } from "react";

const usageMetrics = [
  { metric: "A+ Units Used", value: 21 },
  { metric: "O- Units Used", value: 14 },
  { metric: "B+ Units Used", value: 11 },
];

const usageRows = [
  { id: 1, type: "A+", used: 21, available: 11 },
  { id: 2, type: "O-", used: 14, available: 6 },
  { id: 3, type: "B+", used: 11, available: 9 },
  { id: 4, type: "AB+", used: 5, available: 4 },
];

function UsageStatistics() {
  const [window, setWindow] = useState("7 Days");
  const summary = useMemo(
    () => usageMetrics.reduce((acc, item) => acc + item.value, 0),
    []
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Usage Statistics</h1>
          <p className="text-gray-600">Overview of blood usage metrics and trends.</p>
        </div>
        <select
          value={window}
          onChange={(e) => setWindow(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>7 Days</option>
          <option>30 Days</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Units Used</p>
          <p className="text-3xl font-bold mt-3">{summary}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Selected Window</p>
          <p className="text-3xl font-bold mt-3">{window}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Categories Tracked</p>
          <p className="text-3xl font-bold mt-3">{usageMetrics.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3">Blood Type</th>
              <th className="px-4 py-3">Units Used</th>
              <th className="px-4 py-3">Available Units</th>
            </tr>
          </thead>
          <tbody>
            {usageRows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.used}</td>
                <td className="px-4 py-3">{row.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsageStatistics;
