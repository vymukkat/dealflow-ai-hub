import { Smartphone, Monitor, Tv } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { engagementData, topSearchTerms, kpiSummary } from "@/lib/dummyData";

const stats = [
  { label: "Subscribers", value: "124K" },
  { label: "Avg Views", value: "18.4K" },
  { label: "Engagement", value: "4.8%" },
  { label: "Est. CPM", value: "$14.20" },
  { label: "Watch Time", value: "6m 42s" },
  { label: "Deal Min.", value: "$2,000" },
  { label: "RPM", value: kpiSummary.rpm },
  { label: "Unique Viewers", value: kpiSummary.uniqueViewers },
  { label: "Format", value: "Integration" },
  { label: "Top Market", value: "AU" },
  { label: "Monthly Rev.", value: kpiSummary.estRevenue },
  { label: "Impressions", value: kpiSummary.impressions },
];

const countries = [
  { code: "AU", pct: 61 }, { code: "US", pct: 22 },
  { code: "CA", pct: 11 }, { code: "GB", pct: 6 },
];

const devices = [
  { label: "Mobile", pct: 68, icon: Smartphone },
  { label: "Desktop", pct: 24, icon: Monitor },
  { label: "TV", pct: 8, icon: Tv },
];

const ageGender = [
  { age: "18–24", male: 42.1, female: 8.3 },
  { age: "25–34", male: 31.2, female: 6.1 },
  { age: "35–44", male: 7.8, female: 2.4 },
  { age: "45–54", male: 1.9, female: 0.8 },
];

const traffic = [
  { source: "YouTube Search", pct: 44 },
  { source: "Browse/Home", pct: 28 },
  { source: "Suggested Videos", pct: 18 },
  { source: "External", pct: 10 },
];

const detectedSponsors = ["spotify.com", "nordvpn.com", "ag1.com", "draftkings.com", "squarespace.com"];

export default function MediaKit() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wes Mukkati</h1>
          <p className="text-muted-foreground">Hockey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Sync YouTube</Button>
          <Button>Download PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Creator Bio</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Wes Mukkati is one of Australia's leading hockey content creators, delivering in-depth analysis, game highlights, and player interviews to a highly engaged audience of 124K subscribers. Known for sharp tactical breakdowns and authentic storytelling...
          </p>
        </CardContent>
      </Card>

      {/* Engagement Trend Mini Chart */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Engagement Trend (28 Days)</CardTitle></CardHeader>
        <CardContent>
          <EngagementChart data={engagementData} />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Audience Geography</CardTitle></CardHeader>
          <CardContent>
            {countries.map((c) => (
              <div key={c.code} className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold w-6">{c.code}</span>
                <Progress value={c.pct} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground w-8 text-right">{c.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Device Breakdown</CardTitle></CardHeader>
          <CardContent>
            {devices.map((d) => (
              <div key={d.label} className="flex items-center gap-3 mb-3">
                <d.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs w-14">{d.label}</span>
                <Progress value={d.pct} className="h-2 flex-1 [&>div]:bg-green-500" />
                <span className="text-xs text-muted-foreground w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Age & Gender</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-semibold text-muted-foreground">
              <span>Age Group</span><span>Male</span><span>Female</span><span>Distribution</span>
            </div>
            {ageGender.map((row) => (
              <div key={row.age} className="grid grid-cols-4 items-center text-sm">
                <span className="font-medium">{row.age}</span>
                <span>{row.male}%</span>
                <span>{row.female}%</span>
                <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                  <div className="bg-primary" style={{ width: `${row.male}%` }} />
                  <div className="bg-pink-400" style={{ width: `${row.female}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Traffic Sources</CardTitle></CardHeader>
        <CardContent>
          {traffic.map((t) => (
            <div key={t.source} className="flex items-center gap-3 mb-3">
              <span className="text-xs w-32">{t.source}</span>
              <Progress value={t.pct} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground w-8 text-right">{t.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Search Terms */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Top Search Terms</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topSearchTerms.slice(0, 8).map((t) => (
              <Badge key={t.term} variant="secondary" className="text-xs">
                {t.term} · {t.views.toLocaleString()} views
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Previously Detected Sponsors</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {detectedSponsors.map((s) => (
              <Badge key={s} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Partnership Details</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Deal Minimum:</span> <span className="font-semibold">$2,000</span></div>
            <div><span className="text-muted-foreground">Preferred Format:</span> <span className="font-semibold">Integration</span></div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Open Categories: </span>
              {["Sports Betting", "VPN/Privacy", "Health/Nutrition", "Grooming"].map((c) => (
                <Badge key={c} variant="secondary" className="mr-1 mb-1">{c}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
