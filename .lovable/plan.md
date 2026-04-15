

# Dealflow AI — YouTube Creator Brand Deal Platform

## Overview
A fully static SaaS dashboard with 9 pages, persistent sidebar navigation, and hardcoded demo data. Clean Linear/Vercel-style design with Inter font, blue primary (#3b82f6), pastel card variants, and shadcn/ui components throughout.

## Layout
- Persistent left sidebar (240px) with collapsible mobile hamburger
- SidebarProvider wrapping all routes
- Inter font via Google Fonts

## Sidebar
- "Dealflow AI" branding with Zap icon
- Channel pill showing "Wes Mukkati"
- Nav sections: Overview, Intelligence, Outreach, Creator, Settings
- Active state: blue filled pill; Footer: version text

## Pages

### 1. Dashboard (/)
- Welcome header with "Run Scan" button
- 4 KPI stat cards (pastel backgrounds)
- Channel Health table + Top Sponsors list
- Recent Drafts + Audience Breakdown (country bars, device split)
- AI Insight banner with subtle blue gradient

### 2. Brand Radar (/brand-radar)
- Scan status card, progress bar (100%), search query chips
- Brands discovered table with affinity score color badges

### 3. Email Drafts (/drafts)
- Stats row, filter tabs
- Accordion-style draft cards with expandable email preview
- Subject variants, Approve/Discard actions

### 4. Pipeline (/pipeline)
- 4-column Kanban board: Prospecting → Contacted → In Negotiation → Closed
- Brand cards with status info

### 5. Sent (/sent)
- Outreach table with status badges and open counts

### 6. Media Kit (/media-kit)
- 8 stat cards, creator bio, audience geography, device breakdown
- Age & gender split bars, traffic sources, detected sponsors, partnership details

### 7. Audience (/audience)
- Expanded demographic visualizations
- Loyalty stats, growth metrics

### 8. Scan Debug (/scan-debug)
- DEV badge, test pipeline panel (orange dashed border)
- YouTube channels table, podcast chips, sponsors table, draft cards

### 9. Settings (/settings)
- Creator Preferences form (niche, deal min, format, blocked categories)
- Outreach Settings (affinity slider, email limit, auto-send toggle)
- Account card with connected status

## Technical
- All hardcoded data, no backend
- React Router for navigation
- shadcn/ui + lucide-react icons
- Fully responsive with mobile sidebar collapse
- Tailwind CSS with pastel color utilities

