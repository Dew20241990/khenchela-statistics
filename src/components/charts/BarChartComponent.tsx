import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: {
    key: string;
    name: string;
    color: string;
  }[];
  title?: string;
  className?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  showLegend?: boolean;
  colorByIndex?: boolean;
  colors?: string[];
}

export function BarChartComponent({
  data,
  xKey,
  bars,
  title,
  className,
  height = 300,
  layout = "horizontal",
  showLegend = true,
  colorByIndex = false,
  colors = [
    "hsl(215, 65%, 25%)",
    "hsl(145, 45%, 30%)",
    "hsl(40, 75%, 50%)",
    "hsl(205, 85%, 55%)",
    "hsl(280, 50%, 45%)",
  ],
}: BarChartProps) {
  return (
    <div className={cn("gov-card", className)}>
      {title && (
        <div className="gov-card-header">
          <h3 className="gov-section-title">{title}</h3>
        </div>
      )}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout={layout}
            margin={{ top: 10, right: 30, left: layout === "vertical" ? 100 : 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            {layout === "horizontal" ? (
              <>
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
              </>
            ) : (
              <>
                <XAxis
                  type="number"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickFormatter={(value) => value.toLocaleString("ar-DZ")}
                />
                <YAxis
                  type="category"
                  dataKey={xKey}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  width={90}
                />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                direction: "rtl",
              }}
              formatter={(value: number) => [value.toLocaleString("ar-DZ"), ""]}
            />
            {showLegend && (
              <Legend
                wrapperStyle={{ direction: "rtl" }}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            )}
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.name}
                fill={bar.color}
                radius={[4, 4, 0, 0]}
              >
                {colorByIndex &&
                  data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
