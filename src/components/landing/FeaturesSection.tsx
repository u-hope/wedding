import { motion } from "framer-motion";
import { 
  Smartphone, 
  Palette, 
  Shield, 
  BarChart3, 
  MessageSquareHeart, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for smartphones. Guests can upload in seconds right from their camera roll.",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Add your logo, choose colors, and select a theme that matches your event's style.",
  },
  {
    icon: Shield,
    title: "Moderation Tools",
    description: "Review uploads, hide inappropriate content, and pin your favorite memories.",
  },
  {
    icon: BarChart3,
    title: "Live Insights",
    description: "Track uploads, views, and engagement in real-time from your dashboard.",
  },
  {
    icon: MessageSquareHeart,
    title: "Comments & Reactions",
    description: "Guests can leave wishes, comments, and reactions on photos and videos.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "No app downloads. Guests scan and start uploading immediately.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make collecting and managing event memories effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-champagne flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
