import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-blue-600">RealEstatePro</h1>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
