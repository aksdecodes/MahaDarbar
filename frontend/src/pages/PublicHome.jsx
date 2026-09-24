import React from 'react';
import Hero from '../components/public/Hero';
import AnnouncementBar from '../components/public/AnnouncementBar';
import PublicAttendanceQRSection from '../components/public/PublicAttendanceQRSection';
import MenuSection from '../components/public/MenuSection';
import MessSection from '../components/public/MessSection';
import AuthenticMenuCards from '../components/public/AuthenticMenuCards';
import ReviewsSection from '../components/public/ReviewsSection';
import LocationSection from '../components/public/LocationSection';

const PublicHome = () => {
  return (
    <div>
      <Hero />
      <AnnouncementBar />
      <PublicAttendanceQRSection />
      <MenuSection />
      <MessSection />
      <AuthenticMenuCards />
      <ReviewsSection />
      <LocationSection />
    </div>
  );
};

export default PublicHome;
