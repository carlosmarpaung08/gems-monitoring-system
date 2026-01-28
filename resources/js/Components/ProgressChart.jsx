import React from 'react';
import { motion } from 'framer-motion';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Cell 
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function ProgressChart({ projects, darkMode }) {
    // Prepare data for chart
    const chartData = projects.map(project => ({
        name: project.project_code,
        progress: parseFloat(project.overall_progress_pct.toFixed(2)),
        value: project.total_contract_value,
        fullName: project.project_name
    }));

    const formatValue = (value) => {
        if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}T`;
        if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
        return `${(value / 1_000).toFixed(1)}K`;
    };

    // Color gradient based on progress
    const getBarColor = (progress) => {
        if (progress >= 90) return '#10b981';
        if (progress >= 70) return '#3b82f6';
        if (progress >= 50) return '#f59e0b';
        return '#ef4444';
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl p-4 shadow-lg border ${
                        darkMode 
                            ? 'bg-gray-800/95 border-white/20' 
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <p className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {data.name}
                    </p>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {data.fullName}
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between space-x-4">
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                Progress:
                            </span>
                            <span className={`text-sm font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {data.progress}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                Value:
                            </span>
                            <span className={`text-sm font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                IDR {formatValue(data.value)}
                            </span>
                        </div>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-6"
        >
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Project Progress Overview
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            Visual comparison of all projects
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                        darkMode ? 'bg-white/10' : 'bg-green-100'
                    }`}
                >
                    <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-green-700'}`}>
                        {chartData.length} Projects
                    </span>
                </motion.div>
            </div>

            {/* Chart */}
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                        <defs>
                            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            tick={{ 
                                fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', 
                                fontSize: 12 
                            }}
                        />
                        <YAxis 
                            stroke={darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)'}
                            tick={{ 
                                fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', 
                                fontSize: 12 
                            }}
                            label={{ 
                                value: 'Progress (%)', 
                                angle: -90, 
                                position: 'insideLeft',
                                style: { 
                                    fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', 
                                    fontSize: 12 
                                }
                            }}
                        />
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ fill: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }} 
                        />
                        <Bar 
                            dataKey="progress" 
                            radius={[8, 8, 0, 0]}
                            animationBegin={0}
                            animationDuration={1000}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={getBarColor(entry.progress)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className={`mt-6 pt-6 ${darkMode ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded bg-green-500"></div>
                        <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            90-100%: Excellent
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded bg-blue-500"></div>
                        <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            70-89%: Good
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded bg-yellow-500"></div>
                        <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            50-69%: Fair
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded bg-red-500"></div>
                        <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            0-49%: At Risk
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}