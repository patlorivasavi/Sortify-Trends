import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { samplePosts, calculateEngagement, generateRandomActivity } from "@/lib/sampleData";

export default function LeaderboardPage() {
  const [posts, setPosts] = useState(samplePosts);

  const ranked = useMemo(() =>
    [...posts]
      .map(p => ({ ...p, score: calculateEngagement(p) }))
      .sort((a, b) => b.score - a.score),
    [posts]
  );

  const topCreators = useMemo(() => {
    const map = new Map<string, { author: string; totalScore: number; postCount: number }>();
    ranked.forEach(p => {
      const existing = map.get(p.author) || { author: p.author, totalScore: 0, postCount: 0 };
      existing.totalScore += p.score;
      existing.postCount += 1;
      map.set(p.author, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.totalScore - a.totalScore);
  }, [ranked]);

  const podiumIcons = [Crown, Trophy, Medal];
  const podiumColors = ["text-warning", "text-primary", "text-secondary"];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-2">Leaderboard</h1>
          <p className="text-muted-foreground mb-6">Top posts and creators ranked by engagement score using sorting algorithms</p>
        </motion.div>

        <Button onClick={() => setPosts(generateRandomActivity(posts))} className="bg-primary text-primary-foreground gap-2 mb-6">
          <Shuffle className="w-4 h-4" /> Simulate Activity
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Posts */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-warning" /> Top Posts
            </h2>

            {/* Podium */}
            <div className="flex items-end justify-center gap-4 mb-6 h-48">
              {[1, 0, 2].map(i => {
                const post = ranked[i];
                if (!post) return null;
                const heights = [160, 128, 96];
                const Icon = podiumIcons[i];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: heights[i], opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                    className="w-28 glass-card rounded-t-xl flex flex-col items-center justify-start p-3 relative"
                  >
                    <Icon className={`w-6 h-6 ${podiumColors[i]} mb-1`} />
                    <span className="text-xs text-foreground font-semibold text-center truncate w-full">{post.author}</span>
                    <span className="text-[10px] text-muted-foreground">{post.language}</span>
                    <span className="text-xs font-mono text-primary mt-1">{post.score.toLocaleString()}</span>
                    <span className="absolute -top-3 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">{i + 1}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Full list */}
            <div className="space-y-2">
              {ranked.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{post.author}</p>
                    <p className="text-xs text-muted-foreground truncate">{post.content.slice(0, 50)}...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-primary">{post.score.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{post.language}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Creators */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-warning" /> Top Creators
            </h2>
            <div className="space-y-2">
              {topCreators.map((c, i) => (
                <motion.div
                  key={c.author}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 flex items-center gap-3"
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{c.author}</p>
                    <p className="text-xs text-muted-foreground">{c.postCount} post{c.postCount > 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-primary">{c.totalScore.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">total score</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Most Viral */}
            <div className="glass-card p-4 mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">🚀 Most Viral Post</h3>
              {ranked[0] && (
                <div>
                  <p className="text-sm text-foreground mb-2">{ranked[0].content}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>❤️ {ranked[0].likes.toLocaleString()}</span>
                    <span>💬 {ranked[0].comments.toLocaleString()}</span>
                    <span>🔄 {ranked[0].shares.toLocaleString()}</span>
                    <span className="ml-auto text-primary font-mono">Score: {ranked[0].score.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
