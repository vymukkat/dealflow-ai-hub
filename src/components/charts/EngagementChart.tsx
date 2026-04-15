import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const config: ChartConfig = {
  likes: { label: "Likes", color: "hsl(217, 91%, 60%)" },
  comments: { label: "Comments", color: "hsl(142, 71%, 45%)" },
  shares: { label: "Shares", color: "hsl(38, 92%, 50%)" },
};

interface Props {
  data: { date: string; likes: number; comments: number; shares: number }[];
}

export function EngagementChart({ data }: Props) {
  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} tickMargin={8} interval="preserveStartEnd" />
        <YAxis tickLine={false} axisLine={false} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="likes" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="comments" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="shares" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
