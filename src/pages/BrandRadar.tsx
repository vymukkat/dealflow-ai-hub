import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const queries = ["hockey", "hockey review", "hockey podcast", "hockey tips", "hockey explained", "hockey news"];

const brands = [
  { name: "Spotify", category: "Music/Streaming", times: 8, sources: "3 YT channels + 1 podcast", affinity: 94 },
  { name: "NordVPN", category: "VPN/Privacy", times: 6, sources: "4 YT channels", affinity: 88 },
  { name: "AG1", category: "Health/Nutrition", times: 5, sources: "2 podcasts", affinity: 82 },
  { name: "DraftKings", category: "Sports Betting", times: 4, sources: "3 YT channels", affinity: 79 },
  { name: "Manscaped", category: "Grooming", times: 3, sources: "2 YT channels", affinity: 71 },
  { name: "Squarespace", category: "Website Builder", times: 3, sources: "2 YT channels", affinity: 65 },
  { name: "BetMGM", category: "Sports Betting", times: 2, sources: "1 YT channel + 1 podcast", affinity: 61 },
  { name: "Gatorade", category: "Sports Nutrition", times: 2, sources: "2 YT channels", affinity: 58 },
];

function affinityColor(val: number) {
  if (val >= 90) return "bg-green-500 hover:bg-green-500 text-white";
  if (val >= 70) return "bg-primary hover:bg-primary text-primary-foreground";
  return "bg-amber-500 hover:bg-amber-500 text-white";
}

export default function BrandRadar() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Radar</h1>
          <p className="text-muted-foreground">Automated sponsor discovery for your niche</p>
        </div>
        <Button><Zap className="h-4 w-4" /> Run New Scan</Button>
      </div>

      <Card>
        <CardContent className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground">Last scan: 12 Apr 2026 at 11:02 PM</p>
          <p className="text-sm">60 channels scanned · 4 podcasts · 16 brands found</p>
          <p className="text-xs text-muted-foreground">Scan runs on the server — safe to browse other pages</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Scan complete</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-sm font-semibold mb-2">Search Queries Used ({queries.length})</p>
        <div className="flex flex-wrap gap-2">
          {queries.map((q) => (
            <Badge key={q} className="bg-purple-100 text-purple-700 hover:bg-purple-100">{q}</Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Brands Discovered</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Times Seen</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead>Affinity Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((b) => (
                <TableRow key={b.name}>
                  <TableCell className="font-semibold">{b.name}</TableCell>
                  <TableCell>{b.category}</TableCell>
                  <TableCell>{b.times}×</TableCell>
                  <TableCell className="text-muted-foreground">{b.sources}</TableCell>
                  <TableCell>
                    <Badge className={affinityColor(b.affinity)}>{b.affinity}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
