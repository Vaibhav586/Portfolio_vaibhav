import { motion } from "framer-motion";
import { Award, ExternalLink, Download, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const certifications = [
  {
    title: "Process Data from Dirty to Clean",
    issuer: "Google - Coursera",
    date: "2023",
    credential: "GC2345678",
    color: "#4285F4", // Google Blue
    description: "Comprehensive training in data processing techniques, data cleaning methodologies, and preparing datasets for effective analysis.",
    skills: ["Data Cleaning", "Data Processing", "Data Analysis"]
  },
  {
    title: "Oracle Cloud Infrastructure Associate (1Z0-1085-24)",
    issuer: "Oracle",
    date: "2023",
    credential: "OC1234567",
    color: "#f80000", // Oracle Red
    description: "Verification of understanding Oracle Cloud Infrastructure services and implementation capabilities.",
    skills: ["Cloud Computing", "OCI Services", "Cloud Security"]
  },
  {
    title: "Introduction to Responsible AI",
    issuer: "Google Cloud - Coursera",
    date: "2023",
    credential: "GC987654",
    color: "#34A853", // Google Green
    description: "Recognition of expertise in ethical AI principles, fairness in machine learning, and responsible AI development practices.",
    skills: ["AI Ethics", "Fairness", "Responsible ML"]
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2023",
    credential: "CS654321",
    color: "#1BA0D7", // Cisco Blue
    description: "Foundational knowledge in cybersecurity principles, threat detection, and implementing basic security protocols.",
    skills: ["Network Security", "Threat Detection", "Security Fundamentals"]
  },
  {
    title: "Zero Trust Cloud Security",
    issuer: "AICTE",
    date: "2023",
    credential: "AT123456",
    color: "#9F7AEA", // Purple
    description: "Advanced training in zero trust security architecture implementation for cloud environments.",
    skills: ["Zero Trust", "Cloud Security", "Security Architecture"]
  }
];

export const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCerts, setFilteredCerts] = useState(certifications);
  const modalRef = useRef(null);

  // Filter certifications based on search term
  useEffect(() => {
    const filtered = certifications.filter(cert => 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCerts(filtered);
  }, [searchTerm]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e, index, cert) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(cert);
    }
  };

  const openModal = (cert) => {
    setSelectedCert(cert);
    setModalOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.div
          className="mb-12 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center">
            Certifications
          </h2>
          <p className="text-center mt-4 text-gray-300 max-w-2xl">
            Professional certifications and qualifications that validate my technical skills and knowledge.
          </p>
          
          {/* Search bar */}
          <div className="relative mt-6 w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, issuer or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search certifications"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-400">
                Found {filteredCerts.length} result{filteredCerts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={item}
                className="group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <motion.div 
                  className="glass-card p-6 h-full relative overflow-hidden cursor-pointer"
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => openModal(cert)}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, index, cert)}
                  role="button"
                  aria-label={`View details of ${cert.title} certification`}
                >
                  {/* Animated background glow */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 blur-xl"
                    animate={{ 
                      opacity: activeIndex === index ? 0.15 : 0,
                      backgroundColor: cert.color
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className="p-3 glass rounded-lg flex-shrink-0"
                      animate={{ 
                        backgroundColor: activeIndex === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: activeIndex === index ? `0 0 15px rgba(255, 255, 255, 0.3)` : '0 0 0 rgba(0, 0, 0, 0)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={{ 
                          rotateY: activeIndex === index ? 360 : 0,
                          color: activeIndex === index ? cert.color : '#fff'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Award className="w-6 h-6" />
                      </motion.div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl font-semibold mb-2"
                        animate={{ 
                          color: activeIndex === index ? cert.color : '#fff'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {cert.title}
                      </motion.h3>
                      <p className="text-gray-300 text-sm mb-1">Issuer: {cert.issuer}</p>
                      <p className="text-gray-300 text-sm mb-1">Date: {cert.date}</p>
                      <p className="text-gray-300 text-sm">Credential ID: {cert.credential}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cert.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="text-xs py-1 px-2 rounded-full bg-gray-800 text-gray-300"
                            style={{ borderLeft: `3px solid ${cert.color}` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="mt-4 flex gap-2 items-center text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: activeIndex === index ? 1 : 0,
                          y: activeIndex === index ? 0 : 10
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button 
                          className="flex items-center gap-1 px-4 py-2 rounded-full glass"
                          whileHover={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Verification logic would go here
                            window.open("#", "_blank");
                          }}
                          aria-label={`Verify ${cert.title} certification`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Verify</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-400"
              >
                No certifications found matching "{searchTerm}".
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        {modalOpen && selectedCert && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={modalRef}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-2xl w-full relative glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selectedCert.color }}></div>
              
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${selectedCert.color}25` }}>
                    <Award className="w-8 h-8" style={{ color: selectedCert.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1" style={{ color: selectedCert.color }}>
                      {selectedCert.title}
                    </h3>
                    <p className="text-gray-300">{selectedCert.issuer}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-gray-300 mb-2 font-semibold">Description</h4>
                  <p className="text-gray-400">{selectedCert.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-gray-300 mb-2 font-semibold">Issue Date</h4>
                    <p className="text-gray-400">{selectedCert.date}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-300 mb-2 font-semibold">Credential ID</h4>
                    <p className="text-gray-400">{selectedCert.credential}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-gray-300 mb-2 font-semibold">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="text-sm py-1 px-3 rounded-full" 
                        style={{ 
                          backgroundColor: `${selectedCert.color}15`,
                          color: selectedCert.color,
                          border: `1px solid ${selectedCert.color}50`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-8">
                  <motion.button 
                    className="flex items-center gap-2 px-5 py-2 rounded-lg glass"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ backgroundColor: selectedCert.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Verification logic would go here
                      window.open("#", "_blank");
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Verify Certificate</span>
                  </motion.button>
                  
                  <motion.button 
                    className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
