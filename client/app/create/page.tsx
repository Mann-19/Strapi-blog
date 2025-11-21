'use client'; // Required for handling state and user interaction

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For redirecting after submit
import { getAuthors, getCategories, createPost } from '@/lib/api';

export default function CreatePost() {
  const router = useRouter();

  // State for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // State for dropdown lists
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch Authors and Categories when the page loads
  useEffect(() => {
    async function loadData() {
      const authorData = await getAuthors();
      const categoryData = await getCategories();
      setAuthors(authorData);
      setCategories(categoryData);
    }
    loadData();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page from reloading

    if (!title || !content || !authorId || !categoryId) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await createPost({
        title,
        content,
        author: authorId,   // Strapi relates via ID
        category: categoryId, // Strapi relates via ID
      });
      
      alert('Post created!');
      router.push('/'); // Redirect to home
      router.refresh(); // Refresh the data on the home page
    } catch (error) {
      alert('Error creating post.');
      console.error(error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter post title"
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block font-medium mb-2">Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded h-32"
            placeholder="Write your blog content here..."
          />
        </div>

        {/* Author Dropdown */}
        <div>
          <label className="block font-medium mb-2">Author</label>
          <select 
            value={authorId} 
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select an Author</option>
            {authors.map((author) => (
              // We use documentId (v5) or id (v4). Using 'id' is safer for generic setup, 
              // but if it fails, check if your Strapi uses documentId
              <option key={author.id} value={author.documentId || author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block font-medium mb-2">Category</label>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.documentId || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
        >
          Publish Post
        </button>
      </form>
    </main>
  );
}