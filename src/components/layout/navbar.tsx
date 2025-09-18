import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { key: 'dashboard', path: '/dashboard' },
    { key: 'doctors', path: '/doctors' },
    { key: 'pharmacy', path: '/pharmacy' },
    { key: 'appointments', path: '/appointments' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-medical"
          >
            <Heart className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold text-gradient-medical">
            {t('app.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && navItems.map(item => (
            <Link
              key={item.key}
              to={item.path}
              className="nav-item"
            >
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {/* Desktop User Menu */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="h-4 w-4" />
                      <span>{user?.displayName || user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      {t('navigation.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      {t('navigation.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('navigation.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{t('app.name')}</SheetTitle>
                      <SheetDescription>
                        {t('app.tagline')}
                      </SheetDescription>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 mt-6">
                      {navItems.map(item => (
                        <Link
                          key={item.key}
                          to={item.path}
                          className="nav-item block py-2"
                        >
                          {t(`navigation.${item.key}`)}
                        </Link>
                      ))}
                      <hr />
                      <Link to="/profile" className="nav-item block py-2">
                        {t('navigation.profile')}
                      </Link>
                      <Link to="/settings" className="nav-item block py-2">
                        {t('navigation.settings')}
                      </Link>
                      <Button onClick={handleLogout} variant="outline" className="justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('navigation.logout')}
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
              >
                {t('Login')}
              </Button>
              <Button
                className="btn-medical"
                onClick={() => navigate('/register')}
              >
                {t('auth.register')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};