// Shared types for blog components
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  featured?: boolean;
  readTime?: string;
}

export interface BlogData {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  slug: string;
  author: string;
  tags: string[];
  category: string;
}

// Shared constants
export const PLACEHOLDER_IMAGE = "/banner/banner-5.avif";

// Helper to calculate read time from content
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper to create excerpt from content
export const createExcerpt = (
  content: string,
  length: number = 150
): string => {
  const strippedContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  return strippedContent.length > length
    ? strippedContent.substring(0, length) + "..."
    : strippedContent;
};
