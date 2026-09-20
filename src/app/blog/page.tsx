import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Calendar, ArrowRight, User } from "lucide-react";
import { getWordPressPosts } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vedic Palmistry & Astrology Blog — REKHA GYAN",
  description:
    "Explore classical Samudrika Shastra secrets, rare palm signs (Matsya, Trishul), Saturn dasha career timings, and authentic Vedic astrology wisdom.",
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await getWordPressPosts();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Blog Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5 text-gold-400" />
          The REKHA Knowledge Sanctuary
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
          Vedic Palmistry &amp; Astrological Insights
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          Deep-dive tutorials, classical translations of Hastasanjivani &amp; Brihat Samhita, and practical guides on planetary transits.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="cosmic-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-gold-500/30"
          >
            <div>
              {/* Featured Image */}
              {post.featured_media_url && (
                <div className="relative w-full h-48 overflow-hidden bg-cosmic-900">
                  <img
                    src={post.featured_media_url}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-transparent to-transparent opacity-80" />
                </div>
              )}

              <div className="p-6">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1 text-gold-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author_name || "REKHA Editorial"}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors font-serif leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    <span
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                </h2>

                {/* Excerpt */}
                <div
                  className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </div>

            {/* Read More Link */}
            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:text-gold-200 transition-colors"
              >
                <span>Read Full Classical Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
