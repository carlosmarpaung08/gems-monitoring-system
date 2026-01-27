import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    Package, 
    Calendar, 
    DollarSign, 
    Target,
    Plus,
    Search,
    Filter,
    Download,
    BarChart3,
    Settings,
    Moon,
    Sun
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import ProjectCard from '../Components/ProjectCard';
import ProgressChart from '../Components/ProgressChart';
import { Head } from '@inertiajs/react';

export default function ProjectDashboard({ projects }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [darkMode, setDarkMode] = useState(true);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Calculate overall statistics
    const stats = useMemo(() => {
        const totalProjects = projects.length;
        const totalValue = projects.reduce((sum, p) => sum + p.total_contract_value, 0);
        const avgProgress = projects.reduce((sum, p) => sum + p.overall_progress_pct, 0) / totalProjects;
        const activeProjects = projects.filter(p => p.overall_progress_pct < 100).length;

        return {
            totalProjects,
            totalValue,
            avgProgress,
            activeProjects
        };
    }, [projects]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                project.project_code.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = filterStatus === 'all' ||
                                (filterStatus === 'active' && project.overall_progress_pct < 100) ||
                                (filterStatus === 'completed' && project.overall_progress_pct >= 100);
            
            return matchesSearch && matchesFilter;
        });
    }, [projects, searchTerm, filterStatus]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen">
                {/* Header */}
                <motion.header 
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="glass-effect sticky top-0 z-50 border-b border-white/20"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow"
                                >
                                    <Package className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                    <h1 className={`text-3xl font-bold text-shadow ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        GEMS Dashboard
                                    </h1>
                                    <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                        Project Monitoring System
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

                                <Link href="/progress/create">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Add Progress</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Stats Cards */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div variants={itemVariants} className={`glass-effect rounded-2xl p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/20' : 'bg-indigo-100'}`}>
                                    <Target className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold">{stats.totalProjects}</span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Projects</p>
                            <div className={`mt-2 flex items-center text-xs ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>{stats.activeProjects} Active</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className={`glass-effect rounded-2xl p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/20' : 'bg-indigo-100'}`}>
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold">
                                    {(stats.totalValue / 1000000000).toFixed(1)}B
                                </span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Total Contract Value</p>
                            <div className={`mt-2 text-xs font-mono ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                IDR {stats.totalValue.toLocaleString('id-ID')}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className={`glass-effect rounded-2xl p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/20' : 'bg-indigo-100'}`}>
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold">
                                    {stats.avgProgress.toFixed(1)}%
                                </span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Average Progress</p>
                            <div className={`mt-2 w-full rounded-full h-2 ${darkMode ? 'bg-white/20' : 'bg-gray-200'}`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats.avgProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className={`glass-effect rounded-2xl p-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/20' : 'bg-indigo-100'}`}>
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <span className="text-3xl font-bold">
                                    {new Date().toLocaleDateString('id-ID', { day: 'numeric' })}
                                </span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Today's Date</p>
                            <div className={`mt-2 text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                {new Date().toLocaleDateString('id-ID', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long' 
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Search and Filter */}
                    <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="relative flex-1 max-w-md">
                                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-white/50' : 'text-gray-400'}`} />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
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
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className={`px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                        darkMode 
                                            ? 'bg-white/10 border-white/20 text-white' 
                                            : 'bg-white border-gray-200 text-gray-900'
                                    }`}
                                >
                                    <option value="all" className={darkMode ? 'bg-gray-800' : 'bg-white'}>All Projects</option>
                                    <option value="active" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Active</option>
                                    <option value="completed" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Completed</option>
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

                    {/* Projects Grid */}
                    <motion.div variants={containerVariants}>
                        <AnimatePresence mode="wait">
                            {filteredProjects.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`glass-effect rounded-2xl p-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                >
                                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                                    <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>Try adjusting your search or filters</p>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {filteredProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <ProjectCard project={project} darkMode={darkMode} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Chart Section */}
                    {filteredProjects.length > 0 && (
                        <motion.div variants={itemVariants} className="mt-8">
                            <ProgressChart projects={filteredProjects} darkMode={darkMode} />
                        </motion.div>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-effect border-t border-white/20 mt-12"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            <p>© 2026 GEMS Dashboard. Made with ❤️ using Laravel + React</p>
                            <div className="flex items-center space-x-4">
                                <a href="#" className={`transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Terms</a>
                                <a href="#" className={`transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Privacy</a>
                                <a href="#" className={`transition-colors ${darkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Support</a>
                            </div>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}