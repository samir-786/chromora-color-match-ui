
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Wand2, Palette, Clock, Users, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/ui/footer-section";
import { Feature } from "@/components/ui/feature-with-image-comparison";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Waves } from "@/components/ui/waves-background";

const Index = () => {
  // Features data for the Chromora color grading tool
  const timelineData = [
    {
      id: 1,
      title: "AI Color Matching",
      date: "Core Feature",
      content: "Advanced AI algorithms automatically match colors from reference images to your footage with precision and speed.",
      category: "AI Technology",
      icon: Wand2,
      relatedIds: [2, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 2,
      title: "Cinematic Presets",
      date: "Professional",
      content: "Access professional-grade color presets inspired by blockbuster films and industry-standard looks.",
      category: "Presets",
      icon: Palette,
      relatedIds: [1, 4],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 3,
      title: "One-Click Processing",
      date: "Workflow",
      content: "Transform your footage instantly with our streamlined workflow - no complex manual adjustments needed.",
      category: "Processing",
      icon: Zap,
      relatedIds: [1, 5],
      status: "completed" as const,
      energy: 85,
    },
    {
      id: 4,
      title: "Real-Time Preview",
      date: "Live Preview",
      content: "See your changes instantly with our real-time preview engine, making the editing process seamless.",
      category: "Preview",
      icon: Clock,
      relatedIds: [2, 6],
      status: "in-progress" as const,
      energy: 80,
    },
    {
      id: 5,
      title: "Batch Processing",
      date: "Efficiency",
      content: "Apply color grades to multiple clips simultaneously, saving hours of repetitive work.",
      category: "Batch",
      icon: Users,
      relatedIds: [3, 6],
      status: "in-progress" as const,
      energy: 75,
    },
    {
      id: 6,
      title: "Professional Export",
      date: "Output",
      content: "Export in high resolution with professional color spaces for broadcast and cinema standards.",
      category: "Export",
      icon: Shield,
      relatedIds: [4, 5],
      status: "pending" as const,
      energy: 70,
    },
  ];

  const plans = [{
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
  }];

  return <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <Waves
        lineColor="rgba(20, 184, 166, 0.4)"
        backgroundColor="transparent"
        waveSpeedX={0.015}
        waveSpeedY={0.008}
        waveAmpX={35}
        waveAmpY={18}
        friction={0.92}
        tension={0.008}
        maxCursorMove={80}
        xGap={15}
        yGap={40}
        className="fixed inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-black/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-white">Chromora</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Support</a>
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Download</a>
            <Link to="/login">
              <Button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors">
                Sign in
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button variant="outline" className="border-2 border-teal-500 text-teal-400 px-8 py-3 rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300">
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

        {/* Features Section - Radial Orbital Timeline */}
        <div id="features" className="bg-black/50 backdrop-blur-sm">
          <div className="text-center pt-16 pb-8 px-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Chromora's Features
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Click on any feature to discover how our advanced AI-powered color grading tools can transform your creative workflow.
            </p>
          </div>
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="px-6 py-16 bg-black/50 backdrop-blur-sm">
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
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    className={plan.popular ? 'opacity-100' : 'opacity-0 hover:opacity-100'}
                  />
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
                    <Button className={`w-full py-3 rounded-full transition-colors ${plan.popular ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700' : 'border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white'}`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 py-16 bg-black/70 backdrop-blur-sm text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to Transform Your Footage?</h2>
            <p className="text-gray-300 text-lg">
              Join thousands of creators who are already using Chromora to create stunning visuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full hover:from-teal-600 hover:to-teal-700 transition-colors">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>;
};
export default Index;
