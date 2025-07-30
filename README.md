# E-Snapp Mobile

A React Native mobile application for smart energy management and monitoring.

## Features

### ✅ Implemented
- **Authentication System**
  - Login/Register with email validation
  - Forgot password functionality
  - Email verification
  - Secure token management

- **Onboarding Flow**
  - Welcome screens with app introduction
  - Skip functionality
  - First-time user experience

- **Home Dashboard**
  - Real-time energy consumption overview
  - Current usage and cost display
  - Quick action buttons
  - Device status monitoring
  - Recent activity feed

- **Navigation**
  - Bottom tab navigation
  - Stack navigation for auth flow
  - Custom tab bar with icons

- **UI Components**
  - Custom buttons with loading states
  - Energy cards for metrics display
  - Device cards with status indicators
  - Quick action cards
  - Form inputs with validation

- **State Management**
  - Context API for authentication
  - Context API for energy data
  - AsyncStorage for local persistence

### 🚧 In Progress
- **Trends Screen**
  - Energy consumption charts
  - Usage breakdown by room/device
  - Historical data analysis

- **Realtime Screen**
  - Live energy monitoring
  - Device status updates
  - Real-time alerts

- **Billing Screen**
  - Bill upload functionality
  - Payment history
  - Usage analysis

- **Profile Screen**
  - User profile management
  - Settings configuration
  - App preferences

### 📋 Planned Features
- **Device Management**
  - Add/remove smart devices
  - Device configuration
  - WiFi setup for devices

- **Energy Analytics**
  - Advanced charts and graphs
  - Usage predictions
  - Cost optimization suggestions

- **Notifications**
  - Push notifications
  - Energy usage alerts
  - Bill reminders

- **Offline Support**
  - Data caching
  - Offline functionality
  - Sync when online

## Technology Stack

- **Framework**: React Native 0.72.6
- **Language**: JavaScript/ES6+
- **Navigation**: React Navigation v6
- **State Management**: Context API
- **Storage**: AsyncStorage
- **HTTP Client**: Axios
- **UI Components**: Custom components with React Native
- **Icons**: Emoji icons (can be replaced with vector icons)
- **Charts**: React Native Chart Kit (planned)
- **Animations**: React Native Reanimated

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CustomButton.js
│   ├── CustomTabBar.js
│   ├── EnergyCard.js
│   ├── DeviceCard.js
│   └── QuickActionCard.js
├── constants/          # App constants and configuration
│   └── index.js
├── context/           # Context providers
│   ├── AuthContext.js
│   └── EnergyContext.js
├── screens/           # Screen components
│   ├── SplashScreen.js
│   ├── OnboardingScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── ForgotPasswordScreen.js
│   ├── HomeScreen.js
│   ├── TrendsScreen.js
│   ├── RealtimeScreen.js
│   ├── BillingScreen.js
│   └── ProfileScreen.js
├── services/          # API services
│   └── apiService.js
└── App.js            # Main app component
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-snapp-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

## Configuration

### API Configuration
Update the API base URL in `src/constants/index.js`:
```javascript
export const API = {
  baseURL: 'https://your-api-url.com',
  timeout: 10000,
};
```

### Environment Variables
Create a `.env` file in the root directory:
```
API_BASE_URL=https://your-api-url.com
```

## Development

### Code Style
- Use functional components with hooks
- Follow React Native best practices
- Use consistent naming conventions
- Implement proper error handling

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace e-snapp-mobile.xcworkspace -scheme e-snapp-mobile -configuration Release
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 