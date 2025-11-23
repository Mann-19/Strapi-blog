import { getPost, getStrapiMedia } from '@/lib/api';
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ params }: { params: { id: string } }) {
  // 1. Fetch Data
  const { id } = await params;
  let post = null;

  try {
    post = await getPost(id);
  } catch (error) {
    // Handle 404 cleanly
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
          <Link 
            href="/" 
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. Data Preparation
  const imageUrl = getStrapiMedia(post.coverImage?.url);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  // Calculate Read Time (approx 200 words per minute)
  const calculateReadTime = (text: string) => {
    const words = text?.split(/\s+/).length || 0;
    return Math.ceil(words / 200) || 1;
  };

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      
      {/* Back Button */}
      <div className="container mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Category */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-sm uppercase tracking-wider font-medium rounded-sm">
            <Tag className="w-3.5 h-3.5" />
            {post.category?.name || "General"}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-foreground">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm">{readTime} min read</span>
          </div>
          <div className="ml-auto">
            <p className="text-sm">
              By <span className="text-foreground font-semibold">{post.author?.name || "Admin"}</span>
            </p>
          </div>
        </div>

        {/* Excerpt (Optional: If you don't have an excerpt field, we can remove or fake it) */}
        {/* <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-6">
          {post.excerpt} 
        </p> */}
      </header>

      {/* Cover Image */}
      <div className="container mx-auto px-6 mb-16 max-w-5xl">
        <div className="aspect-[21/9] bg-muted rounded-sm overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-6 pb-20 max-w-3xl">
        <div className="
            prose prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-muted-foreground prose-em:italic
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-accent 
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-li:text-muted-foreground
          ">
          {/* We use ReactMarkdown because we are storing Markdown in Strapi */}
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Editorial. All stories worth your time.
          </p>
        </div>
      </footer>
    </div>
  );
}