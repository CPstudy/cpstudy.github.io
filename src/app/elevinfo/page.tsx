import { SiteHeader } from "@/components/site-header";
import { Building2 } from "lucide-react";

export default function ElevatorPage() {
  return (
    <div className="dark min-h-screen text-foreground" style={{ backgroundColor: "#000000" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 500px 50px #209EAD40",
        }}
      />
      <SiteHeader transparent />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">엘베인포</h1>
          <p className="text-muted-foreground">준비 중입니다.</p>
        </div>
      </main>
    </div>
  );
}
