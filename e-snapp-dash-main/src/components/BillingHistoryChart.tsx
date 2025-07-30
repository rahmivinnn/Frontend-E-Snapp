import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
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
        <p className="text-xs text-muted-foreground">estimated kWh: 62.0</p>
      </div>
    );
  }
  return null;
};

export const BillingHistoryChart = ({ data, change, estimatedCurrent }: BillingHistoryChartProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm mt-4">
      <motion.div 
        className="flex items-center justify-between mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-foreground">Billing History</h3>
        <div className="bg-primary-light/30 text-primary px-2 py-0.5 rounded-md text-xs font-medium">
          {change}
        </div>
      </motion.div>
      
      <motion.div 
        className="h-28"
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
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.period === "Oct" ? "hsl(var(--warning))" : "hsl(var(--primary))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};