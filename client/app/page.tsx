import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  // Fetch data from Strapi
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Blog</h1>
        {/* We will create this page later */}
        <Link 
          href="/create" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.length === 0 && <p>No posts found. Go create one in Strapi!</p>}

        {/* Loop through posts */}
        {posts.map((post: any) => (
          <div key={post.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            
            {/* Meta info: Author and Category */}
            <div className="text-gray-500 text-sm mb-4">
              <span>By {post.author?.name || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {post.category?.name || 'Uncategorized'}
              </span>
            </div>

            {/* Link to the details page */}
            <Link href={`/post/${post.documentId}`} className="text-blue-600 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}