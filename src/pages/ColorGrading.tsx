import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Palette, Wand2, RotateCcw, Sliders } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ColorGrading = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setEnhancedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const enhanceWithGemini = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    setUploadProgress(20);

    try {
      // Convert base64 to blob for upload
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      setUploadProgress(40);

      // Call our edge function to enhance with Gemini
      const { data, error } = await supabase.functions.invoke('enhance-image', {
        body: { 
          image: originalImage,
          enhancement_type: 'color_grading'
        }
      });

      setUploadProgress(80);

      if (error) {
        throw new Error(error.message);
      }

      if (data?.enhanced_image) {
        setEnhancedImage(data.enhanced_image);
        setUploadProgress(100);
        toast({
          title: 'Image enhanced successfully!',
          description: 'Your image has been color graded using AI',
        });
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: 'Enhancement failed',
        description: 'Failed to enhance the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const resetImages = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'chromora-enhanced.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold">Chromora Studio</span>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="border-border hover:bg-accent"
        >
          Back to Home
        </Button>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
              AI Color Grading Studio
            </h1>
            <p className="text-muted-foreground text-lg">
              Transform your images with professional AI-powered color grading
            </p>
          </div>

          {/* Upload Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Original Image */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-teal-400" />
                  Original Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!originalImage ? (
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetImages}
                      className="absolute top-2 right-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                )}
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
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-teal-400" />
                  Enhanced Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!enhancedImage ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center h-64 flex items-center justify-center">
                    <div>
                      <Wand2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Enhanced image will appear here
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={enhancedImage}
                      alt="Enhanced"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadImage}
                      className="absolute top-2 right-2"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={enhanceWithGemini}
              disabled={!originalImage || isProcessing}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Enhance with AI
                </>
              )}
            </Button>

            {isProcessing && (
              <div className="w-full max-w-xs">
                <div className="bg-muted rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  {uploadProgress}% complete
                </p>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Quick Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Cinematic', icon: '🎬' },
                { name: 'Vintage', icon: '📸' },
                { name: 'Bright', icon: '☀️' },
                { name: 'Moody', icon: '🌙' }
              ].map((preset, index) => (
                <Card key={index} className="bg-card border-border cursor-pointer hover:border-teal-400 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{preset.icon}</div>
                    <p className="text-sm font-medium">{preset.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorGrading;