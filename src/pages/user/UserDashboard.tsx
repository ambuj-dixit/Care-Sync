import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Pill, FileText, Plus, Video, Clock, Star } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const UserDashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: '3',
      description: 'Next: Today 2:00 PM',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Consultations',
      value: '24',
      description: '+2 this month',
      icon: Video,
      color: 'bg-green-500',
    },
    {
      title: 'Health Records',
      value: '18',
      description: 'Last updated today',
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Prescriptions',
      value: '5',
      description: '2 ending soon',
      icon: Pill,
      color: 'bg-orange-500',
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      date: 'Today',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:30 AM',
      type: 'Audio Call',
      status: 'confirmed',
    },
  ];

  const recentConsultations = [
    {
      id: 1,
      doctor: 'Dr. Emily Wilson',
      specialization: 'General Physician',
      date: 'Yesterday',
      rating: 5,
      notes: 'Follow-up recommended in 2 weeks',
    },
    {
      id: 2,
      doctor: 'Dr. David Miller',
      specialization: 'Orthopedist',
      date: '3 days ago',
      rating: 5,
      notes: 'Prescription provided for pain relief',
    },
  ];

  const quickActions = [
    {
      title: t('dashboard.book_appointment'),
      description: 'Find and book with available doctors',
      icon: Calendar,
      path: '/appointments/book',
      color: 'bg-primary',
    },
    {
      title: t('dashboard.view_records'),
      description: 'Access your health records',
      icon: FileText,
      path: '/health-records',
      color: 'bg-accent',
    },
    {
      title: t('dashboard.find_pharmacy'),
      description: 'Search medicines and pharmacies',
      icon: Pill,
      path: '/pharmacy',
      color: 'bg-warning',
    },
  ];

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-gradient-medical mb-2">
            {t('dashboard.welcome')}, John!
          </h1>
          <p className="text-muted-foreground">
            Here's your health dashboard overview
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="stats-card group hover:scale-105 transition-transform duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Upcoming Appointments */}
          <motion.div variants={itemVariants}>
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('dashboard.upcoming_appointments')}
                </CardTitle>
                <CardDescription>
                  Your scheduled consultations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.specialization}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3" />
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="secondary">{appointment.type}</Badge>
                      <Button size="sm" className="btn-medical">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New Appointment
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Consultations */}
          <motion.div variants={itemVariants}>
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('dashboard.recent_consultations')}
                </CardTitle>
                <CardDescription>
                  Your latest medical consultations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentConsultations.map((consultation) => (
                  <motion.div
                    key={consultation.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">{consultation.doctor}</p>
                      <p className="text-sm text-muted-foreground">
                        {consultation.specialization}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {consultation.date}
                      </p>
                      <p className="text-sm">{consultation.notes}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < consultation.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="card-medical">
            <CardHeader>
              <CardTitle>{t('dashboard.quick_actions')}</CardTitle>
              <CardDescription>
                Quick access to important features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center space-y-3 w-full"
                    >
                      <div className={`p-3 rounded-full ${action.color}`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{action.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};
export default UserDashboard;