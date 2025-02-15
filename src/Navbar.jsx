import React from "react"
import { auth } from "./firebase"
import { Home, LogOut } from "lucide-react" 

const Navbar = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut()
      window.location.reload()
    } catch (error) {
      console.error("Sign out failed:", error.message)
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Home */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-semibold">Hospital Finder</span>
            </a>
          </div>

          {/* Right side - User Info and Sign Out */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user?.photoURL && (
                <img
                  src={user.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
              )}
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{user?.displayName || "User"}</span>
              </span>
            </div>
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
    </nav>
  )
}

export default Navbar

