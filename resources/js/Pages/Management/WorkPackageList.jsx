import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Package,
    ListChecks,
    AlertCircle,
    CheckCircle2,
    FolderKanban,
    Filter,
    Download,
    Moon,
    Sun
} from 'lucide-react';
import Layout from '../../Components/Layout';
import { Head } from '@inertiajs/react';

export default function WorkPackageList({ workPackages, projects, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProject, setFilterProject] = useState('all');
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

    const filteredWPs = workPackages.filter(wp => {
        const matchesSearch = wp.wp_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            wp.wp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            wp.discipline_code.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesProject = filterProject === 'all' || wp.project_id == filterProject;
        
        return matchesSearch && matchesProject;
    });

    const handleDelete = (wp) => {
        router.delete(`/workpackages/${wp.id}`, {
            onSuccess: () => setDeleteConfirm(null)
        });
    };

    const getDisciplineColor = (discipline) => {
        const colors = {
            'Civil': 'from-blue-500 to-cyan-600',
            'Structural': 'from-gray-500 to-slate-600',
            'Architectural': 'from-purple-500 to-pink-600',
            'Mechanical': 'from-orange-500 to-red-600',
            'Electrical': 'from-yellow-500 to-orange-600',
            'Piping': 'from-green-500 to-emerald-600',
        };
        return colors[discipline] || 'from-indigo-500 to-purple-600';
    };

    return (
        <>
            <Head title="Work Package Management" />
            <Layout darkMode={darkMode}>
                <div className="min-h-screen">
                    {/* Header - Mirip ProjectDashboard */}
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
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-glow"
                                    >
                                        <Package className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h1 className={`text-3xl font-bold text-shadow ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Work Package Management
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            Organize by discipline and project
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

                                    <Link href="/workpackages/create">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            <span>New Work Package</span>
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
                                            placeholder="Search work packages..."
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
                                            value={filterProject}
                                            onChange={(e) => setFilterProject(e.target.value)}
                                            className={`px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                darkMode 
                                                    ? 'bg-white/10 border-white/20 text-white' 
                                                    : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                        >
                                            <option value="all" className={darkMode ? 'bg-gray-800' : 'bg-white'}>All Projects</option>
                                            {projects.map(project => (
                                                <option key={project.id} value={project.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {project.project_code}
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

                            {/* Work Packages Grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredWPs.length === 0 ? (
                                    <div className={`col-span-full glass-effect rounded-xl p-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <Package className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-300'}`} />
                                        <h3 className="text-xl font-semibold mb-2">No work packages found</h3>
                                        <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>Create your first work package to get started</p>
                                    </div>
                                ) : (
                                    filteredWPs.map((wp, index) => (
                                        <motion.div
                                            key={wp.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className={`glass-effect rounded-xl p-6 shadow-glow hover:shadow-glow-lg transition-all ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            {/* WP Icon & Actions */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 bg-gradient-to-br ${getDisciplineColor(wp.discipline_code)} rounded-xl`}>
                                                    <Package className="w-6 h-6 text-white" />
                                                </div>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <Link href={`/workpackages/${wp.id}/edit`}>
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
                                                        onClick={() => setDeleteConfirm(wp)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* WP Info */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 font-mono">
                                                        {wp.wp_code}
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                                                        {wp.discipline_code}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold">
                                                    {wp.wp_name}
                                                </h3>
                                            </div>

                                            {/* Project Info */}
                                            <div className={`pt-4 border-t space-y-2 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                                <div className={`flex items-center space-x-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    <FolderKanban className="w-4 h-4" />
                                                    <span className="text-sm">{wp.project.project_code}</span>
                                                </div>
                                                <div className={`flex items-center space-x-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    <ListChecks className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {wp.boqs_count || 0} BOQ Items
                                                    </span>
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
                                Delete Work Package?
                            </h3>
                            <p className={`text-center mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                Are you sure you want to delete <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{deleteConfirm.wp_code}</strong>? 
                                This will also delete all associated BOQs and Progress Entries.
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