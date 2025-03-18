import { motion } from "framer-motion";
import { Users, Code, GraduationCap, Calendar, ArrowRight, Plus, Briefcase } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Technical Team Lead",
    organization: "Aaruush (Team Envision)",
    duration: "2023 - Present",
    description: [
      "Led a 15-member team in AI/ML and Web Development projects",
      "Conducted 10+ workshops training 200+ students",
      "Managed project timelines and deliverables effectively"
    ],
    skills: ["Team Leadership", "Project Management", "Technical Training"],
    icon: <Users className="w-6 h-6" />,
    color: "#4fd1c5", // Teal
    achievements: [
      "Increased team productivity by 30% through agile methodology implementation",
      "Delivered all projects on time with 95% client satisfaction rate"
    ],
    location: "SRMIST, Chennai"
  },
  {
    title: "Full Stack Developer Intern",
    organization: "Tech Innovators",
    duration: "Summer 2023",
    description: [
      "Developed and maintained web applications using React.js",
      "Implemented RESTful APIs and database integrations",
      "Collaborated with senior developers on production projects"
    ],
    skills: ["React.js", "Node.js", "RESTful APIs", "MongoDB"],
    icon: <Code className="w-6 h-6" />,
    color: "#f5424e", // Red
    achievements: [
      "Built a dashboard that reduced report generation time by 50%",
      "Contributed to 3 major features released to production"
    ],
    location: "Remote"
  },
  {
    title: "Student Mentor",
    organization: "SRMIST",
    duration: "2022 - 2023",
    description: [
      "Mentored junior students in programming fundamentals",
      "Organized coding competitions and hackathons",
      "Created learning resources and documentation"
    ],
    skills: ["Mentoring", "Event Planning", "Documentation"],
    icon: <GraduationCap className="w-6 h-6" />,
    color: "#9f7aea", // Purple
    achievements: [
      "Mentored 25+ students with 90% showing improved grades",
      "Organized 3 hackathons with 150+ total participants"
    ],
    location: "SRMIST, Chennai"
  }
];

export const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center">
            Leadership & Experience
          </h2>
          <p className="text-center mt-4 text-gray-300 max-w-2xl mx-auto">
            My professional journey through various roles and responsibilities that have shaped my career.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={item}
              className="relative"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <motion.div 
                className={`glass-card p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'ring-2 ring-opacity-50' : ''}`}
                style={{ 
                  ringColor: exp.color,
                  cursor: "pointer"
                }}
                onClick={() => toggleExpand(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 opacity-0 blur-xl"
                  animate={{ 
                    opacity: hoverIndex === index || expandedIndex === index ? 0.1 : 0,
                    backgroundColor: exp.color
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Timeline dot and line */}
                <div className="absolute left-8 top-0 h-full z-0 hidden md:block">
                  <div className="absolute left-0 top-8 w-3 h-3 rounded-full" style={{ backgroundColor: exp.color }}></div>
                  <div className="absolute left-1.5 top-8 w-0.5 h-full bg-gray-700"></div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                  <motion.div 
                    className="p-3 glass rounded-lg flex-shrink-0 md:ml-10"
                    animate={{ 
                      backgroundColor: hoverIndex === index || expandedIndex === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: hoverIndex === index || expandedIndex === index ? `0 0 15px rgba(255, 255, 255, 0.3)` : '0 0 0 rgba(0, 0, 0, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ 
                        color: hoverIndex === index || expandedIndex === index ? exp.color : '#fff'
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {exp.icon}
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <motion.h3 
                        className="text-xl md:text-2xl font-semibold"
                        animate={{ 
                          color: hoverIndex === index || expandedIndex === index ? exp.color : '#fff'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {exp.title}
                      </motion.h3>
                      
                      <div className="flex items-center text-sm text-gray-400 mt-1 md:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <p className="text-gray-300">{exp.organization}</p>
                      <p className="text-gray-400 text-sm mt-1 md:mt-0 flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {exp.location}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" style={{ backgroundColor: exp.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="text-xs py-1 px-2 rounded-full bg-gray-800 text-gray-300"
                          style={{ borderLeft: `3px solid ${exp.color}` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Expandable content */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: expandedIndex === index ? 'auto' : 0,
                        opacity: expandedIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="font-semibold mb-2" style={{ color: exp.color }}>Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-gray-300 flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: exp.color }} />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Expand/collapse indicator */}
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                        animate={{
                          rotate: expandedIndex === index ? 45 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        aria-label={expandedIndex === index ? "Collapse details" : "Expand details"}
                      >
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">{expandedIndex === index ? "Less Details" : "More Details"}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
