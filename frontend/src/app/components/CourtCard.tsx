import { motion } from "motion/react";
import { MapPin, Star, Users, Clock } from "lucide-react";

export interface Court {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  price: number;
  image: string;
}

interface CourtCardProps {
  court: Court;
  isSelected: boolean;
  onSelect: (court: Court) => void;
}

export function CourtCard({ court, isSelected, onSelect }: CourtCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(court)}
      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all group ${
        isSelected
          ? "border-primary shadow-xl shadow-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-lg"
      }`}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md"
          >
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm">{court.rating}</span>
          </motion.div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary-foreground text-xs shadow-md">
            {court.type}
          </div>
        </div>
      </div>

      <div className="p-5 bg-card">
        <h3 className="text-lg mb-2 truncate">{court.name}</h3>
        
        <div className="flex items-start gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="text-sm line-clamp-1">{court.location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-0.5">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl text-primary">${court.price}</span>
              <span className="text-sm text-muted-foreground">/hr</span>
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
          </motion.div>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg z-10"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-primary-foreground"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              d="M13.3334 4L6.00002 11.3333L2.66669 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </motion.div>
  );
}