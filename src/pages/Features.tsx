
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Palette, Wand2, Clock, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Features = () => {
  const features = [
    {
      icon: Wand2,
      title: "Smart AI Color Matching",
      description: "Advanced AI algorithms automatically match colors from reference images to your footage with precision and speed."
    },
    {
      icon: Palette,
      title: "Cinematic Presets",
      description: "Access professional-grade color presets inspired by blockbuster films and industry-standard looks."
    },
    {
      icon: Zap,
      title: "One-Click Processing",
      description: "Transform your footage instantly with our streamlined workflow - no complex manual adjustments needed."
    },
    {
      icon: Clock,
      title: "Real-Time Preview",
      description: "See your changes instantly with our real-time preview engine, making the editing process seamless."
    },
    {
      icon: Users,
      title: "Batch Processing",
      description: "Apply color grades to multiple clips simultaneously, saving hours of repetitive work."
    },
    {
      icon: Shield,
      title: "Professional Quality",
      description: "Export in high resolution with professional color spaces for broadcast and cinema standards."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffe5e5] to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
          Chromora
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Chromora iPad</a>
          <Link to="/features" className="text-sm font-medium text-black border-b-2 border-black">Features</Link>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Resources</a>
          <Link to="/pricing" className="text-sm font-medium hover:text-gray-600 transition-colors">Pricing</Link>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Support</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Download</a>
          <Link to="/login">
            <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Sign in
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
            Powerful Features for Perfect Color Grading
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover the advanced tools and AI-powered features that make Chromora the ultimate solution for professional color grading.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your Footage?</h2>
          <p className="text-gray-300 text-lg">
            Join thousands of creators who are already using Chromora to create stunning visuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Button>
            <Link to="/pricing">
              <Button variant="outline" className="border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
