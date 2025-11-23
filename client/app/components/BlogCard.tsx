import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/api";

interface BlogCardProps {
  post: any;
}

const BlogCard = ({ post }: BlogCardProps) => {
  
  // Helper: Format Date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  // Helper: Calculate Read Time (approx 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / 200) || 1;
  };

  // Data Preparation
  const imageUrl = getStrapiMedia(post.coverImage?.url);
  const excerpt = post.content 
    ? post.content.substring(0, 120).replace(/[#*]/g, '') + "..." 
    : "Click to read more.";
  
  const categoryName = post.category?.name || "General";
  const authorName = post.author?.name || "Admin";
  const readTime = calculateReadTime(post.content);

  return (
    <article className="group hover-lift bg-card border border-border rounded-sm overflow-hidden">
      <Link href={`/post/${post.documentId || post.id}`} className="block h-full">
        
        {/* Cover Image */}
        <div className="aspect-16/10 bg-muted overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-smooth group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider font-medium rounded-sm">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold mb-3 leading-tight group-hover:text-accent transition-smooth">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider group-hover:gap-3 transition-smooth">
              <span>Read</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Author */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              By <span className="text-foreground font-medium">{authorName}</span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;