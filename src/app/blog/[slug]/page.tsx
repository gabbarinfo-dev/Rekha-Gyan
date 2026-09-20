import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Calendar, User, Sparkles, Share2 } from "lucide-react";
import { getWordPressPostBySlug, getWordPressPosts } from "@/lib/wordpress";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getWordPressPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found — REKHA GYAN",
    };
  }

  const cleanTitle = post.title.rendered.replace(/<[^>]+>/g, "");
  const cleanExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: `${cleanTitle} — REKHA GYAN`,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      images: post.featured_media_url ? [post.featured_media_url] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getWordPressPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getWordPressPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-gold-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Post Header */}
      <header className="space-y-4 mb-10">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-gold-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {post.author_name || "REKHA Editorial"}
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </header>

      {/* Featured Banner */}
      {post.featured_media_url && (
        <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden mb-10 border border-gold-500/20 shadow-2xl relative">
          <img
            src={post.featured_media_url}
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Content Container */}
      <div className="cosmic-card rounded-3xl p-6 sm:p-10 border border-gold-500/20 shadow-2xl">
        <div
          className="prose prose-invert prose-gold max-w-none text-slate-200 prose-headings:font-serif prose-headings:text-gold-300 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:my-1 prose-a:text-gold-400 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>

      {/* Call to Action for Consultation */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-cosmic-900 via-mystic-purple/30 to-cosmic-900 border border-gold-500/40 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-gold-500/20 mx-auto flex items-center justify-center text-gold-300">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white font-serif">
          Curious About How This Applies to Your Own Palms?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Stop guessing with general guides. Let REKHA examine your palm photos alongside your exact birth Kundali and Vimshottari Dasha for personalized clarity.
        </p>
        <div className="pt-2">
          <Link
            href="/#reading-form"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-cosmic-950 bg-gradient-to-r from-gold-300 to-amber-300 shadow-xl shadow-gold-500/30 hover:scale-[1.03] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Get My Personalized Reading
          </Link>
        </div>
      </div>
    </article>
  );
}
