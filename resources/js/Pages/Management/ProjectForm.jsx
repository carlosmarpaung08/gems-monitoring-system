import React, { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    FolderKanban,
    Code,
    Type,
    AlertCircle,
    Moon,
    Sun
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function ProjectForm({ project }) {
    const isEdit = !!project;
    const [darkMode, setDarkMode] = useState(true);
    
    const { data, setData, post, put, processing, errors } = useForm({
        project_code: project?.project_code || '',
        project_name: project?.project_name || '',
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEdit) {
            put(`/projects/${project.id}`);
        } else {
            post('/projects');
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Project' : 'Create Project'} />
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
                                    <Link href="/projects/manage">
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
                                            {isEdit ? 'Edit Project' : 'Create New Project'}
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            {isEdit ? 'Update project information' : 'Add a new project to the system'}
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
                                {/* Project Code */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Project Code *
                                    </label>
                                    <div className="relative">
                                        <Code className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={data.project_code}
                                            onChange={(e) => setData('project_code', e.target.value)}
                                            placeholder="e.g., PRJ-001"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                errors.project_code 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.project_code && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.project_code}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Project Name */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Project Name *
                                    </label>
                                    <div className="relative">
                                        <Type className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={data.project_name}
                                            onChange={(e) => setData('project_name', e.target.value)}
                                            placeholder="e.g., Office Building Construction"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.project_name 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.project_name && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.project_name}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Preview Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`p-6 rounded-xl border ${
                                        darkMode 
                                            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-white/20' 
                                            : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                                    }`}
                                >
                                    <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Preview:</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                            <FolderKanban className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {data.project_code || 'Project Code'}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                                {data.project_name || 'Project Name'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Buttons */}
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
                                        <span>{processing ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}</span>
                                    </motion.button>

                                    <Link href="/projects/manage">
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