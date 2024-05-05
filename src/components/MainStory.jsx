import React from 'react';
import KissingGif from '../../public/images/kissing-gif-1.gif';

const MainStory = () => {
  return (
    <article className="bg-white shadow-lg rounded-lg p-6">
      <img src={KissingGif} alt="Couple Kissing" className="rounded-t-lg w-full" />
      <h2 className="text-2xl font-bold mb-2">Love in the Time of Quarantine</h2>
      <p className="text-gray-700">
        Amidst the global pandemic, two souls found solace and strength in each other's company...
      </p>
    </article>
  );
};

export default MainStory;