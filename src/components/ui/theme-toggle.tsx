import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-4 w-4" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'light' ? 180 : 0,
          scale: theme === 'light' ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center justify-center"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
    </Button>
  );
};