import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Upload, 
  Heart, 
  MessageCircle, 
  X, 
  Image as ImageIcon,
  Video,
  Send,
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockEvent = {
  name: "Sarah & John's Wedding",
  date: "June 15, 2024",
  description: "Welcome to our special day! Share your photos and videos to help us capture every moment. 💕",
  branding: {
    primaryColor: "#d4a574",
    logo: null,
  },
};

const mockMedia = [
  { id: "1", type: "image", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", caption: "The ceremony was beautiful!", likes: 24, comments: 5 },
  { id: "2", type: "image", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400", caption: "First dance ❤️", likes: 45, comments: 12 },
  { id: "3", type: "image", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400", caption: "", likes: 18, comments: 3 },
  { id: "4", type: "image", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400", caption: "Congrats to the happy couple!", likes: 31, comments: 8 },
  { id: "5", type: "image", url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400", caption: "The cake was amazing", likes: 22, comments: 4 },
  { id: "6", type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", caption: "", likes: 15, comments: 2 },
];

const GuestEventPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
      setSelectedFiles([]);
      setCaption("");
      toast({
        title: "Photos Uploaded! 🎉",
        description: `${selectedFiles.length} ${selectedFiles.length === 1 ? 'photo' : 'photos'} added to the gallery`,
      });
    }, 2000);
  };

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-champagne/30 to-background py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            {mockEvent.name}
          </h1>
          <p className="text-muted-foreground mb-4">{mockEvent.date}</p>
          {mockEvent.description && (
            <p className="text-foreground/80 max-w-lg mx-auto mb-6">
              {mockEvent.description}
            </p>
          )}
          
          {/* Upload Button */}
          <Button
            size="lg"
            onClick={() => setShowUploadModal(true)}
            className="shadow-glow"
          >
            <Camera size={20} />
            Share Your Photos
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-muted-foreground animate-bounce" />
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-semibold text-foreground">
            Gallery
          </h2>
          <p className="text-sm text-muted-foreground">
            {mockMedia.length} memories shared
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {mockMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
            >
              <img
                src={item.url}
                alt={item.caption || "Event photo"}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {item.caption && (
                    <p className="text-white text-sm mb-2 line-clamp-2">{item.caption}</p>
                  )}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="flex items-center gap-1 text-white text-sm"
                    >
                      <Heart
                        size={16}
                        className={likedItems.has(item.id) ? "fill-primary text-primary" : ""}
                      />
                      {item.likes + (likedItems.has(item.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 text-white text-sm">
                      <MessageCircle size={16} />
                      {item.comments}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Upload Button (Mobile) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        onClick={() => setShowUploadModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-glow flex items-center justify-center md:hidden z-40"
      >
        <Camera size={24} />
      </motion.button>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  Share Your Photos
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/20 transition-colors mb-4"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {selectedFiles.length === 0 ? (
                  <>
                    <div className="w-14 h-14 mx-auto rounded-xl bg-champagne flex items-center justify-center mb-4">
                      <Upload size={28} className="text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      Tap to select photos
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ImageIcon size={20} className="text-primary" />
                      <span className="text-foreground font-medium">
                        {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tap to change selection
                    </p>
                  </>
                )}
              </div>

              {/* Caption Input */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Add a caption (optional)
                </label>
                <input
                  type="text"
                  placeholder="Say something about these moments..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                className="w-full"
                size="lg"
                disabled={selectedFiles.length === 0 || isUploading}
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Send size={18} />
                    Upload {selectedFiles.length > 0 ? `${selectedFiles.length} ${selectedFiles.length === 1 ? 'Photo' : 'Photos'}` : 'Photos'}
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestEventPage;
