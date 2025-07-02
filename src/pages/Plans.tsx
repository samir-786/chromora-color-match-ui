import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface UserProfileData {
  plan: string;
  credits: number;
}

const Plans = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);

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
      credits: 100,
      planId: "starter"
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
      credits: 500,
      planId: "pro",
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
      credits: 2000,
      planId: "studio"
    }
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('plan, credits')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (!data) {
      // Profile doesn't exist, create one
      await createProfile();
      return;
    }

    setProfile(data);
  };

  const createProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: user.id,
        credits: 100,
        plan: 'starter'
      })
      .select('plan, credits')
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      return;
    }

    setProfile(data);
  };

  const handleUpgradePlan = async (planId: string, planCredits: number) => {
    if (!user || !profile) return;

    setLoading(true);

    // In a real app, you would integrate with a payment processor here
    // For now, we'll just update the plan and add credits
    const { error } = await supabase
      .from('user_profiles')
      .update({
        plan: planId,
        credits: profile.credits + planCredits,
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to upgrade plan",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Plan upgraded to ${planId}!`,
      });
      fetchProfile();
    }

    setLoading(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Plans & Subscription</h1>
            <p className="text-muted-foreground text-lg">
              Choose the perfect plan for your creative needs
            </p>
            <div className="mt-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Current Plan: {profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''} ${profile.plan === plan.planId ? 'bg-muted' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {profile.plan === plan.planId && (
                  <div className="absolute -top-4 right-4">
                    <Badge variant="secondary">
                      Current Plan
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="text-center">
                    <span className="text-primary font-medium">{plan.credits} credits included</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full py-3"
                    disabled={loading || profile.plan === plan.planId}
                    onClick={() => handleUpgradePlan(plan.planId, plan.credits)}
                    variant={profile.plan === plan.planId ? "secondary" : "default"}
                  >
                    {loading ? "Processing..." : 
                     profile.plan === plan.planId ? "Current Plan" : 
                     `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Next Billing Date</h3>
                  <p className="text-muted-foreground">Not applicable (demo mode)</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-muted-foreground">No payment method on file</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a demo environment. In a production app, 
                  billing would be handled through a secure payment processor like Stripe.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Plans;