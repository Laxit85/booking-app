import { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Menu, User, LogOut, Settings } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ 
  isDark, 
  toggleTheme, 
  onNavigate, 
  currentPage = "home",
  isLoggedIn = false,
  userName,
  onLogout,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setShowMenu(false);
    setShowAccountMenu(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary-foreground"
            >
              <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg">CourtBook</h1>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick("home")}
            className={`text-sm transition-colors relative group ${
              currentPage === "home" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
              currentPage === "home" ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
          <button 
            onClick={() => handleNavClick("courts")}
            className={`text-sm transition-colors relative group ${
              currentPage === "courts" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Courts
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
              currentPage === "courts" ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </button>
          {isLoggedIn && (
            <>
              <button 
                onClick={() => handleNavClick("bookings")}
                className={`text-sm transition-colors relative group ${
                  currentPage === "bookings" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                My Bookings
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  currentPage === "bookings" ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
              <button 
                onClick={() => handleNavClick("profile")}
                className={`text-sm transition-colors relative group ${
                  currentPage === "profile" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                Profile
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                  currentPage === "profile" ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full bg-muted flex items-center justify-between px-1.5 overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              initial={false}
              animate={{ x: isDark ? "50%" : "0%" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <div className="relative z-10 flex items-center justify-between w-full px-0.5">
              <motion.div
                animate={{ scale: isDark ? 0.7 : 1, opacity: isDark ? 0.5 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-4 h-4 text-primary-foreground" />
              </motion.div>
              <motion.div
                animate={{ scale: isDark ? 1 : 0.7, opacity: isDark ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            </div>
          </motion.button>

          {/* Account Button (Desktop) */}
          {isLoggedIn ? (
            <div className="hidden md:block relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm">{userName?.split(" ")[0]}</span>
              </motion.button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => handleNavClick("profile")}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleNavClick("bookings")}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    My Bookings
                  </button>
                  <div className="border-t border-border" />
                  <button
                    onClick={() => {
                      setShowAccountMenu(false);
                      onLogout?.();
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent transition-colors flex items-center gap-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick("auth")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Login</span>
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors" 
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <button 
              onClick={() => handleNavClick("home")}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentPage === "home" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("courts")}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentPage === "courts" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              Courts
            </button>
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => handleNavClick("bookings")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === "bookings" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  My Bookings
                </button>
                <button 
                  onClick={() => handleNavClick("profile")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  Profile
                </button>
                <div className="border-t border-border my-2" />
                <button 
                  onClick={() => {
                    setShowMenu(false);
                    onLogout?.();
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick("auth")}
                className="block w-full text-left px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
