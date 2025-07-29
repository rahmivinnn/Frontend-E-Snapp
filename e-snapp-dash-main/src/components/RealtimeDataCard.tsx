import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RealtimeDataCardProps {
  title: string;
  value: string | number;
  unit?: string;
  className?: string;
}

export const RealtimeDataCard = ({ title, value, unit, className }: RealtimeDataCardProps) => {
  return (
    <motion.div 
      className={cn("bg-card rounded-2xl p-4 shadow-sm", className)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="text-center">
        <motion.div 
          className="text-sm text-muted-foreground mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.div>
        <motion.div 
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {value} {unit && (
            <motion.span 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {unit}
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};