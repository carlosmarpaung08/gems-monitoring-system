import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Save, 
    Calendar,
    Package,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Info,
    Moon,
    Sun
} from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function CreateProgress({ boqs, errors: serverErrors }) {
    const { data, setData, post, processing, errors } = useForm({
        boq_id: '',
        progress_date: new Date().toISOString().split('T')[0],
        actual_qty: ''
    });

    const formatValue = (value) => {
        if (value === null || value === undefined) return '0';
        const absValue = Math.abs(value);
        if (absValue >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '')}T`;
        if (absValue >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
        if (absValue >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
        if (absValue >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
        return value.toString();
    };

    const [selectedBoq, setSelectedBoq] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
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

    const handleBoqChange = (e) => {
        const boqId = e.target.value;
        setData('boq_id', boqId);
        
        const boq = boqs.find(b => b.id == boqId);
    
        setSelectedBoq(boq);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/progress', {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        });
    };

    const getRemainingBudget = () => {
        if (!selectedBoq) return 0;
        
        const budgetQty = parseFloat(selectedBoq.budget_qty) || 0;
        
        const progressEntries = selectedBoq.progress_entries || [];
        const currentProgress = progressEntries.reduce(
            (sum, entry) => sum + (parseFloat(entry.actual_qty) || 0), 
            0
        );
        
        return budgetQty - currentProgress;
    };

    const getProgressPercentage = () => {
        if (!selectedBoq || !data.actual_qty) return 0;
        
        const budgetQty = parseFloat(selectedBoq.budget_qty) || 0;
        const actualQty = parseFloat(data.actual_qty) || 0;
        
        if (budgetQty === 0) return 0;
        
        const progressEntries = selectedBoq.progress_entries || [];
        const currentProgress = progressEntries.reduce(
            (sum, entry) => sum + (parseFloat(entry.actual_qty) || 0), 
            0
        );
        
        const newTotal = currentProgress + actualQty;
        return Math.min((newTotal / budgetQty) * 100, 100);
    };

    return (
        <>
            <Head title="Add Progress" />
            <Layout darkMode={darkMode}>
                <div className="min-h-screen">
                    {/* Header */}
                    <motion.header 
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        className={`glass-effect sticky top-0 z-40 ${darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}`}
                    >
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Link href="/">
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
                                            Add New Progress
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            Record daily work progress
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
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-effect rounded-2xl p-8 shadow-glow"
                        >
                            {/* Info Banner */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`mb-8 p-4 rounded-xl border flex items-start space-x-3 ${
                                    darkMode 
                                        ? 'bg-blue-500/20 border-blue-500/30' 
                                        : 'bg-blue-50 border-blue-200'
                                }`}
                            >
                                <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                                <div className="flex-1">
                                    <p className={`text-sm ${darkMode ? 'text-white/90' : 'text-gray-700'}`}>
                                        Input actual quantity yang telah diselesaikan untuk BOQ yang dipilih. 
                                        Progress tidak boleh melebihi budget quantity.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* BOQ Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Select BOQ Item *
                                    </label>
                                    <div className="relative">
                                        <Package className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <select
                                            value={data.boq_id}
                                            onChange={handleBoqChange}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white' 
                                                    : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                            required
                                        >
                                            <option value="" className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                -- Select BOQ --
                                            </option>
                                            {boqs.map(boq => (
                                                <option key={boq.id} value={boq.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {boq.boq_code} - {boq.description} (Budget: {boq.budget_qty} {boq.uom})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.boq_id && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.boq_id}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* BOQ Details */}
                                <AnimatePresence>
                                    {selectedBoq && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                        >
                                            <div className={`p-4 rounded-xl border ${
                                                darkMode 
                                                    ? 'bg-white/5 border-white/10' 
                                                    : 'bg-gray-50 border-gray-200'
                                            }`}>
                                                <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    Budget Quantity
                                                </p>
                                                <p className={`text-2xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {formatValue(selectedBoq.budget_qty)}
                                                </p>
                                                <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    {selectedBoq.uom}
                                                </p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${
                                                darkMode 
                                                    ? 'bg-white/5 border-white/10' 
                                                    : 'bg-green-50 border-green-200'
                                            }`}>
                                                <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    Remaining Budget
                                                </p>
                                                <p className={`text-2xl font-bold font-mono ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                                    {formatValue(getRemainingBudget())}
                                                </p>
                                                <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    {selectedBoq.uom}
                                                </p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${
                                                darkMode 
                                                    ? 'bg-white/5 border-white/10' 
                                                    : 'bg-blue-50 border-blue-200'
                                            }`}>
                                                <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    Unit Rate
                                                </p>
                                                <p className={`text-2xl font-bold font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                                    {formatValue(selectedBoq.unit_rate)}
                                                </p>
                                                <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    IDR per {selectedBoq.uom}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Date */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Progress Date *
                                    </label>
                                    <div className="relative">
                                        <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="date"
                                            value={data.progress_date}
                                            onChange={(e) => setData('progress_date', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white' 
                                                    : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.progress_date && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.progress_date}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Actual Quantity */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Actual Quantity Completed *
                                    </label>
                                    <div className="relative">
                                        <TrendingUp className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.actual_qty}
                                            onChange={(e) => setData('actual_qty', e.target.value)}
                                            placeholder="Enter quantity..."
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                            disabled={!selectedBoq}
                                        />
                                    </div>
                                    {errors.actual_qty && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.actual_qty}</span>
                                        </motion.p>
                                    )}

                                    {/* Progress Preview */}
                                    {selectedBoq && data.actual_qty && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mt-4 p-4 rounded-xl border ${
                                                darkMode 
                                                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-white/20' 
                                                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    New Progress Preview
                                                </span>
                                                <span className={`text-lg font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {getProgressPercentage().toFixed(2)}%
                                                </span>
                                            </div>
                                            <div className={`w-full h-2 rounded-full overflow-hidden ${
                                                darkMode ? 'bg-white/20' : 'bg-gray-200'
                                            }`}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${getProgressPercentage()}%` }}
                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center space-x-4 pt-6"
                                >
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>{processing ? 'Saving...' : 'Save Progress'}</span>
                                    </motion.button>

                                    <Link href="/">
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-6 py-4 rounded-xl border font-semibold transition-colors ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            Cancel
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>

                    {/* Success Modal */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="glass-effect rounded-2xl p-8 max-w-md w-full text-center shadow-glow-lg"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </motion.div>
                                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Success!
                                    </h3>
                                    <p className={`mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                        Progress has been recorded successfully. Redirecting to dashboard...
                                    </p>
                                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                                        darkMode ? 'bg-white/20' : 'bg-gray-200'
                                    }`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 2 }}
                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Layout>
        </>
    );
}