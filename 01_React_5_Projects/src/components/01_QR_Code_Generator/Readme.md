# QR Code Generator

A simple and responsive QR Code Generator built with React and Tailwind CSS. It uses the `react-qr-code` third-party library to generate QR codes from user-provided text or URLs.

## ✨ Features

- Generate QR codes from text or URLs.
- Automatically clears the input field after generating a QR code.
- Disables the Generate button when the input is empty or contains only whitespace.

## 🛠️ Technologies Used

- React
- Tailwind CSS
- [react-qr-code](https://www.npmjs.com/package/react-qr-code)

## 📦 Installation

Install the required third-party package:

```bash
npm install react-qr-code
```

## 🚀 Usage

1. Enter any text or URL into the input field.
2. Click the **Generate QR Code** button.
3. The QR code will appear below the input field.
4. Scan the QR code using a compatible device to access the encoded content.

## 🧠 How It Works

- **`input` state:** Stores the text entered by the user.
- **`qrCode` state:** Stores the text or URL used to generate the QR code.
- **`handleGenerateQRCode()` function:** Updates the QR code state with the input value and clears the input field.
- **`QRCode` component:** Converts the provided value into a QR code using the `react-qr-code` library.

## 📁 Component Structure

```text
src/
└── components/
    └── QR_Code_Generator.tsx
```
