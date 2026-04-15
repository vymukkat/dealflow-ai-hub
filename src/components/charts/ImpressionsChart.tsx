import { Bar, Line, ComposedChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config: ChartConfig = {
  impressions: { label: "Impressions", color: "hsl(217, 91%, 60%)" },
  ctr: { label: "CTR %", color: "hsl(38, 92%, 50%)" },
};

interface Props {
  data: { date: string; impressions: number; ctr: number }[];
}

export function ImpressionsChart({ data }: Props) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} interval="preserveStartEnd" />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `${v}%`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="left" dataKey="impressions" fill="hsl(217, 91%, 60%)" radius={[2, 2, 0, 0]} opacity={0.6} />
        <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ChartContainer>
  );
}
