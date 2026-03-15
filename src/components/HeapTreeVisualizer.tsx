import { motion } from "framer-motion";

interface Props {
  data: number[];
}

export default function HeapTreeVisualizer({ data }: Props) {
  if (!data.length) return null;

  const levels: number[][] = [];
  let idx = 0;
  let levelSize = 1;
  while (idx < data.length) {
    levels.push(data.slice(idx, idx + levelSize));
    idx += levelSize;
    levelSize *= 2;
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Max Heap Tree</h3>
      <div className="space-y-4">
        {levels.map((level, li) => (
          <div key={li} className="flex justify-center gap-2" style={{ gap: `${Math.max(4, 60 / (li + 1))}px` }}>
            {level.map((val, vi) => (
              <motion.div
                key={`${li}-${vi}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (li * 2 + vi) * 0.05 }}
                className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-sm font-mono text-primary glow-border"
              >
                {val}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
