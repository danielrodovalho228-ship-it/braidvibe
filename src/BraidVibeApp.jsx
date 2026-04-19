import { useState, useEffect, useRef } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, BookmarkCheck,
  Search, Filter, Star, Clock, Lock, Unlock, Crown,
  Camera, Play, X, Download,
  Home, Grid3X3, Users, User, Sparkles, Check, CreditCard,
  Instagram, Twitter, Eye, TrendingUp, Award,
  Flame, Zap, ArrowRight, ArrowLeft, Send,
  MoreHorizontal, Bell, Settings, Edit3,
  Globe, Gift, ShieldCheck, BadgeCheck,
  Image, Palette, Scissors, ExternalLink
} from "lucide-react";

// ─── i18n ───
const translations = {
  en: {
    home: "Home", explore: "Explore", community: "Community",
    profile: "Profile", premium: "Premium", search: "Search...",
    startLearning: "Start Learning", trending: "Trending",
    latest: "Latest", free: "Free", pro: "Pro",
    beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced",
    subscribe: "Subscribe", sharePost: "Share Your Braid",
    viewTutorial: "View Tutorial", stepByStep: "Step by Step",
    minutes: "min", followers: "Followers", following: "Following",
    posts: "Posts", savedTutorials: "Saved Tutorials", myPosts: "My Posts",
    achievements: "Achievements", startFreeTrial: "Start Free Trial",
    monthly: "Monthly", annual: "Annual",
    comments: "Comments", likes: "Likes", share: "Share",
    uploadPhoto: "Upload Photo", addComment: "Add a comment...",
    featuredStyles: "Featured Styles", allTutorials: "All Tutorials",
    difficulty: "Difficulty", time: "Time", rating: "Rating",
    categories: "Categories",
    heroTagline: "Master the Art of Braiding",
    heroSubtitle: "Learn stunning braid styles from beginner to pro. Join 2M+ creators.",
    watchTutorial: "Watch Tutorial on TikTok",
  }
};
const t = (key) => translations.en[key] || key;

// ─── AI-Art Style Portrait Illustrations for Each Braid Type ───
const BraidArt = ({ type, className = "", size = 120 }) => {
  const uid = `ba_${type}_${Math.random().toString(36).slice(2,6)}`;
  // Shared face renderer — always drawn AFTER braids so face is on top
  const Face = ({ skin = ["#e8a862","#c68642"], eyeColor = "#2a1205", cy = 110 }) => (<>
    <path d={`M80 ${cy+35} Q100 ${cy+45} 120 ${cy+35} L130 ${cy+70} Q100 ${cy+80} 70 ${cy+70}Z`} fill={skin[0]} opacity="0.9"/>
    <ellipse cx="100" cy={cy} rx="38" ry="46" fill={skin[0]}/>
    <ellipse cx="100" cy={cy+4} rx="35" ry="42" fill={skin[1]} opacity="0.3"/>
    <ellipse cx="86" cy={cy-5} rx="6" ry="3.5" fill="white"/>
    <ellipse cx="114" cy={cy-5} rx="6" ry="3.5" fill="white"/>
    <circle cx="87" cy={cy-5} r="2.5" fill={eyeColor}/>
    <circle cx="115" cy={cy-5} r="2.5" fill={eyeColor}/>
    <circle cx="88" cy={cy-6} r="1" fill="white"/>
    <circle cx="116" cy={cy-6} r="1" fill="white"/>
    <path d={`M78 ${cy-12} Q86 ${cy-16} 94 ${cy-13}`} stroke={eyeColor} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d={`M106 ${cy-13} Q114 ${cy-16} 122 ${cy-12}`} stroke={eyeColor} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d={`M97 ${cy+2} Q100 ${cy+8} 103 ${cy+2}`} stroke={skin[1]} strokeWidth="1" fill="none" opacity="0.5"/>
    <path d={`M88 ${cy+16} Q94 ${cy+20} 100 ${cy+19} Q106 ${cy+20} 112 ${cy+16}`} fill="#d4786a" opacity="0.9"/>
    <path d={`M90 ${cy+16} Q100 ${cy+13} 110 ${cy+16}`} stroke="#e08888" strokeWidth="0.6" fill="none"/>
  </>);
  // Helper: background + glow rect
  const Bg = ({c1,c2,glow,glowOp=0.6}) => (<>
    <defs>
      <linearGradient id={`${uid}bg`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/></linearGradient>
      <radialGradient id={`${uid}glow`} cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor={glow} stopOpacity={glowOp}/><stop offset="100%" stopColor="transparent"/></radialGradient>
    </defs>
    <rect width="200" height="260" fill={`url(#${uid}bg)`} rx="16"/>
    <rect width="200" height="260" fill={`url(#${uid}glow)`} rx="16"/>
  </>);
  const arts = {
    box: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#7b4fb8" c2="#4d2888" glow="#c084fc"/>
        {/* 1) BRAIDS first (behind face) */}
        {[
          [48,75,42,140,38,215],[56,72,50,138,46,218],[140,72,146,138,150,218],[148,75,154,140,158,215],
          [64,68,58,135,54,222],[132,68,138,135,142,222],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <path key={i} d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke={i%2?"#5a3d7a":"#6b4d90"} strokeWidth="7" fill="none" strokeLinecap="round"/>
        ))}
        {/* Beads */}
        {[[38,200],[46,205],[54,208],[150,205],[158,200],[142,208]].map(([bx,by],i) => (
          <circle key={i} cx={bx} cy={by} r="3.5" fill="#fbbf24"/>
        ))}
        {/* 2) FACE on top */}
        <Face/>
        {/* 3) Hair on top of head */}
        <path d="M58 75 Q60 52 78 42 Q95 34 100 32 Q105 34 122 42 Q140 52 142 75 L142 65 Q138 48 125 40 Q110 33 100 31 Q90 33 75 40 Q62 48 58 65Z" fill="#5a3d7a"/>
        {/* Earrings & sparkles */}
        <circle cx="60" cy="120" r="4" fill="#fbbf24" opacity="0.9"/>
        <circle cx="140" cy="120" r="4" fill="#fbbf24" opacity="0.9"/>
        <circle cx="45" cy="50" r="2" fill="#c084fc" opacity="0.7"/><circle cx="155" cy="45" r="1.5" fill="#ec4899" opacity="0.6"/>
      </svg>
    ),
    cornrow: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#8a5a28" c2="#6b4018" glow="#fbbf24" glowOp={0.65}/>
        {/* 1) Cornrow pattern on scalp — BEHIND face */}
        <ellipse cx="100" cy="75" rx="42" ry="30" fill="#6b4d90"/>
        <path d="M60 72 Q62 50 80 42 Q95 36 100 35 Q105 36 120 42 Q138 50 140 72 Q142 88 138 100" fill="#6b4d90"/>
        {/* Individual cornrows - tight to scalp */}
        {[70,80,90,100,110,120,130].map((x,i) => (
          <g key={i}>
            <path d={`M${x} ${42+Math.abs(i-3)*2} C${x} 55 ${x} 70 ${x+(i<3?-8:i>3?8:0)} 85`} stroke="#5a4080" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d={`M${x} ${42+Math.abs(i-3)*2} C${x} 55 ${x} 70 ${x+(i<3?-8:i>3?8:0)} 85`} stroke="#8b6db0" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5"/>
            {[0,1,2,3,4,5].map(j => {
              const cy = 46 + Math.abs(i-3)*2 + j*7;
              return <path key={j} d={`M${x-2} ${cy} L${x} ${cy-2} L${x+2} ${cy}`} stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.5"/>;
            })}
          </g>
        ))}
        {/* Scalp lines */}
        {[75,85,95,105,115,125].map((x,i) => (
          <path key={i} d={`M${x} ${44+Math.abs(i-2.5)*2} L${x+(i<3?-3:3)} 82`} stroke="#e8a862" strokeWidth="0.8" opacity="0.4"/>
        ))}
        {/* 2) FACE on top */}
        <Face skin={["#c68642","#a0724a"]}/>
        {/* Earrings */}
        <circle cx="62" cy="122" r="4" fill="#fbbf24" opacity="0.9"/>
        <circle cx="138" cy="122" r="4" fill="#fbbf24" opacity="0.9"/>
        <circle cx="160" cy="50" r="1.5" fill="#fbbf24" opacity="0.6"/><circle cx="40" cy="60" r="2" fill="#f59e0b" opacity="0.5"/>
      </svg>
    ),
    dutch: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#9a3060" c2="#6d1840" glow="#f472b6" glowOp={0.65}/>
        {/* 1) Dutch braids — go down LEFT and RIGHT sides, NOT over face */}
        {/* Hair base */}
        <path d="M62 78 Q64 55 80 46 Q95 38 100 36 Q105 38 120 46 Q136 55 138 78" fill="#e8c078"/>
        {/* Center part */}
        <line x1="100" y1="36" x2="100" y2="68" stroke="#f5d0b0" strokeWidth="1.5" opacity="0.5"/>
        {/* Left Dutch braid — stays on left side (x < 62) */}
        <path d="M90 40 Q75 55 62 72 Q50 92 42 115 Q36 138 32 165 Q28 185 25 210" stroke="#e8c078" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M90 40 Q75 55 62 72 Q50 92 42 115 Q36 138 32 165" stroke="#d4a36a" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* Right Dutch braid — stays on right side (x > 138) */}
        <path d="M110 40 Q125 55 138 72 Q150 92 158 115 Q164 138 168 165 Q172 185 175 210" stroke="#e8c078" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M110 40 Q125 55 138 72 Q150 92 158 115 Q164 138 168 165" stroke="#d4a36a" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* Braid cross patterns */}
        {[50,65,80,100,120,145,170,195].map((y,j) => {
          const lx = 88 - j*8;
          const rx = 112 + j*8;
          return <g key={j}>
            <path d={`M${lx-4} ${y} L${lx} ${y-3} L${lx+4} ${y} L${lx} ${y+3}Z`} fill="#f5d5a0" opacity="0.5"/>
            <path d={`M${rx-4} ${y} L${rx} ${y-3} L${rx+4} ${y} L${rx} ${y+3}Z`} fill="#f5d5a0" opacity="0.5"/>
          </g>;
        })}
        {/* 2) FACE on top */}
        <Face skin={["#f5d0b0","#d4a882"]} eyeColor="#4a7c59"/>
        {/* Earrings */}
        <circle cx="62" cy="118" r="3.5" fill="#f472b6" opacity="0.8"/>
        <circle cx="138" cy="118" r="3.5" fill="#f472b6" opacity="0.8"/>
        <circle cx="35" cy="45" r="2" fill="#f472b6" opacity="0.6"/><circle cx="165" cy="55" r="1.5" fill="#fbbf24" opacity="0.5"/>
      </svg>
    ),
    french: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#2a4a8a" c2="#183468" glow="#60a5fa" glowOp={0.6}/>
        {/* 1) French braid — goes DOWN THE BACK behind the head */}
        <path d="M100 38 Q98 80 96 120 Q94 160 92 200 Q90 220 88 240" stroke="#9a6838" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M100 38 Q102 80 100 120 Q98 160 96 200 Q94 220 92 240" stroke="#7a4820" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Braid weave texture */}
        {[50,65,80,95,110,125,145,165,185,205,220].map((y,j) => (
          <ellipse key={j} cx={100-(j*0.8)+(j%2?-3:3)} cy={y} rx="5" ry="2" fill="#c49a5a" opacity="0.5"/>
        ))}
        {/* Hair ribbon */}
        <circle cx="88" cy="240" r="5" fill="#60a5fa" opacity="0.8"/>
        {/* Hair base on top — OVER the braid */}
        <path d="M60 80 Q62 52 82 42 Q95 36 100 34 Q105 36 118 42 Q138 52 140 80 Q142 95 138 108" fill="#9a6838"/>
        {/* Side hair framing */}
        <path d="M60 80 Q56 100 54 115" stroke="#9a6838" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M140 80 Q144 100 146 115" stroke="#9a6838" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
        {/* 2) FACE on top */}
        <Face skin={["#deb887","#b8926a"]} eyeColor="#5c4033"/>
        {/* Earrings */}
        <circle cx="62" cy="118" r="3.5" fill="#818cf8" opacity="0.8"/>
        <circle cx="138" cy="118" r="3.5" fill="#818cf8" opacity="0.8"/>
        <circle cx="30" cy="50" r="2" fill="#60a5fa" opacity="0.6"/><circle cx="170" cy="45" r="1.5" fill="#818cf8" opacity="0.5"/>
      </svg>
    ),
    fishtail: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#246868" c2="#1a4e4e" glow="#2dd4bf" glowOp={0.6}/>
        {/* 1) Fishtail braid — hangs over RIGHT shoulder, BEHIND body */}
        <path d="M138 90 Q145 110 150 135 Q153 165 148 195 Q144 215 140 240" stroke="#dbb76e" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M138 90 Q146 110 151 135 Q154 165 149 195" stroke="#c49a5a" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Fishtail cross pattern */}
        {[95,110,125,140,155,170,185,200,215,230].map((y,j) => (
          <g key={j}>
            <path d={`M${140+j*0.8} ${y} L${150+j*0.3} ${y+6}`} stroke="#f0d090" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <path d={`M${150+j*0.3} ${y} L${140+j*0.8} ${y+6}`} stroke="#b8944a" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          </g>
        ))}
        {/* Hair base — swept to side */}
        <path d="M60 78 Q62 52 82 42 Q95 36 100 34 Q105 36 118 42 Q138 52 140 78 Q142 95 140 108" fill="#dbb76e"/>
        <path d="M60 78 Q56 95 54 108" stroke="#dbb76e" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* 2) FACE on top */}
        <Face skin={["#f5d0b0","#d4a882"]} eyeColor="#2d6a4f"/>
        {/* Earrings */}
        <circle cx="62" cy="118" r="3.5" fill="#2dd4bf" opacity="0.8"/>
        <circle cx="138" cy="118" r="3.5" fill="#2dd4bf" opacity="0.8"/>
        <circle cx="35" cy="50" r="2" fill="#2dd4bf" opacity="0.6"/>
      </svg>
    ),
    twist: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#5e3098" c2="#3d1d70" glow="#a78bfa" glowOp={0.65}/>
        {/* 1) Twist braids — hang on LEFT and RIGHT sides only, NOT over face */}
        {/* Left side twists (x < 62) */}
        {[
          [50,72,40,150,32,225],[56,70,48,148,42,228],[62,68,56,145,50,230],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`l${i}`}>
            <path d={`M${x1} ${y1} C${x1+4} ${(y1+y2)/2} ${x2-4} ${(y2+y3)/2} ${x3} ${y3}`} stroke="#7a5ab0" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
            <path d={`M${x1+1} ${y1} C${x1-3} ${(y1+y2)/2} ${x2+3} ${(y2+y3)/2} ${x3+1} ${y3}`} stroke="#9070c0" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          </g>
        ))}
        {/* Right side twists (x > 138) */}
        {[
          [138,68,144,145,150,230],[144,70,152,148,158,228],[150,72,160,150,168,225],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`r${i}`}>
            <path d={`M${x1} ${y1} C${x1+4} ${(y1+y2)/2} ${x2-4} ${(y2+y3)/2} ${x3} ${y3}`} stroke="#7a5ab0" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
            <path d={`M${x1+1} ${y1} C${x1-3} ${(y1+y2)/2} ${x2+3} ${(y2+y3)/2} ${x3+1} ${y3}`} stroke="#9070c0" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          </g>
        ))}
        {/* Hair base */}
        <ellipse cx="100" cy="72" rx="44" ry="32" fill="#6b4d90"/>
        <path d="M56 75 Q58 48 78 40 Q95 34 100 32 Q105 34 122 40 Q142 48 144 75" fill="#6b4d90"/>
        {/* 2) FACE on top */}
        <Face/>
        {/* Earrings */}
        <circle cx="60" cy="120" r="4" fill="#c084fc" opacity="0.8"/>
        <circle cx="140" cy="120" r="4" fill="#c084fc" opacity="0.8"/>
        <circle cx="30" cy="45" r="2" fill="#a78bfa" opacity="0.6"/><circle cx="170" cy="55" r="1.5" fill="#c084fc" opacity="0.5"/>
      </svg>
    ),
    goddess: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#8a6a18" c2="#6a5010" glow="#fcd34d" glowOp={0.7}/>
        {/* 1) Goddess braids — thick, on LEFT and RIGHT sides only */}
        {/* Left braids */}
        {[
          [50,78,36,145,28,225],[60,74,50,142,44,228],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`l${i}`}>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#6b4d90" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#8060a8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d={`M${x1-3} ${y1+15} Q${x2-6} ${y2-15} ${x3-4} ${y3-10}`} stroke="#9070c0" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>
          </g>
        ))}
        {/* Right braids */}
        {[
          [140,74,150,142,156,228],[150,78,164,145,172,225],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`r${i}`}>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#6b4d90" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#8060a8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d={`M${x1+4} ${y1+15} Q${x2+6} ${y2-15} ${x3+4} ${y3-10}`} stroke="#9070c0" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>
          </g>
        ))}
        {/* Gold cuffs */}
        {[[40,135],[52,140],[152,140],[164,135]].map(([cx,cy],i) => (
          <rect key={i} x={cx-4} y={cy-3} width="8" height="6" rx="2" fill="#fbbf24" opacity="0.9"/>
        ))}
        {/* Hair base */}
        <path d="M56 78 Q58 52 78 44 Q95 38 100 36 Q105 38 122 44 Q142 52 144 78" fill="#6b4d90"/>
        {/* Crown */}
        <path d="M70 62 L80 48 L90 58 L100 42 L110 58 L120 48 L130 62" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="100" cy="42" r="4" fill="#fbbf24"/><circle cx="80" cy="48" r="3" fill="#fbbf24"/><circle cx="120" cy="48" r="3" fill="#fbbf24"/>
        {/* 2) FACE on top */}
        <Face/>
        {/* Earrings */}
        <circle cx="60" cy="122" r="5" fill="#fbbf24" opacity="0.9"/>
        <circle cx="140" cy="122" r="5" fill="#fbbf24" opacity="0.9"/>
        <circle cx="30" cy="40" r="2.5" fill="#fcd34d" opacity="0.6"/><circle cx="170" cy="48" r="2" fill="#fbbf24" opacity="0.5"/>
      </svg>
    ),
    locs: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#226840" c2="#185030" glow="#4ade80" glowOp={0.6}/>
        {/* 1) Locs — hang on LEFT and RIGHT sides, NOT over face */}
        {/* Left locs */}
        {[
          [46,76,32,155,26,235],[52,74,40,152,34,238],[58,72,48,148,42,240],
          [64,70,56,145,52,238],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`l${i}`}>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke={i%2?"#6b4d90":"#5a3d7a"} strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#8060a8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5"/>
            {[0,1,2,3,4].map(j => {
              const t = (j+1)/6; const px = x1+(x3-x1)*t*t+(x2-x1)*2*t*(1-t); const py = y1+(y3-y1)*t*t+(y2-y1)*2*t*(1-t);
              return <line key={j} x1={px-3} y1={py} x2={px+3} y2={py} stroke="#4ade80" strokeWidth="0.6" opacity="0.35"/>;
            })}
          </g>
        ))}
        {/* Right locs */}
        {[
          [136,70,144,145,148,238],[142,72,152,148,158,240],[148,74,160,152,166,238],
          [154,76,168,155,174,235],
        ].map(([x1,y1,x2,y2,x3,y3],i) => (
          <g key={`r${i}`}>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke={i%2?"#5a3d7a":"#6b4d90"} strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`} stroke="#8060a8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5"/>
          </g>
        ))}
        {/* Hair base */}
        <ellipse cx="100" cy="72" rx="46" ry="34" fill="#6b4d90"/>
        <path d="M54 78 Q56 46 78 38 Q95 32 100 30 Q105 32 122 38 Q144 46 146 78" fill="#6b4d90"/>
        {/* 2) FACE on top */}
        <Face/>
        {/* Earrings */}
        <circle cx="60" cy="120" r="4" fill="#4ade80" opacity="0.8"/>
        <circle cx="140" cy="120" r="4" fill="#4ade80" opacity="0.8"/>
        <circle cx="25" cy="50" r="2" fill="#4ade80" opacity="0.6"/><circle cx="175" cy="60" r="1.5" fill="#22c55e" opacity="0.5"/>
      </svg>
    ),
    bantu: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#8a2898" c2="#5a1868" glow="#e879f9" glowOp={0.65}/>
        {/* 1) Bantu knots — on TOP of head only, above y=65 and to sides */}
        {[
          [75,38,14],[105,34,15],[135,42,13],[55,56,13],[90,50,14],
          [120,48,14],[152,60,12],[65,74,11],[140,72,12]
        ].map(([cx,cy,r],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#7a5ab0"/>
            <circle cx={cx} cy={cy} r={r-2} fill="#6b4d90" opacity="0.8"/>
            <path d={`M${cx} ${cy-r+3} A${r-4} ${r-4} 0 1 1 ${cx-0.1} ${cy-r+3}`} stroke="#e879f9" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d={`M${cx} ${cy-r+6} A${r-7} ${r-7} 0 1 1 ${cx-0.1} ${cy-r+6}`} stroke="#f0abfc" strokeWidth="0.7" fill="none" opacity="0.3"/>
            <circle cx={cx-r*0.25} cy={cy-r*0.25} r={r*0.18} fill="white" opacity="0.2"/>
          </g>
        ))}
        {/* 2) FACE on top */}
        <Face cy={118}/>
        {/* Earrings */}
        <circle cx="62" cy="136" r="4" fill="#e879f9" opacity="0.8"/>
        <circle cx="138" cy="136" r="4" fill="#e879f9" opacity="0.8"/>
        <circle cx="30" cy="40" r="2.5" fill="#e879f9" opacity="0.6"/><circle cx="170" cy="50" r="2" fill="#f0abfc" opacity="0.5"/>
      </svg>
    ),
    micro: (
      <svg viewBox="0 0 200 260" className={className} width={size} height={size * 1.3}>
        <Bg c1="#4a4a68" c2="#32324a" glow="#cbd5e1" glowOp={0.55}/>
        {/* 1) Micro braids — thin strands on LEFT and RIGHT sides only */}
        {/* Left micro braids */}
        {Array.from({length:12}).map((_,i) => {
          const sx = 48 + i*1.5;
          const ex = 26 + i*2;
          const sy = 50 + i*1.2;
          return <path key={`l${i}`} d={`M${sx} ${sy} Q${(sx+ex)/2-2} ${(sy+230)/2} ${ex} ${225+i%3*4}`}
            stroke={i%3===0?"#8090a8":i%3===1?"#607088":"#a0b0c8"} strokeWidth="2" fill="none" strokeLinecap="round"/>;
        })}
        {/* Right micro braids */}
        {Array.from({length:12}).map((_,i) => {
          const sx = 152 - i*1.5;
          const ex = 174 - i*2;
          const sy = 50 + i*1.2;
          return <path key={`r${i}`} d={`M${sx} ${sy} Q${(sx+ex)/2+2} ${(sy+230)/2} ${ex} ${225+i%3*4}`}
            stroke={i%3===0?"#a0b0c8":i%3===1?"#8090a8":"#607088"} strokeWidth="2" fill="none" strokeLinecap="round"/>;
        })}
        {/* Hair base */}
        <path d="M54 80 Q56 48 78 38 Q95 32 100 30 Q105 32 122 38 Q144 48 146 80" fill="#607088"/>
        {/* Accent braids */}
        {[3,8].map(i => {
          const sx = 48 + i*1.5; const ex = 26 + i*2; const sy = 50 + i*1.2;
          return <path key={`al${i}`} d={`M${sx} ${sy} Q${(sx+ex)/2-2} ${(sy+230)/2} ${ex} ${225+i%3*4}`}
            stroke="#cbd5e1" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.6"/>;
        })}
        {/* 2) FACE on top */}
        <Face/>
        {/* Earrings */}
        <circle cx="60" cy="120" r="3.5" fill="#cbd5e1" opacity="0.8"/>
        <circle cx="140" cy="120" r="3.5" fill="#cbd5e1" opacity="0.8"/>
        <circle cx="35" cy="50" r="2" fill="#cbd5e1" opacity="0.5"/>
      </svg>
    ),
  };
  return arts[type] || arts.box;
};

// ─── SVG Avatar Generator (AI-art style) ───
const SvgAvatar = ({ name, size = 40, seed = 0, isProfile = false }) => {
  const colors = [
    ["#a855f7","#ec4899"], ["#f59e0b","#ea580c"], ["#3b82f6","#6366f1"],
    ["#22c55e","#10b981"], ["#d946ef","#ec4899"], ["#14b8a6","#06b6d4"],
    ["#e11d48","#f43f5e"], ["#8b5cf6","#a855f7"],
  ];
  const skins = ["#c68642","#8d5524","#deb887","#f5d0b0","#d4a882","#a0724a","#e0ac69","#b8926a"];
  const idx = (name?.charCodeAt(0) || seed) % colors.length;
  const skinIdx = ((name?.charCodeAt(1) || seed+1)) % skins.length;
  const [c1, c2] = colors[idx];
  const skin = skins[skinIdx];
  const initial = (name?.[0] || "?").toUpperCase();
  const id = `av${seed}${idx}`;

  if (isProfile) {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" style={{borderRadius:"50%"}}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
          </linearGradient>
          <radialGradient id={`${id}g`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.6"/><stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" fill={`url(#${id})`}/>
        <rect width="120" height="120" fill={`url(#${id}g)`}/>
        {/* Neck */}
        <path d="M52 82 Q60 88 68 82 L72 100 Q60 106 48 100Z" fill={skin} opacity="0.9"/>
        {/* Face */}
        <ellipse cx="60" cy="58" rx="22" ry="27" fill={skin}/>
        {/* Hair */}
        <path d="M36 50 Q38 30 50 24 Q58 20 60 19 Q62 20 70 24 Q82 30 84 50 Q85 58 84 65" fill="#4a3560"/>
        {/* Eyes */}
        <ellipse cx="52" cy="55" rx="3.5" ry="2.2" fill="white"/>
        <ellipse cx="68" cy="55" rx="3.5" ry="2.2" fill="white"/>
        <circle cx="52.5" cy="55" r="1.5" fill="#2a1205"/>
        <circle cx="68.5" cy="55" r="1.5" fill="#2a1205"/>
        <circle cx="53" cy="54.5" r="0.6" fill="white"/>
        <circle cx="69" cy="54.5" r="0.6" fill="white"/>
        {/* Eyebrows */}
        <path d="M47 51 Q52 49 57 50.5" stroke="#2a1205" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M63 50.5 Q68 49 73 51" stroke="#2a1205" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Nose & lips */}
        <path d="M58 61 Q60 64 62 61" stroke={skin} strokeWidth="0.6" fill="none" opacity="0.5" filter="brightness(0.85)"/>
        <path d="M53 70 Q57 73 60 72 Q63 73 67 70" fill="#b5634a" opacity="0.7"/>
        {/* Earrings */}
        <circle cx="38" cy="60" r="2.5" fill={c1} opacity="0.7"/>
        <circle cx="82" cy="60" r="2.5" fill={c1} opacity="0.7"/>
        {/* Hair braids framing face */}
        <path d="M38 48 Q34 65 32 85 Q30 95 28 108" stroke="#4a3560" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M82 48 Q86 65 88 85 Q90 95 92 108" stroke="#4a3560" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Shoulder area */}
        <path d="M35 98 Q60 92 85 98 Q95 105 95 120 L25 120 Q25 105 35 98Z" fill={c1} opacity="0.3"/>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{borderRadius:"50%"}}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill={`url(#${id})`}/>
      {/* Mini portrait */}
      <ellipse cx="24" cy="20" rx="9" ry="11" fill={skin}/>
      <path d="M14 18 Q16 10 21 8 Q23 7 24 7 Q25 7 27 8 Q32 10 34 18 Q35 22 34 26" fill="#4a3560"/>
      <circle cx="21" cy="19" r="1" fill="white" opacity="0.9"/>
      <circle cx="27" cy="19" r="1" fill="white" opacity="0.9"/>
      <circle cx="21.2" cy="19" r="0.5" fill="#2a1205"/>
      <circle cx="27.2" cy="19" r="0.5" fill="#2a1205"/>
      <path d="M22 24 Q24 25.5 26 24" fill="#b5634a" opacity="0.6"/>
      <path d="M15 32 Q24 28 33 32 Q38 38 38 48 L10 48 Q10 38 15 32Z" fill={c1} opacity="0.35"/>
    </svg>
  );
};

// ─── Fake User Profile ───
const USER_PROFILE = {
  name: "Aisha Williams",
  handle: "@aisha_braids",
  posts: 24, followers: 1847, following: 312,
  bio: "Braid artist & content creator. Teaching the world to braid, one tutorial at a time. ✨",
};

// ─── Mock Data ───
const TUTORIAL_CATEGORIES = [
  { id: "box", name: "Box Braids", emoji: "✨", color: "from-purple-500 to-pink-500", bg: "from-purple-600/90 to-pink-600/90" },
  { id: "cornrow", name: "Cornrows", emoji: "💫", color: "from-amber-500 to-orange-500", bg: "from-amber-600/90 to-orange-600/90" },
  { id: "dutch", name: "Dutch Braids", emoji: "🌸", color: "from-pink-500 to-rose-500", bg: "from-pink-600/90 to-rose-600/90" },
  { id: "french", name: "French Braids", emoji: "🦋", color: "from-blue-500 to-indigo-500", bg: "from-blue-600/90 to-indigo-600/90" },
  { id: "fishtail", name: "Fishtail", emoji: "🐚", color: "from-teal-500 to-cyan-500", bg: "from-teal-600/90 to-cyan-600/90" },
  { id: "twist", name: "Twist Braids", emoji: "🌀", color: "from-violet-500 to-purple-500", bg: "from-violet-600/90 to-purple-600/90" },
  { id: "goddess", name: "Goddess Braids", emoji: "👑", color: "from-yellow-500 to-amber-500", bg: "from-yellow-600/90 to-amber-600/90" },
  { id: "locs", name: "Locs", emoji: "🌿", color: "from-green-500 to-emerald-500", bg: "from-green-600/90 to-emerald-600/90" },
  { id: "bantu", name: "Bantu Knots", emoji: "💎", color: "from-fuchsia-500 to-pink-500", bg: "from-fuchsia-600/90 to-pink-600/90" },
  { id: "micro", name: "Micro Braids", emoji: "✂️", color: "from-slate-400 to-zinc-500", bg: "from-slate-500/90 to-zinc-600/90" },
];

const TUTORIALS = [
  { id: 1, title: "Classic Box Braids", category: "box", difficulty: "beginner", time: 45, rating: 4.9, reviews: 2340, premium: false, trending: true,
    tiktok: "https://www.tiktok.com/@dsybhair/video/6950936020644941061",
    steps: ["Section hair into square parts using a rat-tail comb", "Apply edge control to each section for a clean base", "Divide each section into three equal strands", "Begin braiding from the root, adding extension hair gradually", "Braid down to the desired length, keeping even tension", "Seal ends with hot water dip or lighter", "Apply mousse for a polished finish", "Style as desired — up, down, or half-half"] },
  { id: 2, title: "Feed-in Cornrows", category: "cornrow", difficulty: "intermediate", time: 60, rating: 4.8, reviews: 1820, premium: false, trending: true,
    tiktok: "https://www.tiktok.com/@indybindybraids/video/7279875464192380206",
    steps: ["Moisturize and detangle hair thoroughly", "Part a straight line from front to back", "Start with a small amount of natural hair at the hairline", "Gradually feed in extension hair as you braid back", "Keep braids flat and tight to the scalp", "Continue the pattern across the head", "Seal the ends neatly", "Apply oil sheen for shine"] },
  { id: 3, title: "Goddess Locs", category: "goddess", difficulty: "advanced", time: 180, rating: 4.9, reviews: 3100, premium: true, trending: true,
    tiktok: "https://www.tiktok.com/@hairbysb/video/6899071044649225473",
    steps: ["Wash and blow-dry hair straight", "Section hair into small parts", "Crochet or wrap loc extensions around each section", "Wrap wavy hair around each loc for the goddess look", "Dip ends in hot water to seal", "Separate and fluff the wavy pieces", "Apply mousse for hold", "Style with accessories"] },
  { id: 4, title: "Dutch Braid Crown", category: "dutch", difficulty: "intermediate", time: 30, rating: 4.7, reviews: 980, premium: false, trending: false,
    tiktok: "https://www.tiktok.com/@montana.coles/video/7338504097890356526",
    steps: ["Brush hair smooth and part down the middle", "Start a Dutch braid on the right side near the ear", "Braid along the hairline, crossing strands under", "Continue around the back of the head", "Repeat on the left side", "Pin both braids together at the crown", "Pull apart braid for volume", "Set with hairspray"] },
  { id: 5, title: "Fishtail Ponytail", category: "fishtail", difficulty: "beginner", time: 20, rating: 4.6, reviews: 1560, premium: false, trending: false,
    tiktok: "https://www.tiktok.com/@montana.coles/video/7213540529999564075",
    steps: ["Pull hair into a high ponytail", "Divide the ponytail into two sections", "Take a thin strand from the outside of the left section", "Cross it over to the right section", "Repeat with a strand from the right to the left", "Continue alternating, keeping strands thin and even", "Secure with a clear elastic at the bottom", "Gently tug on the edges for a fuller look"] },
  { id: 6, title: "Passion Twists", category: "twist", difficulty: "intermediate", time: 120, rating: 4.8, reviews: 2780, premium: true, trending: true,
    tiktok: "https://www.tiktok.com/@fola_style/video/7214266480131657002",
    steps: ["Pre-stretch and prepare passion twist hair", "Section natural hair into medium parts", "Apply leave-in conditioner to each section", "Use the rubber band method or crochet method", "Twist extension hair with natural hair from root", "Continue twisting to the ends", "Dip in hot water to set the curl pattern", "Fluff and separate for fullness"] },
  { id: 7, title: "Jumbo Bantu Knots", category: "bantu", difficulty: "beginner", time: 25, rating: 4.5, reviews: 890, premium: false, trending: false,
    tiktok: "https://www.tiktok.com/@braidsbysady/video/7400543066962005253",
    steps: ["Section hair into 8-12 equal parts", "Apply styling cream to each section", "Two-strand twist each section from root to end", "Wrap the twist around itself at the base", "Tuck the end under and pin if needed", "Repeat for all sections", "Allow to set overnight or use a dryer", "Unravel carefully for a knot-out style"] },
  { id: 8, title: "Knotless Box Braids", category: "box", difficulty: "advanced", time: 240, rating: 5.0, reviews: 4200, premium: true, trending: true,
    tiktok: "https://www.tiktok.com/@beautynbraidsrva/video/7321860179358747950",
    steps: ["Detangle and moisturize hair thoroughly", "Section hair into small square or triangle parts", "Start braiding with only natural hair — no knot at the root", "Gradually feed in pre-stretched extension hair", "Keep tension light to protect edges", "Braid to desired length", "Trim and seal all ends evenly", "Apply lightweight oil for shine and longevity"] },
  { id: 9, title: "French Braid Basics", category: "french", difficulty: "beginner", time: 15, rating: 4.4, reviews: 3400, premium: false, trending: false,
    tiktok: "https://www.tiktok.com/@beauty.and.the.braid/video/6895477832567311622",
    steps: ["Gather a section of hair at the crown", "Divide into three equal strands", "Cross the right strand over the middle", "Cross the left strand over the new middle", "Add hair from the right side and cross over again", "Add hair from the left side and cross over", "Continue adding hair as you braid down", "Secure with an elastic and pull for volume"] },
  { id: 10, title: "Faux Locs", category: "locs", difficulty: "advanced", time: 300, rating: 4.9, reviews: 2900, premium: true, trending: true,
    tiktok: "https://www.tiktok.com/@thejulianaamoateng/video/7334620391161269509",
    steps: ["Wash, condition, and blow-dry hair", "Section hair into small to medium parts", "Braid each section to create a base", "Wrap loc hair (Marley or yarn) around each braid", "Use a latch hook or wrap method to secure", "Trim any excess wrapping hair", "Dip ends in hot water to seal", "Style and accessorize as desired"] },
  { id: 11, title: "Micro Braids Elegance", category: "micro", difficulty: "advanced", time: 360, rating: 4.7, reviews: 1200, premium: true, trending: false,
    tiktok: "https://www.tiktok.com/@braidsbyevabube/video/7300944518654741766",
    steps: ["Ensure hair is well-moisturized and detangled", "Section into very small parts using a pin-tail comb", "Take a tiny amount of extension hair", "Braid from the root with minimal tension", "Continue braiding to the very end", "Repeat — this style takes patience", "Seal all ends with hot water", "Style freely — micro braids are versatile"] },
  { id: 12, title: "Butterfly Locs", category: "locs", difficulty: "intermediate", time: 150, rating: 4.8, reviews: 3600, premium: true, trending: true,
    tiktok: "https://www.tiktok.com/@braids_by_kansara/video/7262774339953528070",
    steps: ["Pre-loop crochet hair onto a latch hook", "Section natural hair and braid small cornrows", "Crochet the pre-looped hair onto each cornrow", "Wrap and distress the hair for a messy, organic look", "Use a crochet needle to create loops and texture", "Repeat across all sections", "Trim any uneven pieces", "Apply mousse and scrunch for definition"] },
];

const COMMUNITY_POSTS = [
  { id: 1, user: "BraidQueen_Nia", seed: 1, content: "Just finished my knotless braids and I'm OBSESSED 😍✨ Took 6 hours but SO worth it!", artType: "box", likes: 2847, comments: 156, time: "2h ago" },
  { id: 2, user: "CurlsByMaya", seed: 2, content: "Butterfly locs for the summer! Who else is rocking these? 🦋💜", artType: "locs", likes: 4231, comments: 289, time: "4h ago" },
  { id: 3, user: "StylesbyTasha", seed: 3, content: "Client transformation! Passion twists never disappoint. Swipe for the before ➡️", artType: "twist", likes: 6102, comments: 412, time: "6h ago" },
  { id: 4, user: "BraidedBeauty", seed: 4, content: "Tutorial coming soon on these jumbo goddess locs! Stay tuned 👑", artType: "goddess", likes: 3567, comments: 198, time: "8h ago" },
  { id: 5, user: "NaturalVibes_K", seed: 5, content: "Bantu knot-out results!! I literally can't stop touching my hair 🌀💛", artType: "bantu", likes: 5890, comments: 367, time: "12h ago" },
  { id: 6, user: "LuxeBraids_Jo", seed: 6, content: "Micro braids took 8 hours but the versatility is unmatched. Worth every minute ✂️", artType: "micro", likes: 1934, comments: 87, time: "1d ago" },
  { id: 7, user: "CrownedByDee", seed: 7, content: "Feed-in cornrows with heart design for Valentine's Day 💕 My best work yet!", artType: "cornrow", likes: 7823, comments: 534, time: "1d ago" },
  { id: 8, user: "TwistedSoul_A", seed: 8, content: "Tried the box braid tutorial from this app and WOW. Beginner-friendly for real! 🙌", artType: "french", likes: 2156, comments: 143, time: "2d ago" },
];

const ACHIEVEMENTS = [
  { id: 1, name: "First Braid", desc: "Complete your first tutorial", icon: "✂️", unlocked: true },
  { id: 2, name: "10 Braids", desc: "Complete 10 tutorials", icon: "🔥", unlocked: true },
  { id: 3, name: "Community Star", desc: "Get 100 likes on a post", icon: "⭐", unlocked: true },
  { id: 4, name: "Trendsetter", desc: "Have a post go trending", icon: "📈", unlocked: false },
  { id: 5, name: "Braid Master", desc: "Complete all advanced tutorials", icon: "👑", unlocked: false },
  { id: 6, name: "Social Butterfly", desc: "Share 5 posts on social media", icon: "🦋", unlocked: false },
  { id: 7, name: "Loyal Fan", desc: "Use app for 30 consecutive days", icon: "💎", unlocked: false },
  { id: 8, name: "Helping Hand", desc: "Leave 50 comments", icon: "🤝", unlocked: true },
];

// ─── Shared UI Components ───

const StarRating = ({ rating, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map(i => <Star key={i} size={size} className={i <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />)}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const s = { default:"bg-white/10 text-white/80", premium:"bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold", beginner:"bg-green-500/20 text-green-400", intermediate:"bg-yellow-500/20 text-yellow-400", advanced:"bg-red-500/20 text-red-400", trending:"bg-gradient-to-r from-pink-500 to-purple-500 text-white" };
  return <span className={`px-2 py-0.5 rounded-full text-xs ${s[variant]}`}>{children}</span>;
};

const GlassCard = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${onClick?"cursor-pointer hover:bg-white/10 active:scale-[0.98]":""} transition-all duration-300 ${className}`}>{children}</div>
);

// Braid illustration card - replaces <img>
const BraidCard = ({ type, name, className = "", overlay = true }) => {
  const cat = TUTORIAL_CATEGORIES.find(c => c.id === type);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${cat?.color || "from-purple-500 to-pink-500"}`} />
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <BraidArt type={type} size={Math.min(200, 999)} className="w-full h-full" />
      </div>
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />}
    </div>
  );
};

// ─── Splash Screen ───
const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => { if(p>=100){clearInterval(iv);setTimeout(onFinish,300);return 100;} return p+4; }),50);
    return () => clearInterval(iv);
  }, [onFinish]);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center animate-pulse shadow-2xl shadow-purple-500/30">
          <Scissors size={48} className="text-white" style={{animation:"spin 3s linear infinite"}} />
        </div>
        <div className="absolute -inset-4 rounded-full border-2 border-purple-500/30" style={{animation:"ping 2s cubic-bezier(0,0,0.2,1) infinite"}} />
      </div>
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-2">BraidVibe</h1>
      <p className="text-white/50 text-sm mb-8">Master the Art of Braiding</p>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-full transition-all duration-100" style={{width:`${progress}%`}} />
      </div>
    </div>
  );
};

// ─── Share Modal ───
const ShareModal = ({ isOpen, onClose, title, artType, userName, difficulty, time, rating }) => {
  const cardRef = useRef(null);
  const [copied,setCopied]=useState(false);
  if(!isOpen) return null;
  const cat = TUTORIAL_CATEGORIES.find(c=>c.id===artType);
  const shareUrl = (typeof window!=="undefined"?window.location.origin:"https://braidvibeapp.com");
  const shareText = `Check out "${title}" on BraidVibe! ✨🔥`;

  const handleDownloadCard = async () => {
    if(!cardRef.current) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 600; canvas.height = 800;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createLinearGradient(0,0,600,800);
      grad.addColorStop(0,"#1a0a2e"); grad.addColorStop(0.5,"#16082a"); grad.addColorStop(1,"#0d0618");
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(0,0,600,800,24); ctx.fill();
      const glow = ctx.createRadialGradient(300,300,0,300,300,300);
      glow.addColorStop(0,"rgba(168,85,247,0.15)"); glow.addColorStop(1,"transparent");
      ctx.fillStyle = glow; ctx.fillRect(0,0,600,800);
      ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.beginPath(); ctx.roundRect(40,40,520,360,20); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(40,40,520,360,20); ctx.stroke();
      const svgEl = cardRef.current.querySelector("svg");
      if(svgEl){
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const svgBlob = new Blob([svgData],{type:"image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url;});
        ctx.drawImage(img,180,70,240,300);
        URL.revokeObjectURL(url);
      }
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 32px system-ui"; ctx.textAlign = "center";
      ctx.fillText(title||"Amazing Braids",300,460);
      if(difficulty||time||rating){
        ctx.font = "16px system-ui"; ctx.fillStyle = "rgba(255,255,255,0.5)";
        const info = [difficulty&&`${difficulty}`,time&&`${time} min`,rating&&`⭐ ${rating}`].filter(Boolean).join("  •  ");
        ctx.fillText(info,300,500);
      }
      if(userName){
        ctx.font = "14px system-ui"; ctx.fillStyle = "rgba(168,85,247,0.8)";
        ctx.fillText(`Shared by ${userName}`,300,540);
      }
      ctx.font = "bold 14px system-ui"; ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillText("─────────────────────────────",300,580);
      const logoGrad = ctx.createLinearGradient(200,620,400,620);
      logoGrad.addColorStop(0,"#a855f7"); logoGrad.addColorStop(0.5,"#ec4899"); logoGrad.addColorStop(1,"#f59e0b");
      ctx.fillStyle = logoGrad; ctx.font = "bold 28px system-ui"; ctx.fillText("✨ BraidVibe",300,620);
      ctx.font = "14px system-ui"; ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillText("Your Hair, Your Crown, Your Story",300,650);
      ctx.font = "13px system-ui"; ctx.fillStyle = "rgba(168,85,247,0.6)";
      ctx.fillText("braidvibeapp.com",300,690);
      ctx.strokeStyle = "rgba(168,85,247,0.2)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(2,2,596,796,24); ctx.stroke();
      const dataUrl = canvas.toDataURL("image/png");
      if(navigator.share){
        const resp = await fetch(dataUrl);
        const blob = await resp.blob();
        const file = new File([blob],"braidvibe-share.png",{type:"image/png"});
        navigator.share({title,text:shareText,url:shareUrl,files:[file]}).catch(()=>{});
      } else {
        const a = document.createElement("a"); a.href = dataUrl; a.download = `braidvibe-${(title||"share").toLowerCase().replace(/\s+/g,"-")}.png`; a.click();
      }
    } catch(e){ console.log("Share card error",e); }
  };

  const handleCopyLink = ()=>{
    navigator.clipboard?.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  const socials = [
    { name:"Instagram", icon:Instagram, color:"from-purple-600 to-pink-500", url:`https://instagram.com` },
    { name:"TikTok", icon:Play, color:"from-gray-800 to-gray-700", url:`https://tiktok.com` },
    { name:"WhatsApp", icon:MessageCircle, color:"from-green-600 to-green-500", url:`https://wa.me/?text=${encodeURIComponent(shareText+" "+shareUrl)}` },
    { name:"Twitter / X", icon:Twitter, color:"from-blue-500 to-blue-600", url:`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <GlassCard className="w-full max-w-sm p-5 bg-gray-900/95 max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-white flex items-center gap-2"><Share2 size={18} className="text-purple-400"/>Share</h3><button onClick={onClose} className="text-white/50 hover:text-white"><X size={20}/></button></div>

        {/* Beautiful Share Card Preview */}
        <div ref={cardRef} className="relative w-full rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-purple-950 via-gray-950 to-pink-950 border border-white/10 shadow-2xl shadow-purple-500/10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-pink-500/10"/>
          <div className="relative p-5 flex flex-col items-center">
            <div className={`w-32 h-40 rounded-2xl overflow-hidden bg-gradient-to-br ${cat?.color||"from-purple-500/30 to-pink-500/30"} border border-white/10 flex items-center justify-center mb-4 shadow-lg`}>
              {artType ? <BraidArt type={artType} size={120}/> : <div className="text-4xl">✨</div>}
            </div>
            <h4 className="text-white font-black text-lg text-center mb-1">{title||"Amazing Braids"}</h4>
            {(difficulty||time||rating)&&<div className="flex items-center gap-2 text-white/40 text-xs mb-2">
              {difficulty&&<span className="px-2 py-0.5 rounded-full bg-white/5">{difficulty}</span>}
              {time&&<span className="flex items-center gap-0.5"><Clock size={10}/>{time}min</span>}
              {rating&&<span className="flex items-center gap-0.5"><Star size={10} className="text-yellow-400"/>{rating}</span>}
            </div>}
            {userName&&<p className="text-purple-400/60 text-xs mb-3">Shared by {userName}</p>}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3"/>
            <div className="flex items-center gap-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 font-black text-sm">✨ BraidVibe</span>
            </div>
            <p className="text-white/25 text-[10px] mt-1">Your Hair, Your Crown, Your Story</p>
          </div>
        </div>

        {/* Download / Share Image */}
        <button onClick={handleDownloadCard} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-3 shadow-lg shadow-purple-500/20"><Download size={16}/>Download & Share Card</button>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {socials.map(s => <button key={s.name} onClick={()=>{window.open(s.url,"_blank");}} className={`flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r ${s.color} text-white font-medium text-xs hover:opacity-90 active:scale-95 transition-all`}><s.icon size={16}/>{s.name}</button>)}
        </div>

        {/* Copy Link */}
        <button onClick={handleCopyLink} className={`w-full p-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 ${copied?"bg-green-500/20 text-green-400 border border-green-500/20":"bg-white/5 text-white/60 hover:bg-white/10"}`}>
          {copied?<><Check size={16}/>Copied!</>:<><Globe size={16}/>Copy Link</>}
        </button>
      </GlassCard>
    </div>
  );
};

// ─── Payment Modal ───
const STRIPE_LINKS = {
  weekly: "https://buy.stripe.com/bJe14neWH2np5Imd0J2kw02",
  monthly: "https://buy.stripe.com/6oUeVdg0L5zB0o27Gp2kw01",
  annual: "https://buy.stripe.com/14AeVd4i3bXZc6K8Kt2kw00",
};

const PaymentModal = ({ isOpen, onClose, plan }) => {
  if(!isOpen) return null;
  const planInfo = {weekly:{name:"Weekly Pro",price:"$2.99/wk",save:null},monthly:{name:"Monthly Pro",price:"$9.99/mo",save:null},annual:{name:"Annual Pro",price:"$59.99/yr",save:"Save 50% vs monthly"}};
  const info = planInfo[plan] || planInfo.monthly;
  const handleCheckout = () => { window.open(STRIPE_LINKS[plan] || STRIPE_LINKS.annual, "_blank"); };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <GlassCard className="w-full max-w-sm p-6 bg-gray-900/95" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-white flex items-center gap-2"><CreditCard size={20} className="text-purple-400"/>Payment</h3><button onClick={onClose} className="text-white/50 hover:text-white"><X size={20}/></button></div>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-4 border border-purple-500/20">
          <p className="text-white font-bold">{info.name}</p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{info.price}</p>
          {info.save&&<p className="text-green-400 text-xs mt-1">{info.save}</p>}
        </div>
        <p className="text-white/50 text-sm text-center mb-4">You'll be redirected to Stripe's secure checkout to complete your purchase.</p>
        <button onClick={handleCheckout} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"><ExternalLink size={16}/>Continue to Checkout</button>
        <div className="flex items-center justify-center gap-2 text-white/30 text-xs mt-3"><ShieldCheck size={12}/>Powered by Stripe • 256-bit encryption</div>
        <p className="text-white/20 text-xs text-center mt-2">7-day free trial. Cancel anytime.</p>
      </GlassCard>
    </div>
  );
};

// ─── Tutorial Detail ───
const TutorialDetail = ({ tutorial, onBack }) => {
  const [completed,setCompleted]=useState(new Set());
  const [shareOpen,setShareOpen]=useState(false);
  const toggleStep=(i)=>{const n=new Set(completed);n.has(i)?n.delete(i):n.add(i);setCompleted(n);};
  const cat = TUTORIAL_CATEGORIES.find(c=>c.id===tutorial.category);
  const progress = Math.round((completed.size/tutorial.steps.length)*100);

  return (
    <div className="min-h-screen pb-24">
      <ShareModal isOpen={shareOpen} onClose={()=>setShareOpen(false)} title={tutorial.title} artType={tutorial.category} userName={USER_PROFILE.name} difficulty={tutorial.difficulty} time={tutorial.time} rating={tutorial.rating}/>
      {/* Hero */}
      <div className="relative h-64">
        <div className={`absolute inset-0 bg-gradient-to-br ${cat?.color || "from-purple-500 to-pink-500"}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <BraidArt type={tutorial.category} size={180} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <button onClick={onBack} className="absolute top-10 left-4 flex items-center gap-1 text-white/80 hover:text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full"><ArrowLeft size={16}/>Back</button>
          <h1 className="text-2xl font-black text-white mb-2">{tutorial.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={tutorial.difficulty}>{tutorial.difficulty}</Badge>
            <span className="text-white/70 text-sm flex items-center gap-1"><Clock size={12}/>{tutorial.time} {t("minutes")}</span>
            <span className="text-white/70 text-sm flex items-center gap-1"><StarRating rating={tutorial.rating} size={10}/> {tutorial.rating}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setShareOpen(true)} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1 hover:bg-white/30 transition-all"><Share2 size={14}/>{t("share")}</button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1 hover:bg-white/30 transition-all"><Bookmark size={14}/>Save</button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* TikTok Link */}
        {tutorial.tiktok && (
          <a href={tutorial.tiktok} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 mb-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Play size={24} className="text-white fill-white"/>
            </div>
            <div className="flex-1 min-w-0"><p className="text-white font-bold text-sm">{t("watchTutorial")}</p><p className="text-white/40 text-xs truncate">TikTok • Step-by-step video walkthrough</p></div>
            <ExternalLink size={16} className="text-white/30 group-hover:text-purple-400 transition-colors flex-shrink-0"/>
          </a>
        )}

        {/* Progress */}
        <GlassCard className="p-4 mb-4">
          <div className="flex justify-between items-center mb-2"><span className="text-white text-sm font-medium">Progress</span><span className="text-purple-400 text-sm font-bold">{progress}%</span></div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out" style={{width:`${progress}%`}}/></div>
          <p className="text-white/40 text-xs mt-2">{completed.size} of {tutorial.steps.length} steps completed</p>
        </GlassCard>

        {/* Steps */}
        <div className="space-y-3">
          {tutorial.steps.map((step,i) => (
            <GlassCard key={i} className={`p-4 ${completed.has(i)?"bg-purple-500/10 border-purple-500/30":""}`} onClick={()=>toggleStep(i)}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-all duration-300 ${completed.has(i)?"bg-gradient-to-r from-purple-500 to-pink-500 text-white":"bg-white/10 text-white/50"}`}>
                  {completed.has(i)?<Check size={16}/>:i+1}
                </div>
                <p className={`text-sm leading-relaxed pt-1 transition-colors ${completed.has(i)?"text-white/50 line-through":"text-white/80"}`}>{step}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        {progress===100 && <div className="mt-6 text-center"><div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold shadow-lg shadow-yellow-500/30"><Award size={20}/>Tutorial Completed!</div></div>}
      </div>
    </div>
  );
};

// ─── Home Page ───
const HomePage = ({ onNavigate, onTutorialSelect }) => {
  const [featuredIdx,setFeaturedIdx]=useState(0);
  const featured = TUTORIALS.filter(t=>t.trending);
  useEffect(()=>{const timer=setInterval(()=>setFeaturedIdx(i=>(i+1)%featured.length),4000);return()=>clearInterval(timer);},[featured.length]);

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900" />
        <div className="absolute inset-0 flex items-center justify-center opacity-15"><BraidArt type="goddess" size={300}/></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"/>
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"/>
        <div className="relative z-10 h-full flex flex-col justify-end p-6 pb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center shadow-lg"><Scissors size={20} className="text-white"/></div>
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">BraidVibe</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">{t("heroTagline")}</h1>
          <p className="text-white/60 text-sm mb-6 max-w-md">{t("heroSubtitle")}</p>
          <button onClick={()=>onNavigate("explore")} className="self-start px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/30">{t("startLearning")}<ArrowRight size={16}/></button>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2"><Flame size={18} className="text-orange-400"/>{t("featuredStyles")}</h2>
          <div className="flex gap-1">{featured.map((_,i)=><div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i===featuredIdx?"bg-purple-400 w-4":"bg-white/20"}`}/>)}</div>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${featuredIdx*100}%)`}}>
            {featured.map(tut => {
              const cat = TUTORIAL_CATEGORIES.find(c=>c.id===tut.category);
              return (
                <div key={tut.id} className="min-w-full" onClick={()=>onTutorialSelect(tut)}>
                  <div className="relative h-52 rounded-2xl overflow-hidden cursor-pointer hover:opacity-95 transition-all">
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat?.color}`} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-50"><BraidArt type={tut.category} size={180}/></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3"><Badge variant="trending"><TrendingUp size={10} className="inline mr-1"/>Trending</Badge></div>
                    {tut.premium&&<div className="absolute top-3 right-3"><Badge variant="premium"><Crown size={10} className="inline mr-0.5"/>Premium</Badge></div>}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-black text-white mb-1">{tut.title}</h3>
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <span className="flex items-center gap-1"><Clock size={12}/>{tut.time}min</span>
                        <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400"/>{tut.rating}</span>
                        <span className="flex items-center gap-1"><Eye size={12}/>{tut.reviews.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Palette size={18} className="text-pink-400"/>{t("categories")}</h2>
        <div className="grid grid-cols-2 gap-2">
          {TUTORIAL_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={()=>onNavigate("explore")}
              className="relative overflow-hidden rounded-xl h-28 text-left hover:opacity-90 active:scale-[0.97] transition-all group">
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
              <div className="absolute inset-0 flex items-center justify-end pr-2 opacity-40 group-hover:opacity-55 transition-opacity"><BraidArt type={cat.id} size={90}/></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-3">
                <p className="text-white font-bold text-sm">{cat.emoji} {cat.name}</p>
                <p className="text-white/70 text-xs">{TUTORIALS.filter(t=>t.category===cat.id).length} tutorials</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Picks */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Zap size={18} className="text-yellow-400"/>Quick Picks — Under 30min</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {TUTORIALS.filter(tut=>tut.time<=30).map(tut => {
            const cat = TUTORIAL_CATEGORIES.find(c=>c.id===tut.category);
            return (
              <GlassCard key={tut.id} className="min-w-[160px] overflow-hidden" onClick={()=>onTutorialSelect(tut)}>
                <div className={`w-full h-24 bg-gradient-to-br ${cat?.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="opacity-60"><BraidArt type={tut.category} size={80}/></div>
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-bold truncate">{tut.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white/50 text-xs flex items-center gap-1"><Clock size={10}/>{tut.time}m</span>
                    <StarRating rating={tut.rating} size={8}/>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Explore ───
const ExplorePage = ({ onTutorialSelect }) => {
  const [search,setSearch]=useState("");const [filterDiff,setFilterDiff]=useState("all");const [filterCat,setFilterCat]=useState("all");const [showF,setShowF]=useState(false);
  const filtered = TUTORIALS.filter(tut => {
    if(search && !tut.title.toLowerCase().includes(search.toLowerCase())) return false;
    if(filterDiff!=="all" && tut.difficulty!==filterDiff) return false;
    if(filterCat!=="all" && tut.category!==filterCat) return false;
    return true;
  });
  return (
    <div className="pb-24 pt-12 px-4">
      <h1 className="text-2xl font-black text-white mb-4 flex items-center gap-2"><Sparkles size={22} className="text-purple-400"/>{t("allTutorials")}</h1>
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("search")} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 transition-colors"/>
        <button onClick={()=>setShowF(!showF)} className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg ${showF?"bg-purple-500/30 text-purple-400":"text-white/40"}`}><Filter size={16}/></button>
      </div>
      {showF&&(
        <GlassCard className="p-4 mb-4">
          <p className="text-white/60 text-xs mb-2 font-medium">{t("difficulty")}</p>
          <div className="flex flex-wrap gap-2 mb-3">{["all","beginner","intermediate","advanced"].map(d=><button key={d} onClick={()=>setFilterDiff(d)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterDiff===d?"bg-purple-500 text-white":"bg-white/5 text-white/50 hover:bg-white/10"}`}>{d==="all"?"All":d[0].toUpperCase()+d.slice(1)}</button>)}</div>
          <p className="text-white/60 text-xs mb-2 font-medium">Style</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>setFilterCat("all")} className={`px-3 py-1.5 rounded-full text-xs font-medium ${filterCat==="all"?"bg-purple-500 text-white":"bg-white/5 text-white/50"}`}>All</button>
            {TUTORIAL_CATEGORIES.map(cat=><button key={cat.id} onClick={()=>setFilterCat(cat.id)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${filterCat===cat.id?"bg-purple-500 text-white":"bg-white/5 text-white/50"}`}>{cat.emoji} {cat.name}</button>)}
          </div>
        </GlassCard>
      )}
      <p className="text-white/40 text-xs mb-3">{filtered.length} tutorials found</p>
      <div className="space-y-3">
        {filtered.map(tut => {
          const cat = TUTORIAL_CATEGORIES.find(c=>c.id===tut.category);
          return (
            <GlassCard key={tut.id} className="overflow-hidden" onClick={()=>onTutorialSelect(tut)}>
              <div className="flex">
                <div className={`w-28 sm:w-36 bg-gradient-to-br ${cat?.color} flex items-center justify-center flex-shrink-0 relative overflow-hidden min-h-[110px]`}>
                  <div className="opacity-50"><BraidArt type={tut.category} size={90}/></div>
                  {tut.premium&&<div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full p-1"><Lock size={12} className="text-yellow-400"/></div>}
                  {tut.trending&&<div className="absolute bottom-2 left-2"><Badge variant="trending"><TrendingUp size={8} className="inline"/></Badge></div>}
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{tut.title}</h3>
                  <p className="text-white/40 text-xs mt-0.5">{cat?.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant={tut.difficulty}>{tut.difficulty}</Badge>
                    {tut.premium&&<Badge variant="premium"><Crown size={8} className="inline mr-0.5"/>Pro</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-white/50 text-xs">
                    <span className="flex items-center gap-1"><Clock size={10}/>{tut.time}min</span>
                    <span className="flex items-center gap-1"><Star size={10} className="fill-yellow-400 text-yellow-400"/>{tut.rating}</span>
                    <span className="flex items-center gap-1"><Eye size={10}/>{tut.reviews.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
        {filtered.length===0&&<div className="text-center py-12"><Search size={40} className="text-white/10 mx-auto mb-3"/><p className="text-white/30 text-sm">No tutorials found.</p></div>}
      </div>
    </div>
  );
};

// ─── Community ───
const CommunityPage = ({ userAvatar, onScan }) => {
  const [tab,setTab]=useState("trending");
  const [posts,setPosts]=useState(COMMUNITY_POSTS.map(p=>({...p,liked:false,saved:false,userImage:null,commentList:[]})));
  const [showUpload,setShowUpload]=useState(false);const [newText,setNewText]=useState("");
  const [commentingOn,setCommentingOn]=useState(null);const [commentText,setCommentText]=useState("");
  const [shareOpen,setShareOpen]=useState(false);const [shareTitle,setShareTitle]=useState("");const [shareArt,setShareArt]=useState("");
  const [uploadedImage,setUploadedImage]=useState(null);

  const handleLike=(id)=>setPosts(prev=>prev.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p));
  const handlePost=()=>{if(!newText.trim()&&!uploadedImage)return;setPosts([{id:Date.now(),user:USER_PROFILE.name,seed:99,content:newText||"Check out my new style! ✨",artType:userAvatar?.braidType||"box",likes:0,comments:0,time:"now",liked:false,saved:false,userImage:uploadedImage,commentList:[]},...posts]);setNewText("");setUploadedImage(null);setShowUpload(false);};

  const sorted = tab==="trending"?[...posts].sort((a,b)=>b.likes-a.likes):posts;

  return (
    <div className="pb-24 pt-12 px-4">
      <ShareModal isOpen={shareOpen} onClose={()=>setShareOpen(false)} title={shareTitle} artType={shareArt} userName={USER_PROFILE.name}/>
      <h1 className="text-2xl font-black text-white mb-4 flex items-center gap-2"><Users size={22} className="text-pink-400"/>{t("community")}</h1>
      <div className="flex gap-2 mb-4">
        {["trending","latest"].map(tb=><button key={tb} onClick={()=>setTab(tb)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab===tb?"bg-gradient-to-r from-purple-500 to-pink-500 text-white":"bg-white/5 text-white/50 hover:bg-white/10"}`}>{tb==="trending"?<><TrendingUp size={14} className="inline mr-1"/>Trending</>:<><Clock size={14} className="inline mr-1"/>Latest</>}</button>)}
      </div>

      {/* Upload */}
      <GlassCard className="p-4 mb-4">
        {!showUpload?(
          <button onClick={()=>setShowUpload(true)} className="flex items-center gap-3 w-full text-left">
            <SvgAvatar name={USER_PROFILE.name} seed={99} size={40}/>
            <span className="text-white/30 text-sm flex-1">{t("sharePost")}...</span>
            <Camera size={18} className="text-purple-400"/>
          </button>
        ):(
          <div>
            <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Share your braid journey..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 resize-none mb-3"/>
            {uploadedImage&&<div className="relative mb-3"><img src={uploadedImage} alt="Preview" className="w-full h-48 object-cover rounded-xl"/><button onClick={()=>setUploadedImage(null)} className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"><X size={12} className="text-white"/></button></div>}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <label className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl text-white/50 text-sm cursor-pointer hover:bg-white/10"><Image size={16}/>Photo<input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)setUploadedImage(URL.createObjectURL(f));}}/></label>
                {onScan && <button onClick={onScan} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-xl text-purple-400 text-sm hover:bg-purple-500/30"><Camera size={16}/>AI Scan</button>}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>{setShowUpload(false);setNewText("");setUploadedImage(null);}} className="px-4 py-2 rounded-xl bg-white/5 text-white/50 text-sm">Cancel</button>
                <button onClick={handlePost} disabled={!newText.trim()&&!uploadedImage} className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium disabled:opacity-30 flex items-center gap-1"><Send size={14}/>Post</button>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Feed */}
      <div className="space-y-3">
        {sorted.map(post => {
          const cat = TUTORIAL_CATEGORIES.find(c=>c.id===post.artType);
          return (
            <GlassCard key={post.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <SvgAvatar name={post.user} seed={post.seed} size={40}/>
                <div className="flex-1 min-w-0"><p className="text-white font-bold text-sm">{post.user}</p><p className="text-white/30 text-xs">{post.time}</p></div>
                <button className="text-white/30 hover:text-white/50"><MoreHorizontal size={18}/></button>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">{post.content}</p>
              {/* User uploaded image OR illustration */}
              {post.userImage ? (
                <div className="w-full h-56 rounded-xl overflow-hidden mb-3 relative">
                  <img src={post.userImage} alt="Post" className="w-full h-full object-cover"/>
                  <div className="absolute bottom-3 left-3"><span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">{cat?.emoji} {cat?.name}</span></div>
                </div>
              ) : (
                <div className={`w-full h-56 rounded-xl overflow-hidden mb-3 bg-gradient-to-br ${cat?.color || "from-purple-500 to-pink-500"} flex items-center justify-center relative`}>
                  <div className="opacity-60"><BraidArt type={post.artType} size={160}/></div>
                  <div className="absolute bottom-3 left-3"><span className="bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">{cat?.emoji} {cat?.name}</span></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={()=>handleLike(post.id)} className={`flex items-center gap-1.5 text-sm transition-all active:scale-90 ${post.liked?"text-pink-400":"text-white/40 hover:text-white/60"}`}><Heart size={18} className={post.liked?"fill-pink-400":""}/>{post.likes.toLocaleString()}</button>
                  <button onClick={()=>setCommentingOn(commentingOn===post.id?null:post.id)} className="flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm"><MessageCircle size={18}/>{post.comments}</button>
                  <button onClick={()=>{setShareTitle(`${post.user}'s braid post`);setShareArt(post.artType);setShareOpen(true);}} className="flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm"><Share2 size={18}/></button>
                </div>
                <button onClick={()=>setPosts(prev=>prev.map(p=>p.id===post.id?{...p,saved:!p.saved}:p))} className={`transition-all active:scale-90 ${post.saved?"text-yellow-400":"text-white/40"}`}>{post.saved?<BookmarkCheck size={18}/>:<Bookmark size={18}/>}</button>
              </div>
              {commentingOn===post.id&&(
                <div className="mt-3 pt-3 border-t border-white/5">
                  {/* Show existing comments */}
                  {(post.commentList||[]).map((c,ci)=>(
                    <div key={ci} className="flex items-start gap-2 mb-2">
                      <SvgAvatar name={c.user} seed={ci+50} size={24}/>
                      <div><span className="text-white text-xs font-bold">{c.user}</span> <span className="text-white/60 text-xs">{c.text}</span></div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder={t("addComment")} className="flex-1 bg-white/5 border border-white/10 rounded-full py-2 px-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500" onKeyDown={e=>{if(e.key==="Enter"&&commentText.trim()){setPosts(prev=>prev.map(p=>p.id===post.id?{...p,comments:p.comments+1,commentList:[...(p.commentList||[]),{user:USER_PROFILE.name,text:commentText}]}:p));setCommentText("");}}}/>
                    <button onClick={()=>{if(commentText.trim()){setPosts(prev=>prev.map(p=>p.id===post.id?{...p,comments:p.comments+1,commentList:[...(p.commentList||[]),{user:USER_PROFILE.name,text:commentText}]}:p));setCommentText("");}}} className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"><Send size={14} className="text-white"/></button>
                  </div>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

// ─── Profile ───
const ProfilePage = ({ userAvatar, hairHistory = [], onInvite }) => {
  const [tab,setTab]=useState("posts");
  return (
    <div className="pb-24 pt-12">
      <div className="relative bg-gradient-to-br from-purple-900/50 via-gray-900 to-pink-900/50 px-4 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent"/>
        <div className="relative z-10 flex flex-col items-center pt-4">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 p-0.5 shadow-xl shadow-purple-500/20">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                {userAvatar ? <UserAvatar {...userAvatar} size={92}/> : <SvgAvatar name={USER_PROFILE.name} seed={99} size={92} isProfile={true}/>}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center border-2 border-gray-900"><Edit3 size={12} className="text-white"/></div>
          </div>
          <h2 className="text-xl font-black text-white mb-0.5">{USER_PROFILE.name}</h2>
          <p className="text-white/40 text-sm mb-1">{USER_PROFILE.handle}</p>
          <p className="text-white/50 text-xs text-center max-w-xs mb-4">{USER_PROFILE.bio}</p>
          <div className="flex gap-8 mb-4">
            {[["posts",USER_PROFILE.posts],["followers",USER_PROFILE.followers],["following",USER_PROFILE.following]].map(([l,v])=><div key={l} className="text-center"><p className="text-white font-black text-lg">{v.toLocaleString()}</p><p className="text-white/40 text-xs capitalize">{l}</p></div>)}
          </div>
          <div className="flex gap-2 w-full max-w-xs">
            <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition-all">Edit Profile</button>
            {onInvite&&<button onClick={onInvite} className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/20 text-yellow-400 text-sm hover:bg-yellow-500/20 transition-all flex items-center gap-1"><Gift size={14}/>Invite</button>}
            <button onClick={()=>window.location.href="mailto:support@braidvibeapp.com"} className="py-2 px-4 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10" title="Contact Support"><Settings size={16}/></button>
          </div>
        </div>
      </div>
      <div className="flex border-b border-white/5 px-4 mt-2">
        {[["posts",Grid3X3,t("myPosts")],["hair",Scissors,"My Hair"],["saved",Bookmark,t("savedTutorials")],["badges",Award,t("achievements")]].map(([key,Icon,label])=>(
          <button key={key} onClick={()=>setTab(key)} className={`flex-1 py-3 flex items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-all ${tab===key?"border-purple-500 text-purple-400":"border-transparent text-white/30"}`}><Icon size={14}/>{label}</button>
        ))}
      </div>
      <div className="px-4 mt-4">
        {tab==="posts"&&(
          <div className="grid grid-cols-3 gap-1.5">
            {COMMUNITY_POSTS.slice(0,6).map((post)=>{const cat=TUTORIAL_CATEGORIES.find(c=>c.id===post.artType);return(
              <div key={post.id} className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${cat?.color} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative`}>
                <div className="opacity-75"><BraidArt type={post.artType} size={70}/></div>
                <span className="absolute bottom-1.5 left-1.5 text-xs">{cat?.emoji}</span>
              </div>
            );})}
          </div>
        )}
        {tab==="hair"&&userAvatar&&(
          <div>
            <p className="text-white/50 text-xs mb-3">Your braid history — every style you've rocked!</p>
            <div className="grid grid-cols-3 gap-2">
              {(hairHistory.length?hairHistory:["box"]).map((bt,i)=>{
                const cat=TUTORIAL_CATEGORIES.find(c=>c.id===bt);
                return (
                  <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-16 h-20 rounded-xl overflow-hidden border border-white/10">
                      <UserAvatar {...userAvatar} braidType={bt} size={64}/>
                    </div>
                    <span className="text-white text-xs font-medium text-center">{cat?.name||bt}</span>
                    <span className="text-[10px] text-white/30">{cat?.emoji}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {tab==="saved"&&(
          <div className="space-y-2">{TUTORIALS.slice(0,4).map(tut=>{const cat=TUTORIAL_CATEGORIES.find(c=>c.id===tut.category);return(
            <GlassCard key={tut.id} className="p-3 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${cat?.color} flex items-center justify-center`}><div className="opacity-75"><BraidArt type={tut.category} size={40}/></div></div>
              <div className="flex-1 min-w-0"><p className="text-white font-bold text-sm truncate">{tut.title}</p><p className="text-white/40 text-xs">{tut.time}min • {tut.difficulty}</p></div>
              <BookmarkCheck size={16} className="text-yellow-400 flex-shrink-0"/>
            </GlassCard>
          );})}</div>
        )}
        {tab==="badges"&&(
          <div className="grid grid-cols-2 gap-3">{ACHIEVEMENTS.map(b=>(
            <GlassCard key={b.id} className={`p-4 text-center ${!b.unlocked?"opacity-40":""}`}>
              <span className="text-3xl block mb-2">{b.icon}</span><p className="text-white font-bold text-sm">{b.name}</p><p className="text-white/40 text-xs mt-1">{b.desc}</p>
              {b.unlocked&&<div className="mt-2 flex items-center justify-center gap-1 text-green-400 text-xs"><BadgeCheck size={12}/>Unlocked</div>}
            </GlassCard>
          ))}</div>
        )}
      </div>
    </div>
  );
};

// ─── Premium ───
const PremiumPage = ({ onProActivated }) => {
  const [billing,setBilling]=useState("annual");const [payOpen,setPayOpen]=useState(false);
  const feats = {free:["5 basic tutorials","Community access","Save up to 3 tutorials","Standard support"], pro:["ALL tutorials (50+)","Exclusive premium styles","Unlimited saves","Ad-free experience","Early access to new styles","Community badges & flair","Download for offline","Priority support"]};
  return (
    <div className="pb-24 pt-12 px-4">
      <PaymentModal isOpen={payOpen} onClose={()=>setPayOpen(false)} plan={billing}/>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/20 text-yellow-400 text-sm mb-3"><Crown size={14}/>Premium</div>
        <h1 className="text-2xl font-black text-white mb-2">Unlock Your Full Potential</h1>
        <p className="text-white/50 text-sm">Get access to every tutorial, exclusive styles, and a premium community experience.</p>
      </div>
      <div className="flex items-center justify-center gap-1 mb-6 bg-white/5 rounded-full p-1">
        <button onClick={()=>setBilling("weekly")} className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${billing==="weekly"?"bg-white/10 text-white":"text-white/40"}`}>Weekly</button>
        <button onClick={()=>setBilling("monthly")} className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${billing==="monthly"?"bg-white/10 text-white":"text-white/40"}`}>Monthly</button>
        <button onClick={()=>setBilling("annual")} className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${billing==="annual"?"bg-gradient-to-r from-purple-500 to-pink-500 text-white":"text-white/40"}`}>Annual <span className="text-xs ml-1 text-green-400">-50%</span></button>
      </div>
      <div className="space-y-4 mb-6">
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-2"><Unlock size={18} className="text-white/40"/><h3 className="text-white font-bold">Free</h3></div>
          <p className="text-3xl font-black text-white mb-4">$0<span className="text-sm text-white/40 font-normal">/forever</span></p>
          <div className="space-y-2">{feats.free.map((f,i)=><div key={i} className="flex items-center gap-2 text-white/50 text-sm"><Check size={14} className="text-white/20 flex-shrink-0"/>{f}</div>)}</div>
          <button className="w-full mt-4 py-3 rounded-xl bg-white/5 text-white/40 text-sm font-medium">Current Plan</button>
        </GlassCard>
        <div className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs text-white font-bold z-10 shadow-lg shadow-purple-500/30">Most Popular</div>
          <GlassCard className="p-5 border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center gap-2 mb-2"><Crown size={18} className="text-yellow-400"/><h3 className="text-white font-bold">Pro</h3></div>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">{billing==="annual"?"$59.99":billing==="weekly"?"$2.99":"$9.99"}<span className="text-sm text-white/40 font-normal">{billing==="annual"?"/year":billing==="weekly"?"/week":"/month"}</span></p>
            {billing==="annual"&&<p className="text-green-400 text-xs mb-4 flex items-center gap-1"><Gift size={12}/>That's just $5/month — save $60/year</p>}
            {billing==="weekly"&&<p className="text-purple-300 text-xs mb-4 flex items-center gap-1"><Zap size={12}/>Try it risk-free — cancel anytime</p>}
            {billing==="monthly"&&<p className="text-white/40 text-xs mb-4">Most flexible option</p>}
            <div className="space-y-2">{feats.pro.map((f,i)=><div key={i} className="flex items-center gap-2 text-white/80 text-sm"><Check size={14} className="text-purple-400 flex-shrink-0"/>{f}</div>)}</div>
            <button onClick={()=>setPayOpen(true)} className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"><Zap size={16}/>{t("startFreeTrial")}</button>
            <p className="text-white/30 text-xs text-center mt-2">7-day free trial. Cancel anytime.</p>
          </GlassCard>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6 mb-2">{[["2M+","Users"],["4.9","Rating"],["50+","Tutorials"]].map(([v,l])=><div key={l} className="text-center"><p className="text-white font-black text-lg">{v}</p><p className="text-white/30 text-xs">{l}</p></div>)}</div>
      <div className="flex items-center justify-center gap-2 text-white/20 text-xs mt-2"><ShieldCheck size={14}/>Secure payment • Cancel anytime • Instant access</div>
      <p className="text-center text-white/20 text-xs mt-4">Questions? <a href="mailto:support@braidvibeapp.com" className="text-purple-400 hover:text-purple-300 underline">support@braidvibeapp.com</a></p>
    </div>
  );
};

// ─── Custom Avatar Builder (first-time setup) ───
const SKIN_TONES = ["#f5d0b0","#e8a862","#deb887","#c68642","#a0724a","#8d5524","#6b3a1f","#3d2010"];
const HAIR_COLORS = [["#4a3560","#2d1f3d"],["#7a4820","#5a3518"],["#d4a36a","#8b6d3f"],["#c0392b","#8e2420"],["#2c3e50","#1a252f"],["#e8c078","#b8944a"],["#ec4899","#a855f7"],["#3b82f6","#6366f1"]];
const ACCESSORY_COLORS = ["#fbbf24","#ec4899","#a855f7","#22c55e","#3b82f6","#f43f5e","none"];

const UserAvatar = ({ skinTone, hairColor, braidType, accessoryColor, size = 100, showBg = true }) => {
  const uid = `ua_${Math.random().toString(36).slice(2,6)}`;
  const [hc1, hc2] = hairColor || HAIR_COLORS[0];
  const sk = skinTone || SKIN_TONES[3];
  const bt = braidType || "box";
  const acc = accessoryColor || "none";
  // Face center=70,78  rx=28 ry=34 → face spans x:42-98 y:44-112
  // Braids must stay OUTSIDE x:42-98 area (left side < 40, right side > 100)
  return (
    <svg width={size} height={size} viewBox="0 0 140 160" style={{borderRadius: size > 60 ? 20 : "50%"}}>
      <defs>
        <linearGradient id={`${uid}bg`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6b3fa0"/><stop offset="100%" stopColor="#3d1f6e"/></linearGradient>
        <linearGradient id={`${uid}h`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={hc1}/><stop offset="100%" stopColor={hc2}/></linearGradient>
      </defs>
      {showBg && <rect width="140" height="160" fill={`url(#${uid}bg)`} rx="20"/>}

      {/* ===== LAYER 1: Braids that go BEHIND the head ===== */}
      {bt==="french" && <>
        {/* French braid goes down the back — visible behind neck */}
        <path d="M70 55 Q68 80 66 100 Q64 120 62 145 Q60 152 58 158" stroke={hc1} strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M70 55 Q72 80 70 100 Q68 120 66 145" stroke={hc2} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5"/>
        {[60,72,84,96,108,120,135].map((y,j)=><ellipse key={j} cx={68-j*0.5} cy={y} rx="4" ry="1.5" fill={hc2} opacity="0.3"/>)}
      </>}
      {bt==="fishtail" && <>
        {/* Fishtail hangs over the right shoulder — behind body */}
        <path d="M100 60 Q110 85 115 108 Q118 130 115 155" stroke={hc1} strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M100 60 Q112 85 117 108 Q120 130 117 155" stroke={hc2} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.4"/>
        {[65,78,91,104,117,130,143].map((y,j)=><g key={j}>
          <path d={`M${106+j*0.8} ${y} L${116+j*0.3} ${y+5}`} stroke={hc2} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          <path d={`M${116+j*0.3} ${y} L${106+j*0.8} ${y+5}`} stroke={hc1} strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
        </g>)}
      </>}

      {/* ===== LAYER 2: Neck & shoulders ===== */}
      <path d="M58 108 Q70 114 82 108 L88 130 Q70 138 52 130Z" fill={sk} opacity="0.9"/>
      <ellipse cx="70" cy="142" rx="40" ry="16" fill={hc1} opacity="0.2"/>
      <path d="M38 135 Q70 128 102 135 Q110 145 110 160 L30 160 Q30 145 38 135Z" fill={hc1} opacity="0.25"/>

      {/* ===== LAYER 3: Face ===== */}
      <ellipse cx="70" cy="78" rx="28" ry="34" fill={sk}/>
      {/* Eyes */}
      <ellipse cx="60" cy="75" rx="4.5" ry="3" fill="white"/>
      <ellipse cx="80" cy="75" rx="4.5" ry="3" fill="white"/>
      <circle cx="61" cy="75" r="2" fill="#2a1205"/>
      <circle cx="81" cy="75" r="2" fill="#2a1205"/>
      <circle cx="61.8" cy="74.2" r="0.8" fill="white"/>
      <circle cx="81.8" cy="74.2" r="0.8" fill="white"/>
      {/* Eyebrows */}
      <path d="M54 69 Q60 66 66 68" stroke="#2a1205" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M74 68 Q80 66 86 69" stroke="#2a1205" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M68 82 Q70 85 72 82" stroke={sk} strokeWidth="0.8" fill="none" opacity="0.5" style={{filter:"brightness(0.8)"}}/>
      {/* Lips */}
      <path d="M62 92 Q66 96 70 95 Q74 96 78 92" fill="#d4786a" opacity="0.9"/>
      <path d="M64 92 Q70 89 76 92" stroke="#e08888" strokeWidth="0.5" fill="none"/>
      {/* Blush */}
      <circle cx="54" cy="85" r="5" fill="#ff9999" opacity="0.12"/>
      <circle cx="86" cy="85" r="5" fill="#ff9999" opacity="0.12"/>

      {/* ===== LAYER 4: Hair on TOP of head (covers forehead, not face) ===== */}
      <path d="M40 60 Q42 35 56 28 Q65 24 70 23 Q75 24 84 28 Q98 35 100 60 L100 55 Q98 42 88 35 Q78 30 70 29 Q62 30 52 35 Q42 42 40 55Z" fill={`url(#${uid}h)`}/>

      {/* ===== LAYER 5: Side braids (ONLY outside the face, x<40 or x>100) ===== */}
      {bt==="box" && <>
        {/* Left side braids */}
        <path d="M38 55 Q34 90 30 130 Q28 145 26 158" stroke={hc1} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M40 52 Q37 88 34 125 Q32 142 30 155" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M42 50 Q40 85 38 120 Q36 138 35 152" stroke={hc1} strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Right side braids */}
        <path d="M98 50 Q100 85 102 120 Q104 138 105 152" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M100 52 Q103 88 106 125 Q108 142 110 155" stroke={hc1} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M102 55 Q106 90 110 130 Q112 145 114 158" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Beads */}
        {acc!=="none" && <>
          {[130,128,125,120,122,118].map((y,i)=><circle key={i} cx={i<3?[30,34,38][i]:[102,106,110][i-3]} cy={y} r="2.5" fill={acc}/>)}
        </>}
      </>}
      {bt==="cornrow" && <>
        {/* Cornrows — tight to scalp on top, visible rows */}
        {[50,58,66,74,82,90].map((x,i) => <g key={i}>
          <path d={`M${x} ${30+Math.abs(i-2.5)*1.5} L${x} ${55}`} stroke={hc1} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          {[0,1,2].map(j=><path key={j} d={`M${x-2.5} ${34+Math.abs(i-2.5)*1.5+j*7} L${x} ${31+Math.abs(i-2.5)*1.5+j*7} L${x+2.5} ${34+Math.abs(i-2.5)*1.5+j*7}`} stroke={hc2} strokeWidth="1" fill="none" opacity="0.6"/>)}
        </g>)}
        {/* Scalp part lines */}
        {[54,62,70,78,86].map((x,i)=><line key={i} x1={x} y1={30+Math.abs(i-2)*1.5} x2={x} y2={52} stroke={sk} strokeWidth="0.8" opacity="0.3"/>)}
      </>}
      {bt==="dutch" && <>
        {/* Two Dutch braids — going down left and right SIDES, not over face */}
        <line x1="70" y1="24" x2="70" y2="42" stroke={sk} strokeWidth="1.2" opacity="0.3"/>
        {/* Left braid — starts at top-left, goes down the left side */}
        <path d="M55 32 Q48 42 40 55 Q34 70 30 88 Q26 108 24 130 Q22 145 20 158" stroke={hc1} strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M55 32 Q48 42 40 55 Q34 70 30 88 Q26 108 24 130" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
        {[42,55,70,88,108,130].map((y,j)=>{const bx=55-(j*5.5);return <path key={j} d={`M${bx-4} ${y} L${bx} ${y-2.5} L${bx+4} ${y}`} stroke={hc2} strokeWidth="0.8" fill="none" opacity="0.5"/>;
        })}
        {/* Right braid */}
        <path d="M85 32 Q92 42 100 55 Q106 70 110 88 Q114 108 116 130 Q118 145 120 158" stroke={hc1} strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M85 32 Q92 42 100 55 Q106 70 110 88 Q114 108 116 130" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
      </>}
      {bt==="french" && <>
        {/* French braid — hair frames face, braid is behind (drawn in layer 1) */}
        {/* Just show the hair parting on top and slight volume */}
        <path d="M42 55 Q40 65 38 80 Q36 95 38 105" stroke={hc1} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M98 55 Q100 65 102 80 Q104 95 102 105" stroke={hc1} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
      </>}
      {bt==="fishtail" && <>
        {/* Hair swept to one side — visible frames on sides */}
        <path d="M42 55 Q38 70 36 90 Q34 105 36 110" stroke={hc1} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M98 52 Q102 65 105 80 Q108 95 108 105" stroke={hc1} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
      </>}
      {bt==="twist" && <>
        {/* Twists hanging on left and right sides */}
        {[0,1,2].map(i => <g key={`l${i}`}>
          <path d={`M${36+i*3} ${52+i*2} C${34+i*2} ${80} ${30+i*3} ${110} ${28+i*2} ${145+i*3}`} stroke={hc1} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d={`M${37+i*3} ${52+i*2} C${32+i*2} ${80} ${34+i*3} ${110} ${30+i*2} ${145+i*3}`} stroke={hc2} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
        </g>)}
        {[0,1,2].map(i => <g key={`r${i}`}>
          <path d={`M${100+i*3} ${52+i*2} C${104+i*2} ${80} ${106+i*3} ${110} ${108+i*2} ${145+i*3}`} stroke={hc1} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <path d={`M${101+i*3} ${52+i*2} C${106+i*2} ${80} ${104+i*3} ${110} ${110+i*2} ${145+i*3}`} stroke={hc2} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
        </g>)}
      </>}
      {bt==="goddess" && <>
        {/* Thick goddess braids on sides with wispy bits */}
        <path d="M38 52 Q32 80 28 110 Q24 135 22 155" stroke={hc1} strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M42 50 Q36 78 32 105 Q28 130 26 150" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M100 50 Q106 78 110 105 Q114 130 116 150" stroke={hc1} strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M98 52 Q108 80 112 110 Q116 135 118 155" stroke={hc2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.5"/>
        {/* Wispy loose curls */}
        <path d="M30 90 Q26 95 30 100" stroke={hc2} strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M112 88 Q116 93 112 98" stroke={hc2} strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Crown/tiara */}
        <path d="M50 26 L58 18 L66 24 L70 14 L74 24 L82 18 L90 26" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="70" cy="14" r="3" fill="#fbbf24"/>
        {/* Gold cuffs */}
        {acc!=="none" && <>
          <rect x="26" y="100" width="8" height="5" rx="2" fill={acc} opacity="0.9"/>
          <rect x="108" y="98" width="8" height="5" rx="2" fill={acc} opacity="0.9"/>
        </>}
      </>}
      {bt==="locs" && <>
        {/* Locs hanging down on both sides */}
        {[0,1,2,3].map(i => <path key={`ll${i}`} d={`M${36+i*2} ${50+i*2} Q${32+i*2} ${90} ${28+i*2} ${142+i*4}`} stroke={i%2?hc1:hc2} strokeWidth="5.5" fill="none" strokeLinecap="round"/>)}
        {[0,1,2,3].map(i => <path key={`lr${i}`} d={`M${100+i*2} ${50+i*2} Q${104+i*2} ${90} ${108+i*2} ${142+i*4}`} stroke={i%2?hc2:hc1} strokeWidth="5.5" fill="none" strokeLinecap="round"/>)}
      </>}
      {bt==="bantu" && <>
        {/* Bantu knots — on TOP of head and sides above forehead, NOT on face */}
        {[[48,24,9],[70,20,10],[92,24,9],[34,40,8],[70,38,9],[106,40,8],[40,58,7],[100,58,7]].map(([cx,cy,r],i)=><g key={i}>
          <circle cx={cx} cy={cy} r={r} fill={hc1}/>
          <circle cx={cx} cy={cy} r={r-2} fill={hc2} opacity="0.6"/>
          <path d={`M${cx} ${cy-r+2} A${r-3} ${r-3} 0 1 1 ${cx-0.1} ${cy-r+2}`} stroke={hc2} strokeWidth="1" fill="none" opacity="0.35"/>
          <circle cx={cx-r*0.2} cy={cy-r*0.2} r={r*0.15} fill="white" opacity="0.15"/>
        </g>)}
      </>}
      {bt==="micro" && <>
        {/* Micro braids — thin strands on left and right sides only */}
        {Array.from({length:8}).map((_,i)=>{
          const lx = 28 + i*2;
          return <path key={`ml${i}`} d={`M${lx+12} ${48+i*1.5} Q${lx+4} ${90} ${lx} ${140+i*2}`} stroke={i%2?hc1:hc2} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
        })}
        {Array.from({length:8}).map((_,i)=>{
          const rx = 100 + i*2;
          return <path key={`mr${i}`} d={`M${rx-12} ${48+i*1.5} Q${rx-4} ${90} ${rx} ${140+i*2}`} stroke={i%2?hc2:hc1} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
        })}
      </>}

      {/* ===== LAYER 6: Earrings (always on top) ===== */}
      {acc!=="none" && <>
        <circle cx="40" cy="92" r="3.5" fill={acc} opacity="0.8"/>
        <circle cx="100" cy="92" r="3.5" fill={acc} opacity="0.8"/>
      </>}
    </svg>
  );
};

// ─── Avatar Setup Screen (first access) ───
const QUIZ_QUESTIONS = [
  { q: "How much time do you have?", opts: [
    { label: "15-30 min", icon: "⚡", styles: ["french","fishtail","bantu"] },
    { label: "1-2 hours", icon: "⏰", styles: ["cornrow","dutch","twist"] },
    { label: "3+ hours", icon: "💎", styles: ["box","goddess","locs","micro"] },
  ]},
  { q: "What's the occasion?", opts: [
    { label: "Everyday casual", icon: "🌿", styles: ["french","dutch","twist","cornrow"] },
    { label: "Going out / date", icon: "✨", styles: ["goddess","fishtail","box"] },
    { label: "Festival / party", icon: "🎉", styles: ["bantu","goddess","locs","micro"] },
    { label: "Professional", icon: "💼", styles: ["cornrow","french","box","micro"] },
  ]},
  { q: "What length do you prefer?", opts: [
    { label: "Short / close to scalp", icon: "💇", styles: ["cornrow","bantu"] },
    { label: "Medium / shoulder length", icon: "💁", styles: ["dutch","french","fishtail","twist"] },
    { label: "Long / waist length", icon: "👸", styles: ["box","goddess","locs","micro"] },
  ]},
  { q: "Your vibe?", opts: [
    { label: "Elegant & classic", icon: "🦢", styles: ["french","dutch","fishtail"] },
    { label: "Bold & statement", icon: "🔥", styles: ["goddess","bantu","cornrow"] },
    { label: "Boho & free-spirited", icon: "🌸", styles: ["locs","twist","goddess"] },
    { label: "Sleek & modern", icon: "🖤", styles: ["box","micro","cornrow"] },
  ]},
];

const AvatarSetup = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [skinTone, setSkinTone] = useState(SKIN_TONES[3]);
  const [hairColorIdx, setHairColorIdx] = useState(0);
  const [braidType, setBraidType] = useState("box");
  const [accColor, setAccColor] = useState("none");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const hairColor = HAIR_COLORS[hairColorIdx];
  const steps = ["Skin Tone", "Hair Color", "Braid Style", "Accessories"];

  const handleQuizAnswer = (styles) => {
    const newScores = {...quizScores};
    styles.forEach(s => { newScores[s] = (newScores[s]||0) + 1; });
    setQuizScores(newScores);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Find the top style
      const sorted = Object.entries(newScores).sort((a,b) => b[1] - a[1]);
      const winner = sorted[0]?.[0] || "box";
      setQuizResult(winner);
      setBraidType(winner);
    }
  };

  const resetQuiz = () => { setShowQuiz(false); setQuizStep(0); setQuizScores({}); setQuizResult(null); };
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 z-50 flex flex-col items-center px-6 py-10 overflow-y-auto">
      <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-1">Create Your Avatar</h1>
      <p className="text-white/40 text-sm mb-6">Customize your look — it'll appear on all your posts!</p>
      {/* Progress dots */}
      <div className="flex gap-2 mb-6">{steps.map((s,i)=><div key={i} className={`h-1.5 rounded-full transition-all ${i===step?"w-8 bg-gradient-to-r from-purple-500 to-pink-500":"w-4 bg-white/15"}`}/>)}</div>
      {/* Preview */}
      <div className="mb-6 relative">
        <div className="w-36 h-44 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border-2 border-white/10">
          <UserAvatar skinTone={skinTone} hairColor={hairColor} braidType={braidType} accessoryColor={accColor} size={144}/>
        </div>
        <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold">
          {steps[step]}
        </div>
      </div>
      {/* Step content */}
      <div className="w-full max-w-sm">
        {step === 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {SKIN_TONES.map(s => (
              <button key={s} onClick={()=>setSkinTone(s)} className={`w-12 h-12 rounded-full border-2 transition-all ${skinTone===s?"border-purple-400 scale-110 shadow-lg shadow-purple-500/30":"border-white/10 hover:border-white/30"}`} style={{backgroundColor:s}}/>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {HAIR_COLORS.map(([c1],i) => (
              <button key={i} onClick={()=>setHairColorIdx(i)} className={`w-12 h-12 rounded-full border-2 transition-all ${hairColorIdx===i?"border-purple-400 scale-110 shadow-lg shadow-purple-500/30":"border-white/10 hover:border-white/30"}`} style={{backgroundColor:c1}}/>
            ))}
          </div>
        )}
        {step === 2 && !showQuiz && (
          <div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {TUTORIAL_CATEGORIES.map(cat => (
                <button key={cat.id} onClick={()=>setBraidType(cat.id)} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${braidType===cat.id?"bg-purple-500/30 border border-purple-400/50 scale-105":"bg-white/5 border border-white/5 hover:bg-white/10"}`}>
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-[9px] text-white/60 leading-tight text-center">{cat.name}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4">
              <button onClick={()=>setShowQuiz(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/20 text-amber-300 text-sm font-medium hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2">
                <Sparkles size={16}/>Don't know your style? Take the quiz!
              </button>
            </div>
          </div>
        )}
        {step === 2 && showQuiz && !quizResult && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <button onClick={resetQuiz} className="text-white/40 text-sm hover:text-white/60 flex items-center gap-1"><ArrowLeft size={14}/>Back to styles</button>
              <span className="text-white/30 text-xs">{quizStep+1}/{QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="flex gap-1 mb-5">{QUIZ_QUESTIONS.map((_,i)=><div key={i} className={`h-1 flex-1 rounded-full transition-all ${i<=quizStep?"bg-gradient-to-r from-purple-500 to-pink-500":"bg-white/10"}`}/>)}</div>
            <h3 className="text-white font-bold text-center text-lg mb-4">{QUIZ_QUESTIONS[quizStep].q}</h3>
            <div className="space-y-2">
              {QUIZ_QUESTIONS[quizStep].opts.map((opt,i) => (
                <button key={i} onClick={()=>handleQuizAnswer(opt.styles)} className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-purple-500/20 hover:border-purple-500/30 active:scale-[0.98] transition-all flex items-center gap-3">
                  <span className="text-xl">{opt.icon}</span>{opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && showQuiz && quizResult && (
          <div className="text-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
              <Sparkles size={16} className="text-purple-400"/>
              <span className="text-purple-300 font-bold text-sm">Perfect Match Found!</span>
            </div>
            <div className="flex justify-center mb-3">
              <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/20">
                <UserAvatar skinTone={skinTone} hairColor={hairColor} braidType={quizResult} accessoryColor={accColor} size={112}/>
              </div>
            </div>
            <h3 className="text-white font-black text-xl mb-1">{TUTORIAL_CATEGORIES.find(c=>c.id===quizResult)?.name}</h3>
            <p className="text-white/50 text-sm mb-4">{TUTORIAL_CATEGORIES.find(c=>c.id===quizResult)?.emoji} This style matches your vibe perfectly!</p>
            <div className="flex gap-2">
              <button onClick={resetQuiz} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-all">Try Again</button>
              <button onClick={()=>{resetQuiz();setStep(3);}} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1"><Check size={16}/>Use This Style</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-wrap justify-center gap-3">
            {ACCESSORY_COLORS.map(c => (
              <button key={c} onClick={()=>setAccColor(c)} className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${accColor===c?"border-purple-400 scale-110 shadow-lg shadow-purple-500/30":"border-white/10 hover:border-white/30"}`} style={{backgroundColor:c==="none"?"transparent":c}}>
                {c==="none"&&<X size={18} className="text-white/40"/>}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Navigation */}
      {!(step===2 && showQuiz) && (
        <div className="flex gap-3 mt-8 w-full max-w-sm">
          {step > 0 && <button onClick={()=>{setStep(s=>s-1);resetQuiz();}} className="flex-1 py-3 rounded-xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-1"><ArrowLeft size={16}/>Back</button>}
          {step < 3 ? (
            <button onClick={()=>setStep(s=>s+1)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1">Next<ArrowRight size={16}/></button>
          ) : (
            <button onClick={()=>onComplete({skinTone,hairColor,braidType,accessoryColor:accColor})} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"><Sparkles size={16}/>Let's Go!</button>
          )}
        </div>
      )}
    </div>
  );
};

// ─── AI Braid Scanner (simulated) ───
const BraidScanner = ({ onComplete, userAvatar }) => {
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(null);
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);
  const braidNames = {box:"Box Braids",cornrow:"Cornrows",dutch:"Dutch Braids",french:"French Braids",fishtail:"Fishtail",twist:"Twist Braids",goddess:"Goddess Braids",locs:"Locs",bantu:"Bantu Knots",micro:"Micro Braids"};
  const handleFile = () => {
    // Simulate AI detection
    setScanning(true);
    const types = Object.keys(braidNames);
    const randomType = types[Math.floor(Math.random()*types.length)];
    setTimeout(()=>{ setDetected(randomType); setScanning(false); }, 2500);
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <GlassCard className="w-full max-w-sm p-6 bg-gray-900/95">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Camera size={20} className="text-purple-400"/>AI Braid Scanner</h3>
          <button onClick={()=>onComplete(null)} className="text-white/50 hover:text-white"><X size={20}/></button>
        </div>
        {!scanning && !detected && (
          <div className="text-center">
            <p className="text-white/50 text-sm mb-4">Take a photo of your braids and our AI will detect the style and create your avatar post!</p>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile}/>
            <button onClick={()=>fileRef.current?.click()} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"><Camera size={20}/>Scan My Braids</button>
          </div>
        )}
        {scanning && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-purple-500 border-t-transparent" style={{animation:"spin 1s linear infinite"}}/>
            <p className="text-white font-bold">Analyzing your braids...</p>
            <p className="text-purple-400 text-sm mt-1">AI is detecting your style</p>
          </div>
        )}
        {detected && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 mx-auto w-fit">
              <Check size={14} className="text-green-400"/><span className="text-green-400 text-sm font-bold">Detected: {braidNames[detected]}</span>
            </div>
            <div className="my-4 flex justify-center">
              <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/20">
                <UserAvatar {...userAvatar} braidType={detected} size={112}/>
              </div>
            </div>
            <p className="text-white/50 text-xs mb-3">Your avatar updated with {braidNames[detected]}!</p>
            <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Add a caption..." className="w-full mb-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-purple-500/50"/>
            <button onClick={()=>onComplete({type:detected,caption:caption||`Rocking my ${braidNames[detected]}!`})} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"><Send size={16}/>Post with Avatar</button>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

// ─── Onboarding Screens ───
const OnboardingScreens = ({ onFinish }) => {
  const [idx, setIdx] = useState(0);
  const screens = [
    { icon: Scissors, title: "Welcome to BraidVibe", desc: "Learn stunning braid styles from beginner to pro — step by step, with video tutorials.", color: "from-purple-500 to-pink-500" },
    { icon: Camera, title: "AI Braid Scanner", desc: "Take a photo of your braids and our AI detects the style, updates your avatar, and shares it!", color: "from-pink-500 to-amber-500" },
    { icon: Users, title: "Join the Community", desc: "Share your looks, get inspired, and connect with 2M+ braid lovers worldwide.", color: "from-amber-500 to-purple-500" },
    { icon: Crown, title: "Go Premium", desc: "Unlock 50+ exclusive tutorials, ad-free experience, and early access to new styles.", color: "from-purple-500 to-indigo-500" },
  ];
  const s = screens[idx];
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center px-8">
      <div className="flex gap-1.5 mb-10">{screens.map((_,i)=><div key={i} className={`h-1 rounded-full transition-all ${i===idx?"w-8 bg-gradient-to-r "+s.color:"w-4 bg-white/15"}`}/>)}</div>
      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-8 shadow-2xl`} style={{animation:"fadeSlideIn 0.4s ease-out"}}>
        <s.icon size={44} className="text-white"/>
      </div>
      <h2 className="text-2xl font-black text-white text-center mb-3" style={{animation:"fadeSlideIn 0.4s ease-out"}}>{s.title}</h2>
      <p className="text-white/50 text-sm text-center max-w-xs mb-10" style={{animation:"fadeSlideIn 0.5s ease-out"}}>{s.desc}</p>
      <div className="flex gap-3 w-full max-w-xs">
        <button onClick={onFinish} className="px-5 py-3 rounded-xl bg-white/5 text-white/40 text-sm font-medium hover:bg-white/10 transition-all">Skip</button>
        <button onClick={()=>{if(idx<screens.length-1)setIdx(idx+1);else onFinish();}} className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${s.color} text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1`}>
          {idx<screens.length-1?<>Next<ArrowRight size={16}/></>:<>Get Started<Sparkles size={16}/></>}
        </button>
      </div>
    </div>
  );
};

// ─── Notification System ───
const INITIAL_NOTIFS = [
  { id: 1, text: "BraidQueen_Nia liked your post 😍", time: "2m ago", read: false, icon: "❤️" },
  { id: 2, text: "New tutorial: Butterfly Locs is trending! 🦋", time: "15m ago", read: false, icon: "🔥" },
  { id: 3, text: "CurlsByMaya commented on your post", time: "1h ago", read: false, icon: "💬" },
  { id: 4, text: "You earned the 'First Braid' badge! 🏆", time: "2h ago", read: true, icon: "🎉" },
  { id: 5, text: "StylesbyTasha started following you", time: "5h ago", read: true, icon: "👋" },
];

const NotificationBell = ({ notifications, onOpen }) => {
  const unread = notifications.filter(n=>!n.read).length;
  return (
    <button onClick={onOpen} className="relative p-2 rounded-xl hover:bg-white/10 transition-all">
      <Bell size={20} className="text-white/60"/>
      {unread>0&&<div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"><span className="text-[10px] text-white font-bold">{unread}</span></div>}
    </button>
  );
};

const NotificationPanel = ({ isOpen, onClose, notifications, onMarkRead }) => {
  if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose}>
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-gray-950/98 border-l border-white/5 p-4 overflow-y-auto" onClick={e=>e.stopPropagation()} style={{animation:"fadeSlideIn 0.2s ease-out"}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Bell size={18} className="text-purple-400"/>Notifications</h3>
          <div className="flex gap-2">
            <button onClick={onMarkRead} className="text-purple-400 text-xs hover:text-purple-300">Mark all read</button>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X size={20}/></button>
          </div>
        </div>
        <div className="space-y-2">
          {notifications.map(n=>(
            <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl transition-all ${n.read?"bg-white/5":"bg-purple-500/10 border border-purple-500/15"}`}>
              <span className="text-lg mt-0.5">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${n.read?"text-white/50":"text-white/80"}`}>{n.text}</p>
                <p className="text-white/25 text-xs mt-1">{n.time}</p>
              </div>
              {!n.read&&<div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Premium Paywall Overlay ───
const PremiumPaywall = ({ onSubscribe, onClose }) => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md rounded-2xl">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/30">
      <Lock size={28} className="text-white"/>
    </div>
    <h3 className="text-white font-black text-lg mb-1">Premium Content</h3>
    <p className="text-white/50 text-xs text-center px-6 mb-4">Subscribe to unlock this tutorial and 50+ more exclusive styles</p>
    <button onClick={onSubscribe} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/30"><Crown size={14}/>Unlock Pro — from $2.99/wk</button>
    <button onClick={onClose} className="mt-2 text-white/30 text-xs hover:text-white/50">Maybe later</button>
  </div>
);

// ─── Referral / Invite System ───
const ReferralModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = "BRAIDVIBE-" + (USER_PROFILE.name.slice(0,4).toUpperCase()) + "-2026";
  const referralLink = `${typeof window!=="undefined"?window.location.origin:"https://braidvibeapp.com"}/ref/${referralCode}`;
  if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <GlassCard className="w-full max-w-sm p-6 bg-gray-900/95" onClick={e=>e.stopPropagation()}>
        <div className="text-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/30"><Gift size={28} className="text-white"/></div>
          <h3 className="text-xl font-black text-white mb-1">Invite Friends, Get Rewards!</h3>
          <p className="text-white/50 text-sm">Each friend who joins earns you both an exclusive badge + 7 free days of Pro</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
          <p className="text-white/40 text-xs mb-1">Your referral code</p>
          <p className="text-white font-mono font-bold text-sm">{referralCode}</p>
        </div>
        <div className="flex gap-2 mb-3">
          <button onClick={()=>{navigator.clipboard?.writeText(referralLink);setCopied(true);setTimeout(()=>setCopied(false),2000);}} className="flex-1 py-3 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-1.5">
            {copied?<><Check size={14} className="text-green-400"/>Copied!</>:<><Globe size={14}/>Copy Link</>}
          </button>
          <button onClick={()=>{if(navigator.share)navigator.share({title:"Join BraidVibe!",text:`Use my code ${referralCode} to get 7 free days of Pro! 🔥`,url:referralLink}).catch(()=>{});}} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5"><Share2 size={14}/>Share</button>
        </div>
        <div className="border-t border-white/5 pt-3">
          <p className="text-white/30 text-xs text-center">3 friends invited · 2 joined · 14 free Pro days earned 🎉</p>
        </div>
      </GlassCard>
    </div>
  );
};

// ─── Avatar Download Button ───
const AvatarDownload = ({ userAvatar }) => {
  const downloadAvatar = () => {
    // Render UserAvatar SVG to canvas then download as PNG
    const svgEl = document.createElement("div");
    svgEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="460" viewBox="0 0 140 160">
      <defs><linearGradient id="dlbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6b3fa0"/><stop offset="100%" stop-color="#3d1f6e"/></linearGradient></defs>
      <rect width="140" height="160" fill="url(#dlbg)" rx="20"/>
      <text x="70" y="155" text-anchor="middle" fill="white" font-size="8" opacity="0.4">BraidVibe</text>
    </svg>`;
    const svgData = svgEl.innerHTML;
    const canvas = document.createElement("canvas");
    canvas.width = 400; canvas.height = 460;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 400, 460);
      const link = document.createElement("a");
      link.download = "my-braidvibe-avatar.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };
  return (
    <button onClick={downloadAvatar} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/30 transition-all">
      <Image size={16}/>Save Avatar
    </button>
  );
};

// ─── Main App ───
export default function BraidVibeApp() {
  const [loading,setLoading]=useState(true);const [page,setPage]=useState("home");const [selTut,setSelTut]=useState(null);const [prevPage,setPrevPage]=useState("home");
  const [userAvatar, setUserAvatar] = useState(null);
  const [showSetup, setShowSetup] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [hairHistory, setHairHistory] = useState([]);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const [paywallTut, setPaywallTut] = useState(null);

  const nav=(t)=>{setPrevPage(page);setSelTut(null);setPage(t);window.location.hash=t;};
  const openTut=(tut)=>{
    if(tut.premium && !isPro) { setPaywallTut(tut); return; }
    setPrevPage(page);setSelTut(tut);setPage("detail");window.location.hash=`tutorial/${tut.id}`;
  };
  const handleAvatarComplete = (avatar) => { setUserAvatar(avatar); setShowSetup(false); setHairHistory([avatar.braidType]); };
  const handleScanComplete = (result) => {
    setScannerOpen(false);
    if (result) {
      setUserAvatar(a=>({...a, braidType: result.type}));
      setHairHistory(h=>[...new Set([result.type,...h])]);
      setNotifications(n=>[{id:Date.now(),text:`Your avatar was updated to ${result.type}! 🎨`,time:"now",read:false,icon:"✨"},...n]);
    }
  };
  const markAllRead = () => setNotifications(n=>n.map(x=>({...x,read:true})));

  // Deep link handling
  useEffect(()=>{
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if(hash.startsWith("tutorial/")){
        const id = parseInt(hash.split("/")[1]);
        const tut = TUTORIALS.find(t=>t.id===id);
        if(tut) { if(tut.premium && !isPro){ setPaywallTut(tut); } else { setPrevPage("explore"); setSelTut(tut); setPage("detail"); } }
      } else if(["home","explore","community","profile","premium"].includes(hash)){
        setPage(hash);
      }
    };
    window.addEventListener("hashchange", handleHash);
    if(window.location.hash) handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  },[]);

  // Simulated push notifications
  useEffect(()=>{
    const msgs = [
      "Someone loved your braids! ❤️","New trending style just dropped 🔥","Your friend just joined BraidVibe! 🎉",
      "StylesbyTasha posted a new look ✨","You're on a 3-day streak! Keep going 💪",
    ];
    const timer = setInterval(()=>{
      setNotifications(n=>[{id:Date.now(),text:msgs[Math.floor(Math.random()*msgs.length)],time:"now",read:false,icon:["❤️","🔥","🎉","✨","💪"][Math.floor(Math.random()*5)]},...n.slice(0,19)]);
    }, 45000);
    return ()=>clearInterval(timer);
  },[]);

  if(loading) return <SplashScreen onFinish={()=>setLoading(false)}/>;
  if(showOnboarding) return <OnboardingScreens onFinish={()=>setShowOnboarding(false)}/>;
  if(showSetup) return <AvatarSetup onComplete={handleAvatarComplete}/>;

  const navItems=[{id:"home",icon:Home,label:t("home")},{id:"explore",icon:Search,label:t("explore")},{id:"community",icon:Users,label:t("community")},{id:"profile",icon:User,label:t("profile")},{id:"premium",icon:Crown,label:t("premium")}];
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden" style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>
      <div className="max-w-lg mx-auto relative">
        {/* Top bar with notifications */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-gray-950/60 backdrop-blur-xl">
          <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-2">
            <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">BraidVibe</span>
            <div className="flex items-center gap-1">
              <button onClick={()=>setReferralOpen(true)} className="p-2 rounded-xl hover:bg-white/10 transition-all"><Gift size={18} className="text-white/40"/></button>
              <NotificationBell notifications={notifications} onOpen={()=>setNotifOpen(true)}/>
            </div>
          </div>
        </div>
        <div className="pt-12" key={page} style={{animation:"fadeSlideIn 0.3s ease-out"}}>
          {page==="home"&&<HomePage onNavigate={nav} onTutorialSelect={openTut}/>}
          {page==="explore"&&<ExplorePage onTutorialSelect={openTut} isPro={isPro}/>}
          {page==="community"&&<CommunityPage userAvatar={userAvatar} onScan={()=>setScannerOpen(true)}/>}
          {page==="profile"&&<ProfilePage userAvatar={userAvatar} hairHistory={hairHistory} onInvite={()=>setReferralOpen(true)}/>}
          {page==="premium"&&<PremiumPage onProActivated={()=>setIsPro(true)}/>}
          {page==="detail"&&selTut&&<TutorialDetail tutorial={selTut} onBack={()=>{setPage(prevPage);setSelTut(null);window.location.hash=prevPage;}}/>}
        </div>
        {scannerOpen && <BraidScanner onComplete={handleScanComplete} userAvatar={userAvatar}/>}
        {/* Premium paywall modal */}
        {paywallTut && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={()=>setPaywallTut(null)}>
            <GlassCard className="w-full max-w-sm p-0 overflow-hidden bg-gray-900/95" onClick={e=>e.stopPropagation()}>
              <div className={`h-40 bg-gradient-to-br ${TUTORIAL_CATEGORIES.find(c=>c.id===paywallTut.category)?.color} flex items-center justify-center relative`}>
                <BraidArt type={paywallTut.category} size={120}/>
                <div className="absolute inset-0 bg-black/20"/>
              </div>
              <div className="p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mx-auto -mt-12 mb-3 border-4 border-gray-900 shadow-lg"><Lock size={22} className="text-white"/></div>
                <h3 className="text-white font-black text-lg mb-1">{paywallTut.title}</h3>
                <p className="text-white/40 text-xs mb-4">This is a Premium tutorial. Subscribe to unlock all 50+ exclusive styles.</p>
                <button onClick={()=>{setPaywallTut(null);nav("premium");}} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 mb-2"><Crown size={16}/>Unlock Pro — from $2.99/wk</button>
                <button onClick={()=>setPaywallTut(null)} className="text-white/30 text-xs hover:text-white/50">Maybe later</button>
              </div>
            </GlassCard>
          </div>
        )}
        <NotificationPanel isOpen={notifOpen} onClose={()=>setNotifOpen(false)} notifications={notifications} onMarkRead={markAllRead}/>
        <ReferralModal isOpen={referralOpen} onClose={()=>setReferralOpen(false)}/>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-950/80 backdrop-blur-xl border-t border-white/5 z-40 safe-area-bottom">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-2">
          {navItems.map(item=>{const active=page===item.id||(page==="detail"&&prevPage===item.id);return(
            <button key={item.id} onClick={()=>nav(item.id)} className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${active?"text-purple-400":"text-white/30 hover:text-white/50"}`}>
              <div className={`p-1.5 rounded-xl transition-all ${active?"bg-purple-500/20":""}`}><item.icon size={20}/></div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );})}
        </div>
      </nav>
      <style>{`
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes ping{75%,100%{transform:scale(1.3);opacity:0;}}
        .scrollbar-hide::-webkit-scrollbar{display:none;}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none;}
        .safe-area-bottom{padding-bottom:env(safe-area-inset-bottom,8px);}
      `}</style>
    </div>
  );
}
