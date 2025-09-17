import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PharmacyRegisterPage from '../auth/PharmacyRegisterPage';

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

// Sample medicines data
const medicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 25,
    manufacturer: 'PharmaCorp',
    inStock: true,
    quantity: 150,
    unit: 'tablets',
    prescriptionRequired: false,
    description: 'Effective pain relief and fever reducer',
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 85,
    manufacturer: 'MediLab',
    inStock: true,
    quantity: 75,
    unit: 'capsules',
    prescriptionRequired: true,
    description: 'Antibiotic for bacterial infections',
  },
  {
    id: 3,
    name: 'Vitamin D3 1000 IU',
    category: 'Vitamins',
    price: 120,
    manufacturer: 'HealthPlus',
    inStock: true,
    quantity: 200,
    unit: 'tablets',
    prescriptionRequired: false,
    description: 'Essential vitamin for bone health',
  },
  {
    id: 4,
    name: 'Atorvastatin 20mg',
    category: 'Cardiovascular',
    price: 180,
    manufacturer: 'CardioMed',
    inStock: false,
    quantity: 0,
    unit: 'tablets',
    prescriptionRequired: true,
    description: 'Cholesterol-lowering medication',
  },
];

const categories = [
  'All Categories',
  'Pain Relief',
  'Antibiotics',
  'Vitamins',
  'Cardiovascular',
  'Diabetes',
  'Respiratory',
];

const PharmacyPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  // Filter medicines based on search and category
  useEffect(() => {
    let filtered = medicines;

    if (searchTerm) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategory]);

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: Math.max(0, (prev[medicineId] || 0) - 1)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [medicineId, quantity]) => {
      const medicine = medicines.find(m => m.id === parseInt(medicineId));
      return total + (medicine ? medicine.price * quantity : 0);
    }, 0);
  };

  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-start">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gradient-medical">
              {t('pharmacy.search_medicine')}
            </h1>
            <p className="text-muted-foreground text-lg">
              Find and order medicines from verified pharmacies
            </p>
          </div>

          {/* Cart Summary */}
          {getTotalItems() > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-24"
            >
              <Card className="card-medical">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold">Cart Total</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{getTotalPrice()}
                      </p>
                    </div>
                    <Button size="sm" className="btn-medical ml-2">
                      Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants}>
          <Card className="card-medical">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search medicines, brands, or conditions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full md:w-64">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medicines Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredMedicines.map((medicine) => (
            <motion.div key={medicine.id} variants={itemVariants}>
              <Card className="card-medical-hover h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">
                        {medicine.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {medicine.manufacturer}
                      </CardDescription>
                    </div>
                    <Badge variant={medicine.inStock ? "default" : "secondary"}>
                      {medicine.inStock ? t('pharmacy.in_stock') : t('pharmacy.out_of_stock')}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Category */}
                  <Badge variant="outline" className="text-xs">
                    {medicine.category}
                  </Badge>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {medicine.description}
                  </p>

                  {/* Stock Info */}
                  {medicine.inStock && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      {medicine.quantity} {medicine.unit} available
                    </div>
                  )}

                  {/* Prescription Required */}
                  {medicine.prescriptionRequired && (
                    <Badge variant="destructive" className="text-xs">
                      {t('pharmacy.prescription_required')}
                    </Badge>
                  )}

                  {/* Price */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xl font-bold text-primary">
                      ₹{medicine.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      per {medicine.unit === 'tablets' ? 'strip' : 'bottle'}
                    </p>
                  </div>

                  {/* Add to Cart */}
                  <div className="space-y-2">
                    {cart[medicine.id] > 0 ? (
                      <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(medicine.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="font-semibold text-primary">
                          {cart[medicine.id]}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(medicine.id)}
                          className="h-8 w-8 p-0"
                          disabled={!medicine.inStock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full btn-medical gap-2"
                        onClick={() => addToCart(medicine.id)}
                        disabled={!medicine.inStock}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {t('pharmacy.add_to_cart')}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={!medicine.inStock}
                    >
                      {t('pharmacy.check_availability')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMedicines.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <div className="space-y-4">
              <div className="text-6xl text-muted-foreground">💊</div>
              <h3 className="text-xl font-semibold">No medicines found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
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
export default PharmacyRegisterPage;