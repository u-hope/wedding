import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ChevronLeft, Upload, Palette, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const colorPresets = [
  { name: "Rose Gold", value: "#d4a574" },
  { name: "Classic Blue", value: "#3b5998" },
  { name: "Emerald", value: "#2ecc71" },
  { name: "Burgundy", value: "#722f37" },
  { name: "Lavender", value: "#9b59b6" },
  { name: "Midnight", value: "#2c3e50" },
];

const templates = [
  { id: "elegant", name: "Elegant", preview: "Serif fonts, soft shadows" },
  { id: "modern", name: "Modern", preview: "Clean lines, bold text" },
  { id: "playful", name: "Playful", preview: "Rounded corners, fun colors" },
];

const EventBrandingPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [branding, setBranding] = useState({
    primaryColor: "#d4a574",
    template: "elegant",
    logo: null as File | null,
    coverImage: null as File | null,
  });

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Branding Updated!",
        description: "Your event's look has been saved.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to={`/events/${id}/access`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Event
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-champagne flex items-center justify-center">
            <Palette size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Event Branding
            </h1>
            <p className="text-muted-foreground">
              Customize how your event looks to guests
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Primary Color */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <Label className="text-base font-semibold mb-4 block">Primary Color</Label>
            <div className="flex flex-wrap gap-3 mb-4">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBranding({ ...branding, primaryColor: color.value })}
                  className={`w-12 h-12 rounded-xl border-2 transition-all ${
                    branding.primaryColor === color.value
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {branding.primaryColor === color.value && (
                    <Check size={20} className="text-white mx-auto" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="customColor" className="text-sm">Custom:</Label>
              <Input
                id="customColor"
                type="color"
                value={branding.primaryColor}
                onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={branding.primaryColor.toUpperCase()}
                onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                className="w-28 font-mono uppercase"
              />
            </div>
          </motion.div>

          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <Label className="text-base font-semibold mb-4 block">Event Logo</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-foreground font-medium mb-1">Upload your logo</p>
              <p className="text-sm text-muted-foreground">PNG or SVG, max 2MB</p>
            </div>
          </motion.div>

          {/* Template Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <Label className="text-base font-semibold mb-4 block">Template Style</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setBranding({ ...branding, template: template.id })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    branding.template === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <p className="font-semibold text-foreground mb-1">{template.name}</p>
                  <p className="text-sm text-muted-foreground">{template.preview}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link to={`/events/${id}/access`}>Cancel</Link>
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBrandingPage;
