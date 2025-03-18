import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a dedicated Computer Science Engineering student with a focus on Artificial Intelligence
              and Machine Learning at SRM Institute of Science & Technology. My passion lies in developing
              intelligent solutions that can make a real impact in the world.
            </p>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              With a strong foundation in both theoretical concepts and practical applications,
              I specialize in machine learning, frontend development, and UI/UX design. I'm particularly
              interested in the intersection of AI and user experience, creating solutions that are not
              only powerful but also intuitive and accessible.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Machine Learning</h3>
                <p className="text-gray-400">Deep expertise in neural networks, computer vision, and natural language processing</p>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">Frontend Development</h3>
                <p className="text-gray-400">Creating responsive and interactive web applications with modern frameworks</p>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/40 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-purple-400">UI/UX Design</h3>
                <p className="text-gray-400">Designing intuitive and beautiful user interfaces with attention to detail</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};