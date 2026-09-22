import React from 'react';
import { Star, Users, MapPin } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Tanmay Kulkarni",
      text: "Finding genuine Maharashtrian food in Hyderabad felt impossible until I found Maharashtra Darbar in Ameerpet! The Roti-Bhaji-Dal Combo gave me goosebumps of home. Retold all my friends and now it's our daily mess.",
      rating: 5,
      type: "Student"
    },
    {
      name: "Prashant Deshpande",
      text: "The Kaju Paneer Combo and Deluxe Thali with Paneer Butter Masala are just brilliant in Ameerpet. Hospitality is like family. Easy going with good quality.",
      rating: 5,
      type: "Family Dine-in"
    },
    {
      name: "Rohit Sharma",
      text: "As an IT professional staying away from home, finding a reliable and hygienic tiffin service was a struggle. Their 30-day mess plan is a lifesaver. Consistent taste and on-time delivery!",
      rating: 4,
      type: "Working Professional"
    },
    {
      name: "Ananya Patil",
      text: "Unbeatable prices for the quantity and quality they offer. The Student Mess Pack fits perfectly into my monthly budget without compromising on taste. The puran poli is a must-try!",
      rating: 5,
      type: "Coaching Student"
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  return (
    <section className="reviews-section py-16 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Reviews Side */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[#FF6B00] mb-2">
                <Star className="fill-[#FF6B00]" />
                <h2 className="text-3xl font-bold font-poppins text-gray-900">Loved by Students & Families Alike</h2>
              </div>
              <p className="text-gray-500">Real voices from Maharashtra Darbar's growing community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 italic leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <span className="font-bold text-gray-900">{review.name}</span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">{review.type}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 text-gray-700 bg-orange-50 w-max px-4 py-2 rounded-full border border-orange-100">
              <Users className="text-[#FF6B00] w-5 h-5" />
              <span className="font-medium">Over 1,200+ monthly customers served happily</span>
            </div>
          </div>

          {/* Location Card Side */}
          <div className="lg:w-1/3">
            <div className="bg-[#1a1a2e] rounded-2xl p-8 text-white h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MapPin className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-poppins mb-2">Taza Kitchen Lane, Ameerpet</h3>
                <h4 className="text-[#D4A843] font-medium mb-6">Maharashtra Darbar Restaurant & Mess</h4>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  East Srinivasa Colony, Ameerpet, Hyderabad, Telangana 500038
                </p>

                <a href="#contact" className="inline-block border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-colors px-6 py-2 rounded-full font-medium">
                  View Full Details
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
