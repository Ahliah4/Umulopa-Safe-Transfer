import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ReportActions from "../../components/ReportActions";
import { exportToPdf, exportToExcel } from "../../utils/exportUtils";

const weeklyActivity = [
  { day: "Mon", requests: 6, transfusions: 4 },
  { day: "Tue", requests: 8, transfusions: 6 },
  { day: "Wed", requests: 5, transfusions: 3 },
  { day: "Thu", requests: 7, transfusions: 5 },
  { day: "Fri", requests: 9, transfusions: 7 },
  { day: "Sat", requests: 4, transfusions: 2 },
  { day: "Sun", requests: 3, transfusions: 2 },
];

function WeeklyReport() {
  const [range, setRange] = useState("This Week");

  const totals = useMemo(() => ({
    requests: weeklyActivity.reduce((acc, item) => acc + item.requests, 0),
    transfusions: weeklyActivity.reduce((acc, item) => acc + item.transfusions, 0),
  }), []);

  const columns = [
    { key: "day", label: "Day" },
    { key: "requests", label: "Requests" },
    { key: "transfusions", label: "Transfusions" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Weekly Report</h1>
          <p className="text-gray-600">Summary of blood bank activity for the selected period.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option>This Week</option>
            <option>Last Week</option>
          </select>
          <ReportActions
            onPdf={() => exportToPdf("weekly-report.pdf", columns, weeklyActivity, { title: "Weekly Report" })}
            onExcel={() => exportToExcel("weekly-report.xlsx", columns, weeklyActivity, { title: "Weekly Report" })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Requests</p>
          <p className="text-3xl font-bold mt-3">{totals.requests}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Transfusions</p>
          <p className="text-3xl font-bold mt-3">{totals.transfusions}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Tracked Days</p>
          <p className="text-3xl font-bold mt-3">{weeklyActivity.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={weeklyActivity} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#A31621" strokeWidth={2} dot />
            <Line type="monotone" dataKey="transfusions" stroke="#6B0F1A" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyReport;
