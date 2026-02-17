import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { generateColours, formatValues } from '../utils/utils';

type ChartItem = {
  label: string;
  value: number;
};

type DoughnutChartProps = {
  values?: ChartItem[];
};


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({values}: DoughnutChartProps) => {
     // Generate a colour for each segment of the chart
    const colours = generateColours(values?.length);
    const data = {
        labels: values?.map(a => a.label),
        datasets: [
        {
            backgroundColor: colours,
            label: 'Asset',
            data: values?.map(a => a.value),
            borderWidth: 1
        }
        ]
    };
    // Configure chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Portfolio Allocation',
            },
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    return `${label}: ${formatValues(value)}%`;
                }
            }
        }
    };  

  return (
    // Prevent chart from stretching too wide on large screens
    <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart;