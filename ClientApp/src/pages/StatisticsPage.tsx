import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanResult, NetworkStats } from '../types';
import './StatisticsPage.css';

const StatisticsPage: React.FC = () => {
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    activeProxies: 0,
    averageResponseTime: '0ms'
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    // Пока что моковые данные для демонстрации
    setScanResults([
      {
        walletPath: '/example/wallet1.dat',
        isValid: true,
        balance: 0.5,
        addresses: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
        scanTime: new Date().toISOString()
      }
    ]);
  };

  const successRate = networkStats.totalRequests > 0 
    ? ((networkStats.successfulRequests / networkStats.totalRequests) * 100).toFixed(2)
    : '0';

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
      <motion.div className="statistics-header" variants={itemVariants}>
        <h1>Статистика</h1>
        <p>Результаты сканирования и сетевая статистика</p>
      </motion.div>

      <motion.div className="stats-grid" variants={itemVariants}>
        <div className="stats-card glass-card">
          <div className="card-header">
            <i className="bx bx-bar-chart-alt-2 card-icon"></i>
            <h3>Сетевая статистика</h3>
          </div>
          <div className="stats-list">
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-send"></i>
                Всего запросов
              </span>
              <span className="stats-value">{networkStats.totalRequests}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-check-circle"></i>
                Успешных запросов
              </span>
              <span className="stats-value success">{networkStats.successfulRequests}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-x-circle"></i>
                Неудачных запросов
              </span>
              <span className="stats-value error">{networkStats.failedRequests}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-wifi"></i>
                Активных прокси
              </span>
              <span className="stats-value">{networkStats.activeProxies}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-time"></i>
                Среднее время ответа
              </span>
              <span className="stats-value">{networkStats.averageResponseTime}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">
                <i className="bx bx-trophy"></i>
                Процент успеха
              </span>
              <span className="stats-value">{successRate}%</span>
            </div>
          </div>
        </div>

        <div className="stats-card glass-card">
          <div className="card-header">
            <i className="bx bx-wallet card-icon"></i>
            <h3>Результаты сканирования</h3>
          </div>
          <div className="scan-results">
            {scanResults.length > 0 ? (
              scanResults.map((result, index) => (
                <div key={index} className="scan-result-item">
                  <div className="result-header">
                    <i className={`bx ${result.isValid ? 'bx-check-circle success' : 'bx-x-circle error'}`}></i>
                    <span className="wallet-path">{result.walletPath}</span>
                  </div>
                  <div className="result-details">
                    <div className="detail-item">
                      <span>Баланс:</span>
                      <span className="balance">{result.balance} BTC</span>
                    </div>
                    <div className="detail-item">
                      <span>Адресов:</span>
                      <span>{result.addresses.length}</span>
                    </div>
                    <div className="detail-item">
                      <span>Время сканирования:</span>
                      <span>{new Date(result.scanTime).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="bx bx-search"></i>
                <p>Нет результатов сканирования</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsPage;
