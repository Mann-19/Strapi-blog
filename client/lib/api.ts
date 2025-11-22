const STRAPI_URL = "http://localhost:1337";

export async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}/api/${path}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json.data;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  // Otherwise prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
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
