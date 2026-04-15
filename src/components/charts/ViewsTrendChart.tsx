import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config: ChartConfig = {
  views: { label: "Views", color: "hsl(217, 91%, 60%)" },
  watchTime: { label: "Watch Time (hrs)", color: "hsl(142, 71%, 45%)" },
};

interface Props {
  data: { date: string; views: number; watchTime: number }[];
}

export function ViewsTrendChart({ data }: Props) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="watchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} interval="preserveStartEnd" />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `${v}h`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area yAxisId="left" type="monotone" dataKey="views" stroke="hsl(217, 91%, 60%)" fill="url(#viewsGrad)" strokeWidth={2} />
        <Area yAxisId="right" type="monotone" dataKey="watchTime" stroke="hsl(142, 71%, 45%)" fill="url(#watchGrad)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}
