// Seed data for the telemedicine platform

export const sampleDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    consultationFee: 150,
    isAvailable: true,
    languages: ['English', 'Hindi'],
    education: ['MBBS from Delhi University', 'MD Cardiology from AIIMS'],
    about: 'Experienced cardiologist with expertise in interventional cardiology and heart disease prevention. Passionate about providing comprehensive cardiac care.',
    photoURL: '/placeholder-doctor-1.jpg'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    experience: 8,
    rating: 4.8,
    consultationFee: 120,
    isAvailable: true,
    languages: ['English', 'Punjabi'],
    education: ['MBBS from Mumbai University', 'MD Dermatology from KEM Hospital'],
    about: 'Specialist in skin disorders, cosmetic dermatology, and advanced skin treatments. Committed to helping patients achieve healthy skin.',
    photoURL: '/placeholder-doctor-2.jpg'
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrician',
    experience: 12,
    rating: 4.7,
    consultationFee: 100,
    isAvailable: false,
    languages: ['English', 'Hindi', 'Punjabi'],
    education: ['MBBS from Chandigarh University', 'MD Pediatrics from PGI'],
    about: 'Dedicated pediatrician with extensive experience in child healthcare, vaccination, and developmental assessments.',
    photoURL: '/placeholder-doctor-3.jpg'
  }
];

export const sampleMedicines = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 25,
    manufacturer: 'PharmaCorp Ltd.',
    inStock: true,
    quantity: 150,
    unit: 'tablets',
    prescriptionRequired: false,
    description: 'Effective pain relief and fever reducer for adults and children above 12 years.',
    imageUrl: '/placeholder-medicine-1.jpg'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 85,
    manufacturer: 'MediLab Pharmaceuticals',
    inStock: true,
    quantity: 75,
    unit: 'capsules',
    prescriptionRequired: true,
    description: 'Broad-spectrum antibiotic for treating various bacterial infections.',
    imageUrl: '/placeholder-medicine-2.jpg'
  },
  {
    id: '3',
    name: 'Vitamin D3 1000 IU',
    category: 'Vitamins & Supplements',
    price: 120,
    manufacturer: 'HealthPlus Nutrition',
    inStock: true,
    quantity: 200,
    unit: 'tablets',
    prescriptionRequired: false,
    description: 'Essential vitamin for bone health, immune system, and overall wellness.',
    imageUrl: '/placeholder-medicine-3.jpg'
  }
];

export const samplePharmacies = [
  {
    id: '1',
    name: 'MediCare Pharmacy',
    address: '123 Health Street, Medical District',
    phone: '+91-98765-43210',
    email: 'info@medicarepharmacy.com',
    isVerified: true,
    rating: 4.8,
    isOpen: true,
    medicines: sampleMedicines
  },
  {
    id: '2',
    name: 'WellHealth Drugstore',
    address: '456 Wellness Avenue, Healthcare Hub',
    phone: '+91-87654-32109',
    email: 'contact@wellhealth.com',
    isVerified: true,
    rating: 4.6,
    isOpen: true,
    medicines: sampleMedicines
  }
];

export const sampleUsers = [
  {
    id: '1',
    email: 'patient@example.com',
    displayName: 'John Doe',
    role: 'user' as const,
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+91-9876543210',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      address: '789 Patient Lane, City',
      emergencyContact: '+91-9876543211'
    }
  },
  {
    id: '2',
    email: 'doctor@example.com',
    displayName: 'Dr. Sarah Johnson',
    role: 'doctor' as const,
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+91-9876543212',
      specialization: 'Cardiologist',
      experience: 15,
      education: ['MBBS', 'MD - Cardiology'],
      registrationNumber: 'MCI12345'
    }
  }
];