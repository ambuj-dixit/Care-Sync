import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Building2 } from "lucide-react";

const PharmacyRegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handleSendOtp = () => setOtpSent(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering pharmacy with file:", file, "OTP:", otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border-none overflow-hidden dark:bg-gray-900 dark:border-gray-700">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-sky-400 to-green-400 text-white text-center py-8 dark:from-sky-600 dark:to-green-600">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <CardTitle className="text-2xl font-bold">{t("pharmacy.register.title")}</CardTitle>
              <p className="text-sm opacity-90 mt-2">{t("pharmacy.register.subtitle")}</p>
            </motion.div>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Logo Upload */}
              <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="relative">
                  {preview ? (
                    <motion.img
                      key="preview"
                      src={preview}
                      alt="Pharmacy Logo Preview"
                      className="w-28 h-28 rounded-full object-cover border-4 border-sky-400 shadow-lg dark:border-sky-500"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 bg-gray-100 shadow-inner dark:border-gray-600 dark:bg-gray-800">
                      <Building2 className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                  <label
                    htmlFor="profile"
                    className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <input type="file" id="profile" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">{t("doctor.register.image")}</p>
              </motion.div>

              {/* Fields */}
              <Input type="text" placeholder={t("pharmacy.register.name")} className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />
              <Input type="tel" placeholder={t("pharmacy.register.contact")} pattern="[0-9]{10}" className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />

              {/* Email + OTP */}
              <div className="flex gap-2">
                <Input type="email" placeholder={t("pharmacy.register.email")} className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 flex-1 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />
                <Button type="button" onClick={handleSendOtp} className="h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg">
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>

              {/* OTP Input */}
              <AnimatePresence>
                {otpSent && (
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
                    <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-green-500" required />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Passwords */}
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("pharmacy.register.password")} minLength={6} pattern="^(?=.*[0-9]).{6,}$" className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter Password" className={`h-12 rounded-xl border-gray-300 focus:ring-2 ${confirmPassword && confirmPassword === password ? "focus:ring-green-500" : "focus:ring-red-500"} dark:bg-gray-800 dark:border-gray-600`} required />

              {/* License & Address */}
              <Input type="text" placeholder={t("pharmacy.register.license")} className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />
              <Input type="text" placeholder={t("pharmacy.register.address")} className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-sky-500" required />

              {/* Submit */}
              <Button type="submit" className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg">
                {t("pharmacy.register.submit")}
              </Button>

              {/* Already Have Account */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t("pharmacy.register.haveAccount")}{" "}
                <a href="/login" className="text-sky-600 font-medium hover:underline dark:text-sky-400">
                  {t("pharmacy.register.signIn")}
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PharmacyRegisterPage;
