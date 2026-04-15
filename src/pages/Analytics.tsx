import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ViewsTrendChart } from "@/components/charts/ViewsTrendChart";
import { SubscriberChart } from "@/components/charts/SubscriberChart";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { ImpressionsChart } from "@/components/charts/ImpressionsChart";
import { TrafficSourcesPie } from "@/components/charts/TrafficSourcesPie";
import { TopVideosTable } from "@/components/charts/TopVideosTable";
import {
  viewsWatchTimeData, views7dData, views90dData,
  subscriberGrowthData, engagementData, impressionsCtrData,
  subscriberSources, newVsReturning, osSplit,
} from "@/lib/dummyData";

const viewsDataMap: Record<string, typeof viewsWatchTimeData> = {
  "7d": views7dData,
  "28d": viewsWatchTimeData,
  "90d": views90dData,
};

const summaryCards = [
  { label: "Views", value: "184K", delta: "+12%" },
  { label: "Watch Time", value: "48.2K min", delta: "+8%" },
  { label: "Subscribers", value: "+5,120", delta: "+4.2%" },
  { label: "Impressions", value: "6.72M", delta: "+6%" },
  { label: "CTR", value: "6.2%", delta: "+0.3%" },
  { label: "Avg Duration", value: "6m 42s", delta: "-2%" },
];

export default function Analytics() {
  const [range, setRange] = useState("28d");

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Deep-dive into your YouTube performance</p>
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {summaryCards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-semibold text-foreground tabular-nums">{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`text-xs font-medium mt-1 tabular-nums ${c.delta.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{c.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Views & Watch Time */}
      <Card>
        <CardHeader><CardTitle>Views & Watch Time</CardTitle></CardHeader>
        <CardContent>
          <ViewsTrendChart data={viewsDataMap[range]} />
        </CardContent>
      </Card>

      {/* Subscriber Growth */}
      <Card>
        <CardHeader><CardTitle>Subscriber Growth</CardTitle></CardHeader>
        <CardContent><SubscriberChart data={subscriberGrowthData} /></CardContent>
      </Card>

      {/* Impressions & CTR */}
      <Card>
        <CardHeader><CardTitle>Impressions & CTR</CardTitle></CardHeader>
        <CardContent><ImpressionsChart data={impressionsCtrData} /></CardContent>
      </Card>

      {/* Engagement */}
      <Card>
        <CardHeader><CardTitle>Engagement (Likes · Comments · Shares)</CardTitle></CardHeader>
        <CardContent><EngagementChart data={engagementData} /></CardContent>
      </Card>

      {/* Audience pies */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Subscriber Sources</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={subscriberSources} nameKey="source" /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>New vs Returning</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={newVsReturning} innerRadius={60} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>OS Breakdown</CardTitle></CardHeader>
          <CardContent><TrafficSourcesPie data={osSplit} innerRadius={50} /></CardContent>
        </Card>
      </div>

      {/* Top Videos */}
      <Card>
        <CardHeader><CardTitle>Top Videos</CardTitle></CardHeader>
        <CardContent><TopVideosTable limit={10} /></CardContent>
      </Card>
    </div>
  );
}
