import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

interface LiveUsageChartProps {
  currentUsage: number;
  data: { time: string; value: number }[];
}

export const LiveUsageChart = ({ currentUsage, data }: LiveUsageChartProps) => {
  return (
    <motion.div 
      className="bg-primary-muted rounded-2xl p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Zap size={20} className="text-primary animate-pulse" />
        <h3 className="text-lg font-semibold text-foreground">Live Usage</h3>
      </motion.div>
      
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="text-3xl font-bold text-foreground"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {currentUsage} W
        </motion.div>
        <div className="text-sm text-muted-foreground">Updated just now</div>
      </motion.div>
      
      <motion.div 
        className="h-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={false}
              strokeDasharray="0"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};