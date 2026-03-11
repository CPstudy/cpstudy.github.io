"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/design-system/components/button"
import { Separator } from "@/design-system/components/separator"


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <Separator />
      </div>
      {children}
    </section>
  )
}

function TokenLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground mb-3">{children}</p>
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border h-12 flex items-center px-6 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          dev.blog
        </Link>
        <ModeToggle />
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">디자인 시스템</h1>
          <p className="text-muted-foreground text-sm">
            블로그에서 사용하는 색상, 타이포그래피, 간격, 컴포넌트 모음입니다.
          </p>
        </div>

        {/* ── 버튼 ── */}
        <Section title="버튼">
          <div className="space-y-6">
            <div>
              <TokenLabel>Variants</TokenLabel>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <TokenLabel>Sizes</TokenLabel>
              <div className="flex flex-wrap items-end gap-2">
                <Button size="small">버튼</Button>
                <Button size="medium">버튼</Button>
                <Button size="large">버튼</Button>
                <Button size="xlarge">버튼</Button>
              </div>
            </div>
            <div>
              <TokenLabel>States</TokenLabel>
              <div className="flex flex-wrap gap-2">
                <Button size="medium" disabled>Disabled</Button>
                <Button size="medium" variant="outline" disabled>Outline Disabled</Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
