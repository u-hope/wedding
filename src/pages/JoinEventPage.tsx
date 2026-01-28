import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { QrCode, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JoinEventPage = () => {
  const [eventCode, setEventCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventCode.trim()) {
      toast({
        title: "Event Code Required",
        description: "Please enter the event code to join.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate code lookup - replace with actual API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to event page
      navigate(`/e/${eventCode.toLowerCase()}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        {/* Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-champagne flex items-center justify-center mb-6">
            <QrCode size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Join an Event
          </h1>
          <p className="text-muted-foreground">
            Enter the event code or scan the QR code to start sharing memories
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <Input
            type="text"
            placeholder="Enter event code (e.g., WEDDING2024)"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value.toUpperCase())}
            className="text-center text-lg h-14 tracking-wider uppercase"
          />
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Finding event..." : (
              <>
                Join Event
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </form>

        {/* QR Scanner Note */}
        <div className="bg-secondary/50 rounded-xl p-6 border border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="font-medium">Tip</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You can also scan the event QR code directly with your phone camera—
            it will open the event page automatically.
          </p>
        </div>

        {/* Demo Link */}
        <p className="mt-8 text-sm text-muted-foreground">
          Want to see how it works?{" "}
          <button
            onClick={() => navigate("/e/demo")}
            className="text-primary hover:underline"
          >
            Try our demo event
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default JoinEventPage;
