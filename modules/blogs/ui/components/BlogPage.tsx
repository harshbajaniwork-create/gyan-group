"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight, Share2, Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  readTime?: string;
}

// Static blog data
const relatedPosts: BlogPost[] = [
  {
    id: 2,
    title:
      "Early Access to Sahara AI Studio Now Open: An Integrated Platform Redefining AI Development",
    excerpt:
      "Join the Early Access Program for Sahara AI Studio. This program provides exclusive early access to an all-in-one platform designed to...",
    image: "/blog/blog2.jpg",
    date: "FEB 11, 2025",
    slug: "sahara-ai-studio",
    readTime: "5 min read",
  },
  {
    id: 3,
    title:
      "Introducing Sahara Legends: A New, Gamified Way to Interact with the Sahara Ecosystem",
    excerpt:
      "Experience a revolutionary way to engage with AI development through our new gamified platform.",
    image: "/blog/blog3.jpg",
    date: "JAN 29, 2025",
    slug: "sahara-legends",
    readTime: "4 min read",
  },
  {
    id: 4,
    title:
      "DeepSeek: How 10,000 GPUs and a Quant Trader Sparked an AI Revolution",
    excerpt:
      "Discover the fascinating story behind DeepSeek's breakthrough in AI computing infrastructure.",
    image: "/blog/blog4.jpg",
    date: "JAN 25, 2025",
    slug: "deepseek-ai-revolution",
    readTime: "6 min read",
  },
];

// Sample blog content
const blogContent = `
  <p>Join the Early Access Program for Sahara AI Studio. This program provides exclusive early access to an all-in-one platform designed to transform the AI development lifecycle into a streamlined, integrated experience.</p>

  <p>The landscape of artificial intelligence development has been fragmented for too long. Developers and researchers have had to juggle multiple tools, platforms, and environments to bring their AI projects to life. This complexity not only slows down development but also creates barriers to innovation.</p>

  <h2>What is Sahara AI Studio?</h2>

  <p>Sahara AI Studio represents a paradigm shift in how we approach AI development. It's an integrated platform that brings together all the essential tools and services needed for modern AI development under one roof. From data preparation and model training to deployment and monitoring, everything is seamlessly connected.</p>

  <h3>Key Features of the Platform</h3>

  <ul>
    <li><strong>Unified Development Environment:</strong> Write, test, and deploy your AI models in a single, cohesive workspace.</li>
    <li><strong>Collaborative Tools:</strong> Work seamlessly with your team members in real-time, sharing insights and code effortlessly.</li>
    <li><strong>Advanced Model Management:</strong> Track experiments, compare results, and manage model versions with ease.</li>
    <li><strong>Scalable Infrastructure:</strong> From prototype to production, scale your projects without worrying about infrastructure.</li>
  </ul>

  <h2>Why Join the Early Access Program?</h2>

  <p>Early adopters will have the unique opportunity to shape the future of the platform. Your feedback will directly influence the development roadmap, ensuring that Sahara AI Studio meets the real-world needs of AI developers and researchers.</p>

  <blockquote>
    "The future of AI development lies in integration, not fragmentation. Sahara AI Studio is our commitment to making AI development accessible, efficient, and collaborative."
  </blockquote>

  <h3>Benefits for Early Access Members</h3>

  <ol>
    <li>Priority access to new features and updates</li>
    <li>Direct communication with the development team</li>
    <li>Exclusive pricing and extended trial periods</li>
    <li>Recognition as a founding community member</li>
  </ol>

  <h2>Getting Started</h2>

  <p>Joining the Early Access Program is straightforward. Simply register your interest through our platform, and our team will guide you through the onboarding process. We're committed to making your transition as smooth as possible.</p>

  <p>Whether you're a solo developer working on a side project or part of a large research team, Sahara AI Studio is designed to adapt to your needs. The platform scales with you, growing more powerful as your projects become more ambitious.</p>

  <h2>The Road Ahead</h2>

  <p>This is just the beginning. As we continue to develop and refine Sahara AI Studio, we're excited to see what the community will build with it. The possibilities are endless, and we can't wait to see your creations come to life on our platform.</p>

  <p>Join us in revolutionizing AI development. Together, we can make artificial intelligence more accessible, efficient, and impactful than ever before.</p>
`;

interface BlogDetailPageProps {
  slug?: string;
}

export const BlogPage = ({
  slug = "sahara-ai-studio-early-access",
}: BlogDetailPageProps) => {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero section animation
      if (heroRef.current) {
        const backButton = heroRef.current.querySelector(".back-button");
        const title = heroRef.current.querySelector(".blog-title");
        const meta = heroRef.current.querySelector(".blog-meta");
        const image = heroRef.current.querySelector(".hero-image");

        gsap.from(backButton, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(title, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });

        gsap.from(meta, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        });

        gsap.from(image, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
        });
      }

      // Content animation
      if (contentRef.current) {
        const contentElements = contentRef.current.querySelectorAll(
          "h2, h3, p, ul, ol, blockquote"
        );

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

      // Related posts animation
      if (relatedRef.current) {
        const title = relatedRef.current.querySelector(".related-title");
        const cards = relatedRef.current.querySelectorAll(".related-card");

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
    },
    { scope: pageRef }
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Early Access to Sahara AI Studio Now Open",
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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
            Early Access to Sahara AI Studio Now Open: An Integrated Platform
            Redefining AI Development
          </h1>

          {/* Meta Information */}
          <div className="blog-meta flex flex-wrap items-center gap-6 text-pewter text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>February 11, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-teal-green transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="hero-image relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/blog/blog1.jpg"
              alt="Sahara AI Studio"
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
          className="prose prose-lg max-w-none
            prose-headings:text-ebony prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-pewter prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-ebony prose-strong:font-semibold
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-pewter prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-teal-green
            prose-blockquote:bg-teal-green/5 prose-blockquote:py-4 prose-blockquote:px-6
            prose-blockquote:rounded-r-xl prose-blockquote:not-italic
            prose-blockquote:text-ebony prose-blockquote:font-medium
            prose-a:text-teal-green prose-a:no-underline hover:prose-a:text-turquoise-blue"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        />
      </div>

      {/* Related Posts Section */}
      <div ref={relatedRef} className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="related-title text-ebony text-3xl md:text-4xl font-bold text-center mb-12">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
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
    </article>
  );
};
