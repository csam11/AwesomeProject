import * as React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts';

export default function LastSevenDaysChart({ lastSevenDays }) {
    // Transform lastSevenDays data into dataset format
    const data = lastSevenDays.map((day) => ({
        date: day.date,
        calories: day.calories,
    }));

    return (
        <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="calories" barSize={20} fill="#413ea0" />
        </BarChart>
    );
}