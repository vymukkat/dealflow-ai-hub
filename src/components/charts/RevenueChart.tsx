import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config: ChartConfig = {
  revenue: { label: "Revenue", color: "hsl(142, 71%, 45%)" },
  premiumRevenue: { label: "Premium", color: "hsl(280, 67%, 55%)" },
};

interface Props {
  data: { date?: string; month?: string; revenue: number; premiumRevenue?: number; premium?: number }[];
  xKey?: string;
}

export function RevenueChart({ data, xKey = "date" }: Props) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={11} tickMargin={8} interval="preserveStartEnd" />
        <YAxis tickLine={false} axisLine={false} fontSize={11} tickFormatter={(v) => `$${v}`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="revenue" stroke="hsl(142, 71%, 45%)" fill="url(#revGrad)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}
