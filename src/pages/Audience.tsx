import { Smartphone, Monitor, Tv } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

export default function Audience() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Audience Intelligence</h1>
        <Badge variant="secondary">Powered by YouTube Analytics</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-pastel-blue border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">73%</p>
            <p className="text-xs text-muted-foreground">Male Audience</p>
          </CardContent>
        </Card>
        <Card className="bg-pastel-green border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">18–34</p>
            <p className="text-xs text-muted-foreground">Core Age Range</p>
          </CardContent>
        </Card>
        <Card className="bg-pastel-purple border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">68%</p>
            <p className="text-xs text-muted-foreground">Subscriber Views</p>
          </CardContent>
        </Card>
        <Card className="bg-pastel-orange border-0">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">+4.2%</p>
            <p className="text-xs text-muted-foreground">Sub Growth / Month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Age & Gender Distribution</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 text-xs font-semibold text-muted-foreground">
              <span>Age Group</span><span>Male</span><span>Female</span><span>Distribution</span>
            </div>
            {ageGender.map((row) => (
              <div key={row.age} className="grid grid-cols-4 items-center text-sm">
                <span className="font-medium">{row.age}</span>
                <span>{row.male}%</span>
                <span>{row.female}%</span>
                <div className="flex h-4 rounded-full overflow-hidden bg-muted">
                  <div className="bg-primary" style={{ width: `${row.male}%` }} />
                  <div className="bg-pink-400" style={{ width: `${row.female}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Geographic Distribution</CardTitle></CardHeader>
          <CardContent>
            {countries.map((c) => (
              <div key={c.code} className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold w-8">{c.code}</span>
                <Progress value={c.pct} className="h-3 flex-1" />
                <span className="text-sm font-medium w-10 text-right">{c.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Device Breakdown</CardTitle></CardHeader>
          <CardContent>
            {devices.map((d) => (
              <div key={d.label} className="flex items-center gap-3 mb-4">
                <d.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm w-16">{d.label}</span>
                <Progress value={d.pct} className="h-3 flex-1 [&>div]:bg-green-500" />
                <span className="text-sm font-medium w-10 text-right">{d.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Traffic Sources</CardTitle></CardHeader>
        <CardContent>
          {traffic.map((t) => (
            <div key={t.source} className="flex items-center gap-3 mb-4">
              <span className="text-sm w-36">{t.source}</span>
              <Progress value={t.pct} className="h-3 flex-1" />
              <span className="text-sm font-medium w-10 text-right">{t.pct}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-pastel-blue border-0">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Audience Loyalty</p>
            <p className="text-3xl font-bold mt-1">68%</p>
            <p className="text-sm text-muted-foreground">of views from subscribers</p>
          </CardContent>
        </Card>
        <Card className="bg-pastel-green border-0">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Channel Growth</p>
            <p className="text-3xl font-bold mt-1">+4.2%</p>
            <p className="text-sm text-muted-foreground">subscriber growth this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
