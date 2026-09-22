import React from 'react';
import { MapPin, Phone, Clock, Map } from 'lucide-react';

const LocationSection = () => {
  return (
    <section id="contact" className="location-section py-16 bg-orange-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">Visit Us</h2>
          <p className="text-gray-600">We're centrally located in Ameerpet. Drop by for a meal!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Info Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-[#FF6B00] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Maharashtra Darbar</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Taza Kitchen Lane, East Srinivasa Colony,<br />
                  Ameerpet, Hyderabad, Telangana 500038
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-[#FF6B00] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Get Directions
                  </a>
                  <a href="tel:7276826361" className="border border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-[#FF6B00] flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Contact Numbers</h3>
                <p className="text-gray-600 mb-1">For orders, mess enrollment, or queries:</p>
                <div className="flex flex-col gap-1 mt-2">
                  <a href="tel:7276826361" className="text-lg font-bold text-[#FF6B00] hover:underline">7276826361</a>
                  <a href="tel:9021589596" className="text-lg font-bold text-[#FF6B00] hover:underline">9021589596</a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-[#FF6B00] flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="w-full">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Hospitality Hours</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-700">Lunch</span>
                    <span className="text-gray-600 text-sm">11:30 AM - 04:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-700">Dinner</span>
                    <span className="text-gray-600 text-sm">07:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-700">Daily Mess</span>
                    <span className="text-gray-600 text-sm text-right">12:00 PM - 03:00 PM<br/>07:00 PM - 09:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-[#8B1A1A]">Sunday Special</span>
                    <span className="font-medium text-[#8B1A1A] text-sm">Pangat Bhojal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="w-full lg:w-1/2 min-h-[400px]">
            <div className="w-full h-full bg-gray-200 rounded-2xl border-4 border-white shadow-md relative overflow-hidden flex items-center justify-center">
              {/* This is a placeholder for a real iframe map */}
              <div className="text-center p-6 bg-white/80 backdrop-blur rounded-xl border border-gray-300">
                <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="font-bold text-gray-800 mb-1">Interactive Map Placeholder</h3>
                <p className="text-sm text-gray-500 mb-4">Integrate Google Maps iframe here</p>
                <a href="https://maps.google.com/?q=Maharashtra+Darbar+Ameerpet" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
