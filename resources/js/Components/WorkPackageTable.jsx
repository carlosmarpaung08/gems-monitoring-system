import React from 'react';
import { motion } from 'framer-motion';
import { Layers, TrendingUp } from 'lucide-react';

export default function WorkPackageTable({ workPackage, darkMode }) {
    const getProgressColor = (progress) => {
        if (progress >= 90) return darkMode ? 'text-green-400' : 'text-green-600';
        if (progress >= 70) return darkMode ? 'text-blue-400' : 'text-blue-600';
        if (progress >= 50) return darkMode ? 'text-yellow-400' : 'text-yellow-600';
        return darkMode ? 'text-red-400' : 'text-red-600';
    };

    const getProgressBg = (progress) => {
        if (progress >= 90) return 'from-green-400/20 to-emerald-500/20';
        if (progress >= 70) return 'from-blue-400/20 to-cyan-500/20';
        if (progress >= 50) return 'from-yellow-400/20 to-orange-500/20';
        return 'from-red-400/20 to-pink-500/20';
    };

    return (
        <div className="space-y-4">
            {/* Work Package Header */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${
                darkMode 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {workPackage.wp_code}
                        </h4>
                        <p className={`text-sm font-mono ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            {workPackage.discipline_code}
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-5 h-5 ${getProgressColor(workPackage.progress_pct)}`} />
                        <span className={`text-2xl font-bold ${getProgressColor(workPackage.progress_pct)}`}>
                            {workPackage.progress_pct.toFixed(2)}%
                        </span>
                    </div>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        IDR {workPackage.total_amount.toLocaleString('id-ID')}
                    </p>
                </div>
            </div>

            {/* BOQ Table */}
            <div className={`overflow-x-auto rounded-xl border ${
                darkMode ? 'border-white/10' : 'border-gray-200'
            }`}>
                <table className="w-full">
                    <thead>
                        <tr className={darkMode ? 'bg-white/5' : 'bg-gray-100'}>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                BOQ Code
                            </th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                Description
                            </th>
                            <th className={`px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                Budget Qty
                            </th>
                            <th className={`px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                Actual Qty
                            </th>
                            <th className={`px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                Progress
                            </th>
                            <th className={`px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider ${
                                darkMode ? 'text-white/70' : 'text-gray-600'
                            }`}>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-gray-200'}`}>
                        {workPackage.boqs.map((boq, index) => (
                            <motion.tr
                                key={boq.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ 
                                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)' 
                                }}
                                className="transition-colors"
                            >
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-mono ${
                                        darkMode 
                                            ? 'bg-indigo-500/20 text-indigo-300' 
                                            : 'bg-indigo-100 text-indigo-700'
                                    }`}>
                                        {boq.boq_code}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {boq.description}
                                    </p>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className={`text-sm font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {boq.budget_qty.toLocaleString('id-ID')}
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                        {boq.uom}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className={`text-sm font-mono font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {boq.actual_qty.toLocaleString('id-ID')}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <div className={`w-24 h-2 rounded-full overflow-hidden ${
                                            darkMode ? 'bg-white/10' : 'bg-gray-200'
                                        }`}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${boq.progress_pct}%` }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                className={`h-full bg-gradient-to-r ${getProgressBg(boq.progress_pct)}`}
                                            />
                                        </div>
                                        <span className={`text-sm font-bold font-mono ${getProgressColor(boq.progress_pct)}`}>
                                            {boq.progress_pct.toFixed(1)}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className={`text-sm font-mono font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {(boq.amount / 1000).toFixed(0)}K
                                    </div>
                                    <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                        IDR {boq.amount.toLocaleString('id-ID')}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className={`border-t-2 ${
                            darkMode 
                                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-white/20' 
                                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-gray-300'
                        }`}>
                            <td colSpan="4" className={`px-4 py-4 text-right font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Work Package Total:
                            </td>
                            <td className="px-4 py-4 text-right">
                                <span className={`text-lg font-bold font-mono ${getProgressColor(workPackage.progress_pct)}`}>
                                    {workPackage.progress_pct.toFixed(2)}%
                                </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <div className={`text-lg font-mono font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {(workPackage.total_amount / 1000000).toFixed(1)}M
                                </div>
                                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                    IDR {workPackage.total_amount.toLocaleString('id-ID')}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}