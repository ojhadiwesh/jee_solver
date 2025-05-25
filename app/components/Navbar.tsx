'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

interface NavbarProps {
  preventNavigation?: boolean;
}

const Navbar = ({ preventNavigation }: NavbarProps = {}) => {
  const { data: session } = useSession();
  
  const navItems = [
    { name: 'Problems', href: '/problems' },
    { name: 'Physics', href: '/physics' },
    { name: 'Chemistry', href: '/chemistry' },
    { name: 'Mathematics', href: '/maths' },
    { name: 'Mock Tests', href: '/mock-tests' },
    { name: 'Analytics', href: '/analytics' },
  ];

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    if (preventNavigation) {
      e.preventDefault();
      if (window.confirm('You have an active test. Are you sure you want to leave? Your progress will be lost.')) {
        window.location.href = href;
      }
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    if (preventNavigation) {
      e.preventDefault();
      if (window.confirm('You have an active test. Are you sure you want to sign out? Your progress will be lost.')) {
        await signOut();
      }
    } else {
      await signOut();
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white">
      <Link 
        href="/" 
        className="text-[#2563EB] text-2xl font-bold"
        onClick={(e) => handleNavigation(e, '/')}
      >
        JEESolver
      </Link>
      
      <div className="flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-600 hover:text-[#2563EB] transition-colors"
            onClick={(e) => handleNavigation(e, item.href)}
          >
            {item.name}
          </Link>
        ))}
        
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, {session.user?.name || session.user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-[#2563EB] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-[#2563EB] hover:text-blue-700 transition-colors"
              onClick={(e) => handleNavigation(e, '/login')}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-[#2563EB] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={(e) => handleNavigation(e, '/signup')}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 