import { Users, PlayCircle, Building2, FileText, Zap, Smartphone, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const healthRows = [
  { label: "Top Country", value: "Australia (61%)" },
  { label: "Engagement Rate", value: "4.8%" },
  { label: "Est. CPM", value: "$14.20" },
  { label: "Avg Watch Time", value: "6:42" },
  { label: "Primary Device", value: "Mobile (68%)" },
  { label: "Top Demo", value: "Male 18–34" },
];

const sponsors = [
  { name: "Spotify", channels: 8, category: "Music/Streaming", sources: ["YT"] },
  { name: "NordVPN", channels: 6, category: "VPN/Privacy", sources: ["YT", "Pod"] },
  { name: "AG1", channels: 5, category: "Health/Nutrition", sources: ["Pod"] },
  { name: "DraftKings", channels: 4, category: "Sports Betting", sources: ["YT"] },
  { name: "Manscaped", channels: 3, category: "Grooming", sources: ["YT"] },
];

const drafts = [
  { brand: "Spotify", subject: "Hockey Creator + Spotify = Natural Fit", status: "draft" },
  { brand: "NordVPN", subject: "Protecting hockey fans online — partnership idea", status: "draft" },
  { brand: "AG1", subject: "Fuel your game — AG1 x Wes Mukkati", status: "approved" },
];

const countries = [
  { code: "AU", pct: 61 },
  { code: "US", pct: 22 },
  { code: "CA", pct: 11 },
  { code: "GB", pct: 6 },
];

export default function Index() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Good morning, Wes Mukkati</h1>
          <p className="text-sm text-muted-foreground">Hockey · 124K subscribers</p>
        </div>
        <Button size="sm"><Zap className="h-4 w-4" /> Run Scan</Button>
      </div>

      {/* 4 KPI Cards — varied */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Subscribers */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">124K</p>
                <p className="text-xs text-muted-foreground mt-0.5">YouTube channel</p>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Views */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Avg Views</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">18.4K</p>
                <p className="text-xs text-muted-foreground mt-0.5">Per video</p>
              </div>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Brands Found — with progress bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="w-full pr-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Brands Found</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">16</p>
                <div className="mt-2">
                  <Progress value={32} className="h-1 [&>div]:bg-primary" />
                  <p className="text-xs text-muted-foreground mt-1">16 of ~50 possible</p>
                </div>
              </div>
              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Drafts Ready — with amber indicator */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Drafts Ready</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">3</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <p className="text-xs text-amber-600">3 awaiting review</p>
                </div>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Health + Top Sponsors */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Channel Health</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {healthRows.map((row, i) => (
              <div key={row.label} className={`flex items-center justify-between py-3 ${i < healthRows.length - 1 ? "border-b border-border" : ""}`}>
                <p className="text-sm text-muted-foreground">{row.label}</p>
                <p className="text-sm font-medium text-foreground tabular-nums">{row.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top Sponsors Detected</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {sponsors.map((s, i) => (
              <div key={s.name} className={`flex items-center justify-between py-3 ${i < sponsors.length - 1 ? "border-b border-border" : ""}`}>
                <div>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">×{s.channels} channels</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-secondary text-muted-foreground border border-border">{s.category}</Badge>
                  {s.sources.map((src) => (
                    <Badge key={src} className={`text-[10px] border-0 ${src === "YT" ? "bg-red-50 text-red-600 border-red-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>{src}</Badge>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-3 text-right">
              <a href="/brand-radar" className="text-sm text-primary hover:underline">View all 16 brands →</a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Drafts + Audience Breakdown */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Recent Drafts</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {drafts.map((d, i) => (
              <div key={d.brand} className={`flex items-center justify-between py-3 ${i < drafts.length - 1 ? "border-b border-border" : ""}`}>
                <div>
                  <p className="text-sm font-medium text-foreground">{d.brand}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[250px]">{d.subject}</p>
                </div>
                <Badge variant="outline" className={`text-xs ${d.status === "approved" ? "bg-green-50 text-green-600 border-green-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}>{d.status}</Badge>
              </div>
            ))}
            <div className="pt-3 text-right">
              <a href="/drafts" className="text-sm text-primary hover:underline">View all drafts →</a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Audience Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Top Countries</p>
              {countries.map((c) => (
                <div key={c.code} className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium w-6 tabular-nums text-foreground">{c.code}</span>
                  <Progress value={c.pct} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{c.pct}%</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Device Split</p>
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs w-14 text-foreground">Mobile</span>
                <Progress value={68} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight — plain card with blue left border */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">AI Insight</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your audience is 73% male aged 18–34 — finance, tech, and grooming brands are actively targeting this demographic. 16 brands detected in your last scan. Revenue is trending +12% month over month with your RPM at $8.20. Your Shorts content drives 15% of new subscribers despite being only 30% of uploads.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
