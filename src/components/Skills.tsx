import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Brain, Globe, Cpu, Terminal } from 'lucide-react';

export const Skills = () => {
  const skills = [
    {
      category: "Languages",
      icon: <Code2 className="w-6 h-6" />,
      items: ["Python", "Java", "C++", "JavaScript", "SQL"]
    },
    {
      category: "Web & Cloud",
      icon: <Globe className="w-6 h-6" />,
      items: ["React.js", "HTML5", "RESTful APIs", "Node.js", "AWS"]
    },
    {
      category: "AI/ML",
      icon: <Brain className="w-6 h-6" />,
      items: ["TensorFlow", "Keras", "NumPy", "Pandas", "Scikit-learn"]
    },
    {
      category: "Databases",
      icon: <Database className="w-6 h-6" />,
      items: ["MongoDB", "MySQL", "PostgreSQL"]
    },
    {
      category: "IoT",
      icon: <Cpu className="w-6 h-6" />,
      items: ["Raspberry Pi", "Arduino", "Sensor Integration"]
    },
    {
      category: "Tools",
      icon: <Terminal className="w-6 h-6" />,
      items: ["Git", "Docker", "VS Code", "Jupyter"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  {skill.icon}
                  <h3 className="text-xl font-semibold text-purple-400">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};