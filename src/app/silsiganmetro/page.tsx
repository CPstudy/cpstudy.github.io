import { SiteHeader } from "@/components/site-header";
import { DotGrid } from "@/components/dot-grid";
import { Train, List, Zap, Info } from "lucide-react";

const features = [
  {
    icon: List,
    title: "리스트 방식 열차 위치",
    description: "노선 내 여러 열차의 위치를 한눈에 확인할 수 있습니다.",
  },
  {
    icon: Zap,
    title: "급행/완행 분리",
    description:
      "1호선, 9호선, 공항철도의 급행·완행을 분리하여 열차가 가려지지 않습니다.",
  },
  {
    icon: Info,
    title: "열차 상태 표시",
    description: "행선지 / 열차 번호 / 상태를 한눈에 파악할 수 있습니다.",
  },
];

const lines = [
  "1호선",
  "2호선",
  "3호선",
  "4호선",
  "5호선",
  "6호선",
  "7호선",
  "8호선",
  "9호선",
  "경의중앙선",
  "분당선",
  "수인선",
  "신분당선",
  "경춘선",
  "공항철도",
];

export default function SubwayPage() {
  return (
    <div
      className="dark min-h-screen text-foreground"
      style={{ backgroundColor: "#000000" }}
    >
      <DotGrid color="rgba(152, 188, 76, 0.2)" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 500px 50px #98BC4C40",
        }}
      />
      <SiteHeader transparent />

      <main className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="flex flex-col items-center text-center py-20">
          <div className="rounded-3xl bg-[#98BC4C]/20 p-5 mb-6">
            <Train className="h-14 w-14 text-[#98BC4C]" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            실시간지하철
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            수도권 지하철의 실시간 열차 위치를 확인하세요
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.cpstudy.silsiganmetro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#98BC4C] px-6 py-3 text-sm font-semibold text-black hover:bg-[#a8cc5c] transition-colors"
          >
            Google Play에서 다운로드
          </a>
        </section>

        {/* Features */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-10">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6"
              >
                <feature.icon className="h-8 w-8 text-[#98BC4C] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Lines */}
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-10">지원 노선</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {lines.map((line) => (
              <span
                key={line}
                className="rounded-full bg-[#98BC4C]/20 text-[#98BC4C] px-4 py-2 text-sm font-medium"
              >
                {line}
              </span>
            ))}
          </div>
        </section>

        {/* Notice */}
        <section className="py-16 border-t border-white/10">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              본 앱의 데이터는{" "}
              <a
                href="https://data.seoul.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98BC4C] hover:underline"
              >
                서울 열린데이터 광장
              </a>
              에서 제공받고 있습니다.
            </p>
            <p>
              서울 열린데이터 광장에서 제공하지 않는 노선은 지원되지 않습니다.
            </p>
            <p>1호선 용산 급행은 데이터가 제공되지 않아 표시되지 않습니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
