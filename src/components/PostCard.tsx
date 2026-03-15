import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { type Post, calculateEngagement } from "@/lib/sampleData";

interface Props {
  post: Post;
  index: number;
  weights?: { likes: number; comments: number; shares: number };
}

export default function PostCard({ post, index, weights }: Props) {
  const score = calculateEngagement(post, weights);
  const trendIcons = { trending: TrendingUp, rising: TrendingUp, declining: TrendingDown };
  const trendColors = { trending: "text-success", rising: "text-primary", declining: "text-destructive" };
  const status = post.trendStatus || "rising";
  const TrendIcon = trendIcons[status] || Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-4 hover:glow-border transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ backgroundColor: post.avatar + "22", color: post.avatar }}
        >
          {post.author[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground truncate">{post.author}</span>
            <span className="text-xs text-muted-foreground">{post.handle}</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{post.language}</span>
          </div>
          <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{post.content}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {post.hashtags.map(tag => (
              <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes.toLocaleString()}</span>
            <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {post.shares.toLocaleString()}</span>
            <span className={`flex items-center gap-1 ml-auto ${trendColors[status]}`}>
              <TrendIcon className="w-3 h-3" />
              Score: {score.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
