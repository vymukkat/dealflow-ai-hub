import { Users, PlayCircle, Target, Mail, Zap, Smartphone, Monitor, Tv } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { label: "Subscribers", value: "124K", subtitle: "YouTube channel", icon: Users, bg: "bg-pastel-blue" },
  { label: "Avg Views", value: "18.4K", subtitle: "Per video", icon: PlayCircle, bg: "bg-pastel-purple" },
  { label: "Brands Found", value: "16", subtitle: "In your niche", icon: Target, bg: "bg-pastel-green" },
  { label: "Drafts Ready", value: "3", subtitle: "Awaiting approval", icon: Mail, bg: "bg-pastel-orange" },
];

const channelHealth = [
  { label: "Top Country", value: "AU" },
  { label: "Engagement Rate", value: "4.8%" },
  { label: "Est. CPM", value: "$14.20" },
  { label: "Avg Watch Time", value: "6m 42s" },
  { label: "Primary Device", value: "MOBILE" },
  { label: "Top Demo", value: "Male 18–24" },
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

const devices = [
  { label: "Mobile", pct: 68, icon: Smartphone },
  { label: "Desktop", pct: 24, icon: Monitor },
  { label: "TV", pct: 8, icon: Tv },
];

export default function Index() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Good morning, Wes Mukkati</h1>
          <p className="text-muted-foreground">Hockey · 124K subscribers</p>
        </div>
        <Button><Zap className="h-4 w-4" /> Run Scan</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`${k.bg} border-0`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{k.label}</p>
                  <p className="text-3xl font-bold mt-1">{k.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{k.subtitle}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <k.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel Health + Top Sponsors */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Channel Health</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {channelHealth.map((row, i) => (
              <div key={row.label} className={`flex items-center justify-between py-3 ${i < channelHealth.length - 1 ? "border-b" : ""}`}>
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="text-sm font-semibold">{row.value}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-4">Demographics powered by YouTube Analytics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Top Sponsors Detected</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {sponsors.map((s, i) => (
              <div key={s.name} className={`flex items-center justify-between py-3 ${i < sponsors.length - 1 ? "border-b" : ""}`}>
                <div>
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">×{s.channels} channels</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{s.category}</Badge>
                  {s.sources.map((src) => (
                    <Badge key={src} className={`text-[10px] ${src === "YT" ? "bg-red-500 hover:bg-red-500" : "bg-purple-500 hover:bg-purple-500"} text-white`}>
                      {src}
                    </Badge>
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
          <CardHeader><CardTitle className="text-lg">Recent Drafts</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {drafts.map((d, i) => (
              <div key={d.brand} className={`flex items-center justify-between py-3 ${i < drafts.length - 1 ? "border-b" : ""}`}>
                <div>
                  <p className="text-sm font-semibold">{d.brand}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[250px]">{d.subject}</p>
                </div>
                <Badge className={`text-xs ${d.status === "approved" ? "bg-green-500 hover:bg-green-500" : "bg-amber-500 hover:bg-amber-500"} text-white`}>
                  {d.status}
                </Badge>
              </div>
            ))}
            <div className="pt-3 text-right">
              <a href="/drafts" className="text-sm text-primary hover:underline">View all drafts →</a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Audience Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-2">Top Countries</p>
              {countries.map((c) => (
                <div key={c.code} className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold w-6">{c.code}</span>
                  <Progress value={c.pct} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-2">Device Split</p>
              {devices.map((d) => (
                <div key={d.label} className="flex items-center gap-3 mb-2">
                  <d.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs w-14">{d.label}</span>
                  <Progress value={d.pct} className="h-2 flex-1 [&>div]:bg-green-500" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{d.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-blue-400 p-6 text-white">
        <p className="font-bold text-sm mb-1">💡 AI Insight</p>
        <p className="text-sm leading-relaxed">
          Your audience is 73% male aged 18–34 — finance, tech, and grooming brands are actively targeting this demographic. 16 brands detected in your last scan.
        </p>
      </div>
    </div>
  );
}
