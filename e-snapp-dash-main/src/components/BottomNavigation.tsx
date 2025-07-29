import { Home, TrendingUp, Zap, Euro } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigationItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "trend", label: "Trend", icon: TrendingUp, path: "/trends" },
  { id: "realtime", label: "Realtime", icon: Zap, path: "/realtime" },
  { id: "economics", label: "Economics", icon: Euro, path: "/billing" },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-colors rounded-lg",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 500
              }}
            >
              <motion.div
                animate={isActive ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ 
                  duration: 0.5,
                  repeat: isActive ? 1 : 0
                }}
              >
                <Icon size={20} className={cn(isActive && "text-primary")} />
              </motion.div>
              <motion.span 
                className="text-xs mt-1 font-medium"
                animate={isActive ? { fontWeight: 700 } : { fontWeight: 500 }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};