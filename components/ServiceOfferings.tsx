"use client";

import { motion } from 'framer-motion';
import { Building2, Gpu, MessageSquareCode, PanelsTopLeft, Smartphone, WandSparkles } from 'lucide-react';

const iconMap: any= {
  "MessageSquareCode": MessageSquareCode,
  "PanelsTopLeft": PanelsTopLeft,
  "Smartphone": Smartphone,
  "Building2": Building2,
  "WandSparkles": WandSparkles,
  "Gpu": Gpu,
}

const backgrounds = [
  "bg-[#FDF3EA]",
  "bg-[#E0F8F2]",
  "bg-[#EEECFF]",
];

export default function ServiceOfferings({ solution }: { solution: any }) {
  // If this specific solution doesn't have offerings mapped out yet, don't render the section
  if (!solution.offerings || solution.offerings.length === 0) return null;

  return (
    <section className="w-full bg-[#0B0B0B] py-20 md:py-32">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight mb-8 md:mb-16">
          Service Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {solution.offerings.map((offering: any, index: number) => {
            const Icon = iconMap[offering.icon];

            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`${backgrounds[index % 3]} rounded-xl p-8 md:p-10 flex flex-col gap-4 group hover:-translate-y-1 transition-transform`}>
                <div className="mb-2">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-[#141B2B]">{offering.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{offering.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}