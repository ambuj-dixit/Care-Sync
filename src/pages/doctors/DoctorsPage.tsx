import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star, Video, Phone, Calendar, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

// Sample doctors data
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    reviews: 234,
    consultationFee: 150,
    isAvailable: true,
    nextAvailable: '2:00 PM Today',
    languages: ['English', 'Hindi'],
    education: ['MBBS', 'MD - Cardiology'],
    about: 'Experienced cardiologist with expertise in interventional cardiology and heart disease prevention.',
    photoURL: '/api/placeholder/150/150'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    experience: 8,
    rating: 4.8,
    reviews: 189,
    consultationFee: 120,
    isAvailable: true,
    nextAvailable: '3:30 PM Today',
    languages: ['English', 'Punjabi'],
    education: ['MBBS', 'MD - Dermatology'],
    about: 'Specialist in skin disorders, cosmetic dermatology, and advanced skin treatments.',
    photoURL: '/api/placeholder/150/150'
  },
  {
    id: 3,
    name: 'Dr. Emily Wilson',
    specialization: 'General Physician',
    experience: 12,
    rating: 4.7,
    reviews: 312,
    consultationFee: 80,
    isAvailable: false,
    nextAvailable: '10:00 AM Tomorrow',
    languages: ['English', 'Hindi', 'Punjabi'],
    education: ['MBBS', 'MD - Internal Medicine'],
    about: 'Primary care physician with focus on preventive medicine and chronic disease management.',
    photoURL: '/api/placeholder/150/150'
  },
];

const specializations = [
  'All Specializations',
  'Cardiologist',
  'Dermatologist',
  'General Physician',
  'Orthopedist',
  'Neurologist',
  'Pediatrician',
];

export const DoctorsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Filter doctors based on search and specialization
  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialization !== 'All Specializations') {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialization]);

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-3xl font-bold text-gradient-medical">
            {t('doctors.find_doctor')}
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with qualified healthcare professionals
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants}>
          <Card className="card-medical">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors by name or specialization..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={selectedSpecialization}
                  onValueChange={setSelectedSpecialization}
                >
                  <SelectTrigger className="w-full md:w-64">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredDoctors.map((doctor) => (
            <motion.div key={doctor.id} variants={itemVariants}>
              <Card className="card-medical-hover h-full">
                <CardHeader className="text-center pb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={doctor.photoURL} alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-medical text-white text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {doctor.specialization}
                  </CardDescription>
                  
                  {/* Availability Status */}
                  <Badge 
                    variant={doctor.isAvailable ? "default" : "secondary"}
                    className={doctor.isAvailable ? "bg-green-500" : ""}
                  >
                    {doctor.isAvailable ? t('doctors.available_now') : 'Busy'}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {doctor.experience}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Years Exp.
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        {doctor.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ({doctor.reviews} reviews)
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Education:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.education.map((edu, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {edu}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">About:</p>
                    <p className="text-sm text-muted-foreground">
                      {doctor.about}
                    </p>
                  </div>

                  {/* Consultation Fee */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="text-xl font-bold text-primary">
                      ₹{doctor.consultationFee}
                    </p>
                  </div>

                  {/* Next Available */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Next available: {doctor.nextAvailable}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      className="w-full btn-medical gap-2"
                      disabled={!doctor.isAvailable}
                    >
                      <Calendar className="h-4 w-4" />
                      {t('doctors.book_appointment')}
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!doctor.isAvailable}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!doctor.isAvailable}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="space-y-4">
              <div className="text-6xl text-muted-foreground">🔍</div>
              <h3 className="text-xl font-semibold">No doctors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('All Specializations');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};