import { getPosts } from '@/lib/api';
import PostList from './components/PostList';

export default async function Home() {
  const posts = await getPosts();

  return (
    // We just pass the data. The PostList handles the entire UI layout now.
    <PostList posts={posts} />
  );
}