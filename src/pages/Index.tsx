import { useState } from "react";
import { Users, PlayCircle, Target, Mail, Zap, DollarSign, Clock, Eye, TrendingUp, MousePointerClick, Smartphone, Monitor, Tv } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewsTrendChart } from "@/components/charts/ViewsTrendChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { SubscriberChart } from "@/components/charts/SubscriberChart";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { TopVideosTable } from "@/components/charts/TopVideosTable";
import { ImpressionsChart } from "@/components/charts/ImpressionsChart";
import { TrafficSourcesPie } from "@/components/charts/TrafficSourcesPie";
import {
  viewsWatchTimeData, views7dData, views90dData,
  revenueData, revenueMonthly, revenueByAdType, revenueByCountry,
  subscriberGrowthData, engagementData, impressionsCtrData,
  contentSplit, cardEndScreen, kpiSummary,
  trafficSourcesFull, topVideos,
} from "@/lib/dummyData";

const kpis = [
  { label: "Subscribers", value: kpiSummary.subscribers, subtitle: "YouTube channel", icon: Users, bg: "bg-pastel-blue" },
  { label: "Avg Views", value: kpiSummary.avgViews, subtitle: "Per video", icon: PlayCircle, bg: "bg-pastel-purple" },
  { label: "Est. Revenue", value: kpiSummary.estRevenue, subtitle: "This month", icon: DollarSign, bg: "bg-pastel-green" },
  { label: "RPM", value: kpiSummary.rpm, subtitle: "Revenue per mille", icon: TrendingUp, bg: "bg-pastel-orange" },
  { label: "Watch Time", value: kpiSummary.watchTimeMinutes + " min", subtitle: "This month", icon: Clock, bg: "bg-pastel-blue" },
  { label: "Engagement", value: kpiSummary.engagementRate, subtitle: "Likes + comments", icon: MousePointerClick, bg: "bg-pastel-pink" },
];

const kpis2 = [
  { label: "Unique Viewers", value: kpiSummary.uniqueViewers, bg: "bg-pastel-purple" },
  { label: "Impressions", value: kpiSummary.impressions, bg: "bg-pastel-green" },
  { label: "CTR", value: kpiSummary.ctr, bg: "bg-pastel-orange" },
  { label: "Avg View Duration", value: kpiSummary.avgViewDuration, bg: "bg-pastel-blue" },
  { label: "Sub Growth", value: kpiSummary.subscriberGrowth, bg: "bg-pastel-green" },
  { label: "Premium Revenue", value: "$" + kpiSummary.premiumRevenue.replace("$", ""), bg: "bg-pastel-pink" },
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

const viewsDataMap: Record<string, typeof viewsWatchTimeData> = {
  "7d": views7dData,
  "28d": viewsWatchTimeData,
  "90d": views90dData,
};

const countries = [
  { code: "AU", pct: 61 }, { code: "US", pct: 22 },
  { code: "CA", pct: 11 }, { code: "GB", pct: 6 },
];

const devices = [
  { label: "Mobile", pct: 68, icon: Smartphone },
  { label: "Desktop", pct: 24, icon: Monitor },
  { label: "TV", pct: 8, icon: Tv },
];

export default function Index() {
  const [viewsRange, setViewsRange] = useState("28d");

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

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className={`${k.bg} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-bold mt-1">{k.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{k.subtitle}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <k.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis2.map((k) => (
          <Card key={k.label} className={`${k.bg} border-0`}>
            <CardContent className="p-4 text-center">
              <p className="text-xl font-bold">{k.value}</p>
              <p className="text-[10px] text-muted-foreground">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Views & Watch Time Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Views & Watch Time</CardTitle>
          <Tabs value={viewsRange} onValueChange={setViewsRange}>
            <TabsList className="h-8">
              <TabsTrigger value="7d" className="text-xs px-3 h-7">7d</TabsTrigger>
              <TabsTrigger value="28d" className="text-xs px-3 h-7">28d</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs px-3 h-7">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ViewsTrendChart data={viewsDataMap[viewsRange]} />
        </CardContent>
      </Card>

      {/* Revenue + Subscriber Growth side by side */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue (Last 28 Days)</CardTitle></CardHeader>
          <CardContent>
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Subscriber Growth</CardTitle></CardHeader>
          <CardContent>
            <SubscriberChart data={subscriberGrowthData} />
          </CardContent>
        </Card>
      </div>

      {/* Revenue Monthly + Ad Type */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Monthly Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <RevenueChart data={revenueMonthly} xKey="month" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue by Ad Type</CardTitle></CardHeader>
          <CardContent>
            <TrafficSourcesPie data={revenueByAdType} innerRadius={50} label={false} />
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {revenueByAdType.map((a) => (
                <div key={a.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.fill }} />
                  <span>{a.name}</span>
                  <span className="font-semibold">${a.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impressions & CTR */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Impressions & Click-Through Rate</CardTitle></CardHeader>
        <CardContent>
          <ImpressionsChart data={impressionsCtrData} />
        </CardContent>
      </Card>

      {/* Engagement Trend */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Engagement Trend (Likes · Comments · Shares)</CardTitle></CardHeader>
        <CardContent>
          <EngagementChart data={engagementData} />
        </CardContent>
      </Card>

      {/* Top Videos */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Top Videos (Last 28 Days)</CardTitle></CardHeader>
        <CardContent>
          <TopVideosTable limit={10} />
        </CardContent>
      </Card>

      {/* Content Split + Card/End Screen */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Content Performance Split</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentSplit.map((c) => (
                <div key={c.type} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-sm">{c.type}</p>
                    <p className="text-xs text-muted-foreground">{c.videos} videos · avg {c.avgDuration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{(c.views / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Card & End Screen Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-pastel-blue text-center">
                <p className="text-2xl font-bold">{cardEndScreen.cardClicks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Card Clicks</p>
                <p className="text-xs font-semibold text-primary mt-1">{cardEndScreen.cardClickRate}% CTR</p>
              </div>
              <div className="p-3 rounded-lg bg-pastel-green text-center">
                <p className="text-2xl font-bold">{cardEndScreen.endScreenClicks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">End Screen Clicks</p>
                <p className="text-xs font-semibold text-primary mt-1">{cardEndScreen.endScreenClickRate}% CTR</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-xl font-bold">{(cardEndScreen.endScreenImpressions / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground">End Screen Impressions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Health + Top Sponsors */}
      <div className="grid lg:grid-cols-2 gap-4">
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
                    <Badge key={src} className={`text-[10px] ${src === "YT" ? "bg-red-500 hover:bg-red-500" : "bg-purple-500 hover:bg-purple-500"} text-white`}>{src}</Badge>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-3 text-right">
              <a href="/brand-radar" className="text-sm text-primary hover:underline">View all 16 brands →</a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Drafts</CardTitle></CardHeader>
          <CardContent className="space-y-0">
            {drafts.map((d, i) => (
              <div key={d.brand} className={`flex items-center justify-between py-3 ${i < drafts.length - 1 ? "border-b" : ""}`}>
                <div>
                  <p className="text-sm font-semibold">{d.brand}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[250px]">{d.subject}</p>
                </div>
                <Badge className={`text-xs ${d.status === "approved" ? "bg-green-500 hover:bg-green-500" : "bg-amber-500 hover:bg-amber-500"} text-white`}>{d.status}</Badge>
              </div>
            ))}
            <div className="pt-3 text-right">
              <a href="/drafts" className="text-sm text-primary hover:underline">View all drafts →</a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Breakdown + Revenue by Country */}
      <div className="grid lg:grid-cols-2 gap-4">
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

        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue by Country</CardTitle></CardHeader>
          <CardContent>
            {revenueByCountry.map((c) => (
              <div key={c.country} className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold w-6">{c.country}</span>
                <Progress value={c.pct} className="h-2 flex-1" />
                <span className="text-xs font-medium w-14 text-right">${c.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insight */}
      <div className="rounded-xl bg-gradient-to-r from-primary to-blue-400 p-6 text-white">
        <p className="font-bold text-sm mb-1">💡 AI Insight</p>
        <p className="text-sm leading-relaxed">
          Your audience is 73% male aged 18–34 — finance, tech, and grooming brands are actively targeting this demographic. 16 brands detected in your last scan. Revenue is trending +12% month over month with your RPM at $8.20. Your Shorts content drives 15% of new subscribers despite being only 30% of uploads.
        </p>
      </div>
    </div>
  );
}
