import { TrendingUp, DollarSign, CheckCircle2, PlayCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const kpis = [
  { label: "Dealflow Revenue", value: "$4,500", sub: "Brand deals this month", icon: TrendingUp },
  { label: "Avg Deal Value", value: "$1,500", sub: "Per closed deal", icon: DollarSign },
  { label: "Deals Closed", value: "3", sub: "This month", icon: CheckCircle2 },
  { label: "YouTube AdSense", value: "$820", sub: "AdSense this month", icon: PlayCircle },
];

const deals = [
  { brand: "Squarespace", value: "$1,800", date: "15 Mar 2026", format: "Integration", status: "Paid" },
  { brand: "DraftKings", value: "$1,400", date: "28 Feb 2026", format: "Mention", status: "Paid" },
  { brand: "NordVPN", value: "$1,300", date: "14 Feb 2026", format: "Integration", status: "Paid" },
  { brand: "Spotify", value: "$2,200", date: "—", format: "Integration", status: "In Negotiation" },
  { brand: "AG1", value: "$1,500", date: "—", format: "Dedicated", status: "In Negotiation" },
];

const negotiation = [
  { brand: "Spotify", value: "$2,200", format: "Integration" },
  { brand: "AG1", value: "$1,500", format: "Dedicated" },
];

const prospecting = [
  { brand: "NordVPN", value: "~$390" },
  { brand: "DraftKings", value: "~$420" },
  { brand: "Manscaped", value: "~$270" },
];

const adSenseStats = [
  { label: "This Month", value: "$820" },
  { label: "Last Month", value: "$790" },
  { label: "RPM", value: "$4.20" },
  { label: "Est. Annual", value: "$9,840" },
];

const rateCard = [
  { type: "30-second mention", range: "$800 – $1,000" },
  { type: "60-second integration", range: "$1,400 – $1,800" },
  { type: "Dedicated video", range: "$2,200 – $2,800" },
];

export default function Revenue() {
  const dealflowPct = Math.round((4500 / 5320) * 100);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Revenue</h1>
          <p className="text-sm text-muted-foreground">Your total creator earnings — brand deals + YouTube</p>
        </div>
        <Select defaultValue="apr-2026">
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="apr-2026">April 2026</SelectItem>
            <SelectItem value="mar-2026">March 2026</SelectItem>
            <SelectItem value="feb-2026">February 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">{k.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
                </div>
                <k.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dealflow Contribution */}
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-5xl font-semibold text-primary tabular-nums">{dealflowPct}%</p>
          <p className="text-sm text-muted-foreground">of your total creator revenue came from Dealflow this month</p>
          <div className="w-full h-5 rounded-md overflow-hidden flex bg-secondary">
            <div className="bg-primary h-full flex items-center justify-center text-[10px] font-medium text-primary-foreground" style={{ width: `${dealflowPct}%` }}>
              Dealflow $4,500
            </div>
            <div className="bg-muted-foreground/20 h-full flex-1 flex items-center justify-center text-[10px] font-medium text-muted-foreground">
              YouTube $820
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Total creator revenue: $5,320 in April 2026</p>
        </CardContent>
      </Card>

      {/* Deal Breakdown + Pipeline */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Brand Deal Breakdown</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Brand</TableHead>
                  <TableHead>Deal Value</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((d) => (
                  <TableRow key={d.brand} className="hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{d.brand}</TableCell>
                    <TableCell className="font-medium tabular-nums text-foreground">{d.value}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.format}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={d.status === "Paid" ? "bg-green-50 text-green-600 border-green-200" : "bg-blue-50 text-blue-600 border-blue-200"}>
                        {d.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">Deals in negotiation not included in totals until closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pipeline Value</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">In Negotiation</p>
              {negotiation.map((n) => (
                <div key={n.brand} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="font-medium text-foreground">{n.brand}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs">{n.format}</span>
                    <span className="font-medium text-foreground tabular-nums">{n.value}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="text-sm font-medium text-foreground">Subtotal</span>
                <span className="font-semibold text-amber-600 tabular-nums">$3,700</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">Prospecting (weighted 30%)</p>
              {prospecting.map((p) => (
                <div key={p.brand} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="font-medium text-foreground">{p.brand}</span>
                  <span className="text-muted-foreground tabular-nums">{p.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="text-sm font-medium text-foreground">Subtotal</span>
                <span className="font-medium text-muted-foreground tabular-nums">~$1,080</span>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t">
              <span className="font-semibold text-foreground">Total pipeline value</span>
              <span className="font-semibold text-lg text-foreground tabular-nums">$4,780</span>
            </div>
            <p className="text-xs text-muted-foreground">Prospecting weighted at 30% probability</p>
          </CardContent>
        </Card>
      </div>

      {/* YouTube AdSense Context */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>YouTube AdSense Context</CardTitle>
            <Badge variant="secondary" className="text-xs">For context</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adSenseStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-semibold text-foreground tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your YouTube ad revenue informs your sponsorship rate card. An RPM of $4.20 suggests strong audience conversion — use this when negotiating rates with brands.
          </p>
        </CardContent>
      </Card>

      {/* Rate Card Insight */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="font-semibold text-sm text-foreground">Your suggested rate card</p>
          </div>
          <div className="space-y-2">
            {rateCard.map((r) => (
              <div key={r.type} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{r.type}</span>
                <span className="font-medium text-sm text-foreground tabular-nums">{r.range}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on your 124K subscribers, 4.8% engagement, and $4.20 RPM. Updated after each scan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
