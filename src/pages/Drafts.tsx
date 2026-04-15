import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { label: "Total", value: "8" },
  { label: "Pending Review", value: "3" },
  { label: "Sent", value: "2" },
];

const drafts = [
  {
    brand: "Spotify", domain: "spotify.com",
    subject: "Hockey Creator + Spotify = Natural Fit",
    contact: "alessiae@spotify.com", status: "draft",
    body: `Hi Spotify Partnerships Team,

I noticed Spotify recently partnered with the Tkachuk brothers on Wingmen and SDPN — smart moves tapping into hockey's passionate fanbase.

I'm Wes Mukkati, a hockey content creator with 124K subscribers and 18K average views. My audience is 73% male aged 18–34 — exactly the demographic Spotify targets for podcast and playlist growth.

I'd love to explore a sponsored integration — either a dedicated segment or ongoing partnership. Happy to share full analytics.

Best,
Wes`,
    variants: [
      "Hockey fans + Spotify — let's talk",
      "Your next hockey creator partner",
      "124K hockey fans, 0 Spotify deals yet",
    ],
  },
  {
    brand: "NordVPN", domain: "nordvpn.com",
    subject: "Protecting hockey fans online — partnership idea",
    contact: "partnerships@nordvpn.com", status: "draft",
  },
  {
    brand: "AG1", domain: "ag1.com",
    subject: "Fuel your game — AG1 x Wes Mukkati",
    contact: "creators@ag1.com", status: "approved",
  },
  {
    brand: "DraftKings", domain: "draftkings.com",
    subject: "The hockey audience you're missing",
    contact: "sponsorships@draftkings.com", status: "sent",
  },
];

function statusBadgeClass(s: string) {
  if (s === "approved") return "bg-green-50 text-green-600 border-green-200";
  if (s === "sent") return "bg-blue-50 text-blue-600 border-blue-200";
  return "bg-amber-50 text-amber-600 border-amber-200";
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="h-3 w-3 text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}

export default function Drafts() {
  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-xl font-semibold text-foreground">Email Drafts</h1>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-semibold text-foreground tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="discarded">Discarded</TabsTrigger>
        </TabsList>
      </Tabs>

      <Accordion type="single" defaultValue="item-0" collapsible>
        {drafts.map((d, i) => (
          <AccordionItem key={d.brand} value={`item-${i}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 text-left flex-1 pr-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{d.brand}</span>
                    <span className="text-xs text-muted-foreground">/ {d.domain}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{d.subject}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {d.contact}
                  </div>
                </div>
                <Badge variant="outline" className={statusBadgeClass(d.status)}>{d.status}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {d.body ? (
                <div className="space-y-4 pl-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Subject</p>
                      <p className="text-sm font-medium text-foreground">{d.subject}</p>
                    </div>
                    <CopyButton text={d.subject} label="Copy Subject" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Body</p>
                      <CopyButton text={d.body} label="Copy Email" />
                    </div>
                    <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed bg-secondary rounded-md p-4 text-foreground">{d.body}</pre>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">Subject Variants</p>
                    <div className="flex flex-wrap gap-2">
                      {d.variants?.map((v) => (
                        <Badge key={v} variant="secondary" className="text-xs font-normal">{v}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                    <Button size="sm" variant="outline">Discard</Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 pl-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                  <Button size="sm" variant="outline">Discard</Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
