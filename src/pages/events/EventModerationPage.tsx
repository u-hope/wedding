import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Shield, 
  Eye, 
  EyeOff, 
  Trash2, 
  Star,
  MessageCircle,
  Image
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockMedia = [
  { id: "1", type: "image", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200", caption: "The ceremony was beautiful!", hidden: false, pinned: true },
  { id: "2", type: "image", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200", caption: "First dance ❤️", hidden: false, pinned: false },
  { id: "3", type: "image", url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=200", caption: "", hidden: true, pinned: false },
  { id: "4", type: "image", url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200", caption: "Congrats!", hidden: false, pinned: false },
];

const EventModerationPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [media, setMedia] = useState(mockMedia);
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");

  const toggleHidden = (mediaId: string) => {
    setMedia(media.map(m => 
      m.id === mediaId ? { ...m, hidden: !m.hidden } : m
    ));
    toast({
      title: "Updated",
      description: "Media visibility changed",
    });
  };

  const togglePinned = (mediaId: string) => {
    setMedia(media.map(m => 
      m.id === mediaId ? { ...m, pinned: !m.pinned } : m
    ));
    toast({
      title: "Updated",
      description: "Media pinned status changed",
    });
  };

  const deleteMedia = (mediaId: string) => {
    setMedia(media.filter(m => m.id !== mediaId));
    toast({
      title: "Deleted",
      description: "Media removed from gallery",
      variant: "destructive",
    });
  };

  const filteredMedia = filter === "all" 
    ? media 
    : filter === "visible" 
      ? media.filter(m => !m.hidden)
      : media.filter(m => m.hidden);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to={`/events/${id}/access`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Event
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-champagne flex items-center justify-center">
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Moderation
              </h1>
              <p className="text-muted-foreground">
                Manage uploads and content
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(["all", "visible", "hidden"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className="capitalize"
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <Image size={18} />
              <span className="text-2xl font-bold text-foreground">{media.length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Media</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <Eye size={18} />
              <span className="text-2xl font-bold text-foreground">{media.filter(m => !m.hidden).length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Visible</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
              <EyeOff size={18} />
              <span className="text-2xl font-bold text-foreground">{media.filter(m => m.hidden).length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Hidden</p>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-xl overflow-hidden border ${
                item.hidden ? "opacity-50 border-destructive/50" : "border-border"
              }`}
            >
              <img
                src={item.url}
                alt={item.caption || "Event photo"}
                className="w-full aspect-square object-cover"
              />
              
              {/* Pinned Badge */}
              {item.pinned && (
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <Star size={12} />
                  Pinned
                </div>
              )}

              {/* Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => togglePinned(item.id)}
                    className={`p-2 rounded-lg ${item.pinned ? "text-primary" : "text-white/70 hover:text-white"}`}
                    title={item.pinned ? "Unpin" : "Pin"}
                  >
                    <Star size={18} fill={item.pinned ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => toggleHidden(item.id)}
                    className="p-2 rounded-lg text-white/70 hover:text-white"
                    title={item.hidden ? "Show" : "Hide"}
                  >
                    {item.hidden ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => deleteMedia(item.id)}
                    className="p-2 rounded-lg text-white/70 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Shield size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No media found
            </h3>
            <p className="text-muted-foreground">
              {filter === "hidden" 
                ? "No hidden content" 
                : "Uploads will appear here for moderation"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModerationPage;
