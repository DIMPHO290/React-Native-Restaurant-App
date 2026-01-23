# 🍔 React Native Restaurant App

A full‑featured restaurant ordering application built with **React Native**, **Expo Router**, and **Redux Toolkit**.  
Users can browse menus, customize food items, manage their cart, checkout securely, and place orders.  
Admins have a dedicated dashboard to manage items, view orders, and analyze restaurant data.

---

## ✨ Features

### User
- **Authentication**: Register & login with email + password.
- **Profile Management**: Update name, email, address, contact number, and card details.
- **Menu Browsing**: View food items divided into categories (Desserts, Beverages, Burgers, Mains, Starters, etc.).
- **Item Details**: See description, price, image, and customize with sides, drinks, extras, and notes.
- **Cart**:
  - Add items with options
  - Edit quantity
  - Remove single items
  - Clear cart
- **Checkout**:
  - Change delivery address
  - Select/change card
  - Place orders (fake card tokens for testing)
- **Order History**: Linked to user profile via UID.

### Admin
- **Dashboard**: Overview of orders and revenue (with chart placeholder).
- **Items Management**: Add/update food items.
- **Orders Management**: View order history with status.
- **Restaurant Info**: Update restaurant details.
- **Icons & Badges**: Each admin tab has an icon; Orders tab shows badge with pending count.

---

## 🛠️ Tech Stack

- **React Native** (Expo)
- **Expo Router** for navigation
- **Redux Toolkit** for state management
- **TypeScript** for type safety
- **@expo/vector-icons (Ionicons)** for icons
- **AsyncStorage** for persistence (cart, auth)

---

## Installation & Testing (Android)

1. Clone the repo:  
```bash
https://github.com/DIMPHO290/React-Native-Restaurant-App.git
```
2. Navigate to project folder:  
```bash
cd react-native-note-taker
```
3. Open in VS Code:  
```bash
code .
```
4. Change to development branch:  
```bash
git checkout dev
```
5. Install dependencies:  
```bash
npm cache clean --force
rmdir /s /q node_modulesdel package-lock.json
npm install
```
6. Start Expo:  
```bash
npm start
```
7. Test on Android:  
   - Download **Expo Go** from Google Play.  
   - Scan the QR code from Expo DevTools.
  
## Download APK (Android)
You can download and install the Android APK here:

**[Download APK on Google
Drive](https://drive.google.com/file/d/1MHNvJcQ7LYeNCU7Mo_U7y2B6bqWmT3EC/view?usp=drive_link)**
