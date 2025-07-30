import { useIsPortrait } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

export function PortraitWarning() {
  const isPortrait = useIsPortrait();

  if (isPortrait) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 text-white p-4"
    >
      <div className="text-center max-w-xs">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Putar Perangkat Anda</h2>
        <p className="text-sm text-gray-300">
          Aplikasi ini dirancang untuk tampilan portrait. Silakan putar perangkat Anda untuk pengalaman terbaik.
        </p>
      </div>
    </motion.div>
  );
}