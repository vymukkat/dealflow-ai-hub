import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const COLORS = [
  "hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)",
  "hsl(280, 67%, 55%)", "hsl(348, 83%, 60%)", "hsl(200, 60%, 50%)",
  "hsl(0, 0%, 60%)",
];

interface PieData {
  name?: string;
  source?: string;
  value: number;
  fill?: string;
}

interface Props {
  data: PieData[];
  nameKey?: string;
  dataKey?: string;
  innerRadius?: number;
  label?: boolean;
}

export function TrafficSourcesPie({ data, nameKey = "name", dataKey = "value", innerRadius = 0, label = true }: Props) {
  const config: ChartConfig = {};
  data.forEach((d, i) => {
    const key = (d as any)[nameKey] || d.name;
    config[key] = { label: key, color: d.fill || COLORS[i % COLORS.length] };
  });

  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={100}
          label={label ? ({ name, value }: any) => `${name} ${value}%` : false}
          labelLine={label}
          fontSize={11}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill || COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
