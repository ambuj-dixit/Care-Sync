import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Search,
  Settings,
  BarChart3,
  Package,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Define Medicine type
type Medicine = {
  id: number;
  name: string;
  expiry: string;
  price: number;
};

function PharmacyPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: "Paracetamol", expiry: "2025-05-20", price: 50 },
    { id: 2, name: "Amoxicillin", expiry: "2024-12-10", price: 120 },
    { id: 3, name: "Cough Syrup", expiry: "2026-01-15", price: 80 },
  ]);

  // ✅ Form price is string (for <input/> compatibility)
  const [form, setForm] = useState<{ name: string; expiry: string; price: string }>({
    name: "",
    expiry: "",
    price: "",
  });

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.expiry || !form.price) return;

    const newMed: Medicine = {
      id: Date.now(),
      name: form.name,
      expiry: form.expiry,
      price: Number(form.price), // ✅ Convert string → number
    };

    setMedicines([...medicines, newMed]);
    setForm({ name: "", expiry: "", price: "" });
  };

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Stats
  const totalValue = medicines.reduce((sum, med) => sum + med.price, 0);
  const expiringSoon = medicines.filter(
    (med) => new Date(med.expiry) < new Date("2025-12-31")
  ).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-purple-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">💊 PharmaTally</h1>
        <nav className="flex flex-col gap-3 flex-1">
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition">
            <Package size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition">
            <Plus size={18} /> Add Medicine
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition">
            <BarChart3 size={18} /> Reports
          </button>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition">
            <Settings size={18} /> Settings
          </button>
        </nav>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-semibold transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8">
        {/* Top Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center bg-white rounded-lg px-3 shadow">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="outline-none py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl shadow text-white bg-gradient-to-r from-green-400 to-teal-500"
          >
            <h3 className="text-lg font-semibold">Total Medicines</h3>
            <p className="text-3xl font-bold">{medicines.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl shadow text-white bg-gradient-to-r from-red-400 to-pink-500"
          >
            <h3 className="text-lg font-semibold">Expiring Soon</h3>
            <p className="text-3xl font-bold">{expiringSoon}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl shadow text-white bg-gradient-to-r from-blue-400 to-indigo-500"
          >
            <h3 className="text-lg font-semibold">Inventory Value</h3>
            <p className="text-3xl font-bold">₹{totalValue}</p>
          </motion.div>
        </div>

        {/* Add Medicine Form */}
        <motion.form
          onSubmit={addMedicine}
          className="bg-white shadow rounded-xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Medicine
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Medicine Name"
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Add Medicine
          </button>
        </motion.form>

        {/* Medicines List */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Available Medicines
        </h3>
        <AnimatePresence>
          <div className="grid gap-4">
            {medicines
              .filter((med) =>
                med.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((med) => (
                <motion.div
                  key={med.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {med.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expiry: {med.expiry}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price:{" "}
                      <span className="font-bold text-green-600">
                        ₹{med.price}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMedicine(med.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export default PharmacyPage;