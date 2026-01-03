import { motion } from "motion/react";

export function CourtCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border-2 border-border">
      <div className="relative h-48 bg-muted animate-pulse" />
      <div className="p-4 bg-card space-y-3">
        <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-muted rounded-full animate-pulse w-24" />
          <div className="h-6 bg-muted rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
}

export function TimeSlotSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          className="text-muted-foreground"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-xl mb-2">No Results Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
    </motion.div>
  );
}
