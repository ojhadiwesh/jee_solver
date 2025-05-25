import React from 'react';
import Link from 'next/link';

const FooterSection = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="font-semibold text-white mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const sections = {
    Subjects: [
      { name: 'Physics', href: '/physics' },
      { name: 'Chemistry', href: '/chemistry' },
      { name: 'Mathematics', href: '/maths' },
      { name: 'Mock Tests', href: '/mock-tests' },
      { name: 'Previous Year Papers', href: '/previous-papers' }
    ],
    Resources: [
      { name: 'Formula Sheets', href: '/resources/formula-sheets' },
      { name: 'Study Planner', href: '/resources/study-planner' },
      { name: 'Performance Analytics', href: '/resources/analytics' },
      { name: 'Doubt Forum', href: '/resources/forum' },
      { name: 'JEE Syllabus', href: '/resources/syllabus' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  return (
    <footer className="bg-[#1a2234] text-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              JEESolver
            </Link>
            <p className="text-gray-400 mb-6">
              Focused problem-solving platform for IIT JEE aspirants.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(sections).map(([title, links]) => (
            <FooterSection key={title} title={title} links={links} />
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} JEESolver. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 