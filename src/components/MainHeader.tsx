
import React, { useState } from 'react';
import { Plane, Menu, X, User, HelpCircle, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-sky-100 p-2 rounded-full">
              <Plane className="h-6 w-6 text-sky-600" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-sky-900">
              Optimal Flight Route Finder
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-1 text-sm">
              <User className="h-4 w-4" />
              <span>My Account</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-1 text-sm">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-1 text-sm">
              <Info className="h-4 w-4" />
              <span>About</span>
            </a>
            <Button size="sm" variant="default" className="bg-sky-600 hover:bg-sky-700">
              Sign In
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-6 pt-8">
                  <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>My Account</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-sky-600 flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>About</span>
                  </a>
                  <Button className="mt-4 w-full bg-sky-600 hover:bg-sky-700">
                    Sign In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
