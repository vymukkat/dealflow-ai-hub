import { Smartphone, Monitor, Tv, Tablet, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrafficSourcesPie } from "@/components/charts/TrafficSourcesPie";
import { SubscriberChart } from "@/components/charts/SubscriberChart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import {
  ageGenderChart, subscriberSources, newVsReturning,
  countriesFull, devicesFull, osSplit, trafficSourcesFull,
  topSearchTerms, subscriberGrowthData, sharingServices,
  externalReferrers, kpiSummary,
} from "@/lib/dummyData";

const ageGenderConfig: ChartConfig = {
  male: { label: "Male", color: "hsl(224, 76%, 48%)" },
  female: { label: "Female", color: "hsl(330, 80%, 60%)" },
};

const deviceIcons: Record<string, any> = {
  Mobile: Smartphone, Desktop: Monitor, TV: Tv, Tablet: Tablet, "Game Console": Gamepad2,
};

export default function Audience() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-foreground">Audience Intelligence</h1>
        <Badge variant="secondary" className="text-xs">Powered by YouTube Analytics</Badge>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-foreground tabular-nums">73%</p>
            <p className="text-xs text-muted-foreground">Male Audience</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-foreground">18–34</p>
            <p className="text-xs text-muted-foreground">Core Age Range</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-foreground tabular-nums">{kpiSummary.uniqueViewers}</p>
            <p className="text-xs text-muted-foreground">Unique Viewers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold text-foreground tabular-nums">{kpiSummary.subscriberGrowth}</p>
            <p className="text-xs text-muted-foreground">Sub Growth / Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Age & Gender Bar Chart */}
      <Card>
        <CardHeader><CardTitle>Age & Gender Distribution</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={ageGenderConfig} className="h-[300px] w-full">
            <BarChart data={ageGenderChart} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="age" tickLine={false} axisLine={false} fontSize={11} width={50} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="male" fill="hsl(224, 76%, 48%)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="female" fill="hsl(330, 80%, 60%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Subscriber Sources + New vs Returning */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Subscriber Sources</CardTitle></CardHeader>
          <CardContent>
            <TrafficSourcesPie data={subscriberSources} nameKey="source" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>New vs Returning Viewers</CardTitle></CardHeader>
          <CardContent>
            <TrafficSourcesPie data={newVsReturning} innerRadius={60} />
            <div className="flex justify-center gap-6 mt-2">
              {newVsReturning.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.fill }} />
                  <span className="text-foreground">{d.name}</span>
                  <span className="font-medium text-foreground tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriber Growth Chart */}
      <Card>
        <CardHeader><CardTitle>Subscriber Growth (Last 28 Days)</CardTitle></CardHeader>
        <CardContent>
          <SubscriberChart data={subscriberGrowthData} />
        </CardContent>
      </Card>

      {/* Geography Full Table */}
      <Card>
        <CardHeader><CardTitle>Geographic Distribution</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Watch Time (hrs)</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="w-[200px]">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countriesFull.map((c) => (
                <TableRow key={c.code} className="hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{c.code} — {c.country}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right tabular-nums">{Math.round(c.watchTime / 60)}</TableCell>
                  <TableCell className="text-right tabular-nums">${c.revenue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={c.pct} className="h-1.5 flex-1" />
                      <span className="text-xs w-10 text-right tabular-nums">{c.pct}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Devices + OS */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Device Breakdown</CardTitle></CardHeader>
          <CardContent>
            {devicesFull.map((d) => {
              const Icon = deviceIcons[d.device] || Monitor;
              return (
                <div key={d.device} className="flex items-center gap-3 mb-4">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm w-24 text-foreground">{d.device}</span>
                  <Progress value={d.pct} className="h-2 flex-1" />
                  <span className="text-sm font-medium w-10 text-right tabular-nums text-foreground">{d.pct}%</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Operating System</CardTitle></CardHeader>
          <CardContent>
            <TrafficSourcesPie data={osSplit} innerRadius={50} />
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources Full */}
      <Card>
        <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
        <CardContent>
          {trafficSourcesFull.map((t) => (
            <div key={t.source} className="flex items-center gap-3 mb-3">
              <span className="text-sm w-36 text-foreground">{t.source}</span>
              <Progress value={t.pct} className="h-2 flex-1" />
              <span className="text-sm font-medium w-14 text-right tabular-nums text-foreground">{t.views.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground w-10 text-right tabular-nums">{t.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Search Terms */}
      <Card>
        <CardHeader><CardTitle>Top Search Terms Driving Views</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Search Term</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">CTR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSearchTerms.map((t) => (
                <TableRow key={t.term} className="hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{t.term}</TableCell>
                  <TableCell className="text-right tabular-nums">{t.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right tabular-nums">{(t.impressions / 1000).toFixed(0)}K</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-sm font-medium tabular-nums ${t.ctr > 10 ? "text-green-600" : "text-foreground"}`}>
                      {t.ctr}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* External Referrers */}
      <Card>
        <CardHeader><CardTitle>External Referrers</CardTitle></CardHeader>
        <CardContent>
          {externalReferrers.map((r) => (
            <div key={r.url} className="flex items-center gap-3 mb-3">
              <span className="text-sm w-32 font-medium text-foreground">{r.url}</span>
              <Progress value={(r.views / 2840) * 100} className="h-1.5 flex-1" />
              <span className="text-sm text-muted-foreground w-14 text-right tabular-nums">{r.views.toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sharing Services */}
      <Card>
        <CardHeader><CardTitle>Sharing by Platform</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {sharingServices.map((s) => (
              <div key={s.service} className="p-3 rounded-md bg-secondary text-center">
                <p className="font-semibold text-lg text-foreground tabular-nums">{s.shares.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{s.service}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loyalty + Growth */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Audience Loyalty</p>
            <p className="text-2xl font-semibold text-foreground mt-1 tabular-nums">68%</p>
            <p className="text-sm text-muted-foreground">of views from subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Channel Growth</p>
            <p className="text-2xl font-semibold text-foreground mt-1 tabular-nums">+4.2%</p>
            <p className="text-sm text-muted-foreground">subscriber growth this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
