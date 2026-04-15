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
  { label: "Dealflow Revenue", value: "$4,500", sub: "Brand deals this month", icon: TrendingUp, bg: "bg-pastel-green" },
  { label: "Avg Deal Value", value: "$1,500", sub: "Per closed deal", icon: DollarSign, bg: "bg-pastel-blue" },
  { label: "Deals Closed", value: "3", sub: "This month", icon: CheckCircle2, bg: "bg-pastel-purple" },
  { label: "YouTube AdSense", value: "$820", sub: "AdSense this month", icon: PlayCircle, bg: "bg-pastel-orange" },
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
          <h1 className="text-2xl font-bold">Revenue</h1>
          <p className="text-muted-foreground">Your total creator earnings — brand deals + YouTube</p>
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
          <Card key={k.label} className={`${k.bg} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">{k.label}</p>
                  <p className="text-2xl font-bold mt-1">{k.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{k.sub}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <k.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dealflow Contribution */}
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <p className="text-5xl font-bold text-primary">{dealflowPct}%</p>
          <p className="text-muted-foreground">of your total creator revenue came from Dealflow this month</p>
          <div className="w-full h-6 rounded-full overflow-hidden flex bg-muted">
            <div className="bg-primary h-full flex items-center justify-center text-[10px] font-semibold text-primary-foreground" style={{ width: `${dealflowPct}%` }}>
              Dealflow $4,500
            </div>
            <div className="bg-muted-foreground/20 h-full flex-1 flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
              YouTube $820
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Total creator revenue: $5,320 in April 2026</p>
        </CardContent>
      </Card>

      {/* Deal Breakdown + Pipeline */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-lg">Brand Deal Breakdown</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Deal Value</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((d) => (
                  <TableRow key={d.brand}>
                    <TableCell className="font-medium">{d.brand}</TableCell>
                    <TableCell className="font-semibold">{d.value}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                    <TableCell className="text-sm">{d.format}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={d.status === "Paid" ? "bg-green-50 text-green-700 border-green-200" : "bg-purple-50 text-purple-700 border-purple-200"}>
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
          <CardHeader><CardTitle className="text-lg">Pipeline Value</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">In Negotiation</p>
              {negotiation.map((n) => (
                <div key={n.brand} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="font-medium">{n.brand}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-xs">{n.format}</span>
                    <span className="font-semibold">{n.value}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="font-bold text-amber-600">$3,700</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Prospecting (weighted 30%)</p>
              {prospecting.map((p) => (
                <div key={p.brand} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="font-medium">{p.brand}</span>
                  <span className="text-muted-foreground">{p.value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="font-medium text-muted-foreground">~$1,080</span>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t">
              <span className="font-semibold">Total pipeline value</span>
              <span className="font-bold text-lg">$4,780</span>
            </div>
            <p className="text-xs text-muted-foreground">Prospecting weighted at 30% probability</p>
          </CardContent>
        </Card>
      </div>

      {/* YouTube AdSense Context */}
      <Card className="bg-muted/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">YouTube AdSense Context</CardTitle>
            <Badge variant="secondary" className="text-xs">For context</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adSenseStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold">{s.value}</p>
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
      <Card className="bg-blue-50/50 border-blue-200">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="font-semibold text-sm">Your suggested rate card</p>
          </div>
          <div className="space-y-2">
            {rateCard.map((r) => (
              <div key={r.type} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{r.type}</span>
                <span className="font-semibold text-sm">{r.range}</span>
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
