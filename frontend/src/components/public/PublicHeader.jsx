import React, { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Flag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useUserAuth } from '../../contexts/UserAuthContext';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useUserAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="pub-header sticky top-0 z-50 bg-white shadow-sm font-sans">
      <div className="bg-orange-50 text-xs text-center py-1 text-gray-700">
        Call us: 7276826361 / 9021589596 | Open Daily: 12-3 PM & 7-9:30 PM
      </div>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2" onClick={toggleMobileMenu}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <a href="/" className="flex items-center gap-2 text-orange-600">
            <Flag className="w-6 h-6" />
            <span className="font-bold text-xl tracking-tight hidden sm:block font-poppins">Maharashtra Darbar</span>
            <span className="font-bold text-xl tracking-tight sm:hidden font-poppins">MD</span>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-orange-600 font-medium">Home</a>
          <a href="#mess" className="text-gray-600 hover:text-orange-600 font-medium">Mess</a>
          <a href="#restaurant" className="text-gray-600 hover:text-orange-600 font-medium">Restaurant</a>
          <a href="/menu" className="text-gray-600 hover:text-orange-600 font-medium">Menu</a>
          <a href="#thalis" className="text-gray-600 hover:text-orange-600 font-medium">Thalis</a>
          <a href="#about" className="text-gray-600 hover:text-orange-600 font-medium">About Us</a>
          <a href="#contact" className="text-gray-600 hover:text-orange-600 font-medium">Contact</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-orange-600">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700">{user.name}</span>
                <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
              </div>
            ) : (
              <a href="#login" className="flex items-center gap-1 text-gray-700 hover:text-orange-600">
                <User className="w-5 h-5" />
                <span>Login</span>
              </a>
            )}
          </div>

          <button 
            className="p-2 text-gray-600 hover:text-orange-600 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white w-64 h-full flex flex-col shadow-xl">
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-bold text-orange-600 font-poppins">Menu</span>
              <button onClick={toggleMobileMenu}><X className="w-6 h-6 text-gray-600" /></button>
            </div>
            <nav className="flex flex-col p-4 gap-4">
              <a href="#" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>Home</a>
              <a href="#mess" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>Mess</a>
              <a href="/menu" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>Menu</a>
              <a href="#thalis" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>Thalis</a>
              <a href="#about" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>About Us</a>
              <a href="#contact" className="text-gray-800 font-medium" onClick={toggleMobileMenu}>Contact</a>
              <hr />
              {user ? (
                <button onClick={() => { logout(); toggleMobileMenu(); }} className="text-left text-red-600 font-medium">Logout</button>
              ) : (
                <a href="#login" className="text-gray-800 font-medium flex items-center gap-2" onClick={toggleMobileMenu}>
                  <User className="w-5 h-5" /> Login
                </a>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
