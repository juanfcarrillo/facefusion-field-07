
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { faceModels } from "@/utils/facesData";

const GallerySection = () => {
  const { toast } = useToast();
  
  const handleView = (id: string) => {
    toast({
      title: "Viewing 3D Model",
      description: `Opening 3D viewer for model ${id}`
    });
  };
  
  const handleDownload = (id: string) => {
    toast({
      title: "Downloading",
      description: `Preparing download for model ${id}`
    });
  };
  
  const handleDelete = (id: string) => {
    toast({
      title: "Deleted",
      description: `Model ${id} has been removed`
    });
  };
  
  return (
    <div className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your 3D Models</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View, download, and manage your 3D face models
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faceModels.map((model) => (
            <Card key={model.id} className="bg-card/70 backdrop-blur-sm border-primary/10 overflow-hidden">
              <div className="relative aspect-square">
                <img 
                  src={model.thumbnailUrl} 
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                {model.status === 'processing' && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3"></div>
                      <span className="text-sm font-medium">Processing...</span>
                    </div>
                  </div>
                )}
                {model.status === 'failed' && (
                  <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-destructive-foreground bg-destructive/60 px-3 py-1 rounded">
                      Failed
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{model.name}</h3>
                  <Badge 
                    variant={model.status === 'completed' ? "default" : "outline"}
                    className={model.status === 'completed' ? "bg-primary/80" : ""}
                  >
                    {model.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Created: {new Date(model.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex-1 flex items-center gap-1"
                  onClick={() => handleView(model.id)}
                  disabled={model.status !== 'completed'}
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex-1 flex items-center gap-1"
                  onClick={() => handleDownload(model.id)}
                  disabled={model.status !== 'completed'}
                >
                  <Download className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-destructive hover:text-destructive"
                  onClick={() => handleDelete(model.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
