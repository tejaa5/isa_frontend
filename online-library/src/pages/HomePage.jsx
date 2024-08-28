import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/src/image/biblioteka.avif')" }}>
      <Navbar />
    </div>
  );
};

export default HomePage;
