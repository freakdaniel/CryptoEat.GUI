import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Главная', icon: 'bx-home-alt' },
        { path: '/statistics', label: 'Статистика', icon: 'bx-bar-chart-alt-2' },
        { path: '/network', label: 'Сеть', icon: 'bx-globe' },
        { path: '/scanner', label: 'Сканер', icon: 'bx-search-alt' },
        { path: '/settings', label: 'Настройки', icon: 'bx-cog' }
    ];

    return (
        <motion.nav
            className="navigation"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/*<div className="nav-brand">*/}
            {/*  <motion.h1*/}
            {/*    initial={{ scale: 0.8, opacity: 0 }}*/}
            {/*    animate={{ scale: 1, opacity: 1 }}*/}
            {/*    transition={{ delay: 0.2, duration: 0.5 }}*/}
            {/*  >*/}
            {/*    CryptoEat*/}
            {/*  </motion.h1>*/}
            {/*</div>*/}
            <ul className="nav-menu">
                {navItems.map((item, index) => (
                    <motion.li
                        key={item.path}
                        className="nav-item"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * (index + 1), duration: 0.4 }}
                    >
                        <Link
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <i className={`bx ${item.icon} nav-icon`}></i>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Navigation;