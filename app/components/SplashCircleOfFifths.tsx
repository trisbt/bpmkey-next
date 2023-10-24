'use client'
import React, { useState } from 'react';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { ChartEvent, ActiveElement, ChartTypeRegistry, Point, BubbleDataPoint } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';
import { grey } from '@mui/material/colors';
import GetRandom from '../server_components/GetRandom';
import { useRouter } from 'next/navigation';

Chart.register(ArcElement)
interface ExtendedArcElement extends ArcElement {
    datasetIndex: number;
    index: number;
}


const data = [
    { id: 1, value: 10, label: 'C' },
    { id: 2, value: 10, label: 'G' },
    { id: 3, value: 10, label: 'D' },
    { id: 4, value: 10, label: 'A' },
    { id: 5, value: 10, label: 'E' },
    { id: 6, value: 10, label: 'B' },
    { id: 7, value: 10, label: 'Gb' },
    { id: 8, value: 10, label: 'D♭' },
    { id: 9, value: 10, label: 'A♭' },
    { id: 10, value: 10, label: 'E♭' },
    { id: 11, value: 10, label: 'B♭' },
    { id: 12, value: 10, label: 'F' },
];
const minorKeys = [
    { id: 1, value: 10, label: 'Am' },
    { id: 2, value: 10, label: 'Em' },
    { id: 3, value: 10, label: 'Bm' },
    { id: 4, value: 10, label: 'F♯m' },
    { id: 5, value: 10, label: 'C♯m' },
    { id: 6, value: 10, label: 'G♯m' },
    { id: 7, value: 10, label: 'E♭m' },
    { id: 8, value: 10, label: 'B♭m' },
    { id: 9, value: 10, label: 'Fm' },
    { id: 10, value: 10, label: 'Cm' },
    { id: 11, value: 10, label: 'Gm' },
    { id: 12, value: 10, label: 'Dm' },
];

const defaultColors: string[] = Array(data.length).fill(grey[800]);
const hoverColors: string[] = ['#b71c1c', '#ff5722', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50', '#26a69a', '#00bcd4', '#03a9f4', '#3f51b5', '#673ab7', '#9c27b0'];


const SplashCircleOfFifths = () => {
    const [activeSlice, setActiveSlice] = useState<string | null>(null);
    const router = useRouter();
    
    const handleChartInteraction = async (
        event: ChartEvent,
        elements: ActiveElement[],
        chart: Chart<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint | null)[], unknown>
    ) => {
        if (elements && elements.length) {
            const clickedElement = elements[0];
            let label: string | undefined;
            if (clickedElement.datasetIndex === 0) {
                label = data[clickedElement.index].label;
            } else if (clickedElement.datasetIndex === 1) {
                label = minorKeys[clickedElement.index].label;
            }

            if (label) {
                setActiveSlice(prev => prev === label ? null : label);
                const res = await GetRandom(label);
                const url = `/${res.name}/${res.artist}/${res.id}`;
                router.push(url);
            }
        }
    };

    const chartData = {
        labels: [...data.map(d => d.label), ...minorKeys.map(d => d.label)],
        datasets: [
            {
                // label: "Major Keys",
                data: data.map(d => d.value),
                backgroundColor: data.map((_, index) => activeSlice === data[index].label ? hoverColors[index] : defaultColors[index]),
                hoverBackgroundColor: hoverColors,
                // to make it an inner circle:
                weight: 0.5
            },
            {
                // label: "Minor Keys",
                data: minorKeys.map(d => d.value),
                backgroundColor: minorKeys.map((_, index) => activeSlice === minorKeys[index].label ? hoverColors[index] : defaultColors[index]),
                hoverBackgroundColor: hoverColors
            }
        ]

    };

    const options = {
        cutout: '20%',
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            },
            datalabels: {
                display: true,
                color: '#fff',
                font: {
                    size: 12,
                    weight: 700,
                },
                anchor: 'center' as 'center',
                align: 'end' as const,
                offset: (context: Context) => {
                    if (context.datasetIndex === 0) {
                        return -12;  // offset for major labels
                    } else {
                        return -8;  // default offset for minor labels
                    }
                },

                formatter: (value: string, context: Context) => {
                    // Check if the current slice is from the first dataset (major keys)
                    if (context.datasetIndex === 0) {
                        return data[context.dataIndex].label;
                    }
                    // If it's from the second dataset (minor keys)
                    else if (context.datasetIndex === 1) {
                        return minorKeys[context.dataIndex].label;
                    }
                }

            }
        },
        animation: {
            duration: 0 // Set duration to 0 to disable animations
        },
        rotation: -15,
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='splash-pie-container'>

            <Grid container spacing={0} sx={{
                height: '300px',

            }}>
                <Grid item xs={12} sx={{
                    height: '270px',
                    '@media (max-width: 600px)': {
                        height: '200px'
                    },
                }}>
                    <Doughnut
                        data={chartData}
                        plugins={[ChartDataLabels as any]}
                        height={340}
                        width={340}
                        options={{
                            ...options,
                            onClick: handleChartInteraction,  // for desktop clicks
                        }}
                        onTouchEnd={handleChartInteraction as any}  // for mobile touches
                    />

                </Grid>
            </Grid>

        </div>
    );
}
export default SplashCircleOfFifths;