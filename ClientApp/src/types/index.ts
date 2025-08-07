export interface Settings {
  antipublicKey?: string;
  bruteLevel: number;
  strongBrute: boolean;
  seedGrabber: boolean;
  scan: boolean;
  gpuBrute: boolean;
  bruteTopPercent: number;
  balanceThreshold: number;
  scanDepth: number;
  addressToSend?: string;
  proxyPath?: string;
  proxyFormat?: string;
  bruteTopCount: number;
  antipublicWorking: boolean;
}

export interface ScanResult {
  walletPath: string;
  isValid: boolean;
  balance: number;
  addresses: string[];
  scanTime: string;
}

export interface WalletInfo {
  name: string;
  path: string;
  type: string;
  balance: number;
  addresses: string[];
  isEncrypted: boolean;
}

export interface BruteForceResult {
  success: boolean;
  attemptedPasswords: number;
  foundPassword?: string;
  duration: string;
}

export interface NetworkStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  activeProxies: number;
  averageResponseTime: string;
}

export interface AppState {
  isLoading: boolean;
  error?: string;
  settings: Settings;
  scanResults: ScanResult[];
  networkStats: NetworkStats;
}
