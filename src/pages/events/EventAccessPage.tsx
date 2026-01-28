import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { 
  Copy, 
  Download, 
  Printer, 
  Share2, 
  Check,
  ChevronLeft,
  Palette,
  BarChart3,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventAccessPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  // Mock event data - replace with API call
  const event = {
    id,
    name: "Sarah & John's Wedding",
    date: "2024-06-15",
    code: "WEDDING2024",
    slug: "sarah-john-wedding",
  };

  const eventUrl = `${window.location.origin}/e/${event.slug}`;

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadQR = () => {
    const canvas = document.querySelector("#qr-code canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${event.slug}-qr-code.png`;
      link.href = url;
      link.click();
    }
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              {event.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              Share your event with guests
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/events/${id}/branding`}>
                <Palette size={18} />
                Branding
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/events/${id}/moderation`}>
                <Shield size={18} />
                Moderate
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/events/${id}/insights`}>
                <BarChart3 size={18} />
                Insights
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8 text-center"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-6">
              Event QR Code
            </h2>
            
            <div id="qr-code" className="inline-block p-6 bg-white rounded-2xl shadow-md mb-6">
              <QRCodeSVG
                value={eventUrl}
                size={200}
                level="H"
                includeMargin
                fgColor="#1a1a2e"
              />
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Guests can scan this code to instantly join your event
            </p>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={downloadQR}>
                <Download size={18} />
                Download
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer size={18} />
                Print
              </Button>
            </div>
          </motion.div>

          {/* Share Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h2 className="text-xl font-serif font-semibold text-foreground mb-6">
              Share Link & Code
            </h2>

            <div className="space-y-5">
              {/* Event Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Event Link
                </label>
                <div className="flex gap-2">
                  <Input
                    value={eventUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(eventUrl, "Link")}
                  >
                    {copied === "Link" ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                </div>
              </div>

              {/* Event Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Event Code
                </label>
                <div className="flex gap-2">
                  <Input
                    value={event.code}
                    readOnly
                    className="font-mono text-lg tracking-widest uppercase text-center"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(event.code, "Code")}
                  >
                    {copied === "Code" ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                </div>
              </div>

              {/* Share Button */}
              <Button
                className="w-full mt-4"
                size="lg"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.name,
                      text: `Join ${event.name} and share your photos!`,
                      url: eventUrl,
                    });
                  } else {
                    copyToClipboard(eventUrl, "Link");
                  }
                }}
              >
                <Share2 size={18} />
                Share Event
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Preview Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-3">
            See what your guests will see:
          </p>
          <Button variant="champagne" size="lg" asChild>
            <Link to={`/e/${event.slug}`} target="_blank">
              Preview Event Page
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventAccessPage;
