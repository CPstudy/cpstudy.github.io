"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/design-system/components/button"
import { Badge } from "@/design-system/components/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/components/card"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/design-system/components/avatar"
import { Separator } from "@/design-system/components/separator"
import { Switch } from "@/design-system/components/switch"
import { ScrollArea } from "@/design-system/components/scroll-area"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/design-system/components/dropdown-menu"

const colorTokens = [
  { label: "배경", light: "#ffffff", dark: "#060607", lightText: "#000", darkText: "#fff" },
  { label: "글자", light: "#060607", dark: "#ffffff", lightText: "#fff", darkText: "#000" },
  { label: "카드", light: "#f2f3f5", dark: "#1a1a1a", lightText: "#000", darkText: "#fff" },
  { label: "보조", light: "#e3e5e8", dark: "#333333", lightText: "#000", darkText: "#fff" },
  { label: "흐린 글자", light: "#4f5660", dark: "#9a9a9a", lightText: "#fff", darkText: "#000" },
  { label: "테두리", light: "#e3e5e8", dark: "#333333", lightText: "#000", darkText: "#fff" },
  { label: "Primary", light: "#5865f2", dark: "#5865f2", lightText: "#fff", darkText: "#fff" },
  { label: "에러", light: "#da373c", dark: "#ff6b6b", lightText: "#fff", darkText: "#000" },
]

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
  const [switchOn, setSwitchOn] = useState(false)
  const [switchSmOn, setSwitchSmOn] = useState(true)

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
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">디자인 시스템</h1>
          <p className="text-muted-foreground text-sm">
            블로그에서 사용하는 색상, 타이포그래피, 간격, 컴포넌트 모음입니다.
          </p>
        </div>

        {/* ── 색상 ── */}
        <Section title="색상">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorTokens.map(({ label, light, dark, lightText, darkText }) => (
              <div key={label} className="space-y-2">
                <div className="flex h-16 rounded-lg overflow-hidden border border-border shadow-sm">
                  <div
                    className="flex-1 flex flex-col justify-end p-1.5"
                    style={{ background: light }}
                  >
                    <span className="text-[9px] font-mono leading-none" style={{ color: lightText }}>
                      {light}
                    </span>
                  </div>
                  <div
                    className="flex-1 flex flex-col justify-end p-1.5"
                    style={{ background: dark }}
                  >
                    <span className="text-[9px] font-mono leading-none" style={{ color: darkText }}>
                      {dark}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{label}</p>
                  <div className="flex gap-0.5">
                    <span className="text-[9px] text-muted-foreground">라이트</span>
                    <span className="text-[9px] text-muted-foreground mx-0.5">/</span>
                    <span className="text-[9px] text-muted-foreground">다크</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 타이포그래피 ── */}
        <Section title="타이포그래피">
          <div className="space-y-8">
            <div className="space-y-2">
              <TokenLabel>제목 — Pretendard · 24px · Bold (700) · 줄높이 1.25</TokenLabel>
              <p className="text-2xl font-bold leading-tight">안녕하세요, 개발 블로그입니다.</p>
            </div>
            <div className="space-y-2">
              <TokenLabel>본문 — Pretendard · 16px · Regular (400) · 줄높이 1.5</TokenLabel>
              <p className="text-base leading-relaxed">
                다양한 개발 경험과 지식을 공유하는 블로그입니다. 코드 예제와 함께
                이해하기 쉽게 설명합니다.
              </p>
            </div>
            <div className="space-y-2">
              <TokenLabel>모노스페이스 — Geist Mono · 14px</TokenLabel>
              <p className="font-mono text-sm bg-muted px-4 py-3 rounded-lg">
                const hello = &quot;world&quot;;
              </p>
            </div>
          </div>
        </Section>

        {/* ── 간격 ── */}
        <Section title="간격">
          <div className="space-y-4">
            {[
              { label: "여백 (Padding)", px: 4, tailwind: "w-1" },
              { label: "패딩 (Padding)", px: 8, tailwind: "w-2" },
              { label: "마진 (Margin)", px: 12, tailwind: "w-3" },
            ].map(({ label, px, tailwind }) => (
              <div key={label} className="flex items-center gap-4">
                <div className={`${tailwind} h-5 bg-primary rounded-sm shrink-0`} />
                <span className="text-sm text-muted-foreground">
                  {label} — <span className="font-mono">{px}px</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

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
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">XSmall</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <TokenLabel>States</TokenLabel>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Outline Disabled</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 배지 ── */}
        <Section title="배지">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        {/* ── 카드 ── */}
        <Section title="카드">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>카드 제목</CardTitle>
                <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  카드 본문 내용이 여기에 들어갑니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>카드 + 액션</CardTitle>
                <CardDescription>버튼이 포함된 카드 예시입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm">자세히 보기</Button>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── 아바타 ── */}
        <Section title="아바타">
          <div className="space-y-6">
            <div>
              <TokenLabel>Sizes</TokenLabel>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div>
              <TokenLabel>Avatar Group</TokenLabel>
              <AvatarGroup>
                <Avatar>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+2</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </div>
        </Section>

        {/* ── 스위치 ── */}
        <Section title="스위치">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <span className="text-sm text-muted-foreground">
                Default — {switchOn ? "켜짐" : "꺼짐"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Switch size="sm" checked={switchSmOn} onCheckedChange={setSwitchSmOn} />
              <span className="text-sm text-muted-foreground">
                Small — {switchSmOn ? "켜짐" : "꺼짐"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Switch disabled />
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </div>
        </Section>

        {/* ── 구분선 ── */}
        <Section title="구분선">
          <div className="space-y-6">
            <div className="space-y-2">
              <TokenLabel>Horizontal</TokenLabel>
              <Separator />
            </div>
            <div className="space-y-2">
              <TokenLabel>Vertical</TokenLabel>
              <div className="flex items-center gap-4 h-6">
                <span className="text-sm">왼쪽</span>
                <Separator orientation="vertical" />
                <span className="text-sm">오른쪽</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 드롭다운 메뉴 ── */}
        <Section title="드롭다운 메뉴">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                옵션 선택
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        {/* ── 스크롤 영역 ── */}
        <Section title="스크롤 영역">
          <ScrollArea className="h-48 rounded-lg border border-border">
            <div className="p-4 space-y-0">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="py-2.5 px-1 text-sm border-b border-border last:border-0 flex items-center justify-between"
                >
                  <span>스크롤 항목 {i + 1}</span>
                  <Badge variant="outline" className="text-[10px]">#{i + 1}</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Section>
      </main>
    </div>
  )
}
