import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainStory from './components/MainStory';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <Navbar />
        <div className="flex flex-wrap">
          <main className="w-full md:w-2/3 p-4">
            <MainStory />
          </main>
          <aside className="w-full md:w-1/3 p-4">
            <Sidebar />
          </aside>
        </div>
      </div>
    </Router>
  );
}

export default App;