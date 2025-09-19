import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, User, Pill, FlaskRound } from "lucide-react";
import { P } from "node_modules/framer-motion/dist/types.d-Cjd591yU";

const PharmacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
      <div className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl mx-6 mt-6 shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-900">Pharmacy</h1>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-2xl shadow-md">
            Book Consultation
          </Button>
        </div>
        <p className="mt-4 max-w-2xl text-gray-700 text-lg">
          We’ve redefined the healthcare experience to be faster, more accessible, and incredibly convenient.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10">
        <Card className="backdrop-blur-xl bg-yellow-200/40 border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition">
          <CardContent className="p-6 text-center">
            <Video className="w-10 h-10 mx-auto mb-3 text-yellow-700" />
            <h3 className="font-semibold text-gray-900 mb-2">Instant Video Consultation</h3>
            <p className="text-sm text-gray-700">Connect within 60 secs</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-green-200/40 border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition">
          <CardContent className="p-6 text-center">
            <User className="w-10 h-10 mx-auto mb-3 text-green-700" />
            <h3 className="font-semibold text-gray-900 mb-2">Find Doctors near you</h3>
            <p className="text-sm text-gray-700">Confirmed appointments</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-pink-200/40 border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition">
          <CardContent className="p-6 text-center">
            <Pill className="w-10 h-10 mx-auto mb-3 text-pink-700" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Medicines</h3>
            <p className="text-sm text-gray-700">Essentials at your doorstep</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-blue-200/40 border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition">
          <CardContent className="p-6 text-center">
            <FlaskRound className="w-10 h-10 mx-auto mb-3 text-blue-700" />
            <h3 className="font-semibold text-gray-900 mb-2">Lab Tests</h3>
            <p className="text-sm text-gray-700">Sample pickup at your home</p>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 pb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book an appointment for an in-clinic consultation</h2>
        <div className="flex gap-3 flex-wrap mb-8">
          {['Orthopedists','Obesity','Neck pain','Neurology','Headache','Shoulder','Eye care'].map((item) => (
            <span key={item} className="px-4 py-2 rounded-full backdrop-blur-xl bg-white/50 border border-white/40 text-gray-800 text-sm shadow-sm hover:shadow-md cursor-pointer">
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Dr. Anu Priya ", spec: "Neurosurgeon", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Dr. Anshu Batahm", spec: "Psychiatrist", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Dr. Mahek Katheriya", spec: "Gynecologist", img: "https://randomuser.me/api/portraits/women/68.jpg" },
            { name: "Dr. Bharat Tripathi", spec: "Neurologist", img: "https://randomuser.me/api/portraits/men/65.jpg" }
          ].map((doc) => (
            <Card key={doc.name} className="backdrop-blur-xl bg-white/50 border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition text-center p-6">
              <CardContent>
                <img src={doc.img} alt={doc.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow-md" />
                <h3 className="font-semibold text-lg text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-700">{doc.spec}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;