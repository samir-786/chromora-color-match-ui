import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface UserProfileData {
  credits: number;
  plan: string;
}

const Credits = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  const creditPackages = [
    { credits: 100, price: "$9.99", popular: false },
    { credits: 500, price: "$39.99", popular: true },
    { credits: 1000, price: "$69.99", popular: false },
    { credits: 2500, price: "$149.99", popular: false },
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
      .select('credits, plan')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
  };

  const handlePurchaseCredits = async (credits: number) => {
    if (!user || !profile) return;

    setLoading(true);

    // In a real app, you would integrate with a payment processor here
    // For now, we'll just add the credits directly
    const { error } = await supabase
      .from('user_profiles')
      .update({
        credits: profile.credits + credits,
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to purchase credits",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `${credits} credits added to your account!`,
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Credits & Billing</h1>
            <p className="text-muted-foreground">Manage your credits and billing information</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <p className="text-6xl font-bold text-primary mb-2">{profile.credits}</p>
                  <p className="text-muted-foreground">Credits Available</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Each image enhancement costs 1 credit
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Purchase Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {creditPackages.map((pkg, index) => (
                    <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      <CardContent className="text-center p-6">
                        <p className="text-3xl font-bold text-primary mb-2">{pkg.credits}</p>
                        <p className="text-muted-foreground mb-2">Credits</p>
                        <p className="text-2xl font-bold mb-4">{pkg.price}</p>
                        <Button 
                          onClick={() => handlePurchaseCredits(pkg.credits)}
                          disabled={loading}
                          className="w-full"
                          variant={pkg.popular ? "default" : "outline"}
                        >
                          {loading ? "Processing..." : "Purchase"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          ${(parseFloat(pkg.price.slice(1)) / pkg.credits).toFixed(3)} per credit
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Usage History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Welcome Bonus</p>
                      <p className="text-sm text-muted-foreground">Account creation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-medium">+100 credits</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <div className="text-center p-8 text-muted-foreground">
                    <p>No recent activity</p>
                    <p className="text-sm">Start using Chromora to see your usage history</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Credits;