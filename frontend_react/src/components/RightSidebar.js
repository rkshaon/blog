import React from 'react';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <aside className="p-4 w-full h-full border">
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <div>
        <h4>Author</h4>
      </div>
      <div>
        <h4>Tags</h4>
      </div>
    </aside>
  );
};

export default RightSidebar;
