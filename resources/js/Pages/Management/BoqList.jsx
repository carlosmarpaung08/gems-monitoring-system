import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    ListChecks,
    History,
    AlertCircle,
    CheckCircle2,
    Package,
    DollarSign,
    Hash,
    Filter,
    Download,
    Moon,
    Sun
} from 'lucide-react';
import Layout from '../../Components/Layout';
import { Head } from '@inertiajs/react';

export default function BoqList({ boqs, workPackages, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterWP, setFilterWP] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
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

    const filteredBoqs = boqs.filter(boq => {
        const matchesSearch = boq.boq_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            boq.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesWP = filterWP === 'all' || boq.work_package_id == filterWP;
        
        return matchesSearch && matchesWP;
    });

    const handleDelete = (boq) => {
        router.delete(`/boqs/${boq.id}`, {
            onSuccess: () => setDeleteConfirm(null)
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <>
            <Head title="BOQ Management" />
            <Layout darkMode={darkMode}>
                <div className="min-h-screen">
                    {/* Header */}
                    <motion.header 
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        className="glass-effect sticky top-0 z-40 border-b border-white/20"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-glow"
                                    >
                                        <ListChecks className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h1 className={`text-3xl font-bold text-shadow ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            BOQ Management
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            Bill of Quantities for all work packages
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`p-2 rounded-lg glass-effect hover:bg-white/20 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                    >
                                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </motion.button>

                                    <Link href="/boqs/create">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            <span>New BOQ Item</span>
                                        </motion.button>
                                    </Link>
                                </div>
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
                            {/* Flash Messages */}
                            <AnimatePresence>
                                {flash?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="glass-effect rounded-xl p-4 border border-green-500/30 bg-green-500/10"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                            <p className={darkMode ? 'text-white' : 'text-gray-900'}>{flash.success}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Search and Filter */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="glass-effect rounded-xl p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                                    <div className="relative flex-1 max-w-md">
                                        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                                        <input
                                            type="text"
                                            placeholder="Search BOQ items..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <select
                                            value={filterWP}
                                            onChange={(e) => setFilterWP(e.target.value)}
                                            className={`px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[250px] ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white' 
                                                    : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                        >
                                            <option value="all" className={darkMode ? 'bg-gray-800' : 'bg-white'}>All Work Packages</option>
                                            {workPackages.map(wp => (
                                                <option key={wp.id} value={wp.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {wp.wp_code} - {wp.project.project_code}
                                                </option>
                                            ))}
                                        </select>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-3 rounded-xl border transition-colors ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Filter className="w-5 h-5" />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-3 rounded-xl border transition-colors ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Download className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BOQ Grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                            >
                                {filteredBoqs.length === 0 ? (
                                    <div className={`col-span-full glass-effect rounded-xl p-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <ListChecks className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-300'}`} />
                                        <h3 className="text-xl font-semibold mb-2">No BOQ items found</h3>
                                        <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>Create your first BOQ item to get started</p>
                                    </div>
                                ) : (
                                    filteredBoqs.map((boq, index) => (
                                        <motion.div
                                            key={boq.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className={`glass-effect rounded-xl p-6 shadow-glow hover:shadow-glow-lg transition-all ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                                                        <ListChecks className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 font-mono">
                                                            {boq.boq_code}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <Link href={`/boqs/${boq.id}/history`}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                                                            title="View Progress History"
                                                        >
                                                            <History className="w-4 h-4" />
                                                        </motion.button>
                                                    </Link>

                                                    <Link href={`/boqs/${boq.id}/edit`}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className={`p-2 rounded-lg transition-colors ${
                                                                darkMode 
                                                                    ? 'bg-white/10 text-white hover:bg-white/20'
                                                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                            }`}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </motion.button>
                                                    </Link>
                                                    
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => setDeleteConfirm(boq)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="mb-4">
                                                <p className="font-medium line-clamp-2">
                                                    {boq.description}
                                                </p>
                                            </div>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                    <div className={`flex items-center space-x-2 mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                        <Hash className="w-4 h-4" />
                                                        <span className="text-xs">Budget Qty</span>
                                                    </div>
                                                    <p className="font-bold font-mono">
                                                        {parseFloat(boq.budget_qty).toLocaleString('id-ID')}
                                                    </p>
                                                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{boq.uom}</p>
                                                </div>

                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                    <div className={`flex items-center space-x-2 mb-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                        <DollarSign className="w-4 h-4" />
                                                        <span className="text-xs">Unit Rate</span>
                                                    </div>
                                                    <p className="font-bold font-mono text-sm">
                                                        {formatCurrency(boq.unit_rate)}
                                                    </p>
                                                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>per {boq.uom}</p>
                                                </div>
                                            </div>

                                            {/* Amount Display */}
                                            <div className={`p-4 rounded-xl border ${
                                                darkMode 
                                                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-white/20'
                                                    : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                                            }`}>
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Amount:</span>
                                                    <span className="text-lg font-bold font-mono">
                                                        {formatCurrency(boq.budget_qty * boq.unit_rate)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Work Package Info */}
                                            <div className={`mt-4 pt-4 border-t space-y-2 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                                <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    <Package className="w-4 h-4" />
                                                    <span>{boq.work_package.wp_code}</span>
                                                </div>
                                                <div className={`flex items-center space-x-2 text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                    <History className="w-3 h-3" />
                                                    <span>{boq.progress_entries_count || 0} Progress Entries</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </Layout>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-effect rounded-2xl p-8 max-w-md w-full shadow-glow-lg"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20">
                                <AlertCircle className="w-8 h-8 text-red-400" />
                            </div>

                            <h3 className={`text-2xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Delete BOQ Item?
                            </h3>
                            <p className={`text-center mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                Are you sure you want to delete <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{deleteConfirm.boq_code}</strong>? 
                                This will also delete all associated Progress Entries.
                            </p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className={`flex-1 px-4 py-3 border rounded-xl font-semibold transition-colors ${
                                        darkMode 
                                            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-glow transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}