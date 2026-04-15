// Centralized realistic dummy data for YouTube Analytics dashboard

// Generate last N days of date labels
function generateDates(days: number): string[] {
  const dates: string[] = [];
  const now = new Date(2026, 3, 12); // April 12, 2026
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  }
  return dates;
}

const dates28 = generateDates(28);
const dates90 = generateDates(90);
const dates7 = generateDates(7);

// Seed-based pseudo-random for consistency
function seededValues(base: number, variance: number, count: number, seed: number = 42): number[] {
  const values: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 16807 + 7) % 2147483647;
    const r = (s % 1000) / 1000;
    values.push(Math.round(base + (r - 0.5) * 2 * variance));
  }
  return values;
}

// ── Views & Watch Time (28 days) ──
const viewsRaw = seededValues(18400, 6000, 28, 101);
const watchTimeRaw = seededValues(48200, 15000, 28, 202);

export const viewsWatchTimeData = dates28.map((date, i) => ({
  date,
  views: viewsRaw[i],
  watchTime: Math.round(watchTimeRaw[i] / 60), // hours
}));

// ── Revenue (28 days) ──
const revenueRaw = seededValues(95, 40, 28, 303);
export const revenueData = dates28.map((date, i) => ({
  date,
  revenue: revenueRaw[i],
  premiumRevenue: Math.round(revenueRaw[i] * 0.12),
}));

// ── Revenue by month (6 months) ──
export const revenueMonthly = [
  { month: "Nov", revenue: 2120, premium: 254 },
  { month: "Dec", revenue: 2680, premium: 322 },
  { month: "Jan", revenue: 2340, premium: 281 },
  { month: "Feb", revenue: 2510, premium: 301 },
  { month: "Mar", revenue: 2780, premium: 334 },
  { month: "Apr", revenue: 2840, premium: 341 },
];

// ── Revenue by ad type ──
export const revenueByAdType = [
  { name: "Skippable", value: 1620, fill: "hsl(217, 91%, 60%)" },
  { name: "Display", value: 540, fill: "hsl(142, 71%, 45%)" },
  { name: "Bumper", value: 380, fill: "hsl(38, 92%, 50%)" },
  { name: "Non-skippable", value: 300, fill: "hsl(280, 67%, 55%)" },
];

// ── Revenue by country ──
export const revenueByCountry = [
  { country: "AU", revenue: 1732, pct: 61 },
  { country: "US", revenue: 625, pct: 22 },
  { country: "CA", revenue: 312, pct: 11 },
  { country: "GB", revenue: 171, pct: 6 },
];

// ── Subscriber Growth (28 days) ──
const subsGainedRaw = seededValues(180, 80, 28, 404);
const subsLostRaw = seededValues(35, 20, 28, 505);
export const subscriberGrowthData = dates28.map((date, i) => ({
  date,
  gained: subsGainedRaw[i],
  lost: -subsLostRaw[i],
  net: subsGainedRaw[i] - subsLostRaw[i],
}));

// ── Engagement (28 days) ──
const likesRaw = seededValues(820, 300, 28, 606);
const commentsRaw = seededValues(145, 60, 28, 707);
const sharesRaw = seededValues(68, 30, 28, 808);
export const engagementData = dates28.map((date, i) => ({
  date,
  likes: likesRaw[i],
  comments: commentsRaw[i],
  shares: sharesRaw[i],
}));

// ── Top Videos (last 10) ──
export const topVideos = [
  { title: "Why Hockey Sticks Cost $300 Now", views: 142000, watchTime: 8420, ctr: 8.2, avgDuration: "7:42", published: "Apr 8", thumbnail: "🏒" },
  { title: "NHL Draft 2026 — My Full Breakdown", views: 98400, watchTime: 6100, ctr: 6.9, avgDuration: "12:18", published: "Apr 3", thumbnail: "📋" },
  { title: "I Tried Pro Hockey Training for 30 Days", views: 87200, watchTime: 5800, ctr: 9.1, avgDuration: "10:05", published: "Mar 28", thumbnail: "💪" },
  { title: "Best Budget Hockey Gear 2026", views: 64800, watchTime: 4200, ctr: 7.4, avgDuration: "8:33", published: "Mar 22", thumbnail: "🎯" },
  { title: "Reacting to AHL Highlights", views: 52100, watchTime: 3100, ctr: 5.8, avgDuration: "6:15", published: "Mar 18", thumbnail: "📺" },
  { title: "Hockey Tape Tricks You Didn't Know", views: 48900, watchTime: 2900, ctr: 7.1, avgDuration: "5:48", published: "Mar 14", thumbnail: "🎬" },
  { title: "My Hockey Room Tour 2026", views: 41200, watchTime: 2400, ctr: 6.3, avgDuration: "9:22", published: "Mar 10", thumbnail: "🏠" },
  { title: "NHL Playoff Predictions", views: 38600, watchTime: 2200, ctr: 5.5, avgDuration: "11:04", published: "Mar 6", thumbnail: "🏆" },
  { title: "5 Skills Every Defenseman Needs", views: 34100, watchTime: 2000, ctr: 6.8, avgDuration: "7:56", published: "Mar 1", thumbnail: "⭐" },
  { title: "Hockey vs Lacrosse — Which Is Harder?", views: 28900, watchTime: 1700, ctr: 8.5, avgDuration: "8:12", published: "Feb 24", thumbnail: "🤔" },
];

// ── Traffic Sources (expanded) ──
export const trafficSourcesFull = [
  { source: "YouTube Search", pct: 44, views: 81000 },
  { source: "Browse / Home", pct: 28, views: 51500 },
  { source: "Suggested Videos", pct: 18, views: 33100 },
  { source: "External", pct: 4, views: 7360 },
  { source: "Notifications", pct: 2.5, views: 4600 },
  { source: "Playlists", pct: 1.5, views: 2760 },
  { source: "Channel Pages", pct: 1, views: 1840 },
  { source: "End Screens", pct: 0.6, views: 1100 },
  { source: "Shorts Feed", pct: 0.4, views: 740 },
];

// ── Top Search Terms ──
export const topSearchTerms = [
  { term: "hockey stick review", views: 12400, impressions: 98000, ctr: 12.7 },
  { term: "best hockey gear 2026", views: 8900, impressions: 72000, ctr: 12.4 },
  { term: "nhl draft picks", views: 7200, impressions: 84000, ctr: 8.6 },
  { term: "hockey training drills", views: 6100, impressions: 51000, ctr: 12.0 },
  { term: "wes mukkati", views: 5800, impressions: 6200, ctr: 93.5 },
  { term: "hockey tape tutorial", views: 4200, impressions: 38000, ctr: 11.1 },
  { term: "ahl highlights", views: 3600, impressions: 42000, ctr: 8.6 },
  { term: "hockey podcast", views: 2900, impressions: 31000, ctr: 9.4 },
  { term: "budget hockey equipment", views: 2400, impressions: 28000, ctr: 8.6 },
  { term: "hockey tips beginners", views: 1800, impressions: 22000, ctr: 8.2 },
];

// ── Subscriber Sources ──
export const subscriberSources = [
  { source: "YouTube Search", value: 38, fill: "hsl(217, 91%, 60%)" },
  { source: "Browse Features", value: 24, fill: "hsl(142, 71%, 45%)" },
  { source: "Suggested Videos", value: 18, fill: "hsl(38, 92%, 50%)" },
  { source: "External", value: 12, fill: "hsl(280, 67%, 55%)" },
  { source: "Channel Page", value: 8, fill: "hsl(348, 83%, 60%)" },
];

// ── New vs Returning ──
export const newVsReturning = [
  { name: "Returning", value: 68, fill: "hsl(217, 91%, 60%)" },
  { name: "New", value: 32, fill: "hsl(142, 71%, 45%)" },
];

// ── Countries (expanded) ──
export const countriesFull = [
  { code: "AU", country: "Australia", views: 112200, watchTime: 29800, pct: 61, revenue: 1732 },
  { code: "US", country: "United States", views: 40500, watchTime: 10700, pct: 22, revenue: 625 },
  { code: "CA", country: "Canada", views: 20200, watchTime: 5400, pct: 11, revenue: 312 },
  { code: "GB", country: "United Kingdom", views: 11000, watchTime: 2900, pct: 6, revenue: 171 },
  { code: "NZ", country: "New Zealand", views: 4800, watchTime: 1200, pct: 2.6, revenue: 48 },
  { code: "DE", country: "Germany", views: 3200, watchTime: 840, pct: 1.7, revenue: 32 },
  { code: "SE", country: "Sweden", views: 2800, watchTime: 720, pct: 1.5, revenue: 28 },
  { code: "FI", country: "Finland", views: 2100, watchTime: 540, pct: 1.1, revenue: 21 },
  { code: "CZ", country: "Czech Republic", views: 1600, watchTime: 400, pct: 0.9, revenue: 16 },
  { code: "IN", country: "India", views: 1200, watchTime: 300, pct: 0.7, revenue: 4 },
];

// ── Devices (expanded) ──
export const devicesFull = [
  { device: "Mobile", pct: 68, views: 125000, watchTime: 33200 },
  { device: "Desktop", pct: 24, views: 44100, watchTime: 11700 },
  { device: "TV", pct: 5, views: 9200, watchTime: 2440 },
  { device: "Tablet", pct: 2, views: 3680, watchTime: 976 },
  { device: "Game Console", pct: 1, views: 1840, watchTime: 488 },
];

// ── Operating Systems ──
export const osSplit = [
  { name: "Android", value: 42, fill: "hsl(142, 71%, 45%)" },
  { name: "iOS", value: 26, fill: "hsl(217, 91%, 60%)" },
  { name: "Windows", value: 18, fill: "hsl(38, 92%, 50%)" },
  { name: "macOS", value: 8, fill: "hsl(280, 67%, 55%)" },
  { name: "Linux", value: 3, fill: "hsl(348, 83%, 60%)" },
  { name: "ChromeOS", value: 2, fill: "hsl(200, 60%, 50%)" },
  { name: "Other", value: 1, fill: "hsl(0, 0%, 60%)" },
];

// ── Age & Gender (chart-ready) ──
export const ageGenderChart = [
  { age: "13–17", male: 3.2, female: 0.8 },
  { age: "18–24", male: 42.1, female: 8.3 },
  { age: "25–34", male: 31.2, female: 6.1 },
  { age: "35–44", male: 7.8, female: 2.4 },
  { age: "45–54", male: 1.9, female: 0.8 },
  { age: "55–64", male: 0.6, female: 0.3 },
  { age: "65+", male: 0.2, female: 0.1 },
];

// ── Sharing Services ──
export const sharingServices = [
  { service: "WhatsApp", shares: 1240 },
  { service: "Twitter/X", shares: 980 },
  { service: "Facebook", shares: 620 },
  { service: "Reddit", shares: 540 },
  { service: "Discord", shares: 480 },
  { service: "iMessage", shares: 320 },
  { service: "Telegram", shares: 180 },
];

// ── Shorts vs Long-form ──
export const contentSplit = [
  { type: "Long-form", videos: 42, views: 156000, avgDuration: "8:24" },
  { type: "Shorts", videos: 18, views: 28400, avgDuration: "0:42" },
];

// ── Card & End Screen Performance ──
export const cardEndScreen = {
  cardClicks: 3420,
  cardClickRate: 2.8,
  endScreenClicks: 5180,
  endScreenClickRate: 4.2,
  endScreenImpressions: 123300,
};

// ── Impressions & CTR (28 days) ──
const impressionsRaw = seededValues(240000, 80000, 28, 909);
const ctrRaw = seededValues(62, 15, 28, 1010); // ÷10 for %
export const impressionsCtrData = dates28.map((date, i) => ({
  date,
  impressions: impressionsRaw[i],
  ctr: ctrRaw[i] / 10,
}));

// ── External Referrers ──
export const externalReferrers = [
  { url: "reddit.com", views: 2840 },
  { url: "twitter.com", views: 1620 },
  { url: "facebook.com", views: 980 },
  { url: "google.com", views: 740 },
  { url: "discord.com", views: 520 },
  { url: "hfboards.com", views: 380 },
];

// ── 7-day and 90-day views ──
const views7Raw = seededValues(19200, 5000, 7, 1111);
export const views7dData = dates7.map((date, i) => ({
  date,
  views: views7Raw[i],
  watchTime: Math.round(views7Raw[i] * 2.6 / 60),
}));

const views90Raw = seededValues(17800, 7000, 90, 1212);
export const views90dData = dates90.map((date, i) => ({
  date,
  views: views90Raw[i],
  watchTime: Math.round(views90Raw[i] * 2.5 / 60),
}));

// ── KPI Summary Stats ──
export const kpiSummary = {
  subscribers: "124K",
  avgViews: "18.4K",
  estRevenue: "$2,840",
  rpm: "$8.20",
  cpm: "$14.20",
  watchTimeMinutes: "48.2K",
  engagementRate: "4.8%",
  uniqueViewers: "82.1K",
  impressions: "6.72M",
  ctr: "6.2%",
  avgViewDuration: "6m 42s",
  subscriberGrowth: "+4.2%",
  likesToViewsRatio: "4.5%",
  sharesPerVideo: "68",
  superChatRevenue: "$124",
  premiumRevenue: "$341",
};
