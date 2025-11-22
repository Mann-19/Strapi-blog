import { getPost, getStrapiMedia } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  let post = null;

  try {
    post = await getPost(id);
  } catch (error) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>Post not found or API error.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = getStrapiMedia(post.coverImage?.url);

  return (
    <main className="max-w-4xl mx-auto p-10">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
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
              priority // Load this image fast
            />
          </div>
        )}

        <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>

        <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
          {/* ... Author and Category logic stays the same ... */}
        </div>

        <div className="prose lg:prose-xl whitespace-pre-wrap text-gray-800">
          {post.content}
        </div>
      </article>
    </main>
  );
}
