'use client'

import { servicesData } from "@/constants";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function EndToEnd(){
  return (
    <div className=" bg-black">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto w-full flex flex-col items-center text-center pb-10 md:pb-20">
        <h2 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight mb-8">
          End-to-end IT solutions designed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left mb-10">
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${service.bgColor} rounded-xl p-6 md:pt-5 md:pb-16 md:px-6 flex flex-col md:h-80`}
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <Link 
          href="/solutions"
          className="bg-primary text-white px-6 py-4 rounded-2xl font-medium hover:bg-[#4ea2b2] transition-colors"
        >
          View All Services
        </Link>
      </div>
    </div>
  )
}