import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';
import NetworkPage from './pages/NetworkPage';
import ScannerPage from './pages/ScannerPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    const pageVariants = {
        initial: {
            opacity: 0,
            x: 20,
            scale: 0.98
        },
        in: {
            opacity: 1,
            x: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            x: -20,
            scale: 0.98
        }
    };

    const pageTransition = {
        type: "tween" as const,
        ease: "anticipate" as const,
        duration: 0.4
    } as const;

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <HomePage />
                    </motion.div>
                } />
                <Route path="/statistics" element={
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <StatisticsPage />
                    </motion.div>
                } />
                <Route path="/network" element={
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <NetworkPage />
                    </motion.div>
                } />
                <Route path="/scanner" element={
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <ScannerPage />
                    </motion.div>
                } />
                <Route path="/settings" element={
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <SettingsPage />
                    </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Navigation />
                <main className="app-content">
                    <AnimatedRoutes />
                </main>
            </div>
        </Router>
    );
};

export default App;