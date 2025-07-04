import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Wand2, RotateCcw, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ColorGradingMVP = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const tools = [
    { id: "color-grading", name: "Color Grading", description: "Professional color enhancement", icon: Palette },
    { id: "quality-enhancer", name: "Quality Enhancer", description: "AI-powered image upscaling", icon: Zap }
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
    if (!originalImage || !selectedTool) {
      toast({
        title: "Missing Requirements",
        description: "Please upload an image and select a tool",
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
      formData.append('preset', selectedTool);

      const enhanceResponse = await fetch('https://twejmhqbibellgduyxvs.supabase.co/functions/v1/enhance-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZWptaHFiaWJlbGxnZHV5eHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjgyNDIsImV4cCI6MjA2Njc0NDI0Mn0.5ApOrRmXeox-zU5hulgfRW_CHypUU7W74_nnV6nggnk`,
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
    setSelectedTool("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-black border-b border-gray-900">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-white">Chromora</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-8 text-white">
            AI Enhancement Studio
          </h1>
          <p className="text-gray-400 text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            Professional AI-powered image enhancement tools. Upload your image and select the perfect enhancement.
          </p>
          <div className="flex justify-center">
            <div className="bg-gray-900 border border-gray-800 rounded-full px-6 py-3">
              <span className="text-gray-300 text-sm font-medium">◉ Powered by Google Gemini AI</span>
            </div>
          </div>
        </div>

        {/* Tools Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Select Enhancement Tool</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`p-8 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedTool === tool.id
                      ? 'border-white bg-gray-900'
                      : 'border-gray-800 hover:border-gray-700 bg-gray-950'
                  }`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <IconComponent className="w-12 h-12 text-white mb-4 mx-auto" />
                  <h3 className="text-white font-bold text-xl mb-2 text-center">{tool.name}</h3>
                  <p className="text-gray-400 text-center">{tool.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center">
                <Upload className="w-6 h-6 mr-3 text-white" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-gray-800 rounded-xl p-12 text-center cursor-pointer hover:border-gray-700 transition-all duration-300 bg-black"
                onClick={() => fileInputRef.current?.click()}
              >
                {originalImage ? (
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="max-h-80 w-full mx-auto rounded-lg object-contain"
                  />
                ) : (
                  <div>
                    <Upload className="w-16 h-16 mx-auto mb-6 text-gray-500" />
                    <p className="text-white text-lg mb-2">Drop your image here or click to upload</p>
                    <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
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
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center">
                <Wand2 className="w-6 h-6 mr-3 text-white" />
                Enhanced Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-gray-800 rounded-xl p-12 text-center min-h-80 flex items-center justify-center bg-black">
                {enhancedImage ? (
                  <img 
                    src={enhancedImage} 
                    alt="Enhanced" 
                    className="max-h-80 w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-6 border-2 border-gray-700 rounded-lg flex items-center justify-center">
                      <Wand2 className="w-8 h-8" />
                    </div>
                    <p className="text-lg">Enhanced image will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            onClick={enhanceImage}
            disabled={!originalImage || !selectedTool || isProcessing}
            className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-xl text-lg font-medium transition-all duration-300 disabled:bg-gray-800 disabled:text-gray-500"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-3" />
                Enhance Image
              </>
            )}
          </Button>
          
          {enhancedImage && (
            <Button
              onClick={downloadImage}
              variant="outline"
              className="border-gray-600 bg-black text-gray-300 hover:bg-gray-900 hover:text-white px-12 py-4 rounded-xl text-lg font-medium transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-3" />
              Download
            </Button>
          )}
          
          {originalImage && (
            <Button
              onClick={resetImage}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-900 px-12 py-4 rounded-xl text-lg font-medium transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorGradingMVP;