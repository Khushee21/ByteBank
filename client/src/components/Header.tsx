'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

const handleLogout = async()=>{
  localStorage.removeItem("token");
  router.push("/");
}

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600" onClick={()=>router.push("/dashboard")}>ByteBank</h1>
        <nav className="space-x-6 flex items-center">
          <button
             onClick={handleLogout} 
             className="text-gray-700 hover:text-red-500 font-medium transition duration-200">
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
