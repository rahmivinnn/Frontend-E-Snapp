import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface LiveUsageChartProps {
  currentUsage: number;
  data: { time: string; value: number }[];
}

export const LiveUsageChart = ({ currentUsage, data }: LiveUsageChartProps) => {
  return (
    <motion.div 
      className="bg-blue-50 rounded-2xl p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-sm font-semibold text-foreground">Live Usage</h3>
      </motion.div>
      
      <motion.div 
        className="mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="text-xl font-bold text-foreground"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {currentUsage} W
        </motion.div>
        <div className="text-xs text-muted-foreground">Updated just now</div>
      </motion.div>
      
      <motion.div 
        className="h-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="natural" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};