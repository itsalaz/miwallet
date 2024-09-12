# MiWallet

MiWallet is an iOS payment app built with React Native, Expo, Xcode, Swift, Flask, and SQL, using a combination of JavaScript and Python. It features a passcode screen and supports various types of payment processing through Stripe integration.

## Features

- **Apple Pay Integration**: Seamlessly integrates with Apple Pay.
- **Secure Payment Handling**: Allows users to input card details with secure authentication.
- **Passcode Protection**: Ensures security by allowing users to set a 6-digit passcode.

### Screenshots

#### 1. Payment Screen

![Payment Screen](./Users/elizabethdelgado/development/code/phase-5/miwallet/Assets/Payment.png)

This screen shows the available payment methods, including Apple Pay and manual card entry.

#### 2. PIN Code Screen

![PIN Code Screen](./Users/elizabethdelgado/development/code/phase-5/miwallet/Assets/PasscodeMobile.png)

This screen allows users to enter their passcode for secure access.

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Step 1: Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
npx react-native run-ios

cd server
python app.py
```
