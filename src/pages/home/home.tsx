import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Certifique-se de que está usando react-router-dom
import Layout from "@/components/layout/layout";
import { ColumnChart } from "@/components/dash-charts/column-chart/column-chart";
import { InterativeDash } from "@/components/dash-charts/interative-dash-chart/interative-dash-chart";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login"); // Redireciona para a página de login
      }
    };

    checkAuthentication();
  }, [navigate]);

  const mostDownloadedData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const leastDownloadedData = [
    { month: "January", desktop: 50, mobile: 20 },
    { month: "February", desktop: 40, mobile: 15 },
    { month: "March", desktop: 30, mobile: 10 },
    { month: "April", desktop: 25, mobile: 8 },
    { month: "May", desktop: 20, mobile: 5 },
    { month: "June", desktop: 15, mobile: 3 },
  ];

  return (
    <Layout>
      <div className="flex flex-col mt-0 h-auto">
        {/* Gráficos superiores */}
        <div className="grid grid-cols-2 gap-4 flex-1 p-4">
          <ColumnChart title="Treinamentos mais baixados" data={mostDownloadedData} />
          <ColumnChart title="Treinamentos menos baixados" data={leastDownloadedData} />
        </div>
        {/* Gráfico interativo ocupando o restante da tela */}
        <div className="flex-1 p-4">
          <InterativeDash />
        </div>
      </div>
    </Layout>
  );
}