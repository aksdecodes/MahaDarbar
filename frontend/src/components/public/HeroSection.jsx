import React from 'react';
import { Phone, CheckCircle, Heart, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-section relative bg-[#FFF8F0]">
      <div className="flex flex-col md:flex-row">
        {/* Content Side */}
        <div className="w-full md:w-1/2 px-6 py-12 md:px-12 md:py-20 flex flex-col justify-center z-10">
          <div className="inline-block bg-orange-100 text-[#FF6B00] font-semibold text-xs px-3 py-1 rounded-full mb-6 w-max border border-orange-200">
            Food • Culture • Community • Together
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#8B1A1A] font-poppins mb-2">
            महाराष्ट्र दरबार
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-[#FF6B00] font-poppins mb-6">
            स्वाद महाराष्ट्राचा, मन आपुलकीचा!
          </h2>
          
          <p className="text-gray-700 text-lg mb-8 max-w-xl leading-relaxed">
            Always a warm welcome to students, working pros & families in Ameerpet! Indulge in authentic unlimited Pangat thalis, spicy Nagpur Saoji curries, and comforting daily mess meals prepared with pure traditional ingredients.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium">100% Pure Ingredients</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Hygienic & Safe</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-medium">Homely Mess Experience</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a href="/menu" className="bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors">
              Explore Menu
            </a>
            <a href="#mess" className="border-2 border-[#8B1A1A] text-[#8B1A1A] hover:bg-red-50 px-6 py-3 rounded-xl font-bold transition-colors">
              Subscribe to Tiffin
            </a>
            <a href="tel:7276826361" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
              <Phone className="w-5 h-5" />
              Call Mess Captain
            </a>
          </div>

          {/* Quote Card */}
          <div className="bg-[#8B1A1A] text-[#FFF8F0] p-4 rounded-xl inline-block max-w-sm shadow-md border-l-4 border-[#D4A843]">
            <p className="font-medium text-center">"गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!"</p>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 min-h-[400px] md:min-h-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F0] to-transparent z-10 hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] to-transparent z-10 md:hidden"></div>
          <img 
            src="/images/hero-ganpati.jpeg" 
            alt="Lord Ganesha - Maharashtra Darbar" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Live Kitchen Strip */}
      <div className="bg-[#1a1a2e] text-white py-3 px-4 text-center text-sm font-medium shadow-inner relative z-20">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
        Live Kitchen Status: Serving Fresh Pangat Bhojal & Daily Delicacies at Maharashtra Darbar 12-3 PM / 7-9 PM
      </div>

      {/* Category Chips - Quick Links */}
      <div className="border-b border-gray-200 bg-white shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4 py-4 flex gap-3 whitespace-nowrap hide-scrollbar">
          {['All Menu', 'Unlimited Thali Specials', 'Traditional Thali', 'Special Combos', 'Daily Mess Curries', 'Veg Curries & Paneer', 'Non Veg Specials', 'Dal | Rice', 'Roti, Breads & Rice'].map((cat, idx) => (
            <a key={idx} href={`#${cat.replace(/ /g, '-').toLowerCase()}`} className="bg-gray-100 hover:bg-orange-100 hover:text-[#FF6B00] text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-orange-200">
              {cat}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
