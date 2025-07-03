import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Wand2, Palette, Clock, Users, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";


const Index = () => {
  // Features data for Chromora's BentoGrid
  const chromoraFeatures: BentoItem[] = [
    {
      title: "AI Color Matching",
      meta: "Advanced AI",
      description: "Automatically match colors from reference images to your footage with precision and speed",
      icon: <Wand2 className="w-4 h-4 text-teal-400" />,
      status: "Live",
      tags: ["AI", "Precision", "Speed"],
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: "Cinematic Presets",
      meta: "50+ Presets",
      description: "Professional-grade color presets inspired by blockbuster films and industry standards",
      icon: <Palette className="w-4 h-4 text-purple-400" />,
      status: "Updated",
      tags: ["Professional", "Cinema"],
    },
    {
      title: "One-Click Processing",
      meta: "Instant",
      description: "Transform your footage instantly with streamlined workflow - no complex adjustments needed",
      icon: <Zap className="w-4 h-4 text-yellow-400" />,
      tags: ["Workflow", "Instant"],
      colSpan: 2,
    },
    {
      title: "Real-Time Preview",
      meta: "Live Engine",
      description: "See your changes instantly with our real-time preview engine for seamless editing",
      icon: <Clock className="w-4 h-4 text-blue-400" />,
      status: "Beta",
      tags: ["Preview", "Real-time"],
    },
    {
      title: "Batch Processing",
      meta: "Multi-clip",
      description: "Apply color grades to multiple clips simultaneously, saving hours of work",
      icon: <Users className="w-4 h-4 text-green-400" />,
      tags: ["Efficiency", "Batch"],
    },
    {
      title: "Professional Export",
      meta: "8K Ready",
      description: "Export in high resolution with professional color spaces for broadcast standards",
      icon: <Shield className="w-4 h-4 text-red-400" />,
      status: "Pro",
      tags: ["Export", "Professional"],
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individual creators just getting started",
      features: ["Up to 50 video exports per month", "Basic AI color matching", "5 cinematic presets", "720p export quality", "Email support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for professional content creators and small teams",
      features: ["Unlimited video exports", "Advanced AI color matching", "50+ cinematic presets", "4K export quality", "Batch processing", "Priority support", "Custom color profiles"],
      popular: true
    },
    {
      name: "Studio",
      price: "$99",
      period: "/month",
      description: "Built for production studios and large teams",
      features: ["Everything in Pro", "Team collaboration tools", "Custom preset creation", "8K export quality", "API access", "Dedicated account manager", "On-premise deployment option"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-black">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Chromora</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Support</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Download</a>
            
          </div>
        </nav>

        {/* Hero Content */}
        <div className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
              {/* Left Content */}
              <div className="space-y-8">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 bg-clip-text text-transparent">
                    Turn Ordinary Footage
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 bg-clip-text text-transparent">
                    Into Visual
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 bg-clip-text text-transparent">
                    Masterpieces.
                  </span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                  Chromora lets you color grade images and videos using smart AI, cinematic presets, and advanced tone matching — no editing skills needed.
                </p>
                <div className="flex gap-4">
                  <Link to="/color-grading">
                    <Button className="bg-transparent text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Get Started
                    </Button>
                  </Link>
                  <Button className="bg-transparent text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Correct Color Now
                  </Button>
                </div>
              </div>

              {/* Right Image/Mockup */}
              <div className="relative">
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 shadow-2xl">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">Before</span>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                          <div className="text-black text-sm mb-2">Dashboard Overview</div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-teal-100 p-3 rounded">
                              <div className="text-teal-800 font-bold text-lg">479K</div>
                              <div className="text-teal-600 text-xs">Revenue</div>
                            </div>
                            <div className="bg-blue-100 p-3 rounded">
                              <div className="text-blue-800 font-bold text-lg">17min</div>
                              <div className="text-blue-600 text-xs">Avg Session</div>
                            </div>
                            <div className="bg-green-100 p-3 rounded">
                              <div className="text-green-800 font-bold text-lg">2prs</div>
                              <div className="text-green-600 text-xs">Conversion</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-black text-sm">Performance</span>
                            <span className="text-gray-500 text-xs">Last 30 days</span>
                          </div>
                          <div className="h-16 bg-gradient-to-r from-teal-200 to-blue-200 rounded relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-teal-400 to-blue-400 rounded-b"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-black py-16">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Explore Chromora's Features
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover how our advanced AI-powered color grading tools can transform your creative workflow with professional-grade features.
          </p>
        </div>
        <div className="pb-8">
          <BentoGrid items={chromoraFeatures} />
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="px-6 py-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Choose the perfect plan for your creative needs. All plans include our core AI color grading features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full py-3 rounded-full bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors">
                    Get Started
                  </Button>
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
            <Button className="bg-transparent text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;