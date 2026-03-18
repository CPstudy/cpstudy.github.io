import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { Train, Building2 } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { InkTransitionLink } from "@/components/ink-transition-link";

const services = [
  {
    title: "실시간지하철",
    description: "실시간 지하철 도착 정보를 확인하세요.",
    href: "/silsiganmetro",
    icon: Train,
    color: "#98BC4C",
    dotColor: "rgba(152, 188, 76, 0.2)",
    glowColor: "#98BC4C40",
  },
  {
    title: "엘베인포",
    description: "엘리베이터 운행 정보를 확인하세요.",
    href: "/elevinfo",
    icon: Building2,
    color: "#209EAD",
    dotColor: "rgba(32, 158, 173, 0.2)",
    glowColor: "#209EAD40",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <InkTransitionLink
              key={service.href}
              href={service.href}
              color={service.dotColor}
              glowColor={service.glowColor}
              className="group rounded-3xl p-6 active:scale-95 transition-all text-white"
              style={{ backgroundColor: service.color }}
            >
              <service.icon className="h-8 w-8 text-white mb-4" />
              <h2 className="text-lg font-semibold mb-1">
                {service.title}
              </h2>
              <p className="text-sm text-white/80">
                {service.description}
              </p>
            </InkTransitionLink>
          ))}
        </div>

        {recentPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold tracking-tight">최근 글</h2>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                전체보기
              </Link>
            </div>

            <ul className="space-y-px">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 rounded-3xl px-4 py-5 -mx-4 hover:bg-muted/50 active:bg-muted/80 active:scale-95 transition-all"
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      {post.category && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs text-primary font-semibold">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug truncate">
                          {post.title}
                        </h3>
                      </div>

                      {post.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {post.thumbnail && (
                      <div className="shrink-0 w-48 h-30 rounded-2xl overflow-hidden bg-muted">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${post.thumbnail}`}
                          alt={post.title}
                          width={256}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
