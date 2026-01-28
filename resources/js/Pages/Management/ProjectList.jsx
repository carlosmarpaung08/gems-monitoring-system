import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    FolderKanban,
    Package,
    AlertCircle,
    CheckCircle2,
    Filter,
    Download,
    Moon,
    Sun
} from 'lucide-react';
import Layout from '../../Components/Layout';
import { Head } from '@inertiajs/react';

export default function ProjectList({ projects, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
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

    const filteredProjects = projects.filter(project =>
        project.project_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (project) => {
        router.delete(`/projects/${project.id}`, {
            onSuccess: () => setDeleteConfirm(null)
        });
    };

    return (
        <>
            <Head title="Project Management" />
            <Layout darkMode={darkMode}>
                <div className="min-h-screen">
                    {/* Header - Mirip WorkPackageList */}
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
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow"
                                    >
                                        <FolderKanban className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h1 className={`text-3xl font-bold text-shadow ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            Project Management
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            Manage all your projects in one place
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

                                    <Link href="/projects/create">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                            <span>New Project</span>
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
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProjects.length === 0 ? (
                                    <div className={`col-span-full glass-effect rounded-xl p-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <FolderKanban className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-white/30' : 'text-gray-300'}`} />
                                        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                                        <p className={darkMode ? 'text-white/70' : 'text-gray-600'}>Create your first project to get started</p>
                                    </div>
                                ) : (
                                    filteredProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className={`glass-effect rounded-xl p-6 shadow-glow hover:shadow-glow-lg transition-all ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            {/* Project Icon & Actions */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                                    <FolderKanban className="w-6 h-6 text-white" />
                                                </div>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <Link href={`/projects/${project.id}/edit`}>
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
                                                        onClick={() => setDeleteConfirm(project)}
                                                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Project Info */}
                                            <div className="space-y-2 mb-4">
                                                <h3 className="text-lg font-bold">
                                                    {project.project_code}
                                                </h3>
                                                <p className={`text-sm line-clamp-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    {project.project_name}
                                                </p>
                                            </div>

                                            {/* Stats */}
                                            <div className={`pt-4 border-t flex items-center justify-between ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                                <div className={`flex items-center space-x-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                    <Package className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {project.work_packages_count || 0} Work Packages
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
                                Delete Project?
                            </h3>
                            <p className={`text-center mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                Are you sure you want to delete <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{deleteConfirm.project_code}</strong>? 
                                This will also delete all associated Work Packages, BOQs, and Progress Entries.
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