import { motion } from "framer-motion";
import { Heart, PartyPopper, Briefcase, GraduationCap, Baby, Plane } from "lucide-react";

const useCases = [
  { icon: Heart, name: "Weddings", color: "text-rose-500" },
  { icon: PartyPopper, name: "Birthdays", color: "text-amber-500" },
  { icon: Briefcase, name: "Corporate Events", color: "text-blue-500" },
  { icon: GraduationCap, name: "Graduations", color: "text-purple-500" },
  { icon: Baby, name: "Baby Showers", color: "text-pink-400" },
  { icon: Plane, name: "Vacations", color: "text-teal-500" },
];

const UseCasesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-champagne/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            Perfect for Every Occasion
          </h2>
          <p className="text-muted-foreground">
            Create shared memories for any celebration
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-2 px-5 py-3 bg-card rounded-full border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <useCase.icon size={20} className={useCase.color} />
              <span className="font-medium text-foreground">{useCase.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
