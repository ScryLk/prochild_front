import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface BarChartComponentProps {
  title: string;
  data: { name: string; value: number }[];
  barColor?: string; // Cor opcional para personalizar o gráfico
}

export default function BarChartComponent({
  title,
  data,
  barColor = "#8884d8",
}: BarChartComponentProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-3/5 h-56">
      <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="value" fill={barColor} name="Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}