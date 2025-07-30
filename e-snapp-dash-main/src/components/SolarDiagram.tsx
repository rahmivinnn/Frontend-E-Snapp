import { Sun, Car, Battery, Home } from "lucide-react";
import { motion } from "framer-motion";

interface SolarDiagramProps {
  solarProduction: number;
  homeConsumption: number;
  evCharging: number;
  batteryLevel: number;
  batteryCapacity: number;
  gridDraw: number;
}

export const SolarDiagram = ({
  solarProduction,
  homeConsumption,
  evCharging,
  batteryLevel,
  batteryCapacity,
  gridDraw
}: SolarDiagramProps) => {
  const batteryPercentage = (batteryLevel / batteryCapacity) * 100;

  return (
    <motion.div 
      className="bg-blue-50 rounded-2xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background illustration area */}
      <div className="relative h-40 mb-2">
        {/* House */}
        <motion.div 
          className="absolute top-8 right-8 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="w-16 h-12 bg-card rounded-lg border-2 border-primary/20 relative flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Home size={20} className="text-primary" />
            {/* Roof for solar panel */}
            <motion.div 
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-primary rounded-t-lg flex items-center justify-center"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="grid grid-cols-3 gap-px">
                {[...Array(6)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-1 h-1 bg-primary-foreground rounded-full opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.2, delay: 0.3 + (i * 0.1) }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="text-xs mt-2 text-destructive font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Consumo casa<br />{homeConsumption} kW
          </motion.div>
        </motion.div>

        {/* Sun */}
        <motion.div 
          className="absolute top-2 left-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sun size={32} className="text-warning" />
          </motion.div>
          <motion.div 
            className="text-xs mt-2 text-warning font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Produzione<br />solare {solarProduction} kW
          </motion.div>
        </motion.div>

        {/* EV Car */}
        <motion.div 
          className="absolute bottom-8 left-8 flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="w-12 h-8 bg-primary rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Car size={16} className="text-primary-foreground" />
          </motion.div>
          <motion.div 
            className="text-xs mt-2 text-warning font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Ricarica EV<br />{evCharging} kW
          </motion.div>
        </motion.div>

        {/* Battery */}
        <motion.div 
          className="absolute bottom-8 right-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="w-8 h-12 bg-card border-2 border-primary rounded-lg relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-success"
              initial={{ height: "0%" }}
              animate={{ height: `${batteryPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <Battery size={16} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground" />
          </motion.div>
          <motion.div 
            className="text-xs mt-2 text-success font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Batteria<br />{batteryLevel} kW/{batteryCapacity} kW
          </motion.div>
        </motion.div>

        {/* Grid Connection */}
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="w-6 h-16 bg-foreground rounded-full relative"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            ></motion.div>
            <motion.div 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-foreground"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            ></motion.div>
            <motion.div 
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="text-xs mt-2 text-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            Prelievo<br />da rete<br />{gridDraw} W
          </motion.div>
        </motion.div>

        {/* Energy flow lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Solar to house */}
          <motion.path
            d="M 80 40 Q 120 20 160 40"
            stroke="hsl(var(--warning))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "loop" }}
          />
          {/* Solar to EV */}
          <motion.path
            d="M 60 60 Q 40 100 60 140"
            stroke="hsl(var(--warning))"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
      </div>
    </motion.div>
  );
};