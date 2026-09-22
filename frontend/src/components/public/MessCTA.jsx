import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const MessCTA = () => {
  return (
    <section id="mess" className="mess-cta bg-[#8B1A1A] text-[#FFF8F0] relative overflow-hidden py-16 scroll-mt-20">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #FFF8F0 1px, transparent 1px)' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left Text */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-white">
              Looking for a Daily Mess or Office Tiffin in Ameerpet?
            </h2>
            <p className="text-orange-100 text-lg mb-8 leading-relaxed max-w-2xl">
              Never compromise on taste, health, or hygiene. Maharashtra Darbar offers customized 15-day and 30-day meal plans for software professionals, coaching students, and bachelors around Ameerpet, SR Nagar, and Punjagutta.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-[#D4A843] font-bold text-2xl mb-1">₹60 / meal</div>
                <div className="font-medium">Student Mess Pack</div>
                <div className="text-sm text-gray-300 mt-1">Affordable & fulfilling</div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-[#D4A843] font-bold text-2xl mb-1">₹2,800 / mo</div>
                <div className="font-medium">Ladies Kitchen Plus</div>
                <div className="text-sm text-gray-300 mt-1">Premium curries</div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-[#D4A843] font-bold text-2xl mb-1">Free Doorstep</div>
                <div className="font-medium">Within 2.5 km</div>
                <div className="text-sm text-gray-300 mt-1">Hot & fresh delivery</div>
              </div>
            </div>
          </div>

          {/* Right CTA Box */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl p-6 shadow-2xl text-gray-900 text-center">
              <h3 className="text-xl font-bold mb-2">Direct Mess Enrollment</h3>
              <p className="text-gray-500 text-sm mb-6">Contact us to customize your meal plan today!</p>
              
              <a href="tel:7276826361" className="flex items-center justify-center gap-2 w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl mb-4 transition-colors">
                <Phone className="w-5 h-5" />
                Call: 7276826361
              </a>
              
              <a href="https://wa.me/919021589596" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                <MessageCircle className="w-5 h-5" />
                WhatsApp: 9021589596
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MessCTA;
