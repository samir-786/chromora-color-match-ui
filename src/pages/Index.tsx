
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffe5e5] to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-black">Chromora</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Chromora iPad</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Resources</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Support</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Download</a>
          <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Sign in
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                Turn Ordinary Footage Into Visual Masterpieces.
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Chromora lets you color grade images and videos using smart AI, cinematic presets, and advanced tone matching — no editing skills needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="outline" className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Correct Color Now
                </Button>
              </div>
            </div>

            {/* Right Image Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
                {/* Browser-like header */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white px-3 py-1 rounded text-xs text-gray-600">
                      chromora.ai
                    </div>
                  </div>
                </div>

                {/* Main image area */}
                <div className="relative bg-gradient-to-br from-green-100 to-blue-100 h-80 flex items-center justify-center">
                  {/* Simulated image with couple */}
                  <div className="w-full h-full bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 relative overflow-hidden">
                    {/* Simulated landscape scene */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-green-200 to-green-300"></div>
                    
                    {/* Before/After labels */}
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs rounded-md shadow-lg font-medium">
                      Before
                    </div>
                    <div className="absolute top-4 left-20 bg-yellow-400 text-black px-3 py-1 text-xs rounded-md shadow-lg font-medium">
                      After
                    </div>

                    {/* Color Reference panel */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded border-2 border-yellow-400 mb-2"></div>
                      <div className="text-xs text-center font-medium text-gray-700">Color Reference</div>
                    </div>

                    {/* Divider line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white opacity-75"></div>
                  </div>
                </div>

                {/* Bottom toolbar */}
                <div className="bg-gray-50 px-4 py-3 flex justify-center space-x-2">
                  <div className="w-8 h-6 bg-green-400 rounded"></div>
                  <div className="w-8 h-6 bg-gradient-to-r from-orange-300 to-yellow-300 rounded"></div>
                  <div className="w-8 h-6 bg-gradient-to-r from-purple-300 to-blue-300 rounded"></div>
                  <div className="w-8 h-6 bg-gradient-to-r from-red-300 to-pink-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
