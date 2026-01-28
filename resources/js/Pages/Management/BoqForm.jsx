import React, { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    ListChecks,
    Code,
    FileText,
    Ruler,
    Hash,
    DollarSign,
    Package,
    Calculator,
    AlertCircle,
    Moon,
    Sun
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function BoqForm({ boq, workPackages }) {
    const isEdit = !!boq;
    const [darkMode, setDarkMode] = useState(true);
    
    const { data, setData, post, put, processing, errors } = useForm({
        work_package_id: boq?.work_package_id || '',
        boq_code: boq?.boq_code || '',
        description: boq?.description || '',
        uom: boq?.uom || '',
        budget_qty: boq?.budget_qty || '',
        unit_rate: boq?.unit_rate || '',
    });

    const [calculatedAmount, setCalculatedAmount] = useState(0);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    useEffect(() => {
        const qty = parseFloat(data.budget_qty) || 0;
        const rate = parseFloat(data.unit_rate) || 0;
        setCalculatedAmount(qty * rate);
    }, [data.budget_qty, data.unit_rate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(`/boqs/${boq.id}`);
        } else {
            post('/boqs');
        }
    };

    const selectedWP = workPackages.find(wp => wp.id == data.work_package_id);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const commonUOMs = ['m', 'm2', 'm3', 'kg', 'ton', 'unit', 'ls', 'pcs', 'set', 'lot'];

    return (
        <>
            <Head title={isEdit ? 'Edit BOQ Item' : 'Create BOQ Item'} />
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
                                            {isEdit ? 'Edit BOQ Item' : 'Create New BOQ Item'}
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            {isEdit ? 'Update BOQ item information' : 'Add a new bill of quantity item'}
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
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Work Package Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Work Package *
                                    </label>
                                    <div className="relative">
                                        <Package className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <select
                                            value={data.work_package_id}
                                            onChange={(e) => setData('work_package_id', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${
                                                errors.work_package_id 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white' 
                                                        : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                            required
                                        >
                                            <option value="" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Select a work package</option>
                                            {workPackages.map(wp => (
                                                <option key={wp.id} value={wp.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {wp.wp_code} - {wp.project.project_code} ({wp.discipline_code})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.work_package_id && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.work_package_id}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* BOQ Code */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        BOQ Code *
                                    </label>
                                    <div className="relative">
                                        <Code className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={data.boq_code}
                                            onChange={(e) => setData('boq_code', e.target.value)}
                                            placeholder="e.g., BOQ-001"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                errors.boq_code 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.boq_code && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.boq_code}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Description *
                                    </label>
                                    <div className="relative">
                                        <FileText className={`absolute left-4 top-4 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe the work item..."
                                            rows="3"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                                                errors.description 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.description && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.description}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* UOM and Budget Qty Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {/* UOM */}
                                    <div>
                                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Unit of Measurement *
                                        </label>
                                        <div className="relative">
                                            <Ruler className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                                darkMode ? 'text-white/50' : 'text-gray-400'
                                            }`} />
                                            <select
                                                value={data.uom}
                                                onChange={(e) => setData('uom', e.target.value)}
                                                className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${
                                                    errors.uom 
                                                        ? 'border-red-500' 
                                                        : darkMode 
                                                            ? 'bg-white/10 border-white/20 text-white' 
                                                            : 'bg-white border-gray-200 text-gray-900'
                                                }`}
                                                required
                                            >
                                                <option value="" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Select UOM</option>
                                                {commonUOMs.map(uom => (
                                                    <option key={uom} value={uom} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                        {uom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.uom && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.uom}</span>
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Budget Qty */}
                                    <div>
                                        <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Budget Quantity *
                                        </label>
                                        <div className="relative">
                                            <Hash className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                                darkMode ? 'text-white/50' : 'text-gray-400'
                                            }`} />
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.budget_qty}
                                                onChange={(e) => setData('budget_qty', e.target.value)}
                                                placeholder="0.00"
                                                className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                    errors.budget_qty 
                                                        ? 'border-red-500' 
                                                        : darkMode 
                                                            ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                                }`}
                                                required
                                            />
                                        </div>
                                        {errors.budget_qty && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.budget_qty}</span>
                                            </motion.p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Unit Rate */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Unit Rate (IDR) *
                                    </label>
                                    <div className="relative">
                                        <DollarSign className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.unit_rate}
                                            onChange={(e) => setData('unit_rate', e.target.value)}
                                            placeholder="0.00"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                errors.unit_rate 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.unit_rate && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.unit_rate}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Preview Card */}
                                {data.boq_code && data.budget_qty && data.unit_rate && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className={`p-6 rounded-xl border ${
                                            darkMode 
                                                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-white/20' 
                                                : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Calculator className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                            <p className={`text-sm font-semibold ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>Calculation Preview:</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                                                    <ListChecks className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 font-mono mb-1">
                                                        {data.boq_code}
                                                    </span>
                                                    <p className={`text-sm line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{data.description || 'Description'}</p>
                                                    {selectedWP && (
                                                        <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>WP: {selectedWP.wp_code}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
                                                    <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Quantity</p>
                                                    <p className={`font-bold font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {parseFloat(data.budget_qty).toLocaleString('id-ID')} {data.uom}
                                                    </p>
                                                </div>
                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
                                                    <p className={`text-xs mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Unit Rate</p>
                                                    <p className={`font-bold font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {formatCurrency(data.unit_rate)}
                                                    </p>
                                                </div>
                                                <div className={`p-3 rounded-lg border ${
                                                    darkMode 
                                                        ? 'bg-emerald-500/20 border-emerald-500/30' 
                                                        : 'bg-emerald-100 border-emerald-300'
                                                }`}>
                                                    <p className={`text-xs mb-1 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Total Amount</p>
                                                    <p className={`font-bold font-mono text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                        {formatCurrency(calculatedAmount)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                                                <p className={`text-xs ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    Formula: {data.budget_qty} {data.uom} × {formatCurrency(data.unit_rate)} = <span className={`font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{formatCurrency(calculatedAmount)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
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
                                        <span>{processing ? 'Saving...' : (isEdit ? 'Update BOQ Item' : 'Create BOQ Item')}</span>
                                    </motion.button>

                                    <Link href="/boqs/manage">
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
                </div>
            </Layout>
        </>
    );
}