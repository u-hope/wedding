import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateEventPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate event creation - replace with actual API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Event Created! 🎉",
        description: "Your event is ready. Share the QR code with your guests.",
      });
      navigate("/events/new-event-id/access");
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-2xl shadow-lg border border-border p-8"
        >
          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto rounded-xl bg-champagne flex items-center justify-center mb-4">
                  <Calendar size={28} className="text-primary" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Create Your Event
                </h1>
                <p className="text-muted-foreground">
                  Let's set up your memory collection
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sarah & John's Wedding"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full"
                  size="lg"
                  disabled={!formData.name || !formData.date}
                >
                  Continue
                  <ArrowRight size={18} />
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto rounded-xl bg-champagne flex items-center justify-center mb-4">
                  <Sparkles size={28} className="text-primary" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Add Details
                </h1>
                <p className="text-muted-foreground">
                  Optional: Add a message for your guests
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="description">Welcome Message (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Share your excitement! This message will greet guests when they join..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Event"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Skip Option */}
        {step === 2 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            You can always add or edit details later
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateEventPage;
