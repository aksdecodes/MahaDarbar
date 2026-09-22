import React from 'react';

const PublicFooter = () => {
  return (
    <footer className="pub-footer bg-[#0f172a] text-gray-300 pt-16 pb-6 border-t-4 border-[#FF6B00]">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <a href="/" className="flex items-center gap-2 text-white mb-4">
              <span className="font-bold text-2xl tracking-tight font-poppins text-[#FF6B00]">Maharashtra Darbar</span>
            </a>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Bringing the taste, legacy of Maharashtrian to Ameerpet. Authentic thalis, flavorful curries, and daily mess services.
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-2">Taza Kitchen Lane, East Srinivasa Colony, Ameerpet, Hyderabad</p>
              <p>📞 7276826361</p>
              <p>📞 9021589596</p>
            </div>
          </div>

          {/* Mess Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 font-poppins">Mess & Tiffins</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#mess" className="hover:text-[#FF6B00] transition-colors">Daily mess menu</a></li>
              <li><a href="#mess" className="hover:text-[#FF6B00] transition-colors">15-day/30-day plans</a></li>
              <li><a href="#mess" className="hover:text-[#FF6B00] transition-colors">Student/Office tiffin</a></li>
              <li><a href="#mess" className="hover:text-[#FF6B00] transition-colors">Free delivery</a></li>
              <li><a href="#mess" className="hover:text-[#FF6B00] transition-colors">Monthly mess enrollment</a></li>
            </ul>
          </div>

          {/* Nav Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 font-poppins">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/menu" className="hover:text-[#FF6B00] transition-colors">Entire Darbar Menu</a></li>
              <li><a href="/menu" className="hover:text-[#FF6B00] transition-colors">Lunch/Dinner Specials</a></li>
              <li><a href="/menu" className="hover:text-[#FF6B00] transition-colors">Today's Mess Thali</a></li>
              <li><a href="/menu" className="hover:text-[#FF6B00] transition-colors">Paneer Specialties</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00] transition-colors">Culture Heritage & Story</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00] transition-colors">Community Corners</a></li>
            </ul>
          </div>

          {/* Hours Col */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 font-poppins">Hospitality Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-gray-700 pb-1">
                <span>Lunch</span> <span className="text-gray-400">11:30 AM - 04:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-1">
                <span>Dinner</span> <span className="text-gray-400">07:00 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-1">
                <span>Mess (Mon-Sat)</span> <span className="text-gray-400 text-right">12 PM - 3 PM<br/>7 PM - 9:30 PM</span>
              </li>
              <li className="flex justify-between text-[#FF6B00]">
                <span>Sunday</span> <span>Pangat Special</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Maharashtra Darbar. Authentic Maharashtrian Culinary Heritage. All rights reserved.</p>
          <a href="/admin/login" className="hover:text-gray-300 transition-colors">Admin Portal</a>
        </div>

      </div>
    </footer>
  );
};

export default PublicFooter;
