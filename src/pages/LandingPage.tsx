// src/pages/LandingPage.tsx
// -----------------------------------------------------------------------------
// LandingPage.tsx (medical theme with blue + green separation, floating heart)
// -----------------------------------------------------------------------------

import { useEffect, useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  Video,
  Shield,
  Clock,
  Users,
  Pill,
  ArrowRight,
  CheckCircle,
  Stethoscope,
  Globe,
  Star,
} from "lucide-react";

import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// -----------------------------------------------------------------------------
// Animation Variants
// -----------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200 },
  },
};

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------
type Role = "patient" | "doctor" | "pharmacy" | "";

// -----------------------------------------------------------------------------
// LandingPage
// -----------------------------------------------------------------------------
const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Dialog state
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("");

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Auto open register dialog if ?register=open
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("register") === "open") setRoleDialogOpen(true);
  }, [location]);

  // ---------------------------------------------------------------------------
  // Animated Stats
  // ---------------------------------------------------------------------------
  const stats = [
    { number: 10000, label: t("landing.stats.patients") },
    { number: 500, label: t("landing.stats.doctors") },
    { number: 50, label: t("landing.stats.specs") },
    { number: 24, label: t("landing.stats.support") },
  ];

  const [animatedStats, setAnimatedStats] = useState<number[]>(
    stats.map(() => 0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) =>
        prev.map((val, i) =>
          val < stats[i].number
            ? val + Math.ceil(stats[i].number / 100)
            : stats[i].number
        )
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------------------------------------------------------
  // Features, testimonials and benefits
  // ---------------------------------------------------------------------------
  const features = useMemo(
    () => [
      {
        id: "video",
        icon: Video,
        title: t("landing.features.video.title"),
        description: t("landing.features.video.desc"),
        color: "bg-blue-500",
      },
      {
        id: "availability",
        icon: Clock,
        title: t("landing.features.avail.title"),
        description: t("landing.features.avail.desc"),
        color: "bg-emerald-500",
      },
      {
        id: "secure",
        icon: Shield,
        title: t("landing.features.secure.title"),
        description: t("landing.features.secure.desc"),
        color: "bg-blue-500",
      },
      {
        id: "pharmacy",
        icon: Pill,
        title: t("landing.features.pharmacy.title"),
        description: t("landing.features.pharmacy.desc"),
        color: "bg-emerald-500",
      },
      {
        id: "experts",
        icon: Users,
        title: t("landing.features.experts.title"),
        description: t("landing.features.experts.desc"),
        color: "bg-blue-500",
      },
      {
        id: "multilingual",
        icon: Globe,
        title: t("landing.features.multi.title"),
        description: t("landing.features.multi.desc"),
        color: "bg-emerald-500",
      },
    ],
    [t]
  );

  const testimonials = [
    {
      name: "Priya Kumar",
      role: t("landing.testimonials.patient"),
      quote: t("landing.testimonials.priya"),
      rating: 5,
    },
    {
      name: "Dr. Aman Singh",
      role: t("landing.testimonials.doctor"),
      quote: t("landing.testimonials.aman"),
      rating: 5,
    },
    {
      name: "Harpreet",
      role: t("landing.testimonials.pharmacist"),
      quote: t("landing.testimonials.harpreet"),
      rating: 4,
    },
  ];

  const benefits = [
    t("landing.benefits.instant"),
    t("landing.benefits.records"),
    t("landing.benefits.prescriptions"),
    t("landing.benefits.appointments"),
    t("landing.benefits.multilang"),
    t("landing.benefits.secure"),
  ];

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleRoleContinue = () => {
    if (!selectedRole) return;
    if (selectedRole === "patient") navigate("/register/user");
    if (selectedRole === "doctor") navigate("/register/doctor");
    if (selectedRole === "pharmacy") navigate("/register/pharmacy");
    setRoleDialogOpen(false);
    setSelectedRole("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => setNewsletterEmail(""), 1500);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Layout>
      {/* MAIN CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden space-y-28"
      >
        {/* Floating blobs (blue + green separate) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-300 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        </div>

        {/* HERO */}
        <motion.section
          variants={fadeInUp}
          className="text-center py-24 px-6 relative z-10"
        >
          <motion.div
            variants={scaleIn}
            className="mx-auto mb-8 animate-bounce bg-blue-500 w-40 h-40 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Heart className="h-24 w-24 text-white drop-shadow-lg" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-blue-600 drop-shadow-lg">
            {t("app.name")}
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            {t("app.tagline")}
          </p>

          <div className="mt-6">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse">
              {t("We-Care we-serve")}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg"
              onClick={() => setRoleDialogOpen(true)}
            >
              {t("landing.cta.getStarted")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg"
              onClick={() => navigate("/doctors")}
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              {t("landing.cta.findDoctors")}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((s, i) => (
              <Card
                key={i}
                className="p-6 bg-white/80 backdrop-blur border border-blue-100 shadow-md"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {i === 3
                    ? `${animatedStats[i]}/7`
                    : `${animatedStats[i]}${i === 0 ? "+" : ""}`}
                </div>
                <div className="mt-2 text-sm text-gray-600">{s.label}</div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* FEATURES */}
        <motion.section variants={fadeInUp} className="px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
            {t("landing.features.title")}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.id}
                  className="p-6 hover:shadow-xl transition-all bg-white/90 border"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle>{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{f.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.section>

        {/* BENEFITS */}
        <motion.section variants={fadeInUp} className="px-6">
          <Card className="p-12 bg-white/80 backdrop-blur border border-emerald-100">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge className="bg-blue-100 text-blue-700">
                  {t("landing.badge")}
                </Badge>
                <h2 className="text-3xl font-bold mt-4 text-blue-600">
                  {t("landing.benefits.title")}
                </h2>
                <p className="text-gray-600 mt-2">
                  {t("landing.benefits.desc")}
                </p>
                <ul className="space-y-3 mt-6">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center p-8 border rounded-xl border-blue-100 bg-white shadow">
                <Heart className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-2xl font-bold mb-2">
                  {t("landing.journey.title")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("landing.journey.desc")}
                </p>
                <Button
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setRoleDialogOpen(true)}
                >
                  {t("landing.cta.startTrial")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section variants={fadeInUp} className="px-6">
          <h3 className="text-3xl font-bold text-center mb-10 text-emerald-600">
            {t("landing.testimonials.title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((tm, i) => (
              <Card
                key={i}
                className="p-6 bg-white/80 backdrop-blur border border-blue-100 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-blue-500" />
                  <div>
                    <div className="font-semibold">{tm.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{tm.role}</div>
                    <div className="text-sm text-gray-700">{tm.quote}</div>
                    <div className="mt-3 flex text-amber-400">
                      {Array.from({ length: tm.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* NEWSLETTER */}
        <motion.section variants={fadeInUp} className="px-6">
          <Card className="max-w-4xl mx-auto p-8 flex flex-col md:flex-row gap-6 items-center bg-white/80 backdrop-blur border border-emerald-100">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-600">
                {t("landing.newsletter.title")}
              </h3>
              <p className="text-gray-600">{t("landing.newsletter.desc")}</p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-3 items-center w-full md:w-auto"
            >
              <Label className="sr-only">{t("landing.newsletter.email")}</Label>
              <Input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t("landing.newsletter.placeholder")}
                className="focus:ring-2 focus:ring-blue-400"
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {newsletterSubmitted
                  ? t("landing.newsletter.subscribed")
                  : t("landing.newsletter.subscribe")}
              </Button>
            </form>
          </Card>
        </motion.section>
      </motion.div>

      {/* ROLE DIALOG */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("landing.dialog.title")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={selectedRole}
              onValueChange={(val) => setSelectedRole(val as Role)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t("landing.dialog.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">
                  {t("landing.dialog.patient")}
                </SelectItem>
                <SelectItem value="doctor">
                  {t("landing.dialog.doctor")}
                </SelectItem>
                <SelectItem value="pharmacy">
                  {t("landing.dialog.pharmacy")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleRoleContinue}
            >
              {t("landing.dialog.continue")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default LandingPage;
