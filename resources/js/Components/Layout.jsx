import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FolderKanban,
    Package,
    ListChecks,
    TrendingUp,
    Menu,
    ChevronRight,
    Settings
} from 'lucide-react';

export default function Layout({ children, darkMode = true }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { url } = usePage();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
            active: url === '/'
        },
        {
            name: 'Projects',
            href: '/projects/manage',
            icon: FolderKanban,
            active: url.startsWith('/projects/manage')
        },
        {
            name: 'Work Packages',
            href: '/workpackages/manage',
            icon: Package,
            active: url.startsWith('/workpackages/manage')
        },
        {
            name: 'BOQ Items',
            href: '/boqs/manage',
            icon: ListChecks,
            active: url.startsWith('/boqs/manage')
        },
        {
            name: 'Add Progress',
            href: '/progress/create',
            icon: TrendingUp,
            active: url === '/progress/create'
        },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - MUCH MORE VISIBLE in light mode */}
            <AnimatePresence mode="wait">
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className={`fixed left-0 top-0 bottom-0 w-64 border-r-4 shadow-2xl z-50 flex flex-col ${
                            darkMode 
                                ? 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-slate-700'
                                : 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 border-slate-400'
                        }`}
                    >
                        {/* Logo + Hamburger */}
                        <div className={`p-6 border-b-2 ${
                            darkMode 
                                ? 'border-slate-700 bg-slate-900/80' 
                                : 'border-slate-300 bg-slate-100/80'
                        }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow"
                                    >
                                        <Package className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GEMS</h1>
                                        <p className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Management</p>
                                    </div>
                                </div>
                                
                                {/* Hamburger button - close sidebar */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`p-2 rounded-lg transition-colors ${
                                        darkMode 
                                            ? 'bg-slate-700/50 text-white hover:bg-slate-600' 
                                            : 'bg-slate-300/50 text-gray-900 hover:bg-slate-400'
                                    }`}
                                >
                                    <Menu className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Navigation - Scrollable */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center space-x-3 px-4 py-3 rounded-xl
                                            transition-all duration-200 group
                                            ${item.active 
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow' 
                                                : darkMode
                                                    ? 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                                    : 'text-gray-700 hover:bg-slate-300 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 ${item.active ? '' : 'group-hover:scale-110 transition-transform'}`} />
                                        <span className="font-medium">{item.name}</span>
                                        {item.active && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="ml-auto"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className={`p-4 border-t-2 ${
                            darkMode 
                                ? 'border-slate-700 bg-slate-950/80' 
                                : 'border-slate-300 bg-slate-100/80'
                        }`}>
                            <button className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                                darkMode 
                                    ? 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                    : 'text-gray-700 hover:bg-slate-300 hover:text-gray-900'
                            }`}>
                                <Settings className="w-5 h-5" />
                                <span className="text-sm">Settings</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {!sidebarOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSidebarOpen(true)}
                        className="fixed top-4 left-4 z-[60] p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-glow-lg transition-all border-2 border-white/20"
                        style={{ position: 'fixed' }}
                    >
                        <Menu className="w-6 h-6" />
                    </motion.button>
                )}

                {children}
            </div>
        </div>
    );
}