import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { generateColours, formatValues } from '../utils/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({values}) => {
    const colours = generateColours(values.length);
    const data = {
        labels: values.map(a => a.label),
        datasets: [
        {
            backgroundColor: colours,
            label: 'Portfolio Allocation',
            data: values.map(a => a.value),
            borderWidth: 1
        }
        ]
    };

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
    <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart;