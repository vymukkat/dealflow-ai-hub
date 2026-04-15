import { useState, useEffect } from "react";
import { Zap, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/*  Scan animation                                                     */
/* ------------------------------------------------------------------ */
const scanChannels = [
  "HockeyBuzz", "The Hockey News", "Steve Dangle Podcast",
  "Sportsnet", "TSN Hockey", "BarDown",
];

function ScanStatus() {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleChannels, setVisibleChannels] = useState(0);
  const [channelCount, setChannelCount] = useState(0);

  useEffect(() => {
    if (!scanning) return;
    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(progInterval); return 100; }
        return Math.min(p + 100 / (8000 / 100), 100);
      });
    }, 100);
    const channelInterval = setInterval(() => {
      setVisibleChannels((v) => {
        if (v >= scanChannels.length) { clearInterval(channelInterval); return v; }
        return v + 1;
      });
    }, 600);
    const countInterval = setInterval(() => {
      setChannelCount((c) => {
        if (c >= 60) { clearInterval(countInterval); return 60; }
        return c + 5;
      });
    }, 650);
    const timer = setTimeout(() => {
      setScanning(false);
      setProgress(100);
      setChannelCount(60);
      setVisibleChannels(scanChannels.length);
    }, 8000);
    return () => {
      clearInterval(progInterval);
      clearInterval(channelInterval);
      clearInterval(countInterval);
      clearTimeout(timer);
    };
  }, [scanning]);

  if (!scanning) {
    return (
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Scan complete</span>
          </div>
          <p className="text-sm text-muted-foreground">60 channels scanned · 4 podcasts · 18 brands found</p>
          <Button size="sm" onClick={() => { setScanning(true); setProgress(0); setVisibleChannels(0); setChannelCount(0); }}>
            <Zap className="h-4 w-4" /> Run New Scan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Scanning...</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        <p className="text-sm font-medium text-foreground tabular-nums">{channelCount} / 60 channels scanned</p>
        <div className="space-y-1 font-mono text-xs">
          {scanChannels.slice(0, visibleChannels).map((ch, i) => {
            const isLatest = i === visibleChannels - 1 && visibleChannels < scanChannels.length;
            return (
              <div key={ch} className="flex items-center gap-2">
                {isLatest ? (
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                ) : (
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                )}
                <span className={isLatest ? "text-foreground" : "text-muted-foreground"}>
                  Scanning {ch}...
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Scan runs on the server — safe to browse other pages</p>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Tier data                                                          */
/* ------------------------------------------------------------------ */
const tier1 = [
  { name: "Spotify", category: "Music/Streaming", times: 8, sources: "3 YT + 1 Pod", affinity: 94 },
  { name: "NordVPN", category: "VPN/Privacy", times: 6, sources: "4 YT", affinity: 88 },
  { name: "DraftKings", category: "Sports Betting", times: 4, sources: "3 YT", affinity: 79 },
  { name: "Manscaped", category: "Grooming", times: 3, sources: "2 YT", affinity: 71 },
  { name: "Squarespace", category: "Website Builder", times: 3, sources: "2 YT", affinity: 65 },
];

const tier2 = [
  { name: "AG1", category: "Health/Nutrition", signal: "Hiring influencer manager", confidence: "High" },
  { name: "Ghost Energy", category: "Energy Drinks", signal: "Series B raised Jan 2026", confidence: "High" },
  { name: "Cuts Clothing", category: "Apparel", signal: "Hiring creator partnerships", confidence: "Medium" },
  { name: "Hims", category: "Health", signal: "Q1 campaign active", confidence: "Medium" },
];

const tier3 = [
  { name: "Audible", category: "Audiobooks", why: "18-34 male skew", affinity: 61 },
  { name: "Ridge Wallet", category: "Accessories", why: "18-34 male buyers", affinity: 58 },
  { name: "Gatorade", category: "Sports Nutrition", why: "Sports audience", affinity: 62 },
  { name: "Therabody", category: "Recovery/Wellness", why: "Active male demo", affinity: 54 },
  { name: "Betterhelp", category: "Mental Health", why: "Male sports demo", affinity: 55 },
  { name: "MVMT", category: "Watches", why: "18-34 male skew", affinity: 51 },
];

const queries = ["hockey", "hockey review", "hockey podcast", "hockey tips", "hockey explained", "hockey news"];

function affinityText(val: number) {
  if (val >= 80) return "text-green-600";
  if (val >= 60) return "text-amber-600";
  return "text-muted-foreground";
}

/* ------------------------------------------------------------------ */
/*  Tier section                                                       */
/* ------------------------------------------------------------------ */
interface TierSectionProps {
  title: string;
  description: string;
  count: number;
  children: React.ReactNode;
  selected: number;
}

function TierSection({ title, description, count, children, selected }: TierSectionProps) {
  return (
    <div className="border-t border-border pt-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="text-xs">{count} brands</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
      <div className="flex items-center justify-between pt-3">
        <span className="text-xs text-muted-foreground">{selected} selected</span>
        <div className="flex gap-2">
          <Button size="sm" disabled={selected === 0}>Draft Selected</Button>
          <Button size="sm" variant="outline">Automate Tier</Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function BrandRadar() {
  const [sel1, setSel1] = useState<Set<string>>(new Set());
  const [sel2, setSel2] = useState<Set<string>>(new Set());
  const [sel3, setSel3] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, setter: React.Dispatch<React.SetStateAction<Set<string>>>, name: string) => {
    const next = new Set(set);
    if (next.has(name)) { next.delete(name); } else { next.add(name); }
    setter(next);
  };

  const totalBrands = tier1.length + tier2.length + tier3.length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Brand Radar</h1>
          <p className="text-sm text-muted-foreground">Automated sponsor discovery for your niche</p>
        </div>
      </div>

      <ScanStatus />

      <div>
        <p className="text-sm font-medium text-foreground mb-2">Search Queries Used ({queries.length})</p>
        <div className="flex flex-wrap gap-2">
          {queries.map((q) => (
            <Badge key={q} variant="secondary" className="bg-secondary text-muted-foreground border border-border">{q}</Badge>
          ))}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3">
        <p className="text-sm font-medium text-foreground">{totalBrands} brands found across 3 tiers</p>
        <Button size="sm">Automate All</Button>
      </div>

      {/* TIER 1 */}
      <TierSection
        title="Tier 1 — Proven Sponsors"
        description="Brands actively sponsoring channels in your niche"
        count={tier1.length}
        selected={sel1.size}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Times Seen</TableHead>
              <TableHead>Sources</TableHead>
              <TableHead>Affinity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tier1.map((b) => (
              <TableRow key={b.name} className="hover:bg-secondary/50">
                <TableCell>
                  <Checkbox checked={sel1.has(b.name)} onCheckedChange={() => toggle(sel1, setSel1, b.name)} />
                </TableCell>
                <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                <TableCell><Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">{b.category}</Badge></TableCell>
                <TableCell className="tabular-nums">×{b.times}</TableCell>
                <TableCell className="text-muted-foreground">{b.sources}</TableCell>
                <TableCell className={`font-medium tabular-nums ${affinityText(b.affinity)}`}>{b.affinity}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TierSection>

      {/* TIER 2 */}
      <TierSection
        title="Tier 2 — Buying Signals"
        description="Brands hiring for influencer roles or recently funded — actively in buying mode"
        count={tier2.length}
        selected={sel2.size}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tier2.map((b) => (
              <TableRow key={b.name} className="hover:bg-secondary/50">
                <TableCell>
                  <Checkbox checked={sel2.has(b.name)} onCheckedChange={() => toggle(sel2, setSel2, b.name)} />
                </TableCell>
                <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                <TableCell><Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">{b.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{b.signal}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={b.confidence === "High" ? "bg-green-50 text-green-600 border-green-200" : "bg-amber-50 text-amber-600 border-amber-200"}>
                    {b.confidence}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TierSection>

      {/* TIER 3 */}
      <TierSection
        title="Tier 3 — Demographic Matches"
        description="Brands targeting 18–34 male sports fans — your exact audience profile"
        count={tier3.length}
        selected={sel3.size}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Why Matched</TableHead>
              <TableHead>Affinity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tier3.map((b) => (
              <TableRow key={b.name} className="hover:bg-secondary/50">
                <TableCell>
                  <Checkbox checked={sel3.has(b.name)} onCheckedChange={() => toggle(sel3, setSel3, b.name)} />
                </TableCell>
                <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                <TableCell><Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">{b.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{b.why}</TableCell>
                <TableCell className={`font-medium tabular-nums ${affinityText(b.affinity)}`}>{b.affinity}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TierSection>
    </div>
  );
}
