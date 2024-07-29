import React from 'react';

function Header() {
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">ChatApp</h1>
      <div className="rounded-full bg-gray-200 p-2">
        <span className="material-icons">account_circle</span>
      </div>
    </div>
  );
}

export default Header;
