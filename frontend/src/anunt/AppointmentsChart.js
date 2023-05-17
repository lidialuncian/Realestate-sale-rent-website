import './AppointmentsChart.css'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables} from "chart.js";
Chart.register(...registerables);

const AppointmentsChart = ({ appointmentsData }) => {

    const appointmentsByDay = appointmentsData.reduce((acc, cur) => {
        const date = new Date(cur.date);
        const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        if (!acc[day]) {
            acc[day] = 1;
        } else {
            acc[day]++;
        }
        return acc;
    }, {});

    // Create an array with the labels for each day in the last month
    const labels = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        labels.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    }

    // Create an array with the number of appointments for each day in the last month
    const data = [];
    labels.forEach((label) => {
        if (appointmentsByDay[label]) {
            data.push(appointmentsByDay[label]);
        } else {
            data.push(0);
        }
    });

    // Convert the data to the format expected by Chart.js
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Appointments',
                data: data,
                backgroundColor: '#1976d2',
                borderColor: '#1976d2',
                borderWidth: 2,
            },
        ],
    };

    // Configure the chart options
    const chartOptions = {
        // responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Appointments by Day in Last Month',
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    color: '#111111'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Appointments',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    color: '#111111',
                    beginAtZero: true,
                    precision: 0,
                    stepSize: 1, // set step size to 1
                },
            },
        },
    };

    // Set the style for the container element to make it larger
    const containerStyle = {
        width: '800px',
        height: '400px',
    };

    return (
        <div style={containerStyle}>
            <Bar data={chartData} options={chartOptions} />;
        </div>
        )

};
export default AppointmentsChart;