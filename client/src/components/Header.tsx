'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ByteBank</h1>

        <nav className="space-x-6">
          <Link
            href="/login"
            className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/logout"
            className="text-gray-700 hover:text-red-500 font-medium transition duration-200"
          >
            Log Out
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
