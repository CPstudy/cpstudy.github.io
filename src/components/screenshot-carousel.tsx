import Image from "next/image";

const lines = [
  { name: "1호선",    color: "#0052A4" },
  { name: "2호선",    color: "#00A84D" },
  { name: "3호선",    color: "#EF7C1C" },
  { name: "4호선",    color: "#00A4E3" },
  { name: "5호선",    color: "#996CAC" },
  { name: "6호선",    color: "#CD7C2F" },
  { name: "7호선",    color: "#747F00" },
  { name: "8호선",    color: "#E6186C" },
  { name: "9호선",    color: "#BDB092" },
  { name: "경의·중앙선", color: "#77C4A3" },
  { name: "수인·분당선", color: "#F5A200" },
  { name: "신분당선", color: "#D4003B" },
  { name: "경춘선",   color: "#0C8E72" },
  { name: "공항철도", color: "#0065B3" },
];

const slides = [
  {
    src: "/images/silsiganmetro/img-home.png",
    alt: "홈 화면",
    title: "수도권 노선 지원",
    imageLeft: true,
    showLines: true,
  },
  {
    src: "/images/silsiganmetro/img-bookmark.png",
    alt: "즐겨찾기 화면",
    title: "북마크",
    subtitle: "원하는 역은 모아서 볼 수 있어요",
    imageLeft: false,
    showLines: false,
  },
  {
    src: "/images/silsiganmetro/img-location.png",
    alt: "열차 위치 화면",
    title: "열차 위치",
    subtitle: "노선 전체 열차들의 실시간 위치를 볼 수 있어요",
    imageLeft: true,
    showLines: false,
  },
];

export function ScreenshotCarousel() {
  return (
    <div className="flex flex-col">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`relative flex flex-col md:flex-row items-center gap-10 ${
            slide.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
          }`}
          style={{ zIndex: index + 1, ...(index !== 0 ? { marginTop: "-130px" } : {}) }}
        >
          <div className="shrink-0">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={240}
                height={520}
                className="object-cover"
              />
            </div>
          </div>
          <div className={`flex-1 flex flex-col gap-6 px-8 self-start ${slide.imageLeft ? "items-start" : "items-end"}`}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {slide.title}
            </h2>
            {"subtitle" in slide && slide.subtitle && (
              <p className="text-2xl text-white/60">{slide.subtitle}</p>
            )}
            {slide.showLines && (
              <div className={`flex flex-wrap gap-2 ${slide.imageLeft ? "justify-start" : "justify-end"}`}>
                {lines.map((line) => (
                  <span
                    key={line.name}
                    className="rounded-full px-3 py-1 text-sm font-medium text-white"
                    style={{ backgroundColor: line.color + "55", border: `1px solid ${line.color}99`, color: line.color }}
                  >
                    {line.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
