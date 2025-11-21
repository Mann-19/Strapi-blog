import { getPost } from '@/lib/api';
import Link from 'next/link';

// This is a Server Component that receives the ID from the URL
export default async function PostPage({ params }: { params: { id: string } }) {
  // In Next.js 15, params is a promise, so we await it (just in case you are on the very latest version)
  const { id } = await params; 
  
  let post = null;
  
  try {
    // Fetch the specific post using the ID from the URL
    post = await getPost(id);
  } catch (error) {
    // If post not found or error
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-red-500">Error</h1>
            <p>Post not found or API error.</p>
            <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-10">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>

      <article>
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
          <span className="font-medium text-gray-900">By {post.author?.name || 'Unknown Author'}</span>
          <span className="mx-3">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>

        {/* Note: content is just text for now. 
           If you added "Enter" keys in Strapi, they might just show as one block.
           We use whitespace-pre-wrap to preserve line breaks.
        */}
        <div className="prose lg:prose-xl whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </main>
  );
}