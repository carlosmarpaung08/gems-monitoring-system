import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    TrendingUp,
    Package,
    Hash,
    DollarSign,
    Clock,
    CheckCircle2,
    Moon,
    Sun
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Head } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function ProgressHistory({ boq, entries }) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Prepare chart data
    const chartData = entries.map(entry => ({
        date: formatDate(entry.progress_date),
        progress: parseFloat(entry.progress_pct.toFixed(2)),
        cumulative: parseFloat(entry.cumulative_qty.toFixed(2))
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl p-4 border shadow-glow ${
                        darkMode 
                            ? 'glass-effect border-white/20' 
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <p className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{payload[0].payload.date}</p>
                    <div className="space-y-1">
                        <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            Progress: <span className="font-bold">{payload[0].value}%</span>
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Cumulative: <span className="font-bold">{payload[1]?.value} {boq.uom}</span>
                        </p>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    const latestEntry = entries.length > 0 ? entries[0] : null;
    const totalAmount = boq.budget_qty * boq.unit_rate;
    const completedAmount = latestEntry ? (latestEntry.cumulative_qty * boq.unit_rate) : 0;

    return (
        <>
            <Head title="Progress History" />
            <Layout darkMode={darkMode}>
                <div className="min-h-screen">
                    {/* Header */}
                    <motion.header 
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        className={`glass-effect sticky top-0 z-40 ${darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}`}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Link href="/boqs/manage">
                                        <motion.button
                                            whileHover={{ scale: 1.05, x: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-2 rounded-lg glass-effect transition-colors ${
                                                darkMode 
                                                    ? 'text-white hover:bg-white/20' 
                                                    : 'text-gray-900 hover:bg-gray-100'
                                            }`}
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                    <div>
                                        <h1 className={`text-2xl font-bold text-shadow ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Progress History
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            Track all progress entries for {boq.boq_code}
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`p-2 rounded-lg glass-effect transition-colors ${
                                        darkMode 
                                            ? 'text-white hover:bg-white/20' 
                                            : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.header>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* BOQ Information Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-effect rounded-2xl p-6 shadow-glow"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                                            <Package className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 font-mono mb-2">
                                                {boq.boq_code}
                                            </span>
                                            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {boq.description}
                                            </h2>
                                            <div className={`flex items-center space-x-4 mt-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                <span>WP: {boq.work_package.wp_code}</span>
                                                <span>•</span>
                                                <span>Project: {boq.work_package.project.project_code}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {latestEntry && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            <span className="text-emerald-400 font-bold font-mono">
                                                {latestEntry.progress_pct.toFixed(2)}%
                                            </span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        <div className={`flex items-center space-x-2 mb-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                            <Hash className="w-4 h-4" />
                                            <span className="text-xs">Budget Qty</span>
                                        </div>
                                        <p className={`text-2xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {parseFloat(boq.budget_qty).toLocaleString('id-ID')}
                                        </p>
                                        <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{boq.uom}</p>
                                    </div>

                                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        <div className={`flex items-center space-x-2 mb-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="text-xs">Completed</span>
                                        </div>
                                        <p className={`text-2xl font-bold font-mono ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                            {latestEntry ? parseFloat(latestEntry.cumulative_qty).toLocaleString('id-ID') : '0'}
                                        </p>
                                        <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{boq.uom}</p>
                                    </div>

                                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        <div className={`flex items-center space-x-2 mb-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-xs">Total Value</span>
                                        </div>
                                        <p className={`text-lg font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {formatCurrency(totalAmount)}
                                        </p>
                                        <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Budget</p>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${
                                        darkMode 
                                            ? 'bg-emerald-500/10 border-emerald-500/30' 
                                            : 'bg-emerald-50 border-emerald-200'
                                    }`}>
                                        <div className={`flex items-center space-x-2 mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-xs">Completed Value</span>
                                        </div>
                                        <p className={`text-lg font-bold font-mono ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                            {formatCurrency(completedAmount)}
                                        </p>
                                        <p className={`text-xs mt-1 ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
                                            {latestEntry ? latestEntry.progress_pct.toFixed(2) : '0'}% of budget
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Progress Chart */}
                            {entries.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-effect rounded-2xl p-6 shadow-glow"
                                >
                                    <h3 className={`text-xl font-bold mb-6 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <TrendingUp className="w-6 h-6" />
                                        <span>Progress Over Time</span>
                                    </h3>

                                    <div className="h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                    </linearGradient>
                                                    <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid 
                                                    strokeDasharray="3 3" 
                                                    stroke={darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} 
                                                />
                                                <XAxis 
                                                    dataKey="date" 
                                                    stroke={darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
                                                    tick={{ fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', fontSize: 12 }}
                                                />
                                                <YAxis 
                                                    yAxisId="left"
                                                    stroke={darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
                                                    tick={{ fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', fontSize: 12 }}
                                                    label={{ 
                                                        value: 'Progress (%)', 
                                                        angle: -90, 
                                                        position: 'insideLeft',
                                                        style: { fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }
                                                    }}
                                                />
                                                <YAxis 
                                                    yAxisId="right"
                                                    orientation="right"
                                                    stroke={darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
                                                    tick={{ fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', fontSize: 12 }}
                                                    label={{ 
                                                        value: `Cumulative (${boq.uom})`, 
                                                        angle: 90, 
                                                        position: 'insideRight',
                                                        style: { fill: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }
                                                    }}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Area 
                                                    yAxisId="left"
                                                    type="monotone" 
                                                    dataKey="progress" 
                                                    stroke="#10b981" 
                                                    strokeWidth={3}
                                                    fill="url(#colorProgress)"
                                                    name="Progress %"
                                                />
                                                <Area 
                                                    yAxisId="right"
                                                    type="monotone" 
                                                    dataKey="cumulative" 
                                                    stroke="#3b82f6" 
                                                    strokeWidth={3}
                                                    fill="url(#colorCumulative)"
                                                    name="Cumulative Qty"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </motion.div>
                            )}

                            {/* Progress Entries Timeline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-effect rounded-2xl p-6 shadow-glow"
                            >
                                <h3 className={`text-xl font-bold mb-6 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <Clock className="w-6 h-6" />
                                    <span>Entry Timeline</span>
                                </h3>

                                {entries.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-300'}`} />
                                        <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No Progress Entries Yet</h4>
                                        <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>Start tracking progress to see the timeline</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {entries.map((entry, index) => (
                                            <motion.div
                                                key={entry.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`relative pl-8 pb-6 border-l-2 last:pb-0 last:border-l-0 ${
                                                    darkMode ? 'border-white/20' : 'border-gray-300'
                                                }`}
                                            >
                                                {/* Timeline Dot */}
                                                <div className="absolute left-0 top-0 transform -translate-x-[9px]">
                                                    <div className={`w-4 h-4 rounded-full ${
                                                        index === 0 
                                                            ? 'bg-emerald-500 ring-4 ring-emerald-500/30' 
                                                            : darkMode 
                                                                ? 'bg-white/30' 
                                                                : 'bg-gray-400'
                                                    }`} />
                                                </div>

                                                {/* Entry Content */}
                                                <div className={`rounded-xl p-4 transition-colors ${
                                                    darkMode 
                                                        ? 'bg-white/5 hover:bg-white/10' 
                                                        : 'bg-gray-50 hover:bg-gray-100'
                                                }`}>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <Calendar className={`w-4 h-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`} />
                                                                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                    {formatDate(entry.progress_date)}
                                                                </span>
                                                                {index === 0 && (
                                                                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">
                                                                        Latest
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                                Added {new Date(entry.created_at).toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </p>
                                                        </div>

                                                        <div className="text-right">
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                                <span className="text-emerald-400 font-bold font-mono">
                                                                    {entry.progress_pct.toFixed(2)}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                                                            <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Daily Qty</p>
                                                            <p className={`font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                +{parseFloat(entry.actual_qty).toLocaleString('id-ID')}
                                                            </p>
                                                            <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{boq.uom}</p>
                                                        </div>

                                                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                                                            <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Cumulative</p>
                                                            <p className={`font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                {parseFloat(entry.cumulative_qty).toLocaleString('id-ID')}
                                                            </p>
                                                            <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{boq.uom}</p>
                                                        </div>

                                                        <div className={`p-3 rounded-lg border ${
                                                            darkMode 
                                                                ? 'bg-emerald-500/10 border-emerald-500/30' 
                                                                : 'bg-emerald-50 border-emerald-200'
                                                        }`}>
                                                            <p className={`text-xs mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Value</p>
                                                            <p className={`font-bold font-mono text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                                {formatCurrency(entry.cumulative_qty * boq.unit_rate)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mt-3">
                                                        <div className={`w-full h-2 rounded-full overflow-hidden ${
                                                            darkMode ? 'bg-white/10' : 'bg-gray-200'
                                                        }`}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${entry.progress_pct}%` }}
                                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </Layout>
        </>
    );
}