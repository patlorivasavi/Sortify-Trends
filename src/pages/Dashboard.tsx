import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, TrendingDown, ArrowUpDown, Shuffle, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import PostCard from "@/components/PostCard";
import { samplePosts, hashtagData, calculateEngagement, generateRandomActivity, type Post } from "@/lib/sampleData";

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [weights, setWeights] = useState({ likes: 1, comments: 2, shares: 3 });
  const [showWeights, setShowWeights] = useState(false);

  const rankedPosts = useMemo(() => {
    return [...posts]
      .map(p => ({ ...p, engagementScore: calculateEngagement(p, weights) }))
      .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
      .map((p, i) => ({
        ...p,
        trendStatus: (i < 3 ? "trending" : i < 8 ? "rising" : "declining") as Post["trendStatus"],
      }));
  }, [posts, weights]);

  const topHashtags = useMemo(() => [...hashtagData].sort((a, b) => b.count - a.count).slice(0, 10), []);

  const trendPrediction = useMemo(() => {
    return rankedPosts.slice(0, 5).map(p => {
      const hoursSincePost = (Date.now() - p.timestamp.getTime()) / 3600000;
      const trendScore = (p.engagementScore ?? 0) / Math.max(hoursSincePost, 1);
      return { ...p, trendScore };
    });
  }, [rankedPosts]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-2">Trend Dashboard</h1>
          <p className="text-muted-foreground mb-6">Live social media analytics with greedy algorithm ranking</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={() => setPosts(generateRandomActivity(posts))} className="bg-primary text-primary-foreground gap-2">
            <Shuffle className="w-4 h-4" /> Generate Activity
          </Button>
          <Button variant="outline" onClick={() => setShowWeights(!showWeights)} className="border-glass-border gap-2">
            <Sliders className="w-4 h-4" /> Weights
          </Button>
        </div>

        {/* Weight Controls */}
        {showWeights && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-4 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-primary" /> Engagement Score Weights
            </h3>
            <p className="text-xs text-muted-foreground mb-3 font-mono">Score = (likes × {weights.likes}) + (comments × {weights.comments}) + (shares × {weights.shares})</p>
            <div className="grid md:grid-cols-3 gap-4">
              {(["likes", "comments", "shares"] as const).map(key => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span className="text-primary font-mono">{weights[key]}</span>
                  </div>
                  <Slider
                    value={[weights[key]]}
                    onValueChange={([v]) => setWeights(w => ({ ...w, [key]: v }))}
                    min={0}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-primary" /> Ranked Feed ({rankedPosts.length} posts)
            </h2>
            {rankedPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} weights={weights} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Top Hashtags */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-warning" /> Top Hashtags
              </h3>
              <div className="space-y-2">
                {topHashtags.map((h, i) => (
                  <motion.div
                    key={h.tag}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground w-4">{i + 1}</span>
                      <span className="text-sm text-primary">{h.tag}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{h.count.toLocaleString()}</span>
                      {h.trend === "trending" && <TrendingUp className="w-3 h-3 text-success" />}
                      {h.trend === "rising" && <TrendingUp className="w-3 h-3 text-primary" />}
                      {h.trend === "declining" && <TrendingDown className="w-3 h-3 text-destructive" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trend Prediction */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">🔥 Trending Prediction</h3>
              <div className="space-y-2">
                {trendPrediction.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <span className="text-xs text-foreground truncate max-w-[140px]">{p.author}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-mono text-warning">{p.trendScore.toFixed(0)}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${i === 0 ? "bg-destructive/20 text-destructive" : i < 3 ? "bg-warning/20 text-warning" : "bg-primary/20 text-primary"}`}>
                        {i === 0 ? "🔥 Hot" : i < 3 ? "⚡ Rising" : "📈 Growing"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Distribution */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">🌍 Languages</h3>
              <div className="space-y-1.5">
                {Object.entries(posts.reduce((acc, p) => { acc[p.language] = (acc[p.language] || 0) + 1; return acc; }, {} as Record<string, number>))
                  .sort(([, a], [, b]) => b - a)
                  .map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(count / posts.length) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-20 text-right">{lang} ({count})</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
