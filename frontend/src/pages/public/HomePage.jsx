import React, { useState, useEffect } from 'react';
import PublicHeader from '../../components/public/PublicHeader';
import AnnouncementBar from '../../components/public/AnnouncementBar';
import HeroSection from '../../components/public/HeroSection';
import CategoryNav from '../../components/public/CategoryNav';
import FoodCard from '../../components/public/FoodCard';
import MenuSection from '../../components/public/MenuSection';
import MessCTA from '../../components/public/MessCTA';
import MenuGallery from '../../components/public/MenuGallery';
import ReviewsSection from '../../components/public/ReviewsSection';
import LocationSection from '../../components/public/LocationSection';
import PublicFooter from '../../components/public/PublicFooter';
import CartDrawer from '../../components/public/CartDrawer';
import SearchOverlay from '../../components/public/SearchOverlay';
import announcementService from '../../services/announcementService';
import menuService from '../../services/menuService';

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await announcementService.getActiveAnnouncements();
        setAnnouncements(res || []);
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      }
    };

    const fetchMenu = async () => {
      try {
        const res = await menuService.getMenuItems();
        setMenuItems(res || []);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      }
    };

    fetchAnnouncements();
    fetchMenu();
  }, []);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(category.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getItemsByCategory = (categoryName) => {
    return menuItems.filter(item => item.category === categoryName);
  };

  return (
    <div className="home-page" style={{ scrollBehavior: 'smooth' }}>
      <AnnouncementBar announcements={announcements} />
      <PublicHeader onSearchClick={() => setSearchOpen(true)} />
      
      <main>
        <HeroSection />
        
        <CategoryNav 
          activeCategory={activeCategory} 
          onSelect={handleCategorySelect} 
          categories={['All', ...new Set(menuItems.map(item => item.category))]}
        />
        
        <MenuSection id="royal-unlimited-pangat" title="Royal Unlimited Pangat">
          {getItemsByCategory('Unlimited Thali').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </MenuSection>

        <MenuSection id="traditional-thalis" title="Traditional Thalis">
          {getItemsByCategory('Traditional Thali').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </MenuSection>

        <MenuSection id="non-veg-thalis" title="Non Veg Thalis">
          {getItemsByCategory('Non Veg').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </MenuSection>

        <MenuSection id="special-combos" title="Special Combos">
          {getItemsByCategory('Special Combos').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </MenuSection>

        <MenuSection id="curries-staples" title="Curries, Paneer & Mess Staples">
          {getItemsByCategory('Paneer').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
          {getItemsByCategory('Veg Curries').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
          {getItemsByCategory('Dal').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
          {getItemsByCategory('Rice').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
          {getItemsByCategory('Roti').map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </MenuSection>

        <MessCTA />
        <MenuGallery />
        <ReviewsSection />
        <LocationSection />
      </main>

      <PublicFooter />
      <CartDrawer />
      
      {searchOpen && (
        <SearchOverlay 
          isOpen={searchOpen} 
          onClose={() => setSearchOpen(false)} 
          menuItems={menuItems} 
        />
      )}
    </div>
  );
};

export default HomePage;
