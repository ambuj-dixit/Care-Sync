import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Medicine = {
  id: number;
  name: string;
  price: number;
  expiry: string;
};


const PharmacyPage: React.FC = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: "Paracetamol", price: 50, expiry: "2025-10-10" },
    { id: 2, name: "Ibuprofen", price: 70, expiry: "2025-10-15" },
    { id: 3, name: "Amoxicillin", price: 120, expiry: "2025-09-28" },
  ]);

  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState<"A-Z" | "Price" | "Expiry">("A-Z");

  // Refs for inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const generateId = () => new Date().getTime();

  const handleAddMedicine = () => {
    if (!name || !expiry || !price) return;

    if (editingId) {
      setMedicines((prev) =>
        prev.map((med) =>
          med.id === editingId ? { id: editingId, name, price: Number(price), expiry } : med
        )
      );
      toast.success("Medicine updated!");
      setEditingId(null);
    } else {
      const newMedicine: Medicine = { id: generateId(), name, price: Number(price), expiry };
      setMedicines([newMedicine, ...medicines]);
      toast.success("Medicine added!");
    }

    setName("");
    setExpiry("");
    setPrice("");

    nameRef.current?.focus();
  };

  const handleEdit = (med: Medicine) => {
    setName(med.name);
    setExpiry(med.expiry);
    setPrice(med.price);
    setEditingId(med.id);
    nameRef.current?.focus();
  };

const handleDelete = (id: number) => {
  setMedicines(medicines.filter((med) => med.id !== id));
  toast.error("Medicine deleted");
};


  const handleKeyPress = (e: React.KeyboardEvent, field: "name" | "expiry" | "price") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "name") expiryRef.current?.focus();
      else if (field === "expiry") priceRef.current?.focus();
      else handleAddMedicine();
    }
  };

  const isExpiringSoon = (date: string) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const diff = (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 10;
  };

  const displayedMedicines = medicines
    .filter((med) => med.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "A-Z") return a.name.localeCompare(b.name);
      if (sortOption === "Price") return a.price - b.price;
      if (sortOption === "Expiry") return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
      return 0;
    });

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-700 ${
        darkMode ? "bg-gray-900 text-white" : "bg-sky-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Pharmacy Inventory
        </h1>
        <div className="flex items-center gap-4">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            Log Out
          </Button>
        </div>
      </div>

      {/* Entry Card */}
      <Card className="mb-8 shadow-2xl rounded-2xl border-none overflow-hidden backdrop-blur-lg bg-white/30 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700">
        <CardHeader className="py-6 text-center">
          <CardTitle className="text-xl font-bold">
            {editingId ? "Edit Medicine" : "Add Medicine"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <Input
            ref={nameRef}
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "name")}
            className="h-12"
          />
          <Input
            ref={expiryRef}
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "expiry")}
            className="h-12"
          />
          <Input
            ref={priceRef}
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            onKeyDown={(e) => handleKeyPress(e, "price")}
            className="h-12"
          />
          <Button
            onClick={handleAddMedicine}
            className="h-12 bg-green-500 hover:bg-green-600 text-white"
          >
            {editingId ? "Update" : "Add"}
          </Button>
        </CardContent>
      </Card>

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search medicine..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-12 flex-1"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          className="h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="A-Z">Sort A → Z</option>
          <option value="Price">Sort by Price</option>
          <option value="Expiry">Sort by Expiry</option>
        </select>
      </div>

      {/* Medicine Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {displayedMedicines.map((med) => (
                <motion.tr
                  key={med.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className={`border-b border-gray-200 dark:border-gray-700 ${
                    isExpiringSoon(med.expiry)
                      ? "bg-red-100 dark:bg-red-800/50 animate-pulse"
                      : darkMode
                      ? "bg-gray-900/60"
                      : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{med.name}</td>
                  <td className="px-4 py-2">{med.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{med.expiry}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      onClick={() => handleEdit(med)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white h-8 w-12 p-0"
                    >
                      <Edit className="w-4 h-4 mx-auto" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(med.id)}
                      className="bg-red-500 hover:bg-red-600 text-white h-8 w-12 p-0"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyPage;
