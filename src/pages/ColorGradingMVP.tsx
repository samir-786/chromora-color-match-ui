import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Wand2, RotateCcw, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ColorGradingMVP = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const colorPresets = [
    { id: "cinematic", name: "Cinematic", description: "Warm, movie-like tones" },
    { id: "vibrant", name: "Vibrant", description: "Enhanced colors and saturation" },
    { id: "vintage", name: "Vintage", description: "Retro film aesthetic" },
    { id: "cool", name: "Cool Tones", description: "Blue and teal emphasis" },
    { id: "warm", name: "Warm Tones", description: "Orange and yellow emphasis" },
    { id: "dramatic", name: "Dramatic", description: "High contrast and moody" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!originalImage || !selectedPreset) {
      toast({
        title: "Missing Requirements",
        description: "Please upload an image and select a preset",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Convert base64 to blob for API
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('preset', selectedPreset);

      const enhanceResponse = await fetch('/functions/v1/enhance-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZWptaHFiaWJlbGxnZHV5eHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjgyNDIsImV4cCI6MjA2Njc0NDI0Mn0.5ApOrRmXeox-zU5hulgfRW_CHypUU7W74_nnV6nggnk'}`,
        },
        body: formData
      });

      if (!enhanceResponse.ok) {
        throw new Error('Enhancement failed');
      }

      const result = await enhanceResponse.json();
      setEnhancedImage(result.enhancedImage);
      
      toast({
        title: "Enhancement Complete!",
        description: "Your image has been professionally color graded",
      });
    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement Failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'enhanced-image.png';
    link.click();
  };

  const resetImage = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setSelectedPreset("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-black/20 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-white">Chromora</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
            AI Color Grading Studio
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your images with professional-grade AI color enhancement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="w-5 h-5 mr-2 text-teal-400" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {originalImage ? (
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="max-h-64 mx-auto rounded-lg object-contain"
                  />
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-300 mb-2">Click to upload an image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Enhanced Image */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-teal-400" />
                Enhanced Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-gray-600 rounded-lg p-8 text-center min-h-64 flex items-center justify-center">
                {enhancedImage ? (
                  <img 
                    src={enhancedImage} 
                    alt="Enhanced" 
                    className="max-h-64 rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-gray-400">
                    <Palette className="w-12 h-12 mx-auto mb-4" />
                    <p>Enhanced image will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Presets */}
        <Card className="bg-gray-900/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Color Grading Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {colorPresets.map((preset) => (
                <div
                  key={preset.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedPreset === preset.id
                      ? 'border-teal-400 bg-teal-400/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedPreset(preset.id)}
                >
                  <h3 className="text-white font-medium mb-1">{preset.name}</h3>
                  <p className="text-sm text-gray-400">{preset.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={enhanceImage}
            disabled={!originalImage || !selectedPreset || isProcessing}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Enhance Image
              </>
            )}
          </Button>
          
          {enhancedImage && (
            <Button
              onClick={downloadImage}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
          
          {originalImage && (
            <Button
              onClick={resetImage}
              variant="ghost"
              className="text-gray-300 hover:text-white px-8 py-3 rounded-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorGradingMVP;