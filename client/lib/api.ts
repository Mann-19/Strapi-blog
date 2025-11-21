const STRAPI_URL = "http://localhost:1337";

export async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}/api/${path}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json.data;
}

// Get all posts
export async function getPosts() {
  return fetchAPI("posts?populate=*");
}

// Get a post from id
export async function getPost(id: string) {
  return fetchAPI(`posts/${id}?populate=*`);
}

// Get Authors
export async function getAuthors() {
  return fetchAPI("authors");
}

// Get Categories
export async function getCategories() {
  return fetchAPI("categories");
}

// Create a new Post
export async function createPost(payload: any) {
  const res = await fetch(`${STRAPI_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Strapi requires the body to be wrapped in a "data" object
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}
