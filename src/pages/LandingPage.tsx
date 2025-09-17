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
  Globe
} from 'lucide-react';
//adding commentjfdhjdwjfij
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Connect with qualified doctors through secure video calls',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access healthcare services anytime, anywhere',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security',
      color: 'bg-purple-500'
    },
    {
      icon: Pill,
      title: 'Digital Pharmacy',
      description: 'Order medicines online with prescription verification',
      color: 'bg-orange-500'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Consult with certified healthcare professionals',
      color: 'bg-red-500'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in English, Hindi, and Punjabi',
      color: 'bg-indigo-500'
    }
  ];

  const benefits = [
    'Instant doctor consultations',
    'Digital health records',
    'Prescription management',
    'Appointment scheduling',
    'Multi-language support',
    'Secure data protection'
  ];

  const stats = [
    { number: '10K+', label: 'Happy Patients' },
    { number: '500+', label: 'Expert Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-20"
      >
        {/* Hero Section */}
        <motion.section 
          variants={itemVariants}
          className="text-center space-y-8 py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
            className="mx-auto w-20 h-20 bg-gradient-medical rounded-full flex items-center justify-center mb-8"
          >
            <Heart className="h-10 w-10 text-white" />
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gradient-medical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('app.name')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('app.tagline')} - Experience healthcare like never before
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="btn-medical text-lg px-8 py-4"
              onClick={() => navigate('/register')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => navigate('/doctors')}
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              Find Doctors
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-medical">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose Care Sync?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced telemedicine platform designed to make healthcare accessible, 
              convenient, and secure for everyone.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="card-medical-hover h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section variants={itemVariants}>
          <Card className="card-medical bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Healthcare Revolution
                  </Badge>
                  <h2 className="text-3xl font-bold">
                    Complete Healthcare Solution
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    From consultations to prescriptions, we've got your entire 
                    healthcare journey covered with our comprehensive platform.
                  </p>
                  
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <motion.div
                    className="bg-gradient-medical rounded-2xl p-8 text-white text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Heart className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      Start Your Health Journey
                    </h3>
                    <p className="text-white/80 mb-6">
                      Join thousands of satisfied patients who trust us 
                      with their healthcare needs.
                    </p>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full"
                      onClick={() => navigate('/register')}
                    >
                      Create Free Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          variants={itemVariants}
          className="text-center space-y-8 py-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join Care Sync today and experience the future of healthcare. 
            Connect with doctors, manage your health records, and get medications 
            delivered - all from one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="btn-medical text-lg px-8 py-4"
              onClick={() => navigate('/register')}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => navigate('/login')}
            >
              Sign In to Account
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </Layout>
  );
};