import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { Github, Code, Award, TrendingUp, Trophy, Target, Timer, CheckCircle2, LineChart } from "lucide-react";
import { useState } from "react";

// Sample LeetCode problem data
const leetcodeStats = {
  problemsSolved: 250,
  contestRating: 1650,
  globalRank: "Top 10%",
  recentProblems: [
    { name: "Longest Common Subsequence", difficulty: "Medium", solved: "2 days ago" },
    { name: "Binary Tree Maximum Path Sum", difficulty: "Hard", solved: "1 week ago" },
    { name: "Merge Intervals", difficulty: "Medium", solved: "2 weeks ago" },
    { name: "Two Sum", difficulty: "Easy", solved: "3 weeks ago" }
  ],
  monthlySolvedCount: [12, 15, 23, 18, 25, 30, 22, 28, 32, 35, 30, 28]
};

// Sample contribution stats
const contributionStats = {
  repositoriesContributed: 15,
  issuesClosed: 28,
  pullRequestsMerged: 42,
  codeReviews: 35,
  totalCommits: 750
};

export const Contributions = () => {
  const [activeTab, setActiveTab] = useState("github");
  
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
  const customTooltip = ({ date, count }) => (
    <div className="bg-gray-900 px-3 py-2 rounded-md border border-gray-700 shadow-lg">
      <span className="block text-sm">
        <span className="font-medium">{count}</span> contributions on {" "}
        <span className="font-medium">{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
      </span>
    </div>
  );

  // Custom color scale for GitHub calendar
  const colorScale = ["#0e1117", "#0e4429", "#006d32", "#26a641", "#39d353"];

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

        {/* Content based on active tab */}
        <div className="content-area">
          {activeTab === "github" ? (
            <GitHubCalendar
              username="your-github-username"
              colorScale={colorScale}
              tooltip={customTooltip}
            />
          ) : (
            <div className="leetcode-stats text-center">
              <p className="text-lg font-semibold">Problems Solved: {leetcodeStats.problemsSolved}</p>
              <p>Contest Rating: {leetcodeStats.contestRating}</p>
              <p>Global Rank: {leetcodeStats.globalRank}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
