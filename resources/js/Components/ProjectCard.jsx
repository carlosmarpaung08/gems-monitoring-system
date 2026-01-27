import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, 
    ChevronUp, 
    Package, 
    TrendingUp,
    DollarSign,
    Calendar,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import WorkPackageTable from './WorkPackageTable';

export default function ProjectCard({ project, darkMode }) {
    const [expanded, setExpanded] = useState(false);

    if (!project) {
        return <div className="text-white p-6">Loading project...</div>;
    }

    const workPackages = project.workPackages || [];
    const totalContractValue = project.total_contract_value || 0;
    const overallProgress = project.overall_progress_pct || 0;
    const projectCode = project.project_code || 'N/A';
    const projectName = project.project_name || 'Unnamed Project';

    const getProgressColor = (progress) => {
        if (progress >= 90) return 'from-green-400 to-emerald-500';
        if (progress >= 70) return 'from-blue-400 to-cyan-500';
        if (progress >= 50) return 'from-yellow-400 to-orange-500';
        return 'from-red-400 to-pink-500';
    };

    const getStatusBadge = (progress) => {
        if (progress >= 100) return { text: 'Completed', color: 'bg-green-500', icon: CheckCircle2 };
        if (progress >= 70) return { text: 'On Track', color: 'bg-blue-500', icon: TrendingUp };
        if (progress >= 40) return { text: 'In Progress', color: 'bg-yellow-500', icon: AlertCircle };
        return { text: 'At Risk', color: 'bg-red-500', icon: AlertCircle };
    };

    const status = getStatusBadge(overallProgress);
    const StatusIcon = status.icon;

    const totalBoqItems = workPackages.reduce((sum, wp) => {
        return sum + (wp.boqs?.length || 0);
    }, 0);

    return (
        <motion.div
            layout
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl overflow-hidden shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
            {/* Card Header */}
            <div className={`p-6 ${darkMode ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                                className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"
                            >
                                <Package className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {projectCode}
                                </h3>
                                <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                    {projectName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`flex items-center space-x-2 px-3 py-1.5 ${status.color} rounded-full text-white text-xs font-semibold`}
                    >
                        <StatusIcon className="w-4 h-4" />
                        <span>{status.text}</span>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Overall Progress</span>
                        <span className={`font-bold font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {overallProgress.toFixed(2)}%
                        </span>
                    </div>
                    <div className={`relative w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overallProgress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${getProgressColor(overallProgress)} relative overflow-hidden`}
                        >
                            <motion.div
                                animate={{
                                    x: ['-100%', '100%']
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Card Body - Stats */}
            <div className="p-6 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className={`flex items-center space-x-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs font-medium">Contract Value</span>
                    </div>
                    <p className={`font-bold text-lg font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(totalContractValue / 1000000).toFixed(1)}M
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        IDR {totalContractValue.toLocaleString('id-ID')}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className={`flex items-center space-x-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <Package className="w-4 h-4" />
                        <span className="text-xs font-medium">Work Packages</span>
                    </div>
                    <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {workPackages.length}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        {totalBoqItems} BOQ Items
                    </p>
                </div>
            </div>

            {/* Expand Button */}
            <motion.button
                onClick={() => setExpanded(!expanded)}
                whileHover={{ backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-4 flex items-center justify-center space-x-2 transition-colors ${
                    darkMode 
                        ? 'text-white/70 hover:text-white border-t border-white/10' 
                        : 'text-gray-600 hover:text-gray-900 border-t border-gray-200'
                }`}
            >
                <span className="text-sm font-medium">
                    {expanded ? 'Hide Details' : 'View Details'}
                </span>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden ${darkMode ? 'border-t border-white/10' : 'border-t border-gray-200'}`}
                    >
                        <div className="p-6 space-y-6">
                            {workPackages.length > 0 ? (
                                workPackages.map((wp, index) => (
                                    <motion.div
                                        key={wp.id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <WorkPackageTable workPackage={wp} darkMode={darkMode} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className={`text-center py-4 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                    No work packages available
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}