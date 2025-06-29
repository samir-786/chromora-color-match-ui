import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Zap, Wand2, Palette, Clock, Users, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/ui/footer-section";
import { Feature } from "@/components/ui/feature-with-image-comparison";
import { GlowingEffect } from "@/components/ui/glowing-effect";
const Index = () => {
  const features = [{
    icon: Wand2,
    title: "Smart AI Color Matching",
    description: "Advanced AI algorithms automatically match colors from reference images to your footage with precision and speed."
  }, {
    icon: Palette,
    title: "Cinematic Presets",
    description: "Access professional-grade color presets inspired by blockbuster films and industry-standard looks."
  }, {
    icon: Zap,
    title: "One-Click Processing",
    description: "Transform your footage instantly with our streamlined workflow - no complex manual adjustments needed."
  }, {
    icon: Clock,
    title: "Real-Time Preview",
    description: "See your changes instantly with our real-time preview engine, making the editing process seamless."
  }, {
    icon: Users,
    title: "Batch Processing",
    description: "Apply color grades to multiple clips simultaneously, saving hours of repetitive work."
  }, {
    icon: Shield,
    title: "Professional Quality",
    description: "Export in high resolution with professional color spaces for broadcast and cinema standards."
  }];
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
  return <div className="min-h-screen bg-gradient-to-b from-[#ffe5e5] to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-black">Chromora</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-medium hover:text-gray-600 transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Resources</a>
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-center text-teal-900">
                Turn Ordinary Footage Into Visual Masterpieces.
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
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

            {/* Right Interactive Image Comparison */}
            <div className="relative">
              <Feature beforeImage="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1920&h=1080&q=80" afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&h=1080&q=80" title="AI-Powered Color Transformation" description="Drag the slider to see the dramatic difference our AI color grading makes to your footage." badgeText="Interactive Demo" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black">
              Powerful Features for Perfect Color Grading
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              Discover the advanced tools and AI-powered features that make Chromora the ultimate solution for professional color grading.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="relative">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative">
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
              </div>)}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="px-6 py-16 bg-gradient-to-b from-white to-[#ffe5e5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              Choose the perfect plan for your creative needs. All plans include our core AI color grading features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-black scale-105' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-700">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>)}
                  </ul>
                  <Button className={`w-full py-3 rounded-full transition-colors ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'border border-black text-black hover:bg-black hover:text-white'}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>)}
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
            
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Index;