import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User } from "lucide-react";

const DoctorRegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor registered:", file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 via-white to-green-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border-none overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-sky-400 to-green-400 text-white text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold">
                {t("doctor.register.title")}
              </CardTitle>
              <p className="text-sm opacity-90 mt-2">
                {t("doctor.register.subtitle")}
              </p>
            </motion.div>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {preview ? (
                    <motion.img
                      key="preview"
                      src={preview}
                      alt="Profile Preview"
                      className="w-28 h-28 rounded-full object-cover border-4 border-sky-400 shadow-lg"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 bg-gray-100 shadow-inner">
                      <User className="w-10 h-10 text-gray-500" />
                    </div>
                  )}
                  <label
                    htmlFor="profile"
                    className="absolute bottom-1 right-1 bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full shadow-md cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      id="profile"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t("doctor.register.image")}
                </p>
              </div>

              {/* Full Name */}
              <Input
                type="text"
                placeholder={t("doctor.register.name")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Email with OTP */}
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder={t("doctor.register.email") || "Enter Email"}
                  className="h-12 flex-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  className="h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white px-4"
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>

              {/* OTP Popup Animation */}
              <AnimatePresence>
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2 bg-sky-50 border border-sky-200 p-4 rounded-xl shadow-inner"
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      Enter OTP
                    </label>
                    <Input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit OTP"
                      className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Speciality */}
              <Input
                type="text"
                placeholder="Speciality"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Type */}
              <Input
                type="text"
                placeholder="Type (e.g., Surgeon, Physician)"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* City */}
              <Input
                type="text"
                placeholder="City"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Languages */}
              <Input
                type="text"
                placeholder="Languages (comma separated)"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Experience */}
              <Input
                type="number"
                placeholder="Experience (in years)"
                min={0}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Doctor License Number */}
              <Input
                type="text"
                placeholder="Doctor License Number"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Password */}
              <Input
                type="password"
                placeholder="Password (min 6 chars & 1 number)"
                pattern="^(?=.*[0-9]).{6,}$"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Confirm Password */}
              <Input
                type="password"
                placeholder="Re-enter Password"
                pattern="^(?=.*[0-9]).{6,}$"
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg"
              >
                {t("doctor.register.submit")}
              </Button>

              {/* Already Have Account */}
              <div className="text-center text-sm text-gray-600">
                {t("doctor.register.haveAccount")}{" "}
                <a
                  href="/login"
                  className="text-sky-600 font-medium hover:underline"
                >
                  {t("doctor.register.signIn")}
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DoctorRegisterPage;
