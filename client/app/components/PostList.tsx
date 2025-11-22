'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';

export default function PostList({ posts }: { posts: any[] }) {
  const [search, setSearch] = useState('');

  // Filter posts based on search text (checking Title or Category)
  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.category?.name.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts by title or category..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid of Posts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 && <p className="text-gray-500">No posts found.</p>}

        {filteredPosts.map((post) => {
          // Handle Image URL
          const imageUrl = getStrapiMedia(post.coverImage?.url);

          return (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col">
              
              {/* Cover Image */}
              {imageUrl ? (
                <div className="relative h-48 w-full">
                   <Image 
                     src={imageUrl} 
                     alt={post.title} 
                     fill 
                     className="object-cover"
                   />
                </div>
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide">
                        {post.category?.name || 'News'}
                    </span>
                </div>

                <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content}
                </p>

                <div className="mt-auto flex items-center justify-between border-t pt-4">
                    <span className="text-xs text-gray-500">
                        By {post.author?.name || 'Admin'}
                    </span>
                    <Link href={`/post/${post.documentId || post.id}`} className="text-blue-600 text-sm font-semibold hover:underline">
                    Read Article →
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}