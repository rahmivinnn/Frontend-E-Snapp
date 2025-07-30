import { Bell, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showActions?: boolean;
}

export const Header = ({ title, subtitle, showActions = true }: HeaderProps) => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  const handleNotificationClick = () => {
    setHasNotifications(false);
    // Could navigate to a notifications page in the future
  };
  return (
    <motion.div 
      className="flex items-center justify-between p-3 pt-4 bg-card"
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img src="/e-snapp.png" alt="e-snapp logo" className="h-7" />
          </motion.div>
        </div>
      </motion.div>
      
      {showActions && (
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleNotificationClick}
            >
              <Bell size={22} />
              {hasNotifications && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleProfileClick}
            >
              <User size={22} />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};