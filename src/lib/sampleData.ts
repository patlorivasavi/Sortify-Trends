export interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  language: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  engagementScore?: number;
  trendStatus?: "trending" | "rising" | "declining";
}

const avatarColors = ["#00d4aa", "#d946ef", "#8b5cf6", "#f59e0b", "#ef4444", "#3b82f6", "#10b981"];
const getAvatar = (name: string) => {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
};

export const samplePosts: Post[] = [
  // Telugu
  { id: "1", author: "రాజేష్ కుమార్", handle: "@rajesh_te", avatar: getAvatar("R"), content: "ఈ రోజు IPL మ్యాచ్ చాలా బాగుంది! 🏏🔥 ఎంత థ్రిల్లింగ్ గా ఉందో!", language: "Telugu", hashtags: ["#IPL", "#Cricket", "#Hyderabad"], likes: 2340, comments: 189, shares: 456, timestamp: new Date("2025-03-15T10:30:00") },
  { id: "2", author: "ప్రియ శర్మ", handle: "@priya_te", avatar: getAvatar("P"), content: "AI టెక్నాలజీ భవిష్యత్తు మారుస్తుంది! మన విద్యార్థులు ఈ దిశలో అడుగులు వేయాలి 🤖✨", language: "Telugu", hashtags: ["#AI", "#TechIndia", "#FutureOfTech"], likes: 1890, comments: 234, shares: 678, timestamp: new Date("2025-03-15T11:00:00") },
  { id: "3", author: "వెంకట్ రెడ్డి", handle: "@venkat_r", avatar: getAvatar("V"), content: "హైదరాబాద్ బిర్యానీ world's best 🍛 ఎవరైనా disagree చేస్తే రండి debate చేద్దాం 😄", language: "Telugu", hashtags: ["#HyderabadBiryani", "#FoodieLife"], likes: 5670, comments: 890, shares: 1230, timestamp: new Date("2025-03-15T12:00:00") },
  // Kannada
  { id: "4", author: "ಅನಿಲ್ ಕುಮಾರ್", handle: "@anil_ka", avatar: getAvatar("A"), content: "ಬೆಂಗಳೂರು ಟೆಕ್ ಸಮ್ಮಿಟ್ ಅದ್ಭುತವಾಗಿತ್ತು! ಭಾರತದ ಸ್ಟಾರ್ಟ್ ಅಪ್ ಹಬ್ 🚀💻", language: "Kannada", hashtags: ["#BengaluruTech", "#StartupIndia"], likes: 3450, comments: 345, shares: 567, timestamp: new Date("2025-03-15T09:00:00") },
  { id: "5", author: "ಮೇಘಾ ರಾವ್", handle: "@megha_ka", avatar: getAvatar("M"), content: "ಮೈಸೂರು ದಸರಾ ಈ ವರ್ಷ ಎಷ್ಟು ಸುಂದರವಾಗಿದೆ! 🐘✨ ನಮ್ಮ ಸಂಸ್ಕೃತಿ ನಮ್ಮ ಹೆಮ್ಮೆ", language: "Kannada", hashtags: ["#MysoruDasara", "#KarnatakaFestival"], likes: 4560, comments: 567, shares: 890, timestamp: new Date("2025-03-15T08:30:00") },
  // Korean
  { id: "6", author: "김지현", handle: "@jihyun_k", avatar: getAvatar("K"), content: "오늘 새로운 K-드라마 시작! 너무 기대돼요 📺💕 첫 회부터 완전 빠져들었어요", language: "Korean", hashtags: ["#KDrama", "#Netflix", "#한국드라마"], likes: 8900, comments: 1200, shares: 2340, timestamp: new Date("2025-03-15T07:00:00") },
  { id: "7", author: "박수진", handle: "@sujin_p", avatar: getAvatar("S"), content: "BTS 새 앨범 발매! 전세계가 주목하고 있어요 🎵🌍 역시 방탄!", language: "Korean", hashtags: ["#BTS", "#KPop", "#NewAlbum"], likes: 15600, comments: 3400, shares: 6780, timestamp: new Date("2025-03-15T06:00:00") },
  // Hindi
  { id: "8", author: "अमित शर्मा", handle: "@amit_hi", avatar: getAvatar("A"), content: "भारत की GDP growth rate 8% 📈🇮🇳 दुनिया की सबसे तेज़ बढ़ती अर्थव्यवस्था!", language: "Hindi", hashtags: ["#IndiaGrowth", "#Economy", "#MakeInIndia"], likes: 6780, comments: 890, shares: 1560, timestamp: new Date("2025-03-15T10:00:00") },
  { id: "9", author: "नेहा गुप्ता", handle: "@neha_hi", avatar: getAvatar("N"), content: "ISRO का नया mission successful! 🚀🇮🇳 भारत अंतरिक्ष में नया इतिहास रच रहा है", language: "Hindi", hashtags: ["#ISRO", "#SpaceMission", "#ProudIndian"], likes: 12300, comments: 2100, shares: 4560, timestamp: new Date("2025-03-15T11:30:00") },
  // Tamil
  { id: "10", author: "முருகன் செல்வம்", handle: "@murugan_ta", avatar: getAvatar("M"), content: "சென்னை super kings ஜெயிச்சாங்க! 💛🏏 Whistle podu! நம்ம team semma!", language: "Tamil", hashtags: ["#CSK", "#IPL", "#WhistlePodu"], likes: 7890, comments: 1340, shares: 2100, timestamp: new Date("2025-03-15T14:00:00") },
  // Japanese
  { id: "11", author: "田中さくら", handle: "@sakura_jp", avatar: getAvatar("T"), content: "東京の桜が満開です！🌸 今年のお花見は最高でした。日本の春は美しい", language: "Japanese", hashtags: ["#Sakura", "#Tokyo", "#春"], likes: 9870, comments: 1560, shares: 3200, timestamp: new Date("2025-03-15T05:00:00") },
  // Malayalam
  { id: "12", author: "അജിത് കുമാർ", handle: "@ajith_ml", avatar: getAvatar("A"), content: "കേരളത്തിന്റെ IT വളർച്ച അസാധാരണം! 💻🌴 God's own digital country ആകുന്നു", language: "Malayalam", hashtags: ["#KeralaIT", "#TechKerala", "#GodsOwnCountry"], likes: 3200, comments: 456, shares: 780, timestamp: new Date("2025-03-15T09:30:00") },
  // More Telugu
  { id: "13", author: "సాయి తేజ", handle: "@sai_te", avatar: getAvatar("S"), content: "RRR Oscar అవార్డ్ గెలిచిన తర్వాత తెలుగు సినిమా ప్రపంచానికి తెలిసింది! 🏆🎬", language: "Telugu", hashtags: ["#RRR", "#Tollywood", "#Oscar"], likes: 11200, comments: 2340, shares: 5670, timestamp: new Date("2025-03-15T13:00:00") },
  // Mandarin
  { id: "14", author: "李小明", handle: "@xiaoming", avatar: getAvatar("L"), content: "今天在深圳科技园看到了最新的AI机器人展览 🤖 科技改变世界！", language: "Mandarin", hashtags: ["#AI", "#TechChina", "#Shenzhen"], likes: 4560, comments: 670, shares: 1230, timestamp: new Date("2025-03-15T04:00:00") },
  // More Korean
  { id: "15", author: "이준호", handle: "@junho_l", avatar: getAvatar("J"), content: "월드컵 예선 대한민국 승리! ⚽🇰🇷 우리 선수들 정말 대단해요!", language: "Korean", hashtags: ["#WorldCup", "#Korea", "#Football"], likes: 13400, comments: 2890, shares: 4500, timestamp: new Date("2025-03-15T15:00:00") },
];

export const hashtagData = [
  { tag: "#BTS", count: 15600, trend: "trending" as const },
  { tag: "#WorldCup", count: 13400, trend: "trending" as const },
  { tag: "#ISRO", count: 12300, trend: "trending" as const },
  { tag: "#RRR", count: 11200, trend: "rising" as const },
  { tag: "#Sakura", count: 9870, trend: "rising" as const },
  { tag: "#KDrama", count: 8900, trend: "trending" as const },
  { tag: "#CSK", count: 7890, trend: "rising" as const },
  { tag: "#IndiaGrowth", count: 6780, trend: "rising" as const },
  { tag: "#HyderabadBiryani", count: 5670, trend: "declining" as const },
  { tag: "#MysoruDasara", count: 4560, trend: "declining" as const },
  { tag: "#AI", count: 4560, trend: "trending" as const },
  { tag: "#BengaluruTech", count: 3450, trend: "rising" as const },
  { tag: "#KeralaIT", count: 3200, trend: "declining" as const },
  { tag: "#IPL", count: 2340, trend: "trending" as const },
  { tag: "#TechIndia", count: 1890, trend: "rising" as const },
];

export function calculateEngagement(post: Post, weights = { likes: 1, comments: 2, shares: 3 }): number {
  return post.likes * weights.likes + post.comments * weights.comments + post.shares * weights.shares;
}

export function generateRandomActivity(posts: Post[]): Post[] {
  return posts.map(p => ({
    ...p,
    likes: p.likes + Math.floor(Math.random() * 500),
    comments: p.comments + Math.floor(Math.random() * 100),
    shares: p.shares + Math.floor(Math.random() * 200),
  }));
}
