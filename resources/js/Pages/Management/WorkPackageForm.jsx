import React, { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    Package,
    Code,
    Type,
    Layers,
    FolderKanban,
    AlertCircle,
    Moon,
    Sun
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function WorkPackageForm({ workPackage, projects }) {
    const isEdit = !!workPackage;
    const [darkMode, setDarkMode] = useState(true);
    
    const { data, setData, post, put, processing, errors } = useForm({
        project_id: workPackage?.project_id || '',
        wp_code: workPackage?.wp_code || '',
        wp_name: workPackage?.wp_name || '',
        discipline_code: workPackage?.discipline_code || '',
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
            put(`/workpackages/${workPackage.id}`);
        } else {
            post('/workpackages');
        }
    };

    const selectedProject = projects.find(p => p.id == data.project_id);

    const disciplines = [
        'Civil', 'Structural', 'Architectural', 'Mechanical', 
        'Electrical', 'Piping', 'Instrumentation', 'HVAC'
    ];

    return (
        <>
            <Head title={isEdit ? 'Edit Work Package' : 'Create Work Package'} />
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
                                    <Link href="/workpackages/manage">
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
                                            {isEdit ? 'Edit Work Package' : 'Create New Work Package'}
                                        </h1>
                                        <p className={`text-sm font-mono ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                                            {isEdit ? 'Update work package information' : 'Add a new work package to a project'}
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
                                {/* Project Selection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Project *
                                    </label>
                                    <div className="relative">
                                        <FolderKanban className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <select
                                            value={data.project_id}
                                            onChange={(e) => setData('project_id', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${
                                                errors.project_id 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white' 
                                                        : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                            required
                                        >
                                            <option value="" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Select a project</option>
                                            {projects.map(project => (
                                                <option key={project.id} value={project.id} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {project.project_code} - {project.project_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.project_id && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.project_id}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* WP Code */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Work Package Code *
                                    </label>
                                    <div className="relative">
                                        <Code className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={data.wp_code}
                                            onChange={(e) => setData('wp_code', e.target.value)}
                                            placeholder="e.g., WP-CIV-001"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono ${
                                                errors.wp_code 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.wp_code && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.wp_code}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* WP Name */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Work Package Name *
                                    </label>
                                    <div className="relative">
                                        <Type className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <input
                                            type="text"
                                            value={data.wp_name}
                                            onChange={(e) => setData('wp_name', e.target.value)}
                                            placeholder="e.g., Civil Works"
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                errors.wp_name 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white placeholder-white/30' 
                                                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {errors.wp_name && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.wp_name}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Discipline */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        Discipline Code *
                                    </label>
                                    <div className="relative">
                                        <Layers className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                                            darkMode ? 'text-white/50' : 'text-gray-400'
                                        }`} />
                                        <select
                                            value={data.discipline_code}
                                            onChange={(e) => setData('discipline_code', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${
                                                errors.discipline_code 
                                                    ? 'border-red-500' 
                                                    : darkMode 
                                                        ? 'bg-white/10 border-white/20 text-white' 
                                                        : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                            required
                                        >
                                            <option value="" className={darkMode ? 'bg-gray-800' : 'bg-white'}>Select discipline</option>
                                            {disciplines.map(disc => (
                                                <option key={disc} value={disc} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                                    {disc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.discipline_code && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-red-500 flex items-center space-x-1"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.discipline_code}</span>
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Preview Card */}
                                {selectedProject && data.wp_code && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className={`p-6 rounded-xl border ${
                                            darkMode 
                                                ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-white/20' 
                                                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                                        }`}
                                    >
                                        <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Preview:</p>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                                    <Package className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 font-mono">
                                                            {data.wp_code}
                                                        </span>
                                                        {data.discipline_code && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                                                                {data.discipline_code}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                        {data.wp_name || 'Work Package Name'}
                                                    </h3>
                                                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                        Project: {selectedProject.project_code}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
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
                                        <span>{processing ? 'Saving...' : (isEdit ? 'Update Work Package' : 'Create Work Package')}</span>
                                    </motion.button>

                                    <Link href="/workpackages/manage">
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