import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LeadForm from "@/components/ui/LeadForm";
import type { BlogPost } from "@/lib/blog";
import { getSection } from "@/lib/cms";
import { BLOG_PAGE_DEFAULTS, BLOG_POSTS_DEFAULTS } from "@/lib/cms-schema";

export const metadata = {
  title: "Blog — Unexus AI",
  description: "Practical, no-hype articles on growth, AI, GEO, and marketing — written because they're useful.",
};

export default async function BlogPage() {
  const page = await getSection("blog.page", BLOG_PAGE_DEFAULTS);
  const posts = (await getSection("blog.posts", BLOG_POSTS_DEFAULTS)).items as BlogPost[];
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow={page.heroEyebrow}
          title={page.heroTitle}
          subtitle={page.heroSubtitle}
        />

        <section className="section section-alt">
          <div className="container">
            {/* Featured */}
            {featured && (
              <ScrollReveal>
                <a
                  href={`/blog/${featured.slug}`}
                  className="rounded-2xl overflow-hidden mb-6 grid md:grid-cols-2 group"
                  style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                >
                  <div className="relative flex items-end p-8 overflow-hidden" style={{ minHeight: 240, background: `linear-gradient(135deg, ${featured.accent}, var(--color-glow))` }}>
                    {featured.image && (
                      <>
                        <img src={featured.image} alt="" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,7,18,0.55), transparent)" }} />
                      </>
                    )}
                    <span className="badge badge-dark" style={{ position: "relative", zIndex: 1 }}>Featured</span>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-xs mb-3" style={{ color: "var(--color-brand-400)" }}>{featured.cat} · {featured.date} · {featured.read} read</span>
                    <h2 className="text-h3 mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{featured.title}</h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{featured.excerpt}</p>
                    <span className="text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: "var(--color-accent-300)" }}>Read article →</span>
                  </div>
                </a>
              </ScrollReveal>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <ScrollReveal key={post.slug} delay={(i % 3) * 0.08}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl overflow-hidden h-full flex flex-col group"
                    style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <div className="relative flex items-end p-5 overflow-hidden" style={{ aspectRatio: "16 / 9", background: `linear-gradient(135deg, ${post.accent}, var(--color-glow))` }}>
                      {post.image && (
                        <img src={post.image} alt="" loading="lazy" className="absolute inset-0" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(3,7,18,0.55)", color: "#fff", position: "relative", zIndex: 1 }}>{post.cat}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="mb-3 text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>{post.title}</h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-brand-300)" }}>{post.excerpt}</p>
                      <div className="mt-auto text-xs" style={{ color: "var(--color-brand-500)" }}>{post.date} · {post.read} read</div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section">
          <div className="container">
            <div className="glow-card p-8 md:p-10 text-center mx-auto" style={{ border: "1px solid var(--color-border)", maxWidth: "40rem" }}>
              <h3 className="text-h3 mb-2" style={{ fontFamily: "var(--font-display)" }}>{page.newsletterTitle}</h3>
              <p className="text-sm mb-6" style={{ color: "var(--color-brand-300)" }}>{page.newsletterSub}</p>
              <div className="mx-auto" style={{ maxWidth: "22rem" }}>
                <LeadForm source="blog" type="newsletter" submitLabel="Subscribe" note="No spam. Unsubscribe anytime.">
                  <div>
                    <input className="form-input" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                </LeadForm>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
