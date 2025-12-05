"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Share2,
  Clock,
  Loader2,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  getBlogBySlug,
  getAllBlogs,
} from "@/modules/admin/blogs/server/actions";
import { formatDate } from "@/lib/utils";
import { BlogPost, BlogData, PLACEHOLDER_IMAGE } from "../types";
import { convertRichTextToHtml } from "@/lib/rich-text";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailPageProps {
  slug: string;
}

export const BlogPage = ({ slug }: BlogDetailPageProps) => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // Fetch blog and related posts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const result = await getBlogBySlug(slug);

        if (result.success && result.data) {
          const htmlContent = convertRichTextToHtml(result.data.content);

          const blogData: BlogData = {
            id: result.data.id,
            title: result.data.title,
            content: htmlContent,
            image: PLACEHOLDER_IMAGE,
            date: formatDate(result.data.createdAt, "full"),
            slug: result.data.slug,
            author: result.data.author,
            tags: result.data.tags,
            category: result.data.category,
          };
          setBlog(blogData);

          // Fetch related blogs based on tags
          const allBlogsResult = await getAllBlogs({ status: "published" });

          if (allBlogsResult.success && allBlogsResult.data) {
            const related = allBlogsResult.data
              .filter((b) => {
                // Exclude current blog
                if (b.id === result.data.id) return false;

                // Check if any tags match
                const hasMatchingTags = b.tags.some((tag) =>
                  result.data.tags.includes(tag)
                );
                return hasMatchingTags;
              })
              .slice(0, 3) // Limit to 3 related posts
              .map((b) => {
                const relatedHtml = convertRichTextToHtml(b.content);
                // Create excerpt from HTML
                const excerpt =
                  relatedHtml.replace(/<[^>]*>/g, "").substring(0, 100) + "...";

                return {
                  id: b.id,
                  title: b.title,
                  excerpt: excerpt,
                  image: PLACEHOLDER_IMAGE,
                  date: formatDate(b.createdAt, "short"),
                  slug: b.slug,
                  readTime: "5 min read", // You can calculate this based on content length
                };
              });

            setRelatedPosts(related);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useGSAP(
    () => {
      // Hero section animation
      if (heroRef.current) {
        const backButton = heroRef.current.querySelector(".back-button");
        const title = heroRef.current.querySelector(".blog-title");
        const meta = heroRef.current.querySelector(".blog-meta");
        const image = heroRef.current.querySelector(".hero-image");

        if (backButton) {
          gsap.from(backButton, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (title) {
          gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
          });
        }

        if (meta) {
          gsap.from(meta, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          });
        }

        if (image) {
          gsap.from(image, {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          });
        }
      }

      // Content animation
      if (contentRef.current) {
        const contentElements = contentRef.current.querySelectorAll(
          "h2, h3, p, ul, ol, blockquote"
        );

        if (contentElements.length > 0) {
          gsap.from(contentElements, {
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        }
      }

      // Related posts animation
      if (relatedRef.current) {
        const title = relatedRef.current.querySelector(".related-title");
        const cards = relatedRef.current.querySelectorAll(".related-card");

        if (title) {
          gsap.from(title, {
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 80%",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.2,
            ease: "power3.out",
          });
        }
      }
    },
    { scope: pageRef, dependencies: [blog] }
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog?.title || "Blog Post",
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <article className="bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-12 h-12 text-teal-green animate-spin" />
          </div>
        </div>
      </article>
    );
  }

  if (!blog) {
    return (
      <article className="bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-pewter">Blog not found</div>
          <div className="text-center mt-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-teal-green hover:text-turquoise-blue"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article ref={pageRef} className="bg-ivory">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-white border-b border-pewter/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="back-button inline-flex items-center gap-2 text-pewter hover:text-teal-green transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blog
          </Link>

          {/* Title */}
          <h1 className="blog-title text-ebony text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="blog-meta flex flex-wrap items-center gap-6 text-pewter text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">By {blog.author}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-teal-green transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Category and Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="bg-teal-green/10 text-teal-green px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-pewter/10 text-pewter px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Featured Image */}
          <div className="hero-image relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div ref={relatedRef} className="bg-white py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="related-title text-ebony text-3xl md:text-4xl font-bold text-center mb-12">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  href={`/blogs/${post.slug}`}
                  key={post.id}
                  className="related-card bg-ivory rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-pewter text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-ebony text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:text-teal-green transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-pewter text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-teal-green font-semibold group-hover:text-turquoise-blue transition-colors duration-300">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
