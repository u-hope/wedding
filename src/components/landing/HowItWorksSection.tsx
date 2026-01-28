import { motion } from "framer-motion";
import { QrCode, Upload, Heart, Download } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "Create & Share",
    description: "Set up your event in under 3 minutes. Get a unique QR code and shareable link instantly.",
  },
  {
    icon: Upload,
    title: "Guests Upload",
    description: "Guests scan the QR code and upload photos directly—no app download or account needed.",
  },
  {
    icon: Heart,
    title: "Curate & Engage",
    description: "Moderate uploads, pin highlights, and let guests comment and react to memories.",
  },
  {
    icon: Download,
    title: "Keep Forever",
    description: "Download your complete gallery anytime. Your memories are safe and accessible.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to collect all your event memories in one beautiful place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-6 shadow-md h-full border border-border/50 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <step.icon size={28} className="text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
