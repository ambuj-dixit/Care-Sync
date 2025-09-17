// src/pages/LandingPage.tsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  MessageCircle,
  Mail,
  Star
} from 'lucide-react';

// core layout + ui (keeps your theme & components)
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';

type Role = 'patient' | 'doctor' | 'pharmacy' | '';

/**
 * Animations lift:
 * containerVariants: used to stagger sections
 * itemVariants: fade + lift for internal elements
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Role dialog state
  const [roleDialogOpen, setRoleDialogOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role>('');

  // newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

// auto-open role dialog when URL has ?register=open
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("register") === "open") {
      setRoleDialogOpen(true);
    }
  }, [location]);
  
  // Small demo stats
  const stats = useMemo(
    () => [
      { number: '10K+', label: t('landing.stats.patients', 'Happy Patients') },
      { number: '500+', label: t('landing.stats.doctors', 'Expert Doctors') },
      { number: '50+', label: t('landing.stats.specs', 'Specializations') },
      { number: '24/7', label: t('landing.stats.support', 'Support') }
    ],
    [t]
  );

  // Features list (keeps your wording keys)
  const features = useMemo(
    () => [
      {
        id: 'video',
        icon: Video,
        title: t('landing.features.video.title', 'Video Consultations'),
        description: t('landing.features.video.desc', 'Connect with qualified doctors through secure video calls'),
        color: 'bg-blue-500'
      },
      {
        id: 'availability',
        icon: Clock,
        title: t('landing.features.avail.title', '24/7 Availability'),
        description: t('landing.features.avail.desc', 'Access healthcare services anytime, anywhere'),
        color: 'bg-green-500'
      },
      {
        id: 'secure',
        icon: Shield,
        title: t('landing.features.secure.title', 'Secure & Private'),
        description: t('landing.features.secure.desc', 'Your health data is protected with enterprise-grade security'),
        color: 'bg-purple-500'
      },
      {
        id: 'pharmacy',
        icon: Pill,
        title: t('landing.features.pharmacy.title', 'Digital Pharmacy'),
        description: t('landing.features.pharmacy.desc', 'Order medicines online with prescription verification'),
        color: 'bg-orange-500'
      },
      {
        id: 'experts',
        icon: Users,
        title: t('landing.features.experts.title', 'Expert Doctors'),
        description: t('landing.features.experts.desc', 'Consult with certified healthcare professionals'),
        color: 'bg-red-500'
      },
      {
        id: 'multilingual',
        icon: Globe,
        title: t('landing.features.multi.title', 'Multilingual Support'),
        description: t('landing.features.multi.desc', 'Available in English, Hindi, and Punjabi'),
        color: 'bg-indigo-500'
      }
    ],
    [t]
  );

  const benefits = [
    t('landing.benefits.instant', 'Instant doctor consultations'),
    t('landing.benefits.records', 'Digital health records'),
    t('landing.benefits.prescriptions', 'Prescription management'),
    t('landing.benefits.appointments', 'Appointment scheduling'),
    t('landing.benefits.multilang', 'Multi-language support'),
    t('landing.benefits.secure', 'Secure data protection')
  ];

  const testimonials = [
    {
      name: 'Priya Kumar',
      role: t('landing.testimonials.patient', 'Patient'),
      quote: t('landing.testimonials.priya', "Care Sync connected me with a specialist within minutes. Super impressed!"),
      rating: 5
    },
    {
      name: 'Dr. Aman Singh',
      role: t('landing.testimonials.doctor', 'Cardiologist'),
      quote: t('landing.testimonials.aman', "The telemedicine flow is intuitive — I can manage patients and follow-ups seamlessly."),
      rating: 5
    },
    {
      name: 'Harpreet',
      role: t('landing.testimonials.pharmacist', 'Pharmacist'),
      quote: t('landing.testimonials.harpreet', "Inventory sync and prescription verification make fulfillment a breeze."),
      rating: 4
    }
  ];

  // Handlers (EXACT routes used in App.tsx)
  const openRoleDialog = () => setRoleDialogOpen(true);
  const closeRoleDialog = () => {
    setRoleDialogOpen(false);
    setSelectedRole('');
  };

  const handleRoleContinue = () => {
    if (!selectedRole) return;

    // Correct mapping to routes in App.tsx
    if (selectedRole === 'patient') navigate('/register/user');
    else if (selectedRole === 'doctor') navigate('/register/doctor');
    else if (selectedRole === 'pharmacy') navigate('/register/pharmacy');

    closeRoleDialog();
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    // demo reset
    setTimeout(() => {
      setNewsletterEmail('');
    }, 1200);
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-20"
      >
        {/* HERO */}
        <motion.section variants={itemVariants} className="text-center py-12 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.12, type: 'spring', stiffness: 450 }}
            className="mx-auto w-20 h-20 bg-gradient-medical rounded-full flex items-center justify-center mb-6"
            aria-hidden
          >
            <Heart className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gradient-medical leading-tight"
          >
            {t('app.name', 'Care Sync')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-4"
          >
            {t('app.tagline', 'Experience healthcare like never before')}
          </motion.p>

          <div className="mt-4">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              {t('landing.badge.hackathon', 'Hackathon — Free')}
            </Badge>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            {/* All registration CTAs open the role dialog */}
            <Button
              size="lg"
              className="btn-medical text-lg px-8 py-4"
              onClick={openRoleDialog}
              aria-label={t('landing.cta.getStarted', 'Get Started')}
            >
              {t('landing.cta.getStarted', 'Get Started')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => navigate('/doctors')}
              aria-label={t('landing.cta.findDoctors', 'Find Doctors')}
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              {t('landing.cta.findDoctors', 'Find Doctors')}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => navigate('/login')}
              aria-label={t('landing.cta.signIn', 'Sign In')}
            >
              {t('landing.cta.signIn', 'Sign In')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((s, idx) => (
              <motion.div key={idx} variants={itemVariants} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-medical">{s.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FEATURES */}
        <motion.section variants={itemVariants} className="space-y-8 px-4">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t('landing.features.title', 'Why Choose Care Sync?')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('landing.features.subtitle', 'Advanced telemedicine platform designed to make healthcare accessible, convenient, and secure for everyone.')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full card-medical-hover">
                    <CardHeader>
                      <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center mb-4', feature.color)}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* BENEFITS & CTA */}
        <motion.section variants={itemVariants} className="px-4">
          <Card className="card-medical bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Badge className="bg-primary/20 text-primary border-primary/30">{t('landing.badge', 'Healthcare Revolution')}</Badge>

                  <h2 className="text-3xl font-bold">{t('landing.benefits.title', 'Complete Healthcare Solution')}</h2>
                  <p className="text-muted-foreground text-lg">
                    {t('landing.benefits.desc', "From consultations to prescriptions, we've got your entire healthcare journey covered.")}
                  </p>

                  <ul className="space-y-3">
                    {benefits.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * i }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex gap-3 mt-3">
                    <Button onClick={openRoleDialog} size="lg" className="btn-medical px-6 py-3">
                      {t('landing.cta.createAccount', 'Create Free Account')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/about')} size="lg" className="px-6 py-3">
                      {t('landing.cta.learnMore', 'Learn More')}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    className="bg-gradient-medical rounded-2xl p-8 text-white text-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Heart className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t('landing.journey.title', 'Start Your Health Journey')}</h3>
                    <p className="text-white/80 mb-6">{t('landing.journey.desc', 'Join thousands of satisfied patients who trust us with their healthcare needs.')}</p>
                    <Button size="lg" variant="secondary" className="w-full" onClick={openRoleDialog}>
                      {t('landing.cta.startTrial', 'Start Free Trial')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>

                  {/* subtle floating card */}
                  <div className="absolute -bottom-8 left-6 right-6">
                    <Card className="p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/10 p-2">
                          <MessageCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{t('landing.support.title', '24/7 Support')}</div>
                          <div className="text-xs text-muted-foreground">{t('landing.support.desc', 'We are here to help')}</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section variants={itemVariants} className="px-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">{t('landing.testimonials.title', 'What our users say')}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('landing.testimonials.subtitle', 'Real feedback from people who use Care Sync')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{tm.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{tm.role}</div>
                    <div className="text-sm">{tm.quote}</div>
                    <div className="mt-3 flex items-center gap-1 text-amber-400">
                      {Array.from({ length: tm.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4" />)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* NEWSLETTER / FOOTER CTA */}
        <motion.section variants={itemVariants} className="px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{t('landing.newsletter.title', 'Stay updated')}</h3>
              <p className="text-muted-foreground">{t('landing.newsletter.desc', 'Get product updates and health tips delivered to your inbox.')}</p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Label className="sr-only">{t('landing.newsletter.email', 'Email')}</Label>
                <Input value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder={t('landing.newsletter.placeholder', 'Enter your email')} aria-label="newsletter-email" />
              </div>

              <Button type="submit" className="btn-medical">
                {newsletterSubmitted ? t('landing.newsletter.thanks', 'Thanks!') : t('landing.newsletter.subscribe', 'Subscribe')}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.section>
      </motion.div>

      {/* ROLE SELECTION DIALOG (unchanged UI; corrected routing) */}
<Dialog open={roleDialogOpen} onOpenChange={(v) => setRoleDialogOpen(Boolean(v))}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{t('auth.selectRoleTitle', 'Select Your Role')}</DialogTitle>
    </DialogHeader>

    <div className="space-y-4 mt-2">
      <div className="text-sm text-muted-foreground">
        {t('auth.selectRoleSubtitle', 'Choose how you want to join Care Sync')}
      </div>

      <Select value={selectedRole} onValueChange={(val) => setSelectedRole(val as Role)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('auth.selectRolePlaceholder', 'Choose role')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="patient">{t('auth.roles.patient', 'Patient')}</SelectItem>
          <SelectItem value="doctor">{t('auth.roles.doctor', 'Doctor')}</SelectItem>
          <SelectItem value="pharmacy">{t('auth.roles.pharmacy', 'Pharmacy')}</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-3">
        <Button onClick={handleRoleContinue} className="flex-1" disabled={!selectedRole}>
          {t('auth.continue', 'Continue')}
        </Button>
        <Button variant="outline" onClick={closeRoleDialog} className="flex-1">
          {t('auth.cancel', 'Cancel')}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        {t('auth.note', 'You can register as a Patient, Doctor, or Pharmacy. Each role has a dedicated registration flow.')}
      </div>
    </div>
  </DialogContent>
</Dialog>
    </Layout>
  );
};

export default LandingPage;
