import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { Github, Code, Award, TrendingUp, Trophy, Target, Timer, CheckCircle2, LineChart } from "lucide-react";
import { useState, useEffect } from "react";
// Remove direct axios import and use mockData instead since axios is causing build issues
// Sample LeetCode problem data
const Contributions = () => {
  const leetcodeStats = {
    problemsSolved: 250,
    contestRating: 1650,
    globalRank: "Top 10%"
  };

  return; // This is valid inside a function or component
};

// Sample contribution stats
const contributionStats = {
  repositoriesContributed: 15,
  issuesClosed: 28,
  pullRequestsMerged: 42,
  codeReviews: 35,
  totalCommits: 750
};
    
    return () => clearTimeout(timer);

  // Animation variants
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

  // Custom tooltip for GitHub calendar
  const customTooltip = ({ date, count }) => {
    return (
      <div className="bg-gray-900 px-3 py-2 rounded-md border border-gray-700 shadow-lg">
        <span className="block text-sm">
          <span className="font-medium">{count}</span> contributions on{" "}
          <span className="font-medium">{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </span>
      </div>
    );
  };

  // Custom color scale for GitHub calendar
  const colorScale = [
    "#0e1117", // darker background
    "#0e4429", 
    "#006d32", 
    "#26a641", 
    "#39d353"  // brighter green
  ];

  // Month labels
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl w-full">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center">
            Contributions & Activity
          </h2>
          <p className="text-center mt-4 text-gray-300 max-w-2xl mx-auto">
            Tracking my development journey through code contributions and problem-solving activities.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass inline-flex rounded-full p-1">
            <motion.button
              className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === "github" ? "bg-primary text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActiveTab("github")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4" />
              GitHub Activity
            </motion.button>
            <motion.button
              className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === "leetcode" ? "bg-primary text-white" : "hover:bg-gray-800"}`}
              onClick={() => setActiveTab("leetcode")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Code className="w-4 h-4" />
              LeetCode Progress
            </motion.button>
          </div>
        </div>

        {/* GitHub Tab */}
        {activeTab === "github" && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <div className="p-3 glass rounded-lg">
                    <Github className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">GitHub Contributions</h3>
                </div>
                <a 
                  href="https://github.com/Vaibhav586" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  View Profile 
                  <TrendingUp className="w-4 h-4" />
                </a>
              </div>

              <div className="my-8 overflow-x-auto">
                <GitHubCalendar
                  username="Vaibhav586"
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={5}
                  fontSize={14}
                  tooltipItem={customTooltip}
                  theme={{
                    dark: colorScale
                  }}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  labels={{
                    totalCount: "{{count}} contributions in the last year"
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                <motion.div 
                  className="glass p-4 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Repositories</h4>
                    <div className="p-1 rounded bg-green-500 bg-opacity-20">
                      <Trophy className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{contributionStats.repositoriesContributed}</p>
                </motion.div>
                
                <motion.div 
                  className="glass p-4 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Issues Closed</h4>
                    <div className="p-1 rounded bg-blue-500 bg-opacity-20">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{contributionStats.issuesClosed}</p>
                </motion.div>
                
                <motion.div 
                  className="glass p-4 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-300">PRs Merged</h4>
                    <div className="p-1 rounded bg-purple-500 bg-opacity-20">
                      <Code className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{contributionStats.pullRequestsMerged}</p>
                </motion.div>
                
                <motion.div 
                  className="glass p-4 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Code Reviews</h4>
                    <div className="p-1 rounded bg-orange-500 bg-opacity-20">
                      <Timer className="w-4 h-4 text-orange-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{contributionStats.codeReviews}</p>
                </motion.div>
                
                <motion.div 
                  className="glass p-4 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Total Commits</h4>
                    <div className="p-1 rounded bg-teal-500 bg-opacity-20">
                      <Target className="w-4 h-4 text-teal-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{contributionStats.totalCommits}+</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* LeetCode Tab */}
        {activeTab === "leetcode" && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="glass-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <div className="p-3 glass rounded-lg">
                    <Code className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-semibold">LeetCode Progress</h3>
                </div>
                <a 
                  href="https://leetcode.com/Vaibhav_586" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  View Profile 
                  <TrendingUp className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  className="glass p-6 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-gray-300">Problems Solved</h4>
                    <div className="p-1 rounded bg-green-500 bg-opacity-20">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">{leetcodeStats.problemsSolved}+</p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs py-1 px-2 rounded-full bg-green-900 text-green-300">Easy: 120</span>
                    <span className="text-xs py-1 px-2 rounded-full bg-yellow-900 text-yellow-300">Medium: 95</span>
                    <span className="text-xs py-1 px-2 rounded-full bg-red-900 text-red-300">Hard: 35</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="glass p-6 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-gray-300">Contest Rating</h4>
                    <div className="p-1 rounded bg-blue-500 bg-opacity-20">
                      <Award className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">{leetcodeStats.contestRating}</p>
                  <div className="mt-2">
                    <span className="text-xs py-1 px-2 rounded-full bg-blue-900 text-blue-300">Knight Badge</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="glass p-6 rounded-xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-gray-300">Global Rank</h4>
                    <div className="p-1 rounded bg-purple-500 bg-opacity-20">
                      <Trophy className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">{leetcodeStats.globalRank}</p>
                  <div className="mt-2">
                    <span className="text-xs py-1 px-2 rounded-full bg-purple-900 text-purple-300">Top Performer</span>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 glass p-6 rounded-xl">
                  <h4 className="text-lg font-medium mb-4">Recent Problems</h4>
                  <div className="space-y-3">
                    {leetcodeStats.recentProblems.map((problem, index) => (
                      <div key={index} className="flex items-center justify-between pb-2 border-b border-gray-700">
                        <div>
                          <p className="text-sm font-medium">{problem.name}</p>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                              problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                              'bg-red-900 text-red-300'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{problem.solved}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 glass p-6 rounded-xl">
                  <h4 className="text-lg font-medium mb-4">Monthly Activity</h4>
                  <div className="h-48">
                    <div className="flex h-40 items-end justify-between gap-1">
                      {leetcodeStats.monthlySolvedCount.map((count, i) => (
                        <div key={i} className="relative group">
                          <motion.div 
                            className="w-8 bg-gradient-to-t from-primary/30 to-primary rounded-t"
                            initial={{ height: 0 }}
                            animate={{ height: `${(count/35) * 100}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {count} problems
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {months.map((month, i) => (
                        <div key={i} className="text-xs text-gray-400">{month}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );

export default Contributions;
