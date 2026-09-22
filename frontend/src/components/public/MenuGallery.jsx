import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const menuImages = [
  { src: '/images/menu-unlimited-thali.jpeg', label: 'Unlimited Thali' },
  { src: '/images/menu-traditional-thali.jpeg', label: 'Traditional Thali' },
  { src: '/images/menu-special-combos.jpeg', label: 'Special Combos' },
  { src: '/images/menu-nonveg-thali.jpeg', label: 'Non Veg Thali' },
  { src: '/images/menu-alacarte.jpeg', label: 'Curries & Rice' }
];

const MenuGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? menuImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === menuImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="menu-gallery py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">Authentic Darbar Menu Cards</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Handcrafted printed menu cards showcasing our rich variety of dining options for dine-in & mess members.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {menuImages.map((img, idx) => (
            <div 
              key={idx} 
              className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-orange-300 transition-all group"
              onClick={() => openModal(idx)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 relative mb-3">
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x400?text=Menu+Image';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-center text-gray-800 pb-1">{img.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <button className="absolute top-4 right-4 text-white hover:text-orange-400 p-2 z-50" onClick={closeModal}>
            <X className="w-8 h-8" />
          </button>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 p-2 z-50 bg-black/50 rounded-full" onClick={prevImage}>
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img 
            src={menuImages[currentIndex].src} 
            alt={menuImages[currentIndex].label}
            className="max-h-[90vh] max-w-full object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 p-2 z-50 bg-black/50 rounded-full" onClick={nextImage}>
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full font-medium">
            {menuImages[currentIndex].label} ({currentIndex + 1} / {menuImages.length})
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuGallery;
