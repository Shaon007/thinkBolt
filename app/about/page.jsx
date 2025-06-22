'use client';

import { motion } from 'framer-motion';

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-20 lg:px-32 bg-gradient-to-br from-gray-50 to-white text-gray-800 font-sans">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariant}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-indigo-500 tracking-tight"
          variants={itemVariant}
        >
          Welcome to <span className="text-black">thinkBolt</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700"
          variants={itemVariant}
        >
          At <span className="text-indigo-500 font-semibold">thinkBolt</span>, we dive deep into the
          evolving world of <strong>Technology</strong>, inspire healthier & meaningful{" "}
          <strong>Lifestyle</strong> choices, and empower innovation through{" "}
          <strong>Startup</strong> culture.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700"
          variants={itemVariant}
        >
          Our goal? To deliver fresh, insightful blogs that help you <em>stay ahead</em>,{" "}
          <em>live smart</em>, and <em>think bold</em>.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10"
          variants={containerVariant}
        >
          {['Technology', 'Lifestyle', 'Startup'].map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300"
              variants={itemVariant}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">{section}</h3>
              <p className="text-gray-600 text-sm">
                Explore how {section.toLowerCase()} shapes the world we live in today and tomorrow.
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-sm text-gray-500 mt-10"
          variants={itemVariant}
        >
           Built  by Nazir
        </motion.p>
      </motion.div>
    </main>
  );
}
