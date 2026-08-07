import { Link } from "react-router-dom";
import { useAppState } from "../../context/useAppState";
import StatusBadge from "../../components/StatusBadge";

function InventoryDashboard() {
  const { stock } = useAppState();

  const lowCount = stock.filter((item) => item.quantity < item.threshold).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blood Inventory</h1>
          <p className="mt-2 text-gray-600">Monitor current blood stock levels across all blood types.</p>
        </div>
        <Link
          to="/inventory/add"
          className="inline-flex rounded-xl bg-[#7A0916] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5a0610]"
        >
          Add Blood Pack
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Types Tracked</p>
          <p className="mt-2 text-3xl font-bold">{stock.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Units</p>
          <p className="mt-2 text-3xl font-bold">{stock.reduce((sum, item) => sum + item.quantity, 0)}</p>
        </div>
        <div className="rounded-2xl bg-red-50 p-6 shadow-sm">
          <p className="text-red-700">Low Stock Alerts</p>
          <p className="mt-2 text-3xl font-bold text-red-800">{lowCount}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Blood Type</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Threshold</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => {
              const low = item.quantity < item.threshold;
              return (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 font-semibold">{item.type}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{item.threshold}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={low ? "danger" : "success"}>{low ? "Low Stock" : "Adequate"}</StatusBadge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryDashboard;
