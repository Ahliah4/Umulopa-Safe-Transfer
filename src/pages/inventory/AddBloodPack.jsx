import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/useAppState";

function AddBloodPack() {
  const navigate = useNavigate();
  const { stock, setStock } = useAppState();
  const [form, setForm] = useState({ type: "", quantity: "", threshold: "10", collectionDate: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existing = stock.find((item) => item.type === form.type);

    if (existing) {
      setStock((prev) =>
        prev.map((item) =>
          item.type === form.type
            ? { ...item, quantity: item.quantity + Number(form.quantity) }
            : item
        )
      );
    } else {
      setStock((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: form.type,
          quantity: Number(form.quantity),
          threshold: Number(form.threshold),
          collectionDate: form.collectionDate,
        },
      ]);
    }

    setMessage("Blood pack registered successfully.");
    setForm({ type: "", quantity: "", threshold: "10", collectionDate: "" });
    setTimeout(() => navigate("/inventory"), 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add Blood Pack</h1>
        <p className="mt-2 text-gray-600">Register collected blood packs into inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="font-semibold text-gray-700">Blood Type</span>
            <select name="type" value={form.type} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2">
              <option value="">Select type</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-gray-700">Units Collected</span>
            <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-gray-700">Low Stock Threshold</span>
            <input name="threshold" type="number" min="1" value={form.threshold} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-gray-700">Collection Date</span>
            <input name="collectionDate" type="date" value={form.collectionDate} onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
          </label>
        </div>

        {message ? <p className="mt-4 text-green-600">{message}</p> : null}

        <div className="mt-6 flex gap-3">
          <button type="submit" className="rounded-xl bg-[#7A0916] px-6 py-3 text-white hover:bg-[#5a0610]">
            Save Pack
          </button>
          <button type="button" onClick={() => navigate("/inventory")} className="rounded-xl border px-6 py-3 text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBloodPack;
