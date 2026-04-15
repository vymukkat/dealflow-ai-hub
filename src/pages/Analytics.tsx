import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ViewsTrendChart } from "@/components/charts/ViewsTrendChart";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { SubscriberChart } from "@/components/charts/SubscriberChart";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { ImpressionsChart } from "@/components/charts/ImpressionsChart";
import { TrafficSourcesPie } from "@/components/charts/TrafficSourcesPie";
import { TopVideosTable } from "@/components/charts/TopVideosTable";
import {
  viewsWatchTimeData, views7dData, views90dData,
  revenueData, revenueMonthly, revenueByAdType,
  subscriberGrowthData, engagementData, impressionsCtrData,
  subscriberSources, newVsReturning, osSplit,
} from "@/lib/dummyData";

const viewsDataMap: Record<string, typeof viewsWatchTimeData> = {
  "7d": views7dData,
  "28d": viewsWatchTimeData,
  "90d": views90dData,
};

const summaryCards = [
  { label: "Views", value: "184K", delta: "+12%", bg: "bg-pastel-blue" },
  { label: "Watch Time", value: "48.2K min", delta: "+8%", bg: "bg-pastel-green" },
  { label: "Revenue", value: "$2,840", delta: "+15%", bg: "bg-pastel-green" },
  { label: "Subscribers", value: "+5,120", delta: "+4.2%", bg: "bg-pastel-purple" },
  { label: "Impressions", value: "6.72M", delta: "+6%", bg: "bg-pastel-orange" },
  { label: "CTR", value: "6.2%", delta: "+0.3%", bg: "bg-pastel-pink" },
  { label: "RPM", value: "$8.20", delta: "+5%", bg: "bg-pastel-blue" },
  { label: "Avg Duration", value: "6m 42s", delta: "-2%", bg: "bg-pastel-orange" },
];

export default function Analytics() {
  const [range, setRange] = useState("28d");

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Deep-dive into your YouTube performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={range} onValueChange={setRange}>
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="28d">28 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {summaryCards.map((c) => (
          <Card key={c.label} className={`${c.bg} border-0`}>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold">{c.value}</p>
              <p className="text-[10px] text-muted-foreground">{c.label}</p>
              <Badge variant="secondary" className="text-[10px] mt-1">{c.delta}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Views & Watch Time */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Views & Watch Time</CardTitle></CardHeader>
        <CardContent>
          <ViewsTrendChart data={viewsDataMap[range]} />
        </CardContent>
      </Card>

      {/* Revenue + Subs */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Daily Revenue</CardTitle></CardHeader>
          <CardContent><RevenueChart data={revenueData} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Subscriber Growth</CardTitle></CardHeader>
          <CardContent><SubscriberChart data={subscriberGrowthData} /></CardContent>
        </Card>
      </div>

      {/* Impressions & CTR */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Impressions & CTR</CardTitle></CardHeader>
        <CardContent><ImpressionsChart data={impressionsCtrData} /></CardContent>
      </Card>

      {/* Engagement */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Engagement (Likes · Comments · Shares)</CardTitle></CardHeader>
        <CardContent><EngagementChart data={engagementData} /></CardContent>
      </Card>

      {/* Monthly Revenue + Ad Types */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Monthly Revenue</CardTitle></CardHeader>
          <CardContent><RevenueChart data={revenueMonthly} xKey="month" /></CardContent>
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

      {/* Audience pies */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Subscriber Sources</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={subscriberSources} nameKey="source" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">New vs Returning</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={newVsReturning} innerRadius={60} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">OS Breakdown</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={osSplit} innerRadius={50} /></CardContent>
        </Card>
      </div>

      {/* Top Videos */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Top Videos</CardTitle></CardHeader>
        <CardContent><TopVideosTable limit={10} /></CardContent>
      </Card>
    </div>
  );
}
