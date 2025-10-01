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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border-none overflow-hidden dark:bg-gray-800 dark:text-gray-100">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-sky-400 to-sky-500 dark:from-sky-600 dark:to-sky-700 text-white text-center py-8">
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
                      className="w-28 h-28 rounded-full object-cover border-4 border-sky-400 dark:border-sky-600 shadow-lg"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-inner">
                      <User className="w-10 h-10 text-gray-500 dark:text-gray-300" />
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t("doctor.register.image")}
                </p>
              </div>

              {/* Full Name */}
              <Input
                type="text"
                placeholder={t("doctor.register.name")}
                className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-700"
                required
              />

              {/* Email + OTP */}
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder={t("doctor.register.email") || "Enter Email"}
                  className="h-12 flex-1 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-700"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  className="h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 px-4"
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>

              {/* OTP Field */}
              <AnimatePresence>
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 p-4 rounded-xl shadow-inner"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enter OTP
                    </label>
                    <Input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit OTP"
                      className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 bg-white dark:bg-gray-800"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other Fields */}
              {[
                "Speciality",
                "Type (e.g., Surgeon, Physician)",
                "City",
                "Languages (comma separated)",
                "Experience (in years)",
                "Doctor License Number",
                "Password (min 6 chars & 1 number)",
                "Re-enter Password",
              ].map((placeholder, i) => (
                <Input
                  key={i}
                  type={
                    placeholder.toLowerCase().includes("password")
                      ? "password"
                      : placeholder.includes("Experience")
                      ? "number"
                      : "text"
                  }
                  placeholder={placeholder}
                  min={placeholder.includes("Experience") ? 0 : undefined}
                  pattern={
                    placeholder.toLowerCase().includes("password")
                      ? "^(?=.*[0-9]).{6,}$"
                      : undefined
                  }
                  className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 bg-white dark:bg-gray-700"
                  required
                />
              ))}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg"
              >
                {t("doctor.register.submit")}
              </Button>

              {/* Already Have Account */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t("doctor.register.haveAccount")}{" "}
                <a
                  href="/login"
                  className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
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
