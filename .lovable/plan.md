

# Dashboard Expansion — Full YouTube Analytics Terminal

## What the YouTube APIs Give Us

Based on the YouTube Analytics API and YouTube Data API v3, here's every data point available that we're NOT currently showing:

### Revenue & Monetization (Analytics API — monetary scope)
- **Estimated Revenue** (daily/monthly), **RPM**, **CPM**, **Ad Revenue by Type** (skippable, display, bumper)
- **YouTube Premium Revenue**, **Super Chat / Super Sticker revenue**
- **Playback-based CPM**, **Ad impressions**, **Monetized playbacks**

### Video Performance (Analytics API)
- **Views over time** (daily/weekly/monthly line chart)
- **Watch time** (estimatedMinutesWatched) over time
- **Average view duration** per video + channel-wide trend
- **Average percentage viewed** (retention metric)
- **Likes, dislikes, comments, shares** over time
- **Card clicks & card click rate**, **End screen clicks & rate**
- **Annotation click-through rate** (legacy)

### Audience (Analytics API)
- **Unique viewers** (distinct viewers per period)
- **Subscribers gained vs lost** (daily net subscriber chart)
- **Subscriber source breakdown** (where new subs come from)
- **Views from subscribers vs non-subscribers**
- **Returning vs new viewers** ratio
- **Viewer age group + gender** (already shown, but can chart it)

### Traffic Sources (Analytics API)
- **Full traffic source breakdown**: YouTube Search, Browse, Suggested, External, Notifications, Playlists, Channel Pages, End Screens, Cards, Shorts feed, Direct/Unknown
- **Search terms** that drove views (top keywords)
- **External URLs** referring traffic

### Geography (Analytics API)
- **Views by country** (full list, not just top 4)
- **Watch time by country**
- **Revenue by country**

### Devices & OS (Analytics API)
- **Operating system breakdown** (Android, iOS, Windows, Mac, Linux, ChromeOS)
- **Device type** (mobile, desktop, TV, tablet, game console)
- **Views + watch time by device**

### Content (Data API v3)
- **Recent uploads** with thumbnails, view counts, publish dates
- **Top performing videos** (last 28 days / 90 days)
- **Playlist performance**
- **Live stream concurrent viewers** (averageConcurrentViewers)
- **Shorts vs long-form** performance split

### Engagement (Analytics API)
- **Sharing service breakdown** (WhatsApp, Twitter, Facebook, Reddit, etc.)
- **Likes-to-views ratio** trend
- **Comment sentiment** (not from API, but derivable)

---

## Implementation Plan

### 1. Expand Dashboard (Index.tsx) with Charts

Add these new sections using Recharts (already available via chart.tsx):

- **Views & Watch Time Trend** — Area chart, last 28 days, dual Y-axis (views + minutes watched)
- **Revenue Overview** — Line chart showing daily estimated revenue, with KPI cards for total revenue, RPM, CPM
- **Subscriber Growth** — Bar chart showing gained vs lost subscribers daily, with net growth line overlay
- **Top Videos** — Table showing last 10 videos with thumbnail, title, views, watch time, CTR, avg view duration
- **Engagement Trend** — Line chart for likes, comments, shares over 28 days

Update KPI row to 6 cards:
- Subscribers (124K), Avg Views (18.4K), Est. Revenue ($2,840), RPM ($8.20), Watch Time (48.2K min), Engagement Rate (4.8%)

### 2. Expand Audience Page

Add Recharts visualizations:
- **Age/Gender Bar Chart** — Grouped horizontal bar chart (male blue, female pink)
- **Subscriber Source Pie Chart** — Where new subscribers come from (search, browse, suggested, external)
- **New vs Returning Viewers** — Donut chart
- **Top Search Terms** — Table of keywords driving views
- **Views by Country** — Full country table (10+ countries) with sparklines
- **OS Breakdown** — Pie chart (Android, iOS, Windows, etc.)

### 3. New "Revenue" Section on Dashboard

- Monthly revenue trend area chart (last 6 months)
- Revenue by ad type breakdown (pie/donut chart)
- Revenue by country (top 5 with bars)
- YouTube Premium revenue card

### 4. New "Content Performance" Card on Dashboard

- Recent uploads mini-table (thumbnail + title + views + published date)
- Top 5 videos by views (last 28 days) with progress bars
- Shorts vs Long-form split card

### 5. Enhance Media Kit Page

- Add revenue-related stats (RPM, monthly revenue range)
- Add unique viewers KPI
- Add top search terms card
- Add engagement trend mini-chart

### 6. New "Analytics" Page (optional, or expand Dashboard)

If you want a dedicated deep-dive page:
- Full date-range selector (7d / 28d / 90d / 365d / custom)
- All charts with interactive tooltips
- Video-level drill-down table
- Export to CSV button

---

## Technical Details

- **Recharts** via the existing `chart.tsx` wrapper (ChartContainer, ChartTooltip, etc.)
- All data remains **hardcoded dummy data** for now (realistic 28-day time series)
- New components: `RevenueChart`, `SubscriberChart`, `ViewsTrendChart`, `TopVideosTable`, `TrafficSourcesPie`, `EngagementChart`
- Date range filter component (Tabs: 7d / 28d / 90d) on dashboard
- Responsive: charts stack vertically on mobile

## Files to Create/Edit

- `src/pages/Index.tsx` — Major expansion with charts and new sections
- `src/pages/Audience.tsx` — Add Recharts visualizations
- `src/pages/MediaKit.tsx` — Add new stat cards and mini-charts
- `src/components/charts/ViewsTrendChart.tsx` — Area chart component
- `src/components/charts/RevenueChart.tsx` — Revenue line/area chart
- `src/components/charts/SubscriberChart.tsx` — Gained/lost bar chart
- `src/components/charts/TrafficSourcesPie.tsx` — Pie/donut chart
- `src/components/charts/EngagementChart.tsx` — Multi-line chart
- `src/components/charts/TopVideosTable.tsx` — Video performance table
- `src/lib/dummyData.ts` — Centralized realistic time-series dummy data

