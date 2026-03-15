import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { binarySearchSteps } from "@/lib/algorithms";

interface Props {
  data: number[];
}

export default function BinarySearchVisualizer({ data }: Props) {
  const sorted = [...data].sort((a, b) => a - b);
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<ReturnType<typeof binarySearchSteps> | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  const search = () => {
    const t = parseInt(target);
    if (isNaN(t)) return;
    const r = binarySearchSteps(sorted, t);
    setResult(r);
    setStepIdx(0);
  };

  const step = result?.steps[stepIdx];

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Binary Search</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Enter value to search..."
          value={target}
          onChange={e => setTarget(e.target.value)}
          className="bg-muted border-glass-border"
          onKeyDown={e => e.key === "Enter" && search()}
        />
        <Button onClick={search} className="bg-primary text-primary-foreground">
          <Search className="w-4 h-4 mr-1" /> Search
        </Button>
      </div>

      {/* Array visualization */}
      <div className="flex gap-1 flex-wrap">
        {sorted.map((val, i) => {
          let bg = "bg-muted";
          if (step) {
            if (i === step.mid) bg = step.found ? "bg-success" : "bg-warning";
            else if (i >= step.low && i <= step.high) bg = "bg-primary/20";
            else bg = "bg-muted/30";
          }
          return (
            <motion.div
              key={i}
              className={`w-12 h-10 ${bg} rounded flex items-center justify-center text-xs font-mono text-foreground transition-colors`}
              layout
            >
              {val}
            </motion.div>
          );
        })}
      </div>

      {step && (
        <div className="space-y-2">
          <p className="text-sm font-mono text-muted-foreground">{step.description}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={stepIdx === 0} onClick={() => setStepIdx(stepIdx - 1)} className="border-glass-border">Prev</Button>
            <Button variant="outline" size="sm" disabled={!result || stepIdx >= result.steps.length - 1} onClick={() => setStepIdx(stepIdx + 1)} className="border-glass-border">Next</Button>
          </div>
          <div className="flex gap-4 text-xs font-mono text-muted-foreground">
            <span>Low: <span className="text-primary">{step.low}</span></span>
            <span>Mid: <span className="text-warning">{step.mid}</span></span>
            <span>High: <span className="text-secondary">{step.high}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
