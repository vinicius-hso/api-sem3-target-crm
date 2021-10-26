import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDealPage } from 'data/services/hooks/PageHooks/DealHook';
import { useCompanyPage } from 'data/services/hooks/PageHooks/CompanyHook';


// tipo auxiliar
// type SeriesData = {
//     name: string;
//     data: number[];
// }

// type ChartData = {
//     labels: {
//         companies: string[],
//     };
//     series: SeriesData[];
// }

function StackedColumnChart() {
    
    const companies = ['Geniv', 'Mochip', 'Sshare', 'Astack', 'Dronix'];
    
        const series = [{
            name: 'GANHAS',
            data: [44, 55, 41, 67, 22]
        }, {
            name: 'EM ANDAMENTO',
            data: [13, 23, 20, 8, 13]
        }, {
            name: 'PERDIDAS',
            data: [11, 17, 15, 15, 21]
        }]

        const options = {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                  enabled: true
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                  }
                }
              }],
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10
                },
              },
              title: {
                text: 'Negociações por Empresa'
              },
              xaxis: {
                type: 'category',
                categories: companies,
              },
              legend: {
                position: 'right',
                offsetY: 40
              },
              fill: {
                opacity: 1
              }
        };
    
    
    // const mockData = {
    //     labels: {
    //         categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //     },
    //     series: [
    //         {
    //             name: "% Sucesso",
    //             data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
    //         }
    //     ]
    // };

    useEffect(() => {
        // axios.get(`${BASE_URL}/sales/success-by-seller`)
        //     .then((response) => {
        //         const data = response.data as SaleSuccess[]
        //         const myLabels = data.map(x => x.sellerName)
        //         const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1))

        //         setChartData({
        //             labels: {
        //                 categories: myLabels
        //             },
        //             series: [
        //                 {
        //                     name: "% Sucesso",
        //                     data: mySeries
        //                 }
        //             ]
        //         })
        //     })
    }, [])

    return (
        <Container>
            <Chart 
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </Container>
    )
}

export default StackedColumnChart;