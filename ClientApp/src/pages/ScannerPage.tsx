import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cryptoApi } from '../services/api';
import { WalletInfo, BruteForceResult } from '../types';
import './ScannerPage.css';

const ScannerPage: React.FC = () => {
  const [folderPath, setFolderPath] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<WalletInfo[]>([]);
  const [bruteTarget, setBruteTarget] = useState('');
  const [brutingLoading, setBrutingLoading] = useState(false);
  const [bruteResult, setBruteResult] = useState<BruteForceResult | null>(null);

  const handleScanFolder = async () => {
    if (!folderPath) {
      alert('Введите путь к папке');
      return;
    }

    try {
      setScanning(true);
      setScanResults([]);
      const results = await cryptoApi.processFolder(folderPath);
      setScanResults(results);
    } catch (error) {
      console.error('Ошибка сканирования:', error);
      alert('Ошибка при сканировании папки');
    } finally {
      setScanning(false);
    }
  };

  const handleBruteForce = async () => {
    if (!bruteTarget) {
      alert('Введите цель для брутфорса');
      return;
    }

    try {
      setBrutingLoading(true);
      setBruteResult(null);
      const result = await cryptoApi.bruteForce(bruteTarget);
      setBruteResult(result);
    } catch (error) {
      console.error('Ошибка брутфорса:', error);
      alert('Ошибка при выполнении брутфорса');
    } finally {
      setBrutingLoading(false);
    }
  };

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
      <motion.div className="scanner-header" variants={itemVariants}>
        <h1>Сканер кошельков</h1>
        <p>Сканирование и анализ криптовалютных кошельков</p>
      </motion.div>

      <motion.div className="scanner-grid" variants={itemVariants}>
        <div className="scanner-card glass-card">
          <div className="card-header">
            <i className="bx bx-search-alt card-icon"></i>
            <h3>Сканирование папки</h3>
          </div>
          
          <div className="scan-controls">
            <div className="form-group">
              <label className="form-label">
                <i className="bx bx-folder"></i>
                Путь к папке с кошельками
              </label>
              <input
                type="text"
                className="input form-control"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
                placeholder="C:\Users\Username\Desktop\Wallets"
                disabled={scanning}
              />
            </div>
            
            <motion.button
              className="btn btn-primary"
              onClick={handleScanFolder}
              disabled={scanning || !folderPath}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-play"></i>
              {scanning ? 'Сканирование...' : 'Начать сканирование'}
            </motion.button>
          </div>

          {scanResults.length > 0 && (
            <div className="scan-results">
              <div className="results-header">
                <i className="bx bx-list-ul"></i>
                <h4>Результаты сканирования ({scanResults.length} кошельков)</h4>
              </div>
              <div className="results-list">
                {scanResults.map((wallet, index) => (
                  <div key={index} className="wallet-item">
                    <div className="wallet-header">
                      <span className="wallet-name">{wallet.name}</span>
                      <span className="wallet-type-badge">{wallet.type}</span>
                    </div>
                    <div className="wallet-details">
                      <div className="wallet-stat">
                        <i className="bx bx-wallet"></i>
                        <span className={`wallet-balance ${wallet.balance > 0 ? 'positive' : 'zero'}`}>
                          {wallet.balance.toFixed(8)} BTC
                        </span>
                      </div>
                      <div className="wallet-stat">
                        <i className={`bx ${wallet.isEncrypted ? 'bx-lock' : 'bx-lock-open'}`}></i>
                        <span className={`wallet-encrypted ${wallet.isEncrypted ? 'encrypted' : 'plain'}`}>
                          {wallet.isEncrypted ? 'Зашифрован' : 'Открыт'}
                        </span>
                      </div>
                      <div className="wallet-stat">
                        <i className="bx bx-list-ol"></i>
                        <span>Адресов: {wallet.addresses.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="scanner-card glass-card">
          <div className="card-header">
            <i className="bx bx-shield-x card-icon"></i>
            <h3>Брутфорс</h3>
          </div>
          
          <div className="brute-controls">
            <div className="form-group">
              <label className="form-label">
                <i className="bx bx-target-lock"></i>
                Цель для брутфорса
              </label>
              <input
                type="text"
                className="input form-control"
                value={bruteTarget}
                onChange={(e) => setBruteTarget(e.target.value)}
                placeholder="Путь к зашифрованному кошельку"
                disabled={brutingLoading}
              />
            </div>

            <motion.button
              className="btn btn-warning"
              onClick={handleBruteForce}
              disabled={brutingLoading || !bruteTarget}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-shield-quarter"></i>
              {brutingLoading ? 'Выполняется брутфорс...' : 'Начать брутфорс'}
            </motion.button>
          </div>

          {bruteResult && (
            <div className="brute-result">
              <div className={`result-header ${bruteResult.success ? 'success' : 'failure'}`}>
                <i className={`bx ${bruteResult.success ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
                <h4>{bruteResult.success ? 'Пароль найден!' : 'Пароль не найден'}</h4>
              </div>
              {bruteResult.success && bruteResult.foundPassword && (
                <div className="password-result">
                  <div className="password-display">
                    <i className="bx bx-key"></i>
                    <span className="password-text">{bruteResult.foundPassword}</span>
                  </div>
                </div>
              )}
              <div className="brute-stats">
                <div className="stat-item">
                  <span>Время выполнения:</span>
                  <span>{bruteResult.duration}</span>
                </div>
                <div className="stat-item">
                  <span>Попыток:</span>
                  <span>{bruteResult.attemptedPasswords}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScannerPage;
