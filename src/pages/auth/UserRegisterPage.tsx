import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User } from "lucide-react";

const UserRegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePassword(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    validatePassword(password, value);
  };

  const validatePassword = (pass: string, confirm: string) => {
    if (pass.length < 6 || !/\d/.test(pass)) {
      setPasswordError("Password must be at least 6 characters and include a number.");
    } else if (confirm && pass !== confirm) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleOtpClick = () => {
    setOtpSent(true);
    // 🚀 Add actual OTP sending logic here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError) {
      console.log("Registering user with file:", file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-sky-500 text-white text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold">
                {t("user.register.title")}
              </CardTitle>
              <p className="text-sm opacity-90 mt-2">
                {t("user.register.subtitle")}
              </p>
            </motion.div>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Upload */}
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
              </motion.div>

              {/* Name */}
              <Input
                type="text"
                placeholder={t("user.register.name")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Email */}
              <Input
                type="email"
                placeholder={t("user.register.email")}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Password */}
              <Input
                type="password"
                placeholder={t("user.register.password")}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Confirm Password */}
              <Input
                type="password"
                placeholder={t("user.register.reenterPassword")}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-sky-400"
                required
              />

              {/* Password Error */}
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              {/* OTP Button */}
              {!otpSent && (
                <Button
                  type="button"
                  onClick={handleOtpClick}
                  className="w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg"
                >
                  {t("user.register.otp")}
                </Button>
              )}

              {/* OTP Input + Resend Button */}
              {otpSent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    placeholder={t("user.register.enterOtp")}
                    className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleOtpClick}
                    className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-lg"
                  >
                    {t("user.register.resendOtp")}
                  </Button>
                </motion.div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-lg"
                disabled={!!passwordError}
              >
                {t("user.register.submit")}
              </Button>

              {/* Already Have Account */}
              <div className="text-center text-sm text-gray-600">
                {t("user.register.haveAccount")}{" "}
                <a
                  href="/login"
                  className="text-sky-600 font-medium hover:underline"
                >
                  {t("user.register.signIn")}
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserRegisterPage;
