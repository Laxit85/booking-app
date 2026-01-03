import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoadComplete: () => void;
}

export function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Logo */}
        <div
          className="mb-8"
        >
          <div
            className="w-20 h-20 mx-auto rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary-foreground"
            >
              <rect
                x="4"
                y="4"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="13"
                y="4"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="4"
                y="13"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="13"
                y="13"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          
          <div
          >
            <h2 className="mt-6 text-2xl">CourtBook</h2>
            <p className="text-sm text-muted-foreground mt-2">Your Sports Booking Platform</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-64 mx-auto"
        >
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          
          <p
            className="text-xs text-muted-foreground mt-4"
          >
            {progress < 50 ? "Loading courts..." : progress < 80 ? "Preparing time slots..." : "Almost ready..."}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}