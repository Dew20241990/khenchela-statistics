import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  areas: {
    key: string;
    name: string;
    color: string;
    fillOpacity?: number;
  }[];
  title?: string;
  className?: string;
  height?: number;
}

export function AreaChartComponent({
  data,
  xKey,
  areas,
  title,
  className,
  height = 300,
}: AreaChartProps) {
  return (
    <div className={cn("gov-card", className)}>
      {title && (
        <div className="gov-card-header">
          <h3 className="gov-section-title">{title}</h3>
        </div>
      )}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {areas.map((area) => (
                <linearGradient
                  key={area.key}
                  id={`gradient-${area.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={area.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickFormatter={(value) => value.toLocaleString("ar-DZ")}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                direction: "rtl",
              }}
              formatter={(value: number) => [value.toLocaleString("ar-DZ"), ""]}
            />
            <Legend
              wrapperStyle={{ direction: "rtl" }}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
            {areas.map((area) => (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.name}
                stroke={area.color}
                fill={`url(#gradient-${area.key})`}
                fillOpacity={area.fillOpacity ?? 1}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
