# CryptoEat GUI 2.0

Графическая версия криптографического анализатора кошельков с интерфейсом на Electron + React.

**Оригинальный разработчик:** [kzorin52](https://github.com/kzorin52)

## 🚀 Технический стек

### Backend
- **Платформа:** .NET 9.0 (C#)
- **Веб-фреймворк:** ASP.NET Core Web API
- **Electron интеграция:** ElectronNET.API v23.6.2
- **Криптографические библиотеки:**
  - NBitcoin.Altcoins v3.0.19
  - Nethereum.HdWallet v4.15.2
  - HDWallet.Core v0.11.0
  - HDWallet.Tron v0.7.0
  - Portable.BouncyCastle v1.9.0

### Frontend
- **UI Framework:** React 19.1.1 + TypeScript 5.9.2
- **Роутинг:** React Router DOM v7.8.0
- **HTTP клиент:** Axios v1.11.0
- **Анимации:** Framer Motion v12.23.12
- **Иконки:** Boxicons v2.1.4
- **Сборка:** React Scripts v5.0.1

### Desktop
- **Платформа:** Electron v32.0.0
- **Архитектура:** Hybrid Web + Native

## 📋 Функционал и возможности

### Поддерживаемые кошельки
- **Browser Wallets:** Metamask, Ronin Wallet, Binance Chain, Brave Wallet
- **Desktop Wallets:** Exodus, Atomic Wallet

### Основные функции
- ✅ **GPU брутфорс** для всех кошельков (кроме Atomic Wallet)
- ✅ **Автовывод средств** с найденных кошельков
- ✅ **Автосвап** для BSC и Ethereum сетей
- ✅ **Модульная архитектура** для легкого добавления новых сетей
- ✅ **Многопоточность** и асинхронная обработка
- ✅ **Поддержка прокси** различных форматов с ротацией

### Методы атак
- 🔍 **Брутфорс с комбинациями** и мутациями паролей
- 🔍 **Интеграция с базами данных** (Antipublic MYRZ, FTP, FileGrabber)
- 🔍 **Поиск seed фраз** в файловых системах
- 🔍 **Сканирование блокчейнов** (Bitcoin, Litecoin, Tron)

### Сканирование и анализ
- 📊 **DeBank интеграция** для анализа портфелей
- 📊 **Предварительный скан** с сортировкой по балансу
- 📊 **Кеширование результатов** для оптимизации
- 📊 **Детальное логирование** всех операций

## 🛠️ Установка и сборка

### Предварительные требования
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/)
- [ElectronNET CLI](https://www.npmjs.com/package/electronnet-cli)

### Шаг 1: Клонирование репозитория
```bash
git clone <repository-url>
cd CryptoEat.GUI
```

### Шаг 2: Установка .NET зависимостей
```bash
dotnet restore
```

### Шаг 3: Установка ElectronNET CLI
```bash
dotnet tool install ElectronNET.CLI -g
```

### Шаг 4: Настройка React приложения
```bash
cd ClientApp
npm install
npm run build
cd ..
```

### Шаг 5: Инициализация Electron
```bash
electronize init
```

### Шаг 6: Запуск в режиме разработки
```bash
electronize start
```

### Сборка для продакшена
```bash
# Windows
electronize build /target win

# Linux
electronize build /target linux

# macOS
electronize build /target osx
```

## ⚙️ Конфигурация

### Настройка портов
Приложение использует порт **8001** для связи между Electron и ASP.NET Core.
Конфигурация находится в файле `electron.manifest.json`:

```json
{
  "aspCoreBackendPort": 8001,
  "name": "CryptoEat",
  "executable": "CGUI"
}
```

### Настройка сервисов
Основные сервисы регистрируются в `Program.cs`:
- `SettingsService` - управление настройками
- `CryptoService` - криптографические операции  
- `NetworkService` - сетевые операции

## 🏗️ Архитектура проекта

```
├── Controllers/          # ASP.NET Core Web API контроллеры
├── Services/            # Бизнес-логика и сервисы
├── Modules/             # Основные модули приложения
│   ├── Cryptocurrency/  # Работа с криптовалютами
│   ├── Scanners/       # Сканеры блокчейнов
│   ├── Wallet/         # Поддержка кошельков
│   └── Network/        # Сетевые операции
├── ClientApp/          # React frontend
│   ├── src/
│   │   ├── components/ # React компоненты
│   │   ├── pages/      # Страницы приложения
│   │   ├── services/   # Frontend сервисы
│   │   └── types/      # TypeScript типы
│   └── build/          # Собранное React приложение
└── obj/Host/           # Electron host файлы
```

## 🔧 Разработка

### Запуск в режиме разработки
```bash
# Запуск только ASP.NET Core API
dotnet run

# Запуск с Electron
electronize start

# Запуск React в dev режиме (в отдельном терминале)
cd ClientApp
npm start
```

### Отладка
- **Backend:** Используйте стандартные инструменты отладки .NET (Visual Studio, VS Code, Rider)
- **Frontend:** Откройте DevTools в Electron окне (F12)
- **API:** Swagger UI доступен по адресу http://localhost:8001/swagger

## 📝 API Endpoints

```
GET    /api/settings          # Получение настроек
POST   /api/settings          # Сохранение настроек
GET    /api/crypto/scan       # Запуск сканирования
POST   /api/network/proxy     # Настройка прокси
```

## ⚠️ Правовая информация

**Программа создана исключительно в образовательных целях для тестирования безопасности собственных кошельков.**

Разработчики не несут ответственности за неправомерное использование данного программного обеспечения. Использование на чужих кошельках без разрешения владельца является незаконным.

## 🤝 Требования к окружению

### Для работы программы необходимы:
- **Прокси с ротацией** (обязательно!)
- **Достаточные вычислительные ресурсы** для GPU операций
- **Стабильное интернет-соединение**

**Примечание:** Если у вас нет прокси с ротацией или делового предложения, связанного с коммерческим использованием, просьба не обращаться за поддержкой.

**Оригинальный автор:** [kzorin52](https://github.com/kzorin52)
