
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, Image, ArrowRight } from "lucide-react";

const UploadSection = () => {
  const { toast } = useToast();
  const [uploadMethod, setUploadMethod] = useState<'file' | 'camera' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  
  const captureFromCamera = () => {
    toast({
      title: "Camera Activated",
      description: "Please position your face in the frame and click capture."
    });
    // In a real implementation, we would initialize the camera here
    // For this demo, we're using a placeholder
    setTimeout(() => {
      setPreviewUrl('/placeholder.svg');
    }, 1000);
  };
  
  const processUpload = () => {
    if (!previewUrl) {
      toast({
        title: "No image selected",
        description: "Please upload or capture an image first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Processing...",
      description: "Your 3D model is being generated. This may take a few moments."
    });
    
    // Reset the form after 2 seconds to simulate processing
    setTimeout(() => {
      setUploadMethod(null);
      setPreviewUrl(null);
      toast({
        title: "Success!",
        description: "Your 3D model has been created and added to your gallery."
      });
    }, 2000);
  };
  
  return (
    <div id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Face</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start by uploading a clear photo of your face. For best results, use a well-lit photo with a neutral expression.
          </p>
        </div>
        
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-6">
            {!uploadMethod ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={() => setUploadMethod('file')}
                  variant="outline"
                  className="h-40 border-dashed border-2 border-primary/40 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary"
                >
                  <Upload className="h-8 w-8 text-primary" />
                  <span className="text-lg font-medium">Upload File</span>
                  <span className="text-sm text-muted-foreground">JPG, PNG, or WebP</span>
                </Button>
                
                <Button
                  onClick={() => setUploadMethod('camera')}
                  variant="outline"
                  className="h-40 border-dashed border-2 border-primary/40 flex flex-col items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary"
                >
                  <Camera className="h-8 w-8 text-primary" />
                  <span className="text-lg font-medium">Use Camera</span>
                  <span className="text-sm text-muted-foreground">Take a photo now</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {uploadMethod === 'file' && !previewUrl && (
                  <div className="mb-6 w-full">
                    <label 
                      htmlFor="file-upload"
                      className="w-full h-40 border-dashed border-2 border-primary/40 rounded-md flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/5 hover:border-primary"
                    >
                      <Image className="h-8 w-8 text-primary" />
                      <span className="text-lg font-medium">Click to browse files</span>
                      <span className="text-sm text-muted-foreground">or drag and drop</span>
                      <input 
                        id="file-upload" 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}
                
                {uploadMethod === 'camera' && !previewUrl && (
                  <div className="mb-6 w-full">
                    <div 
                      className="w-full h-60 border-2 border-primary/40 rounded-md flex flex-col items-center justify-center gap-3 bg-black/30"
                    >
                      <Camera className="h-12 w-12 text-primary/60" />
                      <Button onClick={captureFromCamera} variant="secondary">
                        Initialize Camera
                      </Button>
                    </div>
                  </div>
                )}
                
                {previewUrl && (
                  <div className="mb-6 w-full">
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-60 object-contain rounded-md border-2 border-primary"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-background/50 hover:bg-background/70"
                        onClick={() => setPreviewUrl(null)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadMethod(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Cancel
                  </Button>
                  
                  {previewUrl && (
                    <Button 
                      className="gradient-bg hover:opacity-90"
                      onClick={processUpload}
                    >
                      <span>Process</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadSection;
