import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import ReportActions from "../../components/ReportActions";
import { exportToPdf, exportToExcel } from "../../utils/exportUtils";

function MonthlyReport() {
  const [range, setRange] = useState("This Month");

  const lineData = useMemo(() => {
    // fabricate 30-day data for demo
    return Array.from({ length: 30 }).map((_, i) => ({
      day: `Day ${i + 1}`,
      requests: Math.round(12 + Math.sin(i / 3) * 5 + (i % 4)),
      transfusions: Math.round(8 + Math.cos(i / 4) * 4 + (i % 3)),
    }));
  }, []);

  const totals = useMemo(() => ({
    requests: lineData.reduce((s, r) => s + r.requests, 0),
    transfusions: lineData.reduce((s, r) => s + r.transfusions, 0),
  }), [lineData]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Monthly Report</h1>
          <p className="text-gray-600">Overview of activity for the selected month.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="border rounded-lg px-4 py-2">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
          <ReportActions
            onPdf={() => exportToPdf("monthly-report.pdf", [{ key: "day", label: "Day" }, { key: "requests", label: "Requests" }, { key: "transfusions", label: "Transfusions" }], lineData, { title: "Monthly Report" })}
            onExcel={() => exportToExcel("monthly-report.xlsx", [{ key: "day", label: "Day" }, { key: "requests", label: "Requests" }, { key: "transfusions", label: "Transfusions" }], lineData, { title: "Monthly Report" })}
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
          <p className="text-3xl font-bold mt-3">{lineData.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickFormatter={(d) => d.replace("Day ", "")} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="requests" stroke="#A31621" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="transfusions" stroke="#6B0F1A" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyReport;
