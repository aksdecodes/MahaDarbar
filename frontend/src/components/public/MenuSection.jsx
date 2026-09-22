import React from 'react';

const MenuSection = ({ title, subtitle, icon, children, id }) => {
  return (
    <section id={id} className="menu-section py-8 px-4 container mx-auto scroll-mt-24">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3 mb-2">
          {icon && <span className="text-3xl">{icon}</span>}
          <h2 className="text-2xl md:text-3xl font-bold font-poppins text-gray-900">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-gray-500 text-sm md:text-base ml-11">
            {subtitle}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-start">
        {children}
      </div>
    </section>
  );
};

export default MenuSection;
