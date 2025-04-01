'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { database, ref, onValue } from "@/lib/firebase";
import type { ApexOptions } from "apexcharts";

const getMoistureColor = (value: number): string => {
    if (value <= 30) return "#DC2626"; // Red
    if (value <= 60) return "#F97316"; // Orange
    return "#1E6E47"; // Green
};

const getHumidityColor = (value: number): string => {
  if (value <= 30) return "#DC2626"; // Red
  if (value <= 60) return "#F97316"; // Orange
  return "#1E6E47"; // Green
};

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false }) as unknown as React.FC<{
    type: string;
    options: ApexOptions;
    series: any; // Allow both number[] and ApexAxisChartSeries
    height?: number;
  }>;
  interface SensorChartProps {
    metric: "dhtTemp" | "lm35Temp" | "humidity" | "moisture";
    label: string;
  }

export default function SensorChart({ metric, label }: SensorChartProps) {
  const [data, setData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  useEffect(() => {
    const sensorRef = ref(database, "sensorData");

    onValue(sensorRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) return;

      const entries = Object.entries(val) as [string, any][];
      const sorted = entries.sort(([a], [b]) => (a > b ? 1 : -1)); // sort by timestamp keys

      const chartData: number[] = [];
      const chartLabels: string[] = [];

      sorted.forEach(([key, entry]) => {
        if (entry[metric] !== undefined) {
          chartData.push(parseFloat(entry[metric]));
          const ts = entry.timestamp;
          if (ts && !isNaN(ts)) {
            chartLabels.push(
                new Date(ts).toLocaleString("en-US", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "America/Chihuahua",
                })
              );
          } else {
            chartLabels.push("Unknown");
          }        }
      });

      setData(chartData);
      setTimestamps(chartLabels);
    });
  }, [metric]);

  const chartOptions: ApexOptions = {
    chart: {
      id: `${metric}-chart`,
      animations: {
        enabled: true,
        speed: 500,
      },
    },
    colors: ["#1E6E47"], 
    xaxis: {
      categories: timestamps,
      title: { text: "Time" },
    },
    yaxis: {
      title: { text: label },
    },
    stroke: {
      curve: "smooth",
      width: 2,  
    },
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <Chart
        type="line"
        options={chartOptions}
        series={[{ name: label, data }]}
        height={300}
      />
    </div>
  );
}

export function DhtHumidityGauge() {
  const [humidity, setHumidity] = useState<number>(0);

  useEffect(() => {
    const sensorRef = ref(database, "sensorData");

    onValue(sensorRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) return;

      const entries = Object.entries(val) as [string, any][];
      const sorted = entries.sort(([a], [b]) => parseInt(a) - parseInt(b));
      const latest = sorted[sorted.length - 1][1];

      if (latest?.humidity !== undefined) {
        setHumidity(parseFloat(latest.humidity));
      }
    });
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
          },
          value: {
            fontSize: "22px",
            show: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
          }
        },
      },
    },
    labels: ["Humidity"],
    colors: [getHumidityColor(humidity)],
  };

  return (
    <div className="bg-white rounded shadow p-6">
<Chart
  type="radialBar"
  options={options}
  series={[humidity]} // ✅ instead of [{ name: "Humidity", data: [humidity] }]
  height={300}
/>
    </div>
  );
}

export function MoistureGauge() {
  const [moisture, setMoisture] = useState<number>(0);

  useEffect(() => {
    const sensorRef = ref(database, "sensorData");

    onValue(sensorRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) return;

      const entries = Object.entries(val) as [string, any][];
      const sorted = entries.sort(([a], [b]) => parseInt(a) - parseInt(b));
      const latest = sorted[sorted.length - 1][1];

      if (latest?.moisture !== undefined) {
        setMoisture(parseFloat(latest.moisture));
      }
    });
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
          },
          value: {
            fontSize: "22px",
            show: true,
            formatter: (val: number) => `${val.toFixed(1)}%`,
          }
        },
      },
    },
    labels: ["Moisture"],
    colors: [getMoistureColor(moisture)],
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <Chart type="radialBar" options={options} series={[moisture]} height={300} />
    </div>
  );
}