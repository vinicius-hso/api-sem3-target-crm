import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import Chart, { Props } from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDashboardPage } from '../../../../data/services/hooks/PageHooks/DashboardHook';

function StackedColumnChart() {

  const [ganhas, setGanhas] = useState([]);
  const [perdidas, setPerdidas] = useState([]);
  const [emAndamento, setEmAndamento] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const { dealsByCompany } = useDashboardPage();

  const series = [
    {
      name: "GANHAS",
      data: ganhas,
    },
    {
      name: "EM ANDAMENTO",
      data: emAndamento,
    },
    {
      name: "PERDIDAS",
      data: perdidas,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    title: {
      text: "Negociações por Empresa",
    },
    xaxis: {
      type: "category",
      categories: companies,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  const options2: Props = {
    type: "bar",
    series: series,
    height: 350,
    options: options,
  };

  function setData() {
    let g = []
    let p = []
    let inP = []
    let companies = []

    dealsByCompany.map((c) => {
      companies.push(c.name);
      g.push(c.won)
      p.push(c.lost)
      inP.push(c.inProgress)
    })

    setCompanies(companies);
    setGanhas(g);
    setPerdidas(p);
    setEmAndamento(inP);
  }

  useEffect(() => { 
      setData();
  }, [dealsByCompany]);

  return (
    <Container>
      <Chart options={options} series={series} type="bar" height={350} />
    </Container>
  );
}

export default StackedColumnChart;
