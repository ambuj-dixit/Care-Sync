import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Moon, Sun, Video, User, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Patient = {
  id: number;
  name: string;
  age: number;
  condition: string;
  avatar: string;
};

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const patients: Patient[] = [
    { id: 1, name: "Ravi Kumar", age: 32, condition: "Diabetes", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Neha Sharma", age: 25, condition: "Hypertension", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "Arjun Singh", age: 40, condition: "Asthma", avatar: "https://i.pravatar.cc/100?img=3" },
    { id: 4, name: "Simran Kaur", age: 29, condition: "Fever", avatar: "https://i.pravatar.cc/100?img=4" },
  ];

  const feedback = [
    { id: 1, name: "Rahul", comment: "Doctor was very patient and kind!", rating: 5 },
    { id: 2, name: "Meena", comment: "Excellent consultation, clear guidance.", rating: 4 },
    { id: 3, name: "Karan", comment: "Quick and effective treatment.", rating: 5 },
  ];

  const appointments = [
    { id: 1, patient: "Ravi Kumar", time: "10:00 AM", type: "Video Call" },
    { id: 2, patient: "Neha Sharma", time: "11:30 AM", type: "Video Call" },
    { id: 3, patient: "Arjun Singh", time: "1:00 PM", type: "Video Call" },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-100 to-green-100"} min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <div className="flex justify-between items-center p-6 shadow-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-green-400">👨‍⚕️ Doctor Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-green-400">📅 Upcoming Appointments</h2>
          <ul className="space-y-3">
            {appointments.map((app) => (
              <li key={app.id} className="flex justify-between items-center bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <span className="font-medium">{app.patient}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm">{app.time}</span>
                  <Video size={18} className="text-green-600 dark:text-green-400" />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-green-400">⭐ My Rating</h2>
          <div className="flex items-center gap-2 text-yellow-500 text-lg mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="currentColor" stroke="none" />
            ))}
            <span className="ml-2 text-gray-600 dark:text-gray-300">(4.9/5)</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">You are among the top-rated doctors this month 👏</p>
        </motion.div>

        {/* Patient Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-green-400">💬 Patient Feedback</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {feedback.map((fb) => (
              <div key={fb.id} className="p-3 rounded-lg bg-green-50 dark:bg-gray-700">
                <p className="text-sm font-semibold">{fb.name}</p>
                <p className="text-gray-600 dark:text-gray-300">{fb.comment}</p>
                <div className="flex text-yellow-500">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} fill="currentColor" stroke="none" size={14} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Patient List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 col-span-1 md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-green-400">👥 Patient Records</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {patients.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700 shadow">
                <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Age: {p.age} | {p.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
