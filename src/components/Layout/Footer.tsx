import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Twitter, Linkedin, Github, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark-900 to-dark-800 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-2.5 rounded-xl shadow-glow">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent-gold animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CallClosing AI
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Multiply your calls, maximize your closings. The AI-powered calling platform 
              that transforms real estate professionals into closing machines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-colors duration-300">
              Security
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-purple transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          © 2025 CallClosing AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}