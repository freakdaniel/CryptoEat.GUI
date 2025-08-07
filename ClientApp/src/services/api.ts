import axios from 'axios';
import { Settings, ScanResult, WalletInfo, BruteForceResult } from '../types';

const API_BASE = '/api';

export const settingsApi = {
  getSettings: async (): Promise<Settings> => {
    const response = await axios.get(`${API_BASE}/settings`);
    return response.data;
  },

  saveSettings: async (settings: Settings): Promise<void> => {
    await axios.post(`${API_BASE}/settings`, settings);
  },

  validateKey: async (): Promise<boolean> => {
    const response = await axios.post(`${API_BASE}/settings/validate-key`);
    return response.data;
  }
};

export const cryptoApi = {
  scanWallet: async (walletPath: string): Promise<ScanResult> => {
    const response = await axios.post(`${API_BASE}/crypto/scan-wallet`, JSON.stringify(walletPath), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  processFolder: async (folderPath: string): Promise<WalletInfo[]> => {
    const response = await axios.post(`${API_BASE}/crypto/process-folder`, JSON.stringify(folderPath), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  bruteForce: async (target: string): Promise<BruteForceResult> => {
    const response = await axios.post(`${API_BASE}/crypto/brute-force`, JSON.stringify(target), {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  }
};

export const networkApi = {
  loadProxies: async (): Promise<void> => {
    await axios.post(`${API_BASE}/network/load-proxies`);
  },

  testConnection: async (url: string): Promise<boolean> => {
    const response = await axios.get(`${API_BASE}/network/test-connection?url=${encodeURIComponent(url)}`);
    return response.data;
  },

  getProxyStatus: async (): Promise<{ hasProxies: boolean }> => {
    const response = await axios.get(`${API_BASE}/network/proxy-status`);
    return response.data;
  }
};
