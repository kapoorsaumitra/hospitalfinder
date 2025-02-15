import React, { useState } from "react";
import { auth } from "./firebase";
import { Home, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Sign out failed:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Home */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-semibold">Hospital Finder</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`} />
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {user?.photoURL && (
              <img
                src={user.photoURL || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
            )}
            <span className="text-gray-700 font-semibold">
              Welcome, {user?.displayName || "User"}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white shadow-lg z-40 flex flex-col items-center p-6 space-y-6 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {user?.photoURL && (
            <img
              src={user.photoURL || "/placeholder.svg"}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
          )}
          <span className="text-gray-700 font-semibold text-lg">
            Welcome, {user?.displayName || "User"}
          </span>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
