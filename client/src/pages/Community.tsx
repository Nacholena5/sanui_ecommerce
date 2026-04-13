import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  ExternalLink,
  Heart,
  Instagram,
  MessageCircle,
  Play,
  Users,
  Zap,
} from "lucide-react";

function PostCard({ post }: { post: {
  id: string;
  type: string;
  caption: string;
  likes: number;
  comments: number;
  permalink: string;
  thumbnail: string;
  timestamp: string;
} }) {
  const formatCaption = (caption: string) => {
    return caption.split("\n").filter(Boolean)[0]?.replace(/#\w+/g, "").trim() || "";
  };

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("es-UY", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5"
    >
      <img
        src={post.thumbnail}
        alt={formatCaption(post.caption)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      {/* Video badge */}
      {post.type === "VIDEO" && (
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
          <Play size={12} className="text-white fill-white" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-sanui-dark/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
        <div className="flex items-center gap-5 text-white">
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <Heart size={16} className="fill-red-400 text-red-400" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-bold">
            <MessageCircle size={16} />
            {post.comments}
          </span>
        </div>
        <p className="text-white/80 text-xs text-center leading-relaxed line-clamp-4">
          {formatCaption(post.caption)}
        </p>
        <span className="text-gray-500 text-xs">{formatDate(post.timestamp)}</span>
        <div className="flex items-center gap-1 text-sanui-blue text-xs font-semibold mt-1">
          Ver en Instagram
          <ExternalLink size={11} />
        </div>
      </div>
    </a>
  );
}

export default function Community() {
  const { data, isLoading } = trpc.instagram.getPosts.useQuery({ limit: 20 });

  const totalLikes = data?.totalLikes ?? 0;
  const posts = data?.posts ?? [];
  const account = data?.account;

  return (
    <div className="min-h-screen bg-sanui-dark">
      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-16">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sanui-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sanui-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl">
            {/* Instagram badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
                <Instagram size={18} className="text-white" />
              </div>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                @sanui.uy
              </span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-none mb-4">
              TEAM
              <br />
              <span className="text-sanui-green">SANUI</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Esto no es solo una marca. Es una comunidad de gente que come bien,
              entrena fuerte y elige snacks con personalidad.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="font-display text-4xl text-white mb-1">
                {account?.followers.toLocaleString("es-UY") ?? "932"}
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <Users size={12} />
                Seguidores
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-white mb-1">
                {account?.posts ?? 24}
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <Instagram size={12} />
                Posts
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-sanui-yellow mb-1">
                {totalLikes}+
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <Heart size={12} />
                Likes totales
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl text-sanui-green mb-1">🇺🇾</div>
              <div className="text-gray-500 text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <Zap size={12} />
                Hecho en Uruguay
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl text-white">ÚLTIMOS POSTS</h2>
          <a
            href="https://www.instagram.com/sanui.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sanui-blue text-sm font-semibold hover:text-white transition-colors"
          >
            Ver en Instagram
            <ExternalLink size={14} />
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Join */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center mx-auto mb-6">
              <Instagram size={28} className="text-white" />
            </div>
            <h2 className="font-display text-5xl text-white mb-4">
              UNITE AL
              <br />
              <span className="text-sanui-green">EQUIPO</span>
            </h2>
            <p className="text-gray-400 mb-8 text-base leading-relaxed">
              Seguinos en Instagram y sé parte de la comunidad SANUI.
              Contenido real, sin filtros, con mucha proteína.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/sanui.uy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              >
                <Instagram size={18} />
                Seguir @sanui.uy
              </a>
              <a
                href="https://www.instagram.com/sanui.uy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
              >
                Ver todos los posts
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
