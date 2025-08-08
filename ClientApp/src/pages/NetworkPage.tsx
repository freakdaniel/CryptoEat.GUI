import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { networkApi } from '../services/api';
import './NetworkPage.css';

interface ProxyItem {
  ip: string;
  port: number;
  type: string;
  status: 'working' | 'not_working' | 'not_checked';
  hasAuth: boolean;
  login?: string;
  password?: string;
}

const NetworkPage: React.FC = () => {
  const [proxyStatus, setProxyStatus] = useState({ hasProxies: false });
  const [loading, setLoading] = useState(false);
  const [connectionTest, setConnectionTest] = useState<{ url: string; result: boolean | null }>({
    url: 'https://httpbin.org/ip',
    result: null
  });
  const [testLoading, setTestLoading] = useState(false);
  const [proxyList, setProxyList] = useState<ProxyItem[]>([]);
  const [isProxyTableExpanded, setIsProxyTableExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadProxyStatus();
  }, []);

  const loadProxyStatus = async () => {
    try {
      const status = await networkApi.getProxyStatus();
      setProxyStatus(status);
    } catch (error) {
      console.error('Ошибка загрузки статуса прокси:', error);
    }
  };

  const handleLoadProxies = async () => {
    try {
      setLoading(true);
      await networkApi.loadProxies();
      await loadProxyStatus();
      alert('Прокси успешно загружены!');
    } catch (error) {
      console.error('Ошибка загрузки прокси:', error);
      alert('Ошибка при загрузке прокси');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    try {
      setTestLoading(true);
      const result = await networkApi.testConnection(connectionTest.url);
      setConnectionTest(prev => ({ ...prev, result }));
    } catch (error) {
      console.error('Ошибка тестирования соединения:', error);
      setConnectionTest(prev => ({ ...prev, result: false }));
    } finally {
      setTestLoading(false);
    }
  };

  // Моковые данные для демонстрации
  useEffect(() => {
    const mockProxies: ProxyItem[] = [
      { ip: '192.168.1.1', port: 8080, type: 'HTTP', status: 'working', hasAuth: true, login: 'user1', password: 'pass1' },
      { ip: '10.0.0.1', port: 1080, type: 'SOCKS5', status: 'not_working', hasAuth: false },
      { ip: '172.16.0.1', port: 3128, type: 'HTTP', status: 'not_checked', hasAuth: true, login: 'user2', password: 'pass2' },
      // Добавим больше данных для демонстрации пагинации
      ...Array.from({ length: 25 }, (_, i) => ({
        ip: `192.168.${Math.floor(i / 10) + 2}.${(i % 10) + 1}`,
        port: 8080 + i,
        type: i % 2 === 0 ? 'HTTP' : 'SOCKS5',
        status: (['working', 'not_working', 'not_checked'] as const)[i % 3],
        hasAuth: i % 3 === 0,
        login: i % 3 === 0 ? `user${i}` : undefined,
        password: i % 3 === 0 ? `pass${i}` : undefined,
      }))
    ];
    setProxyList(mockProxies);
  }, []);

  const totalPages = Math.ceil(proxyList.length / itemsPerPage);
  const currentProxies = proxyList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadgeClass = (status: ProxyItem['status']) => {
    switch (status) {
      case 'working': return 'success';
      case 'not_working': return 'error';
      case 'not_checked': return 'neutral';
      default: return 'neutral';
    }
  };

  const getStatusText = (status: ProxyItem['status']) => {
    switch (status) {
      case 'working': return 'Работает';
      case 'not_working': return 'Не работает';
      case 'not_checked': return 'Не проверялось';
      default: return 'Неизвестно';
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
      <motion.div className="network-header" variants={itemVariants}>
        <h1>Сетевые настройки</h1>
        <p>Управление прокси и тестирование соединения</p>
      </motion.div>

      <motion.div className="network-grid" variants={itemVariants}>
        <div className="network-card glass-card">
          <div className="card-header">
            <i className="bx bx-wifi card-icon"></i>
            <h3>Статус прокси</h3>
          </div>
          
          <div className="status-display">
            <div className="status-item">
              <span className="status-label">
                <i className="bx bx-server"></i>
                Статус прокси
              </span>
              <span className={`status-badge ${proxyStatus.hasProxies ? 'active' : 'inactive'}`}>
                <i className={`bx ${proxyStatus.hasProxies ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
                {proxyStatus.hasProxies ? 'Прокси загружены' : 'Прокси не загружены'}
              </span>
            </div>
          </div>
          
          <div className="proxy-actions">
            <motion.button 
              className="btn btn-primary"
              onClick={handleLoadProxies}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-download"></i>
              {loading ? 'Загрузка...' : 'Загрузить прокси'}
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              onClick={loadProxyStatus}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-refresh"></i>
              Обновить статус
            </motion.button>
          </div>
        </div>

        <div className="network-card glass-card">
          <div className="card-header">
            <i className="bx bx-network-chart card-icon"></i>
            <h3>Тест соединения</h3>
          </div>
          
          <div className="connection-test">
            <div className="form-group">
              <label className="form-label">
                <i className="bx bx-link"></i>
                URL для тестирования
              </label>
              <input
                type="url"
                className="input form-control"
                value={connectionTest.url}
                onChange={(e) => setConnectionTest(prev => ({ ...prev, url: e.target.value, result: null }))}
                placeholder="https://example.com"
              />
            </div>

            {connectionTest.result !== null && (
              <div className="test-result">
                <div className={`result-badge ${connectionTest.result ? 'success' : 'error'}`}>
                  <i className={`bx ${connectionTest.result ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
                  {connectionTest.result ? 'Соединение успешно' : 'Соединение не удалось'}
                </div>
              </div>
            )}

            <div className="test-actions">
              <motion.button 
                className="btn btn-primary"
                onClick={handleTestConnection}
                disabled={testLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bx bx-test-tube"></i>
                {testLoading ? 'Тестирование...' : 'Тестировать соединение'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Добавляем карточку с таблицей прокси */}
      <motion.div 
        className="proxy-table-card glass-card"
        variants={itemVariants}
      >
        <div 
          className="proxy-table-header"
          onClick={() => setIsProxyTableExpanded(!isProxyTableExpanded)}
        >
          <div className="card-header">
            <i className="bx bx-list-ul card-icon"></i>
            <h3>Список прокси ({proxyList.length})</h3>
          </div>
          <motion.i 
            className={`bx bx-chevron-${isProxyTableExpanded ? 'up' : 'down'} collapse-icon`}
            animate={{ rotate: isProxyTableExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.i>
        </div>

        <AnimatePresence>
          {isProxyTableExpanded && (
            <motion.div
              className="proxy-table-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {proxyList.length > 0 ? (
                <>
                  <div className="proxy-table-wrapper">
                    <table className="proxy-table">
                      <thead>
                        <tr>
                          <th>IP</th>
                          <th>Порт</th>
                          <th>Тип</th>
                          <th>Состояние</th>
                          <th>Авторизация</th>
                          <th>Логин</th>
                          <th>Пароль</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProxies.map((proxy, index) => (
                          <motion.tr
                            key={`${proxy.ip}:${proxy.port}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="proxy-ip">{proxy.ip}</td>
                            <td className="proxy-port">{proxy.port}</td>
                            <td>
                              <span className="proxy-type-badge">{proxy.type}</span>
                            </td>
                            <td>
                              <span className={`status-badge ${getStatusBadgeClass(proxy.status)}`}>
                                <i className={`bx ${proxy.status === 'working' ? 'bx-check-circle' : proxy.status === 'not_working' ? 'bx-x-circle' : 'bx-question-mark'}`}></i>
                                {getStatusText(proxy.status)}
                              </span>
                            </td>
                            <td>
                              <span className={`auth-badge ${proxy.hasAuth ? 'has-auth' : 'no-auth'}`}>
                                <i className={`bx ${proxy.hasAuth ? 'bx-check' : 'bx-x'}`}></i>
                                {proxy.hasAuth ? 'Да' : 'Нет'}
                              </span>
                            </td>
                            <td className="proxy-credentials">
                              {proxy.login || '—'}
                            </td>
                            <td className="proxy-credentials">
                              {proxy.password ? '••••••••' : '—'}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="btn pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      >
                        <i className="bx bx-chevron-left"></i>
                      </button>
                      
                      <div className="pagination-info">
                        <span>Страница {currentPage} из {totalPages}</span>
                      </div>
                      
                      <button
                        className="btn pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-proxies">
                  <i className="bx bx-wifi-off"></i>
                  <p>Прокси не загружены</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default NetworkPage;
