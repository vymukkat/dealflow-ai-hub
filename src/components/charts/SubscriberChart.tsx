import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, ComposedChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config: ChartConfig = {
  gained: { label: "Gained", color: "hsl(142, 71%, 45%)" },
  lost: { label: "Lost", color: "hsl(0, 84%, 60%)" },
  net: { label: "Net", color: "hsl(217, 91%, 60%)" },
};

interface Props {
  data: { date: string; gained: number; lost: number; net: number }[];
}

export function SubscriberChart({ data }: Props) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} interval="preserveStartEnd" />
        <YAxis tickLine={false} axisLine={false} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="gained" fill="hsl(142, 71%, 45%)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="lost" fill="hsl(0, 84%, 60%)" radius={[2, 2, 0, 0]} />
        <Line type="monotone" dataKey="net" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ChartContainer>
  );
}
