import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ContactCTA from "@/components/sections/ContactCTA";
import { getBlogPosts } from "@/lib/content";

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((p) => p.slug === slug);
  if (!post) return { title: "Article — Unexus AI" };
  return { title: `${post.metaTitle} — Unexus AI`, description: post.metaDescription };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={post.cat}
          title={post.title}
          subtitle={`${post.date} · ${post.read} read`}
          accent={post.accent}
        />

        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="container" style={{ maxWidth: "46rem" }}>
            <a href="/blog" className="text-sm inline-flex items-center gap-2 mb-8 hover:text-white transition-colors" style={{ color: "var(--color-brand-400)" }}>
              ← All articles
            </a>
            <article className="prose-dark" dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </section>

        <ContactCTA
          heading="Want this kind of thinking applied to your business?"
          body="Tell us where things feel stuck and we'll talk through what we'd do about it — no pitch, no pressure."
        />
      </main>
      <Footer />
    </>
  );
}
