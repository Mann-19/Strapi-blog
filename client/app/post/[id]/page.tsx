import { getPost, getStrapiMedia } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params; 
  
  let post = null;
  try {
    post = await getPost(id);
  } catch (error) {
    return <div>Post not found</div>;
  }

  const imageUrl = getStrapiMedia(post.coverImage?.url);

  return (
    <main className="max-w-4xl mx-auto p-10">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>

      <article>
        {/* Hero Image */}
        {imageUrl && (
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
                <Image 
                    src={imageUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                    priority 
                />
            </div>
        )}

        <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
        
        <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
          <span className="font-medium text-gray-900">By {post.author?.name || 'Unknown'}</span>
          <span className="mx-3">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>

        <div className="prose lg:prose-xl text-gray-800 max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

      </article>
    </main>
  );
}