import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Search, Building2, Users, CheckCircle2, DollarSign, Mail, SkipForward, Copy, Check } from "lucide-react";

type BrandStatus = "Prospecting" | "Contacted" | "Replied" | "In Negotiation" | "Closed" | "Bounced" | "Skipped";

interface TimelineEntry {
  date: string;
  event: string;
  type: "action" | "positive" | "bounce" | "system";
}

interface Brand {
  name: string;
  domain: string;
  category: string;
  affinity: number;
  status: BrandStatus;
  lastContact: string;
  dealValue: string;
  nextAction: string;
  contact: { name: string; email: string; title: string; confidence: number };
  timeline: TimelineEntry[];
}

const brands: Brand[] = [
  {
    name: "Spotify", domain: "spotify.com", category: "Music/Streaming", affinity: 94,
    status: "In Negotiation", lastContact: "2 days ago", dealValue: "$3,500", nextAction: "Follow up",
    contact: { name: "Alessia E.", email: "alessiae@spotify.com", title: "Sr. Partnerships Manager", confidence: 92 },
    timeline: [
      { date: "Today", event: "Draft email created by AI", type: "action" },
      { date: "3 days ago", event: "Email sent to alessiae@spotify.com", type: "action" },
      { date: "5 days ago", event: "Brand detected in scan (8 channels)", type: "system" },
    ],
  },
  {
    name: "NordVPN", domain: "nordvpn.com", category: "VPN/Privacy", affinity: 88,
    status: "Contacted", lastContact: "5 days ago", dealValue: "—", nextAction: "Awaiting reply",
    contact: { name: "Marcus L.", email: "marcus@nordvpn.com", title: "Influencer Manager", confidence: 87 },
    timeline: [
      { date: "5 days ago", event: "Outreach email sent", type: "action" },
      { date: "1 week ago", event: "Brand detected in scan (12 channels)", type: "system" },
    ],
  },
  {
    name: "AG1", domain: "drinkag1.com", category: "Health/Nutrition", affinity: 82,
    status: "Prospecting", lastContact: "—", dealValue: "—", nextAction: "Draft email",
    contact: { name: "Sarah K.", email: "sarah@drinkag1.com", title: "Creator Partnerships", confidence: 78 },
    timeline: [
      { date: "2 days ago", event: "Brand detected in scan (15 channels)", type: "system" },
    ],
  },
  {
    name: "DraftKings", domain: "draftkings.com", category: "Sports Betting", affinity: 79,
    status: "Contacted", lastContact: "3 days ago", dealValue: "—", nextAction: "Awaiting reply",
    contact: { name: "Jason T.", email: "jason@draftkings.com", title: "Content Partnerships", confidence: 81 },
    timeline: [
      { date: "3 days ago", event: "Follow-up email sent", type: "action" },
      { date: "1 week ago", event: "Initial outreach sent", type: "action" },
      { date: "2 weeks ago", event: "Brand detected in scan (6 channels)", type: "system" },
    ],
  },
  {
    name: "Manscaped", domain: "manscaped.com", category: "Grooming", affinity: 71,
    status: "Bounced", lastContact: "2 weeks ago", dealValue: "—", nextAction: "Find new contact",
    contact: { name: "Chris D.", email: "chris@manscaped.com", title: "Marketing Coordinator", confidence: 45 },
    timeline: [
      { date: "2 weeks ago", event: "Email bounced — invalid address", type: "bounce" },
      { date: "3 weeks ago", event: "Outreach email sent", type: "action" },
    ],
  },
  {
    name: "Ghost Energy", domain: "ghostenergy.com", category: "Energy Drinks", affinity: 68,
    status: "In Negotiation", lastContact: "1 day ago", dealValue: "$2,500", nextAction: "Send contract",
    contact: { name: "Tyler R.", email: "tyler@ghostenergy.com", title: "Brand Partnerships", confidence: 90 },
    timeline: [
      { date: "1 day ago", event: "Rate card discussed — $2,500 for integration", type: "positive" },
      { date: "4 days ago", event: "Reply received — interested in integration", type: "positive" },
      { date: "1 week ago", event: "Outreach email sent", type: "action" },
    ],
  },
  {
    name: "Squarespace", domain: "squarespace.com", category: "Website Builder", affinity: 65,
    status: "Closed", lastContact: "1 Mar 2026", dealValue: "$1,800", nextAction: "Re-contact Oct",
    contact: { name: "Emma W.", email: "emma@squarespace.com", title: "Influencer Marketing Lead", confidence: 95 },
    timeline: [
      { date: "1 Mar 2026", event: "Deal closed — $1,800 dedicated video", type: "positive" },
      { date: "15 Feb 2026", event: "Contract signed", type: "positive" },
      { date: "10 Feb 2026", event: "Terms agreed", type: "action" },
      { date: "1 Feb 2026", event: "Initial outreach sent", type: "action" },
    ],
  },
  {
    name: "BetMGM", domain: "betmgm.com", category: "Sports Betting", affinity: 61,
    status: "Bounced", lastContact: "3 weeks ago", dealValue: "—", nextAction: "Skip",
    contact: { name: "David M.", email: "david@betmgm.com", title: "Digital Marketing", confidence: 38 },
    timeline: [
      { date: "3 weeks ago", event: "Email bounced — domain not accepting mail", type: "bounce" },
    ],
  },
  {
    name: "Gatorade", domain: "gatorade.com", category: "Sports Nutrition", affinity: 58,
    status: "Replied", lastContact: "1 week ago", dealValue: "—", nextAction: "Send media kit",
    contact: { name: "Mike J.", email: "mikej@gatorade.com", title: "Sponsorship Manager", confidence: 74 },
    timeline: [
      { date: "1 week ago", event: "Reply received — requesting media kit", type: "positive" },
      { date: "2 weeks ago", event: "Outreach email sent", type: "action" },
    ],
  },
  {
    name: "Audible", domain: "audible.com", category: "Audiobooks", affinity: 52,
    status: "Prospecting", lastContact: "—", dealValue: "—", nextAction: "Draft email",
    contact: { name: "Lisa P.", email: "lisap@audible.com", title: "Creator Relations", confidence: 69 },
    timeline: [
      { date: "3 days ago", event: "Brand detected in scan (4 channels)", type: "system" },
    ],
  },
];

const statusConfig: Record<BrandStatus, { color: string; emoji: string }> = {
  Prospecting: { color: "bg-blue-100 text-blue-700 border-blue-200", emoji: "🔵" },
  Contacted: { color: "bg-amber-100 text-amber-700 border-amber-200", emoji: "🟡" },
  Replied: { color: "bg-cyan-100 text-cyan-700 border-cyan-200", emoji: "🟢" },
  "In Negotiation": { color: "bg-purple-100 text-purple-700 border-purple-200", emoji: "🟢" },
  Closed: { color: "bg-green-100 text-green-700 border-green-200", emoji: "✅" },
  Bounced: { color: "bg-red-100 text-red-700 border-red-200", emoji: "🔴" },
  Skipped: { color: "bg-gray-100 text-gray-700 border-gray-200", emoji: "⏭️" },
};

const timelineDotColor: Record<string, string> = {
  action: "bg-primary",
  positive: "bg-green-500",
  bounce: "bg-red-500",
  system: "bg-gray-400",
};

const affinityColor = (v: number) =>
  v >= 80 ? "text-green-600" : v >= 60 ? "text-amber-600" : "text-red-500";

const confidenceColor = (v: number) =>
  v >= 80 ? "[&>div]:bg-green-500" : v >= 60 ? "[&>div]:bg-amber-500" : "[&>div]:bg-red-500";

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
      {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}

export default function Brands() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const categories = [...new Set(brands.map((b) => b.category))];

  const filtered = brands.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchCat = categoryFilter === "all" || b.category === categoryFilter;
    return matchSearch && matchStatus && matchCat;
  });

  const inProgress = brands.filter((b) => ["Contacted", "Replied", "In Negotiation"].includes(b.status)).length;
  const closedMonth = brands.filter((b) => b.status === "Closed").length;
  const pipelineValue = brands.reduce((sum, b) => {
    const v = b.dealValue.replace(/[^0-9]/g, "");
    return sum + (v ? parseInt(v) : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Brand CRM</h1>
        <p className="text-muted-foreground">Every brand relationship in one place</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Brands</p>
              <p className="text-xl font-bold">{brands.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-xl font-bold">{inProgress}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Closed This Month</p>
              <p className="text-xl font-bold">{closedMonth}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pipeline Value</p>
              <p className="text-xl font-bold">${pipelineValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search brands..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusConfig).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Affinity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Contact</TableHead>
              <TableHead className="hidden md:table-cell">Deal Value</TableHead>
              <TableHead className="hidden lg:table-cell">Next Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((brand) => (
              <TableRow key={brand.name} className="cursor-pointer" onClick={() => setSelectedBrand(brand)}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{brand.category}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${affinityColor(brand.affinity)}`}>{brand.affinity}%</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusConfig[brand.status].color}>
                    {statusConfig[brand.status].emoji} {brand.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{brand.lastContact}</TableCell>
                <TableCell className="hidden md:table-cell font-medium">{brand.dealValue}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{brand.nextAction}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No brands match your filters</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Slide-over Panel */}
      <Sheet open={!!selectedBrand} onOpenChange={(open) => !open && setSelectedBrand(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedBrand && (
            <div className="space-y-6">
              <SheetHeader>
                <SheetTitle className="text-xl">{selectedBrand.name}</SheetTitle>
                <SheetDescription>
                  {selectedBrand.domain} · {selectedBrand.category}
                </SheetDescription>
              </SheetHeader>

              {/* Affinity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Affinity Score</span>
                  <span className={`font-bold ${affinityColor(selectedBrand.affinity)}`}>{selectedBrand.affinity}%</span>
                </div>
                <Progress value={selectedBrand.affinity} className="h-2" />
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</h3>
                <Card>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{selectedBrand.contact.name}</span></div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{selectedBrand.contact.email}</span>
                        <CopyEmailButton email={selectedBrand.contact.email} />
                      </div>
                    </div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="font-medium">{selectedBrand.contact.title}</span></div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{selectedBrand.contact.confidence}% — Hunter</span>
                      </div>
                      <Progress value={selectedBrand.contact.confidence} className={`h-1.5 ${confidenceColor(selectedBrand.contact.confidence)}`} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Timeline</h3>
                <div className="relative space-y-4 pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {selectedBrand.timeline.map((entry, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-background ${timelineDotColor[entry.type]}`} />
                      <p className="text-xs font-medium text-muted-foreground">{entry.date}</p>
                      <p className="text-sm">{entry.event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notes</h3>
                <Textarea placeholder="Add a note..." className="min-h-[80px]" />
              </div>

              {/* Deal */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Deal</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Value</Label>
                    <Input placeholder="$0" defaultValue={selectedBrand.dealValue !== "—" ? selectedBrand.dealValue : ""} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Format</Label>
                    <Select defaultValue="integration">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="integration">Integration</SelectItem>
                        <SelectItem value="dedicated">Dedicated</SelectItem>
                        <SelectItem value="mention">Mention</SelectItem>
                        <SelectItem value="ugc">UGC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Stage</Label>
                    <Select defaultValue={selectedBrand.status}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prospecting">🔵 Prospecting</SelectItem>
                        <SelectItem value="Contacted">🟡 Contacted</SelectItem>
                        <SelectItem value="Replied">🟢 Replied</SelectItem>
                        <SelectItem value="In Negotiation">🟣 In Negotiation</SelectItem>
                        <SelectItem value="Closed">✅ Closed</SelectItem>
                        <SelectItem value="Bounced">🔴 Bounced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <Button className="w-full gap-2"><Mail className="h-4 w-4" /> Draft New Email</Button>
                <Button variant="ghost" className="w-full gap-2 text-red-500/70 hover:text-red-600"><SkipForward className="h-4 w-4" /> Skip Brand</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
