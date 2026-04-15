import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, ArrowUp, Zap, Mail, User, TrendingUp, Target, Users, DollarSign, Search, MailOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface StatCallout {
  label: string;
  value: string;
  color: "green" | "blue" | "amber" | "gray" | "purple";
  sub: string;
  arrow?: "up" | "down";
}

interface ActionChip {
  label: string;
  variant: "default" | "outline" | "ghost";
  to?: string;
}

interface PriorityRow {
  rank: string;
  brand: string;
  why: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  stats?: StatCallout[];
  bullets?: string[];
  actions?: ActionChip[];
  table?: PriorityRow[];
  rateCards?: StatCallout[];
  timestamp: string;
  typing?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Suggested questions                                                */
/* ------------------------------------------------------------------ */
const suggestedQuestions = [
  { icon: TrendingUp, label: "How is my channel trending this month?" },
  { icon: Target, label: "Which brands should I prioritise pitching?" },
  { icon: Users, label: "What does my audience demographic mean for deals?" },
  { icon: DollarSign, label: "What's a fair rate for a 30-second integration?" },
  { icon: Search, label: "Why might my engagement rate be dropping?" },
  { icon: MailOpen, label: "Which of my drafted emails is most likely to convert?" },
];

/* ------------------------------------------------------------------ */
/*  Pre-populated conversation                                         */
/* ------------------------------------------------------------------ */
const seedMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    text: "How is my channel trending this month?",
    timestamp: "Today, 9:41 AM",
  },
  {
    id: "2",
    role: "assistant",
    text: "Your channel is in solid growth territory this month. Here's the breakdown:",
    stats: [
      { label: "Subscribers", value: "+4.2%", color: "green", sub: "vs last month", arrow: "up" },
      { label: "Avg Views", value: "18.4K", color: "blue", sub: "stable, ±2% variance" },
      { label: "Engagement", value: "4.8%", color: "amber", sub: "slightly below your 5.1% avg" },
    ],
    bullets: [
      "Your last 3 videos averaged 22K views — above your 90-day average",
      "Subscriber growth is accelerating — best month in Q1",
      "Engagement dipped slightly — likely due to the longer-form video on 8 Apr which historically gets lower engagement for your audience",
      "Recommendation: your 8–12 min highlight videos outperform long-form by 34% in engagement rate",
    ],
    actions: [{ label: "View full analytics →", variant: "outline", to: "/analytics" }],
    timestamp: "Today, 9:41 AM",
  },
  {
    id: "3",
    role: "user",
    text: "Which brands should I prioritise pitching?",
    timestamp: "Today, 9:43 AM",
  },
  {
    id: "4",
    role: "assistant",
    text: "Based on your audience profile and current scan data, here's your priority order:",
    table: [
      { rank: "🥇 1", brand: "Spotify", why: "Active hockey partnerships, your demo matches exactly" },
      { rank: "🥈 2", brand: "AG1", why: "18-34 male skew — highest converting demo for supplements" },
      { rank: "🥉 3", brand: "NordVPN", why: "Currently in active buying cycle — 6 channels this month" },
      { rank: "4", brand: "DraftKings", why: "Strong fit but high competition — differentiate pitch" },
      { rank: "5", brand: "Manscaped", why: "Lower affinity but easy yes — good for pipeline volume" },
    ],
    bullets: [
      "I'd recommend leading with Spotify this week — they partnered with SDPN last month which means their hockey budget is active right now. Strike while it's warm.",
    ],
    actions: [
      { label: "Draft Spotify email →", variant: "default" },
      { label: "Run new scan →", variant: "ghost" },
    ],
    timestamp: "Today, 9:44 AM",
  },
  {
    id: "5",
    role: "user",
    text: "What's a fair rate for a 30-second integration?",
    timestamp: "Today, 9:46 AM",
  },
  {
    id: "6",
    role: "assistant",
    text: "Based on your channel metrics, here's where you sit in the market:",
    rateCards: [
      { label: "Floor Rate", value: "$800", color: "gray", sub: "minimum for your size" },
      { label: "Market Rate", value: "$1,400–$2,000", color: "blue", sub: "recommended range" },
      { label: "Premium Rate", value: "$2,500+", color: "green", sub: "for high-fit brands" },
    ],
    bullets: [
      "Your 124K subscribers with 4.8% engagement actually commands a premium over channels with higher subscriber counts but lower engagement. Engagement rate is what brands actually care about for conversion.",
      "For Spotify specifically I'd open at $2,200 — they're a premium brand with large creator budgets and your hockey audience is a direct demographic match.",
    ],
    timestamp: "Today, 9:47 AM",
  },
];

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */
const statBg: Record<string, string> = {
  green: "bg-green-50 border-green-200",
  blue: "bg-blue-50 border-blue-200",
  amber: "bg-amber-50 border-amber-200",
  gray: "bg-muted border-border",
  purple: "bg-purple-50 border-purple-200",
};
const statText: Record<string, string> = {
  green: "text-green-700",
  blue: "text-blue-700",
  amber: "text-amber-700",
  gray: "text-muted-foreground",
  purple: "text-purple-700",
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */
function StatCards({ cards }: { cards: StatCallout[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
      {cards.map((s) => (
        <div key={s.label} className={`rounded-lg border p-3 ${statBg[s.color]}`}>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{s.label}</p>
          <p className={`text-lg font-bold ${statText[s.color]}`}>
            {s.arrow === "up" && <ArrowUp className="inline h-4 w-4 mr-0.5 -mt-0.5" />}
            {s.value}
          </p>
          <p className="text-[11px] text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

function PriorityTable({ rows }: { rows: PriorityRow[] }) {
  return (
    <div className="my-3 rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-left text-xs text-muted-foreground">
            <th className="px-3 py-2 font-medium">Priority</th>
            <th className="px-3 py-2 font-medium">Brand</th>
            <th className="px-3 py-2 font-medium">Why</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.brand} className="border-t">
              <td className="px-3 py-2 font-medium">{r.rank}</td>
              <td className="px-3 py-2 font-semibold">{r.brand}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.typing) {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 mt-1">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          </div>
          <Card className="border shadow-sm">
            <CardContent className="p-2">
              <TypingIndicator />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (msg.role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%]">
          <div className="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground text-sm">
            {msg.text}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">{msg.timestamp}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2 max-w-[85%]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 mt-1">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
        </div>
        <div>
          <Card className="border shadow-sm">
            <CardContent className="p-4 text-sm leading-relaxed">
              {msg.text && <p>{msg.text}</p>}
              {msg.stats && <StatCards cards={msg.stats} />}
              {msg.rateCards && <StatCards cards={msg.rateCards} />}
              {msg.table && <PriorityTable rows={msg.table} />}
              {msg.bullets && (
                <ul className="mt-2 space-y-1.5 text-muted-foreground">
                  {msg.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {msg.actions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.actions.map((a) =>
                    a.to ? (
                      <Button key={a.label} variant={a.variant as any} size="sm" asChild>
                        <Link to={a.to}>{a.label}</Link>
                      </Button>
                    ) : (
                      <Button key={a.label} variant={a.variant as any} size="sm">
                        {a.label}
                      </Button>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          <p className="text-[10px] text-muted-foreground mt-1">{msg.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Context Panel                                                      */
/* ------------------------------------------------------------------ */
function ContextPanel() {
  const stats = [
    { label: "Channel", value: "Wes Mukkati" },
    { label: "Subscribers", value: "124K" },
    { label: "Avg Views", value: "18.4K" },
    { label: "Engagement", value: "4.8%" },
    { label: "Top Demo", value: "Male 18–34" },
    { label: "Top Country", value: "Australia" },
    { label: "Est. CPM", value: "$14.20" },
    { label: "Last Scan", value: "2 days ago" },
    { label: "Brands Found", value: "16" },
    { label: "Drafts Ready", value: "3" },
  ];

  const topBrands = [
    { name: "Spotify", affinity: "94%" },
    { name: "NordVPN", affinity: "88%" },
    { name: "AG1", affinity: "82%" },
  ];

  return (
    <div className="sticky top-6 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Your Channel Snapshot</p>
          {stats.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
              {i < stats.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Scan Highlights</p>
          <div className="space-y-2">
            {topBrands.map((b) => (
              <div key={b.name} className="flex justify-between text-sm">
                <span className="font-medium">{b.name}</span>
                <Badge variant="secondary" className="text-xs">{b.affinity} affinity</Badge>
              </div>
            ))}
          </div>
          <Link to="/brand-radar" className="text-xs text-primary hover:underline mt-3 block">
            View all 16 →
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Quick Actions</p>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
            <Zap className="h-4 w-4" /> Run New Scan
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" asChild>
            <Link to="/drafts"><Mail className="h-4 w-4" /> View Drafts</Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" asChild>
            <Link to="/media-kit"><User className="h-4 w-4" /> Open Media Kit</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function AIAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const value = text ?? input.trim();
    if (!value) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: value,
      timestamp: "Just now",
    };

    const typingMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      typing: true,
      timestamp: "",
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInput("");
    setShowSuggestions(false);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        text: "That's a great question! Based on your current analytics data, I can see several interesting patterns. Let me pull together a detailed analysis for you — in the full version this would draw from your live YouTube Analytics API data and brand scan results to give you real-time, actionable insights.",
        timestamp: "Just now",
      };
      setMessages((prev) => prev.filter((m) => !m.typing).concat(aiMsg));
    }, 1500);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      {/* LEFT — Chat */}
      <div className="flex-1 lg:w-[65%] flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h1 className="text-2xl font-bold tracking-tight">AI Advisor</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ask anything about your channel, audience, or brand strategy
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="pr-4">
            {isEmpty || showSuggestions ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="h-12 w-12 text-purple-300 mb-4" />
                <h2 className="text-lg font-semibold">What would you like to know?</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Ask about your analytics, audience, or brand strategy
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleSend(q.label)}
                      className="flex items-center gap-2 rounded-lg border bg-card p-3 text-left text-sm hover:bg-accent transition-colors"
                    >
                      <q.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 pt-3 border-t mt-2">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your channel, audience, or brand strategy..."
              className="flex-1"
            />
            <Button onClick={() => handleSend()} className="bg-purple-600 hover:bg-purple-700 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            AI Advisor uses your YouTube Analytics and scan data to answer questions
          </p>
        </div>
      </div>

      {/* RIGHT — Context Panel (hidden on mobile, shown on lg+) */}
      <aside className="hidden lg:block lg:w-[35%] overflow-auto">
        <ContextPanel />
      </aside>
    </div>
  );
}
