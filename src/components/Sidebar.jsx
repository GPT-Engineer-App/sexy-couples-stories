import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-3">Recent Stories</h3>
      <ul className="space-y-2">
        <li><a href="#" className="text-blue-500 hover:text-blue-700">A Journey Together</a></li>
        <li><a href="#" className="text-blue-500 hover:text-blue-700">Challenges and Triumphs</a></li>
        <li><a href="#" className="text-blue-500 hover:text-blue-700">Anniversary Reflections</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;