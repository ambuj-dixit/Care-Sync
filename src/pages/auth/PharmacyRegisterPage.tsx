import React, { useState } from "react";
import { motion } from "framer-motion";
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

  const handleSendOtp = () => {
    setOtpSent(true);
    console.log("OTP Sent!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering pharmacy with file:", file, "OTP:", otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-200 to-green-200 text-gray-800 text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold">
                {t("pharmacy.register.title")}
              </CardTitle>
              <p className="text-sm opacity-80 mt-2">
                {t("pharmacy.register.subtitle")}
              </p>
            </motion.div>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Logo Upload */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  {preview ? (
                    <motion.img
                      key="preview"
                      src={preview}
                      alt="Pharmacy Logo Preview"
                      className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 bg-gray-100">
                      <Building2 className="w-10 h-10 text-gray-500" />
                    </div>
                  )}
                  <label
                    htmlFor="profile"
                    className="absolute bottom-1 right-1 bg-blue-300 hover:bg-blue-400 text-white p-2 rounded-full shadow cursor-pointer"
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
              </motion.div>

              {/* Pharmacy Name */}
              <Input
                type="text"
                placeholder={t("pharmacy.register.name")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300"
                required
              />

              {/* Contact Number */}
              <Input
                type="tel"
                placeholder={t("pharmacy.register.contact") || "Contact Number"}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300"
                pattern="[0-9]{10}"
                required
              />

              {/* Email + OTP */}
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("pharmacy.register.email")}
                  className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300 flex-1"
                  required
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  className="h-12 rounded-xl bg-blue-300 hover:bg-blue-400 text-gray-800"
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-300"
                    required
                  />
                </motion.div>
              )}

              {/* Password */}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("pharmacy.register.password")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300"
                minLength={6}
                pattern="^(?=.*[0-9]).{6,}$"
                required
              />

              {/* Confirm Password */}
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter Password"
                className={`h-12 rounded-xl border-gray-300 focus:ring-2 ${
                  confirmPassword && confirmPassword === password
                    ? "focus:ring-green-300"
                    : "focus:ring-red-300"
                }`}
                required
              />

              {/* License */}
              <Input
                type="text"
                placeholder={t("pharmacy.register.license")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300"
                required
              />

              {/* Address */}
              <Input
                type="text"
                placeholder={t("pharmacy.register.address")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-300"
                required
              />

              {/* Submit */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-green-300 hover:bg-green-400 text-gray-800 shadow"
                >
                  {t("pharmacy.register.submit")}
                </Button>
              </motion.div>

              {/* Already Have Account */}
              <div className="text-center text-sm text-gray-600">
                {t("pharmacy.register.haveAccount")}{" "}
                <a
                  href="/login"
                  className="text-blue-500 font-medium hover:underline"
                >
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
