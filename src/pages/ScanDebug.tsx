import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const queries = ["hockey", "hockey review", "hockey podcast", "hockey tips", "hockey explained", "hockey news"];

const channels = [
  { name: "HockeyBuzz", id: "UC123abc", sponsors: "NordVPN, Spotify" },
  { name: "The Hockey News", id: "UC456def", sponsors: "DraftKings" },
  { name: "Steve Dangle Podcast", id: "UC789ghi", sponsors: "AG1, Manscaped" },
  { name: "Sportsnet", id: "UCabc123", sponsors: "—" },
  { name: "TSN Hockey", id: "UCdef456", sponsors: "Squarespace" },
  { name: "BarDown", id: "UCghi789", sponsors: "NordVPN" },
  { name: "The Athletic Hockey", id: "UCjkl012", sponsors: "—" },
  { name: "SDPN", id: "UCmno345", sponsors: "AG1, Spotify" },
];

const podcasts = ["The Athletic Hockey Show", "31 Thoughts Podcast", "Spittin Chiclets", "SDPN"];

const brands = [
  { name: "Spotify", category: "Music/Streaming", times: 8, channels: "HockeyBuzz, SDPN" },
  { name: "NordVPN", category: "VPN/Privacy", times: 6, channels: "HockeyBuzz, BarDown, +2" },
  { name: "AG1", category: "Health/Nutrition", times: 5, channels: "Steve Dangle, SDPN" },
  { name: "DraftKings", category: "Sports Betting", times: 4, channels: "The Hockey News, +2" },
  { name: "Manscaped", category: "Grooming", times: 3, channels: "Steve Dangle, +1" },
  { name: "Squarespace", category: "Website Builder", times: 3, channels: "TSN Hockey, +1" },
  { name: "BetMGM", category: "Sports Betting", times: 2, channels: "1 YT + 1 Pod" },
  { name: "Gatorade", category: "Sports Nutrition", times: 2, channels: "2 YT channels" },
];

const drafts = [
  { brand: "Spotify", subject: "Hockey Creator + Spotify = Natural Fit", status: "draft" },
  { brand: "NordVPN", subject: "Protecting hockey fans online — partnership idea", status: "draft" },
  { brand: "AG1", subject: "Fuel your game — AG1 x Wes Mukkati", status: "approved" },
  { brand: "DraftKings", subject: "The hockey audience you're missing", status: "sent" },
];

function statusColor(s: string) {
  if (s === "approved") return "bg-green-500 hover:bg-green-500 text-white";
  if (s === "sent") return "bg-primary hover:bg-primary text-primary-foreground";
  return "bg-amber-500 hover:bg-amber-500 text-white";
}

export default function ScanDebug() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Scan Debug</h1>
        <Badge className="bg-orange-500 hover:bg-orange-500 text-white">DEV ONLY</Badge>
      </div>
      <p className="text-sm text-muted-foreground">Last scan: 12 Apr 2026 at 11:02 PM</p>

      <div className="rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold">Test Pipeline: Generate 1 Draft</h3>
        </div>
        <p className="text-sm text-muted-foreground">Picks the top brand, finds a contact via Hunter.io, drafts an email via Claude</p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Generate Test Draft</Button>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Search Queries Used ({queries.length})</p>
        <div className="flex flex-wrap gap-2">
          {queries.map((q) => (
            <Badge key={q} className="bg-purple-100 text-purple-700 hover:bg-purple-100">{q}</Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">YouTube Channels Scanned</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Channel Name</TableHead>
                <TableHead>Channel ID</TableHead>
                <TableHead>Sponsors Found</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-semibold">{c.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">{c.id}</TableCell>
                  <TableCell className="text-muted-foreground">{c.sponsors}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div>
        <p className="text-sm font-semibold mb-2">Podcasts via Podchaser</p>
        <div className="flex flex-wrap gap-2">
          {podcasts.map((p) => (
            <Badge key={p} className="bg-purple-100 text-purple-700 hover:bg-purple-100">🎙 {p}</Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Sponsors Detected</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Times Seen</TableHead>
                <TableHead>Channels</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((b) => (
                <TableRow key={b.name}>
                  <TableCell className="font-semibold">{b.name}</TableCell>
                  <TableCell>{b.category}</TableCell>
                  <TableCell>{b.times}×</TableCell>
                  <TableCell className="text-muted-foreground">{b.channels}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Email Drafts</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {drafts.map((d, i) => (
              <AccordionItem key={d.brand} value={`item-${i}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 text-left flex-1 pr-4">
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm">{d.brand}</span>
                      <p className="text-xs text-muted-foreground truncate">{d.subject}</p>
                    </div>
                    <Badge className={statusColor(d.status)}>{d.status}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Full draft content would appear here...</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
