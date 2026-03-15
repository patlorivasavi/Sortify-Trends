import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type SortStep, type AlgorithmResult, mergeSortSteps, quickSortSteps, heapSortSteps } from "@/lib/algorithms";

interface Props {
  algorithm: "merge" | "quick" | "heap";
  data: number[];
  onComplete?: (result: AlgorithmResult) => void;
}

export default function SortVisualizer({ algorithm, data, onComplete }: Props) {
  const [result, setResult] = useState<AlgorithmResult | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const maxVal = Math.max(...data);

  const run = useCallback(() => {
    const fn = algorithm === "merge" ? mergeSortSteps : algorithm === "quick" ? quickSortSteps : heapSortSteps;
    const r = fn(data);
    setResult(r);
    setStepIdx(0);
    setPlaying(false);
    onComplete?.(r);
  }, [algorithm, data, onComplete]);

  useEffect(() => { run(); }, [run]);

  useEffect(() => {
    if (playing && result) {
      intervalRef.current = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= result.steps.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, speed, result]);

  if (!result) return null;
  const step = result.steps[stepIdx];

  const algoNames = { merge: "Merge Sort", quick: "Quick Sort", heap: "Heap Sort" };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{algoNames[algorithm]}</h3>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Comparisons: <span className="text-primary">{result.comparisons}</span></span>
          <span>Swaps: <span className="text-secondary">{result.swaps}</span></span>
          <span>Time: <span className="text-success">{result.timeMs.toFixed(2)}ms</span></span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-[2px] h-48 px-2">
        {step.array.map((val, i) => {
          const isComparing = step.comparing.includes(i);
          const isSwapping = step.swapping.includes(i);
          const isPivot = step.pivot === i;
          const isSorted = step.sorted.includes(i);
          let bg = "bg-muted-foreground/40";
          if (isSorted) bg = "bg-primary";
          if (isComparing) bg = "bg-info";
          if (isSwapping) bg = "bg-secondary";
          if (isPivot) bg = "bg-warning";

          return (
            <motion.div
              key={i}
              className={`flex-1 rounded-t-sm bar-animation ${bg} ${isSwapping ? "swap-highlight" : ""} ${isPivot ? "pivot-highlight" : ""}`}
              style={{ height: `${(val / maxVal) * 100}%` }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          );
        })}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground font-mono text-center h-5">{step.description}</p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" onClick={run} className="border-glass-border hover:bg-muted">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} className="border-glass-border hover:bg-muted">
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          onClick={() => setPlaying(!playing)}
          className="bg-primary text-primary-foreground hover:bg-primary/80"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={() => setStepIdx(Math.min(result.steps.length - 1, stepIdx + 1))} className="border-glass-border hover:bg-muted">
          <SkipForward className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-1 ml-4">
          <Zap className="w-3 h-3 text-warning" />
          {[500, 300, 100, 30].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 text-xs rounded ${speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {s === 500 ? "0.5x" : s === 300 ? "1x" : s === 100 ? "2x" : "5x"}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-muted rounded-full h-1">
        <div className="bg-primary h-1 rounded-full transition-all" style={{ width: `${(stepIdx / (result.steps.length - 1)) * 100}%` }} />
      </div>
      <p className="text-xs text-muted-foreground text-center">Step {stepIdx + 1} / {result.steps.length}</p>
    </div>
  );
}
