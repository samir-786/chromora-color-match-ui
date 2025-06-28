
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individual creators just getting started",
      features: [
        "Up to 50 video exports per month",
        "Basic AI color matching",
        "5 cinematic presets",
        "720p export quality",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Ideal for professional content creators and small teams",
      features: [
        "Unlimited video exports",
        "Advanced AI color matching",
        "50+ cinematic presets",
        "4K export quality",
        "Batch processing",
        "Priority support",
        "Custom color profiles"
      ],
      popular: true
    },
    {
      name: "Studio",
      price: "$99",
      period: "/month",
      description: "Built for production studios and large teams",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom preset creation",
        "8K export quality",
        "API access",
        "Dedicated account manager",
        "On-premise deployment option"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffe5e5] to-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-black">Chromora</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Chromora iPad</a>
          <Link to="/features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</Link>
          <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">Resources</a>
          <Link to="/pricing" className="text-sm font-medium text-black border-b-2 border-black">Pricing</Link>
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            Choose the perfect plan for your creative needs. All plans include our core AI color grading features.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-black scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
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
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-3 rounded-full transition-colors ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'border border-black text-black hover:bg-black hover:text-white'}`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-700">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-700">Yes, all plans come with a 14-day free trial. No credit card required to get started.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What file formats are supported?</h3>
              <p className="text-gray-700">Chromora supports all major video formats including MP4, MOV, AVI, and professional formats like ProRes and DNxHD.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
