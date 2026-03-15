import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Binary, Layers, Zap, GitCompare, Play, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: BarChart3, title: "Sorting Visualizer", desc: "Watch Merge, Quick & Heap sort in real-time with step controls", color: "text-primary" },
  { icon: Binary, title: "Binary Search", desc: "Step-by-step search visualization on sorted trend data", color: "text-info" },
  { icon: Layers, title: "Heap Priority Queue", desc: "Max Heap tree for top trending hashtags", color: "text-accent" },
  { icon: GitCompare, title: "Algorithm Comparison", desc: "Race algorithms side-by-side with metrics", color: "text-secondary" },
  { icon: Zap, title: "Engagement Simulator", desc: "Live engagement with custom scoring weights", color: "text-warning" },
  { icon: Globe, title: "Multilingual Feed", desc: "Telugu, Kannada, Korean, Hindi, Tamil & more", color: "text-success" },
];

const algorithms = [
  { name: "Merge Sort", complexity: "O(n log n)", type: "Divide & Conquer" },
  { name: "Quick Sort", complexity: "O(n log n) avg", type: "Partition" },
  { name: "Heap Sort", complexity: "O(n log n)", type: "Priority Queue" },
  { name: "Binary Search", complexity: "O(log n)", type: "Searching" },
  { name: "Greedy", complexity: "O(n log n)", type: "Optimization" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* BG effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <TrendingUp className="w-4 h-4" />
              DAA Algorithm Visualizer • PBL Project
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="gradient-text">TrendRank</span>
              <br />
              <span className="text-foreground">Social Media Feed Optimizer</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Visualize how sorting, searching & greedy algorithms power real-time social media trend ranking — with multilingual posts from Telugu, Kannada, Korean & more.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/visualizer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border gap-2">
                  <Play className="w-5 h-5" /> Launch Visualizer <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-glass-border hover:bg-muted gap-2">
                  <BarChart3 className="w-5 h-5" /> Trend Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Algorithms */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-2xl font-bold text-center mb-8 text-foreground">
          Algorithms Implemented
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-3">
          {algorithms.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card px-5 py-3 flex flex-col items-center gap-1"
            >
              <span className="font-semibold text-foreground text-sm">{a.name}</span>
              <span className="text-xs font-mono text-primary">{a.complexity}</span>
              <span className="text-[10px] text-muted-foreground">{a.type}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:glow-border transition-shadow group"
            >
              <f.icon className={`w-8 h-8 ${f.color} mb-3 group-hover:scale-110 transition-transform`} />
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-glass-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>TrendRank — Real-Time Social Media Trend Sorter</p>
          <p className="mt-1">DAA (Design & Analysis of Algorithms) PBL Project</p>
        </div>
      </footer>
    </div>
  );
}
