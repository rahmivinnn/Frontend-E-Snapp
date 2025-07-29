import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Receipt, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface BillingHistoryChartProps {
  data: Array<{ period: string; amount: number }>;
  change: string;
  estimatedCurrent: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 rounded-lg shadow-md border border-border">
        <p className="text-sm font-medium">{`${label}: ${payload[0].value}€`}</p>
      </div>
    );
  }
  return null;
};

export const BillingHistoryChart = ({ data, change, estimatedCurrent }: BillingHistoryChartProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          <Receipt size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
        </div>
        <div className="bg-primary-light text-primary px-2 py-1 rounded-lg text-sm font-medium">
          {change}
        </div>
      </motion.div>
      
      <motion.div 
        className="flex items-baseline gap-2 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="text-3xl font-bold text-foreground">{estimatedCurrent}€</div>
        <div className="text-sm text-muted-foreground">estimated final bill 80€</div>
      </motion.div>
      
      <motion.div 
        className="h-32"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            <Bar 
              dataKey="amount" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};