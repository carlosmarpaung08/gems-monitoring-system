import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, DollarSign, TrendingUp, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProjectCard({ project, darkMode }) {
    const [showDetails, setShowDetails] = useState(false);

    const getStatusColor = (progress) => {
        if (progress >= 90) return 'from-green-400 to-emerald-500';
        if (progress >= 70) return 'from-blue-400 to-cyan-500';
        if (progress >= 50) return 'from-yellow-400 to-orange-500';
        return 'from-red-400 to-pink-500';
    };

    const getStatusBadge = (progress) => {
        if (progress >= 100) return { text: 'Completed', color: 'bg-green-500' };
        if (progress >= 70) return { text: 'On Track', color: 'bg-blue-500' };
        if (progress >= 50) return { text: 'At Risk', color: 'bg-yellow-500' };
        return { text: 'Delayed', color: 'bg-red-500' };
    };

    const formatValue = (value) => {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(1)}T`;
        } else if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else {
            return `${(value / 1000).toFixed(1)}K`;
        }
    };

    const status = getStatusBadge(project.overall_progress_pct);

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
            className={`glass-effect rounded-2xl p-6 transition-all ${
                darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-50'
            }`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.project_code}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            {project.project_name}
                        </p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${status.color}`}>
                    {status.text}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Overall Progress
                    </span>
                    <span className={`text-lg font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.overall_progress_pct.toFixed(2)}%
                    </span>
                </div>
                <div className={`w-full h-3 rounded-full overflow-hidden ${
                    darkMode ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.overall_progress_pct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${getStatusColor(project.overall_progress_pct)}`}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                    <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Contract Value
                        </span>
                    </div>
                    <p className={`text-xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formatValue(project.total_contract_value)}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>
                        IDR {project.total_contract_value.toLocaleString('id-ID')}
                    </p>
                </div>

                <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                    <div className="flex items-center space-x-2 mb-1">
                        <Package className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Work Packages
                        </span>
                    </div>
                    <p className={`text-xl font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.work_packages_count || project.work_packages?.length || 0}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/30' : 'text-gray-400'}`}>
                        {project.boq_items_count || 
                         project.work_packages?.reduce((sum, wp) => sum + (wp.boqs_count || 0), 0) || 
                         0} BOQ Items
                    </p>
                </div>
            </div>

            {/* Toggle Details */}
            <motion.button
                onClick={() => setShowDetails(!showDetails)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2 rounded-xl border transition-all flex items-center justify-center space-x-2 ${
                    darkMode 
                        ? 'border-white/20 text-white/70 hover:bg-white/10' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
                <span className="text-sm font-medium">
                    {showDetails ? 'Hide Details' : 'View Details'}
                </span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>

            {/* Details Panel */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className={`mt-4 pt-4 border-t space-y-3 ${
                            darkMode ? 'border-white/10' : 'border-gray-200'
                        }`}>
                            {project.work_packages && project.work_packages.length > 0 ? (
                                project.work_packages.map((wp, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg ${
                                            darkMode ? 'bg-white/5' : 'bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-medium ${
                                                darkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {wp.wp_code}
                                            </span>
                                            <span className={`text-xs ${
                                                darkMode ? 'text-white/50' : 'text-gray-500'
                                            }`}>
                                                {wp.boqs_count || 0} items
                                            </span>
                                        </div>
                                        <p className={`text-xs ${
                                            darkMode ? 'text-white/70' : 'text-gray-600'
                                        }`}>
                                            {wp.wp_name}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className={`p-4 rounded-lg text-center ${
                                    darkMode ? 'bg-white/5 text-white/50' : 'bg-gray-50 text-gray-500'
                                }`}>
                                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No work packages available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}