import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { settingsApi } from '../services/api';
import { Settings } from '../types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [keyValid, setKeyValid] = useState<boolean | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsData = await settingsApi.getSettings();
      setSettings(settingsData);
      
      if (settingsData.antipublicKey) {
        const isValid = await settingsApi.validateKey();
        setKeyValid(isValid);
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Загрузка...</div>
        </div>
      </div>
    );
  }

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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="home-header" variants={itemVariants}>
        <h1>Добро пожаловать в CryptoEat</h1>
        <p>Криптографический анализатор кошельков</p>
      </motion.div>

      <motion.div className="status-cards" variants={itemVariants}>
        <motion.div 
          className="status-card glass-card"
        >
          <div className="card-header">
            <i className="bx bx-shield-check card-icon"></i>
            <h3>Статус системы</h3>
          </div>
          <div className="status-list">
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-key"></i>
                AntiPublic ключ:
              </span>
              <span className={`status-badge ${keyValid ? 'valid' : 'invalid'}`}>
                <i className={`bx ${keyValid ? 'bx-check' : 'bx-x'}`}></i>
                {keyValid ? 'Валидный' : 'Невалидный'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-radar"></i>
                Сканирование:
              </span>
              <span className={`status-badge ${settings?.scan ? 'enabled' : 'disabled'}`}>
                <i className={`bx ${settings?.scan ? 'bx-check' : 'bx-x'}`}></i>
                {settings?.scan ? 'Включено' : 'Отключено'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-chip"></i>
                GPU Brute:
              </span>
              <span className={`status-badge ${settings?.gpuBrute ? 'enabled' : 'disabled'}`}>
                <i className={`bx ${settings?.gpuBrute ? 'bx-check' : 'bx-x'}`}></i>
                {settings?.gpuBrute ? 'Включено' : 'Отключено'}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="status-card glass-card"
        >
          <div className="card-header">
            <i className="bx bx-cog card-icon"></i>
            <h3>Настройки</h3>
          </div>
          <div className="status-list">
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-trending-up"></i>
                Уровень брута:
              </span>
              <span className="status-value">{settings?.bruteLevel}</span>
            </div>
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-search-alt-2"></i>
                Глубина сканирования:
              </span>
              <span className="status-value">{settings?.scanDepth}</span>
            </div>
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-wallet"></i>
                Порог баланса:
              </span>
              <span className="status-value">{settings?.balanceThreshold}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="quick-actions" variants={itemVariants}>
        <div className="section-header">
          <i className="bx bx-bolt section-icon"></i>
          <h3>Быстрые действия</h3>
        </div>
        <div className="action-buttons">
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bx bx-play"></i>
            Начать сканирование
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bx bx-upload"></i>
            Загрузить прокси
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="bx bx-network-chart"></i>
            Проверить сеть
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
