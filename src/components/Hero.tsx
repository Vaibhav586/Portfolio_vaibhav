import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Mail } from 'lucide-react';
import { Clock } from './Clock';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt="Vaibhav"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-500 hover:scale-105 transition-transform duration-300"
            />
            <Clock />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Hi, I'm Vaibhav
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-6">
            <TypeAnimation
              sequence={[
                'CSE-AIML Student',
                2000,
                'Machine Learning Engineer',
                2000,
                'Frontend Developer',
                2000,
                'UI/UX Designer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            A passionate Computer Science Engineering student specializing in AI & ML
            at SRM Institute of Science & Technology (2022–2026)
          </p>
          
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-shadow"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};