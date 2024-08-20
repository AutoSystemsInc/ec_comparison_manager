"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import React from "react";
import { Chart, AxisOptions } from "react-charts";

type DailyStars = {
  date: Date,
  stars: number,
};

type Series = {
  label: string,
  data: DailyStars[],
};

const data: Series[] = [
  {
    label: "First Dataset",
    data: [
      { date: new Date("2022-01-01"), stars: 12 },
      { date: new Date("2022-02-01"), stars: 19 },
      { date: new Date("2022-03-01"), stars: 3 },
      { date: new Date("2022-04-01"), stars: 5 },
      { date: new Date("2022-05-01"), stars: 2 },
    ],
  },
  {
    label: "Second Dataset",
    data: [
      { date: new Date("2022-01-01"), stars: 22 },
      { date: new Date("2022-02-01"), stars: 29 },
      { date: new Date("2022-03-01"), stars: 5 },
      { date: new Date("2022-04-01"), stars: 5 },
      { date: new Date("2022-05-01"), stars: 20 },
    ],
  },
];

export default function AnalyticsPage() {
  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum:any) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum:any) => datum.stars,
      },
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>View all analytics.</CardDescription>
      </CardHeader>
      <CardContent className='w-[600px] h-[300px]'>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </CardContent>
    </Card>
  );
}
