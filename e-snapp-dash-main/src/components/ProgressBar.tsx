import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  className?: string;
}

export const ProgressBar = ({ 
  current, 
  total, 
  startDate, 
  endDate, 
  daysRemaining,
  className 
}: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <motion.div 
      className={cn("bg-primary-muted rounded-2xl p-3", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="flex items-center justify-between mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.h3 
          className="text-base font-semibold text-foreground flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.2 }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full bg-primary-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.2 }}
            ></motion.div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            Current Billing Cycle
          </motion.span>
        </motion.h3>
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-between text-sm text-muted-foreground mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {startDate}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          {daysRemaining} Days Remaining
        </motion.span>
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-between mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div 
          className="bg-primary text-primary-foreground px-3 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-base font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            {current} kWh
          </motion.div>
          <motion.div 
            className="text-xs opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            Current
          </motion.div>
        </motion.div>
        <motion.div 
          className="bg-muted text-muted-foreground px-3 py-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.9, x: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-base font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            {total} kWh
          </motion.div>
          <motion.div 
            className="text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
          >
            Forecast
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="relative w-full h-2 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <motion.div 
          className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, delay: 1.7, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-0 h-full bg-muted-foreground rounded-full transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ 
            left: `${Math.min(percentage, 100)}%`,
            width: `${Math.max(0, 100 - percentage)}%`
          }}
          transition={{ duration: 1, delay: 1.7, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
};