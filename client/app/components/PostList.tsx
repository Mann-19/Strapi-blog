'use client';

import { useState, useMemo } from "react";
import Hero from "./Hero";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";

export default function PostList({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. Extract unique categories from the real data
  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map(p => p.category?.name || "Uncategorized"));
    return ["All", ...Array.from(uniqueCategories)];
  }, [posts]);

  // 2. Filter logic
  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(post => (post.category?.name || "Uncategorized") === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Hero Section */}
      <Hero />
      
      <main id="content" className="container mx-auto px-6 py-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Latest Articles</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Curated thoughts and perspectives on the things that matter.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            // We use documentId (v5) or id (v4) for the key
            <BlogCard key={post.documentId || post.id} post={post} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Editorial. All stories worth your time.
          </p>
        </div>
      </footer>
    </div>
  );
}