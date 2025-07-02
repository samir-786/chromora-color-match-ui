import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, Palette, Wand2, RotateCcw, Sliders, Zap, Film, Settings, FolderOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ColorGrading = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string>('');
  const [credits, setCredits] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG or PNG image file',
        variant: 'destructive',
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setEnhancedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const applyColorGrading = async () => {
    if (!originalImage || credits <= 0) return;

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const { data, error } = await supabase.functions.invoke('enhance-image', {
        body: { 
          image: originalImage,
          enhancement_type: 'color_grading'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.enhanced_image) {
        setEnhancedImage(data.enhanced_image);
        setCredits(prev => prev - 1);
        setUploadProgress(100);
        toast({
          title: 'Cinematic magic applied!',
          description: 'Your image has been transformed into a masterpiece',
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
      clearInterval(progressInterval);
      setIsProcessing(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const resetImages = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = `chromora-enhanced-${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download complete!',
      description: "You're now one step closer to pro-level visuals.",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setEnhancedImage(null);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b neon-border">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--neon-teal))] to-[hsl(var(--neon-purple))] rounded-full flex items-center justify-center neon-glow">
              <Palette className="w-5 h-5 text-black" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Chromora</h1>
            <p className="text-xs text-muted-foreground">AI Color Grading Studio</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted neon-border">
            <Zap className="w-4 h-4 text-[hsl(var(--neon-teal))]" />
            <span className="text-sm font-medium">{credits} credits left</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="neon-border hover:neon-glow"
          >
            Back to Home
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Upload Section */}
          <Card className="gradient-card neon-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Upload className="w-6 h-6 text-[hsl(var(--neon-teal))]" />
                Upload Your Image
              </CardTitle>
              <p className="text-muted-foreground">Upload your photo and let Chromora bring it to life.</p>
            </CardHeader>
            <CardContent>
              {!originalImage ? (
                <div
                  className="relative border-2 border-dashed neon-border rounded-xl p-12 text-center cursor-pointer hover:neon-glow transition-all duration-300"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[hsl(var(--neon-teal))] to-[hsl(var(--neon-purple))] rounded-full flex items-center justify-center neon-glow">
                      <Upload className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">
                        Drag & drop your image here
                      </p>
                      <p className="text-muted-foreground">
                        or click to browse • JPG, PNG only
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden neon-border">
                    <img
                      src={originalImage}
                      alt="Uploaded image"
                      className="w-full h-64 object-cover"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetImages}
                      className="absolute top-3 right-3 neon-border bg-background/80 backdrop-blur-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-[hsl(var(--neon-teal))] rounded-full"></div>
                    {fileName}
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Apply AI Grading */}
          {originalImage && (
            <div className="flex flex-col items-center space-y-6">
              <Button
                onClick={applyColorGrading}
                disabled={!originalImage || isProcessing || credits <= 0}
                className="bg-gradient-to-r from-[hsl(var(--neon-teal))] to-[hsl(var(--neon-purple))] text-black font-semibold px-8 py-6 text-lg rounded-full neon-glow hover:scale-105 transition-all duration-300"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                    Applying cinematic magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3" />
                    Apply Color Grading
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="w-full max-w-md space-y-2">
                  <Progress value={uploadProgress} className="h-2 neon-glow" />
                  <p className="text-sm text-center text-muted-foreground">
                    {uploadProgress}% complete
                  </p>
                </div>
              )}

              {credits <= 0 && (
                <Card className="gradient-card neon-border">
                  <CardContent className="p-6 text-center">
                    <p className="text-lg font-medium mb-4">No credits remaining</p>
                    <Button className="bg-[hsl(var(--neon-purple))] text-white neon-glow">
                      Get More Credits
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Before/After Preview */}
          {enhancedImage && (
            <Card className="gradient-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-6 h-6 text-[hsl(var(--neon-purple))]" />
                  Before & After Comparison
                </CardTitle>
                <p className="text-muted-foreground">Preview how AI turned your image into a masterpiece.</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">Original</h4>
                    <div className="rounded-xl overflow-hidden border border-border">
                      <img
                        src={originalImage}
                        alt="Original"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-center">Enhanced</h4>
                    <div className="rounded-xl overflow-hidden neon-border neon-glow">
                      <img
                        src={enhancedImage}
                        alt="Enhanced"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    onClick={downloadImage}
                    className="bg-[hsl(var(--neon-teal))] text-black font-semibold px-6 py-3 rounded-full neon-glow hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Graded Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Coming Soon Features */}
          <Card className="gradient-card border-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Settings className="w-6 h-6" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Film, title: 'Video Color Grading', desc: 'Apply cinematic looks to videos' },
                  { icon: Download, title: 'LUT Export (.cube)', desc: 'Export professional LUTs' },
                  { icon: Sliders, title: 'Batch Processing', desc: 'Process multiple images' },
                  { icon: FolderOpen, title: 'Save to Workspace', desc: 'Organize your projects' }
                ].map((feature, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/20 border border-muted/30 opacity-50">
                    <feature.icon className="w-8 h-8 mb-3 text-muted-foreground" />
                    <h4 className="font-medium mb-1 text-muted-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground/70">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColorGrading;