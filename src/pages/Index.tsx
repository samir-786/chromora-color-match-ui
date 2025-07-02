import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Wand2, Palette, Clock, Users, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/ui/footer-section";
import { Feature } from "@/components/ui/feature-with-image-comparison";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { UserProfile } from "@/components/UserProfile";
import { useAuthContext } from "@/components/auth/AuthProvider";

const Index = () => {
  const { user } = useAuthContext();
  
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
    }, {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for professional content creators and small teams",
      features: ["Unlimited video exports", "Advanced AI color matching", "50+ cinematic presets", "4K export quality", "Batch processing", "Priority support", "Custom color profiles"],
      popular: true
    }, {
      name: "Studio",
      price: "$99",
      period: "/month",
      description: "Built for production studios and large teams",
      features: ["Everything in Pro", "Team collaboration tools", "Custom preset creation", "8K export quality", "API access", "Dedicated account manager", "On-premise deployment option"],
      popular: false
    }
  ];

  return <div className="min-h-screen bg-black text-white">
      {/* Hero Section with BackgroundBeams */}
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* BackgroundBeams Background only for hero */}
        <BackgroundBeams className="absolute inset-0 z-0" />

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-black/20">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Chromora</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Resources</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Support</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Download</a>
              {user ? (
                <UserProfile />
              ) : (
                <Link to="/login">
                  <Button className="bg-black text-white border border-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Hero Content */}
          <div className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-center bg-gradient-to-r from-teal-400 via-white to-teal-300 bg-clip-text text-transparent">
                    Turn Ordinary Footage Into Visual Masterpieces.
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed text-center">
                    Chromora lets you color grade images and videos using smart AI, cinematic presets, and advanced tone matching — no editing skills needed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/color-grading">
                      <Button className="bg-black text-white border border-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 text-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                    <Button className="bg-black text-white border border-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all duration-300">
                      <Zap className="w-4 h-4 mr-2" />
                      Correct Color Now
                    </Button>
                  </div>
                </div>

                {/* Right Interactive Image Comparison */}
                <div className="relative">
                  <Feature beforeImage="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1920&h=1080&q=80" afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&h=1080&q=80" title="AI-Powered Color Transformation" description="Drag the slider to see the dramatic difference our AI color grading makes to your footage." badgeText="Interactive Demo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with BentoGrid - Fully Black Background */}
      <div id="features" className="bg-black dark">
        <div className="text-center pt-16 pb-8 px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Explore Chromora's Features
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Discover how our advanced AI-powered color grading tools can transform your creative workflow with professional-grade features.
          </p>
        </div>
        <div className="pb-16">
          <BentoGrid items={chromoraFeatures} />
        </div>
      </div>

      {/* Pricing Section - Fully Black Background */}
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
            {plans.map((plan, index) => <Card key={index} className={`relative border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-teal-500 scale-105' : ''}`}>
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className={plan.popular ? 'opacity-100' : 'opacity-0 hover:opacity-100'} />
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>}
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
                    {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>)}
                  </ul>
                  <Button className="w-full py-3 rounded-full bg-black text-white border border-white hover:bg-gray-900 transition-colors">
                    Get Started
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>

      {/* CTA Section - Fully Black Background */}
      <div className="px-6 py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your Footage?</h2>
          <p className="text-gray-300 text-lg">
            Join thousands of creators who are already using Chromora to create stunning visuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-black text-white border border-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};

export default Index;
