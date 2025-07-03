import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        console.error('Error signing in with Google:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <Button className="bg-transparent text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white text-sm">
          Welcome, {user.email}
        </span>
        <Button 
          onClick={signOut}
          className="bg-transparent text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={signInWithGoogle}
      className="bg-transparent text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
    >
      Sign in
    </Button>
  );
};

export default UserProfile;