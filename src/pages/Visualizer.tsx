import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SortVisualizer from "@/components/SortVisualizer";
import BinarySearchVisualizer from "@/components/BinarySearchVisualizer";
import HeapTreeVisualizer from "@/components/HeapTreeVisualizer";
import { samplePosts, calculateEngagement } from "@/lib/sampleData";
import { type AlgorithmResult } from "@/lib/algorithms";

type AlgoTab = "merge" | "quick" | "heap" | "binary" | "compare";

const tabs: { id: AlgoTab; label: string }[] = [
  { id: "merge", label: "Merge Sort" },
  { id: "quick", label: "Quick Sort" },
  { id: "heap", label: "Heap Sort" },
  { id: "binary", label: "Binary Search" },
  { id: "compare", label: "⚡ Compare All" },
];

export default function VisualizerPage() {
  const [active, setActive] = useState<AlgoTab>("merge");
  const [results, setResults] = useState<Record<string, AlgorithmResult>>({});

  const scores = useMemo(() => samplePosts.map(p => calculateEngagement(p)), []);

  const handleComplete = (algo: string) => (result: AlgorithmResult) => {
    setResults(prev => ({ ...prev, [algo]: result }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-2">Algorithm Visualizer</h1>
          <p className="text-muted-foreground mb-6">Watch sorting algorithms process social media engagement scores step-by-step</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === t.id ? "bg-primary text-primary-foreground glow-border" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-info inline-block" /> Comparing</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary inline-block" /> Swapping</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-warning inline-block" /> Pivot</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Sorted</span>
        </div>

        {/* Content */}
        {active === "compare" ? (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-4">
              {(["merge", "quick", "heap"] as const).map(algo => (
                <SortVisualizer key={algo} algorithm={algo} data={scores} onComplete={handleComplete(algo)} />
              ))}
            </div>
            {Object.keys(results).length === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Comparison Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-glass-border text-muted-foreground">
                        <th className="text-left py-2">Algorithm</th>
                        <th className="text-right py-2">Comparisons</th>
                        <th className="text-right py-2">Swaps</th>
                        <th className="text-right py-2">Steps</th>
                        <th className="text-right py-2">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(["merge", "quick", "heap"] as const).map(algo => {
                        const r = results[algo];
                        if (!r) return null;
                        return (
                          <tr key={algo} className="border-b border-glass-border/50">
                            <td className="py-2 font-medium text-foreground capitalize">{algo} Sort</td>
                            <td className="text-right text-primary font-mono">{r.comparisons}</td>
                            <td className="text-right text-secondary font-mono">{r.swaps}</td>
                            <td className="text-right text-accent font-mono">{r.steps.length}</td>
                            <td className="text-right text-success font-mono">{r.timeMs.toFixed(2)}ms</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        ) : active === "binary" ? (
          <BinarySearchVisualizer data={scores} />
        ) : (
          <div className="space-y-6">
            <SortVisualizer algorithm={active} data={scores} />
            {active === "heap" && <HeapTreeVisualizer data={[...scores].sort((a, b) => b - a).slice(0, 15)} />}
          </div>
        )}

        {/* Data source info */}
        <div className="mt-8 glass-card p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Data Source</h4>
          <p className="text-xs text-muted-foreground">Engagement scores calculated from {samplePosts.length} multilingual social media posts using formula: <span className="font-mono text-primary">Score = (likes × 1) + (comments × 2) + (shares × 3)</span></p>
          <div className="flex flex-wrap gap-2 mt-2">
            {scores.map((s, i) => (
              <span key={i} className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
