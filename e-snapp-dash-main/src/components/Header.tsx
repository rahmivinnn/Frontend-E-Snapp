import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showActions?: boolean;
}

export const Header = ({ title, subtitle, showActions = true }: HeaderProps) => {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2 
            }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <span className="text-primary-foreground font-bold text-sm">e</span>
          </motion.div>
          <motion.span 
            className="text-xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            e-snapp
          </motion.span>
        </div>
      </motion.div>
      
      {showActions && (
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell size={20} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Plus size={20} />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};