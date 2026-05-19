interface ChartData {
  week: string;
  products: number;
}

export default function ProductsChart({ data }: { data: ChartData }) {
  console.log(data);
  return <div className="h-48 w-full"></div>;
}
