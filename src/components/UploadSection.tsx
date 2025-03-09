
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, Image, ArrowRight, Loader2 } from "lucide-react";
import { uploadFaceImage } from "@/services/uploadService";

const UploadSection = () => {
  const { toast } = useToast();
  const [uploadMethod, setUploadMethod] = useState<'file' | 'camera' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle file selection from upload
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
      setCapturedImage(file);
    }
  };
  
  // Initialize camera stream
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      toast({
        title: "Camera Activated",
        description: "Position your face in the frame and click capture."
      });
      
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
      console.error("Camera error:", err);
    }
  };
  
  // Capture image from camera
  const captureFromCamera = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        
        // Create a File object from the blob
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        setCapturedImage(file);
        
        // Stop the camera stream
        stopCameraStream();
      }
    }, 'image/jpeg', 0.95);
  };
  
  // Stop the camera stream
  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  // Clean up when changing methods or cancelling
  const cleanUp = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    stopCameraStream();
    setUploadMethod(null);
    setPreviewUrl(null);
    setCapturedImage(null);
  };
  
  // Process the upload
  const processUpload = async () => {
    if (!capturedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or capture an image first",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const result = await uploadFaceImage(capturedImage);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message
        });
        cleanUp();
      } else {
        toast({
          title: "Upload Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      stopCameraStream();
    };
  }, [previewUrl]);
  
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
                    <div className="relative w-full h-60 border-2 border-primary/40 rounded-md flex flex-col items-center justify-center gap-3 bg-black/30">
                      <video 
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover rounded-md"
                        autoPlay
                        playsInline
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      
                      <div className="absolute bottom-4 flex gap-4 z-10">
                        <Button onClick={initializeCamera} variant="secondary" className="bg-secondary/80">
                          Start Camera
                        </Button>
                        <Button 
                          onClick={captureFromCamera} 
                          variant="secondary"
                          className="bg-primary/80"
                          disabled={!streamRef.current}
                        >
                          Capture
                        </Button>
                      </div>
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
                        onClick={() => {
                          setPreviewUrl(null);
                          setCapturedImage(null);
                          if (uploadMethod === 'camera') {
                            initializeCamera();
                          }
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={cleanUp}
                  >
                    Cancel
                  </Button>
                  
                  {previewUrl && (
                    <Button 
                      className="gradient-bg hover:opacity-90"
                      onClick={processUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <span>Upload</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
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
