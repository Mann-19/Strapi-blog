import { getPosts } from '@/lib/api';
import PostList from './components/PostList';

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto p-10">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">The Assignment Blog</h1>
        <p className="text-lg text-gray-600">Exploring code, content, and Strapi CMS.</p>
      </header>

      {/* Pass data to client component for search functionality */}
      <PostList posts={posts} />
    </main>
  );
}