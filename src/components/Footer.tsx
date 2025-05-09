
import React from 'react';
import { Plane, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-sky-700 p-1.5 rounded-full">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Optimal Flight Route</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Finding the most efficient flight routes across India, 
              optimized for your preferences - time, cost, or convenience.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Route Optimization</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Price Comparison</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Interactive Map</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Flight Alerts</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span>123 Aviation Lane, Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-sky-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-sky-400" />
                <span>contact@flightroute.in</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 Optimal Flight Route Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
