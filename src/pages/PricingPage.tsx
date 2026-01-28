import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$29",
    period: "per event",
    description: "Perfect for intimate gatherings and small celebrations.",
    features: [
      { text: "Up to 200 photos", included: true },
      { text: "10 video uploads", included: true },
      { text: "Custom QR code", included: true },
      { text: "7-day gallery access", included: true },
      { text: "Basic branding", included: true },
      { text: "Gallery download", included: true },
      { text: "Priority support", included: false },
      { text: "Custom templates", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$79",
    period: "per event",
    description: "Ideal for weddings, corporate events, and larger celebrations.",
    features: [
      { text: "Unlimited photos", included: true },
      { text: "Unlimited videos", included: true },
      { text: "Custom QR code", included: true },
      { text: "30-day gallery access", included: true },
      { text: "Full custom branding", included: true },
      { text: "Gallery download", included: true },
      { text: "Priority support", included: true },
      { text: "3 custom templates", included: true },
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For agencies and businesses with multiple events.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Multiple events", included: true },
      { text: "Team access", included: true },
      { text: "Perpetual gallery access", included: true },
      { text: "White-label option", included: true },
      { text: "API access", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
  },
];

const PricingPage = () => {
  return (
    <div className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your event. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-xl scale-105"
                  : "bg-card border border-border shadow-md"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-champagne text-charcoal text-sm font-medium">
                    <Sparkles size={14} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-serif font-semibold mb-2 ${
                  plan.highlighted ? "text-primary-foreground" : "text-foreground"
                }`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? "text-primary-foreground" : "text-foreground"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-3 text-sm ${
                  plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-2 text-sm ${
                      !feature.included ? "opacity-50" : ""
                    }`}
                  >
                    <Check
                      size={16}
                      className={plan.highlighted ? "text-primary-foreground" : "text-primary"}
                    />
                    <span className={plan.highlighted ? "text-primary-foreground" : "text-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "champagne" : "default"}
                className="w-full"
                size="lg"
                asChild
              >
                <Link to="/auth/register">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground">
            Have questions?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
