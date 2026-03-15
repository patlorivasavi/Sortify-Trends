import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Dices, Plus, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import SortVisualizer from "@/components/SortVisualizer";

export default function PlaygroundPage() {
  const [numPosts, setNumPosts] = useState(20);
  const [algorithm, setAlgorithm] = useState<"merge" | "quick" | "heap">("quick");
  const [customData, setCustomData] = useState<number[]>([]);
  const [newValue, setNewValue] = useState("");
  const [running, setRunning] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const randomData = useMemo(() =>
    Array.from({ length: numPosts }, () => Math.floor(Math.random() * 1000) + 10),
    [numPosts, runKey]
  );

  const data = customData.length > 0 ? customData : randomData;

  const addValue = () => {
    const v = parseInt(newValue);
    if (!isNaN(v) && v > 0) {
      setCustomData([...customData, v]);
      setNewValue("");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-2">Algorithm Playground</h1>
          <p className="text-muted-foreground mb-6">Experiment with custom data and algorithm parameters</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            <div className="glass-card p-4 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Configuration</h3>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Algorithm</label>
                <Select value={algorithm} onValueChange={v => setAlgorithm(v as typeof algorithm)}>
                  <SelectTrigger className="bg-muted border-glass-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="merge">Merge Sort</SelectItem>
                    <SelectItem value="quick">Quick Sort</SelectItem>
                    <SelectItem value="heap">Heap Sort</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Random Posts</span>
                  <span className="text-primary font-mono">{numPosts}</span>
                </div>
                <Slider value={[numPosts]} onValueChange={([v]) => { setNumPosts(v); setCustomData([]); }} min={5} max={100} step={5} />
              </div>

              <Button onClick={() => { setCustomData([]); setRunKey(k => k + 1); }} className="w-full bg-primary text-primary-foreground gap-2">
                <Dices className="w-4 h-4" /> Randomize
              </Button>
            </div>

            {/* Custom Data */}
            <div className="glass-card p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Custom Data</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add value"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addValue()}
                  className="bg-muted border-glass-border"
                  type="number"
                />
                <Button size="icon" onClick={addValue} className="bg-primary text-primary-foreground shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {customData.length > 0 && (
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {customData.map((v, i) => (
                      <span key={i} className="text-xs font-mono bg-muted px-2 py-1 rounded flex items-center gap-1 text-foreground">
                        {v}
                        <button onClick={() => setCustomData(customData.filter((_, j) => j !== i))} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCustomData([])} className="border-glass-border text-xs">Clear All</Button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">📊 Data Info</h3>
              <div className="space-y-1 text-xs font-mono text-muted-foreground">
                <p>Elements: <span className="text-primary">{data.length}</span></p>
                <p>Min: <span className="text-primary">{Math.min(...data)}</span></p>
                <p>Max: <span className="text-primary">{Math.max(...data)}</span></p>
                <p>Source: <span className="text-primary">{customData.length > 0 ? "Custom" : "Random"}</span></p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="lg:col-span-3">
            <SortVisualizer key={`${algorithm}-${runKey}-${customData.join(",")}`} algorithm={algorithm} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
