

// File: @/components/ui/chart.tsx
"use client"

import {
    Bar,
    BarChart as RechartsBarChart,
    Line,
    LineChart as RechartsLineChart,
    Pie,
    PieChart as RechartsPieChart,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle,
    Sector,
    ComposedChart as RechartsComposedChart,
    Area,
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Scatter,
    ScatterChart as RechartsScatterChart,
    ZAxis,
    ReferenceLine,
    Brush,
    LabelList,
} from 'recharts';

export {
    BarChart,
    LineChart,
    PieChart,
    ComposedChart,
    RadarChart,
    ScatterChart,
    Bar,
    Line,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle,
    Sector,
    Area,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Scatter,
    ZAxis,
    ReferenceLine,
    Brush,
    LabelList,
};

// BarChart Component
function BarChart(props: React.ComponentProps<typeof RechartsBarChart>) {
    return <RechartsBarChart {...props} />;
}

// LineChart Component
function LineChart(props: React.ComponentProps<typeof RechartsLineChart>) {
    return <RechartsLineChart {...props} />;
}

// PieChart Component
function PieChart(props: React.ComponentProps<typeof RechartsPieChart>) {
    return <RechartsPieChart {...props} />;
}

// ComposedChart Component
function ComposedChart(props: React.ComponentProps<typeof RechartsComposedChart>) {
    return <RechartsComposedChart {...props} />;
}

// RadarChart Component
function RadarChart(props: React.ComponentProps<typeof RechartsRadarChart>) {
    return <RechartsRadarChart {...props} />;
}

// ScatterChart Component
function ScatterChart(props: React.ComponentProps<typeof RechartsScatterChart>) {
    return <RechartsScatterChart {...props} />;
}