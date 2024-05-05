import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">Couples' Tales</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
          <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;