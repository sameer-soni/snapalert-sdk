<div align="center">
  
<img src="./logo.svg" alt="SnapAlert Logo" width="64" height="64"/>

# SnapAlert

**Intelligent error monitoring and alerting for Node.js**

  <p>
    <a href="https://www.npmjs.com/package/snapalert"><img src="https://img.shields.io/npm/v/snapalert?style=flat-square&color=FF8C00" alt="npm version"/></a>
    <a href="https://www.npmjs.com/package/snapalert"><img src="https://img.shields.io/npm/dm/snapalert?style=flat-square&color=FFB347" alt="downloads"/></a>
    <a href="#"><img src="https://img.shields.io/badge/TypeScript-Ready-FFA500?style=flat-square" alt="TypeScript"/></a>
    <a href="#"><img src="https://img.shields.io/npm/l/snapalert?style=flat-square&color=FF6347" alt="License"/></a>
  </p>
  
  <p>Monitor your app errors and get notified when thresholds are reached.</p>
</div>

---

## ✨ Features

- 📧 **Multi-channel alerts** - Email, SMS, and voice calls
- 🎯 **Smart thresholds** - Alert only when error patterns matter
- ⚡ **Zero config** - Works out of the box
- 🔒 **Secure** - API key authentication
- 📦 **Lightweight** - Minimal dependencies

---

## 🚀 Installation

```bash
npm install snapalert
```

---

## 🔧 Quick Start

```javascript
const { setApiKey, setConfig, alertOnError } = require("snapalert");

// 1. Set your API key
setApiKey("your-api-key-here");

// 2. Configure thresholds
setConfig({
  errorThreshold: 3, // Alert after 3 errors
  intervalMinutes: 5, // Within 5 minutes
});

// 3. Use in your catch blocks
try {
  // Your risky code here
  await database.connect();
} catch (error) {
  alertOnError(error.message, {
    alertMethods: ["mail", "sms"],
  });
  // Only alerts after 3 errors in 5 minutes
}
```

---

## 📖 API Reference

### `setApiKey(key)`

Set your SnapAlert API key.

```javascript
setApiKey("your_api_key");
```

### `setConfig(options)`

Configure error thresholds.

| **Option**        | **Type** | **Default** | **Description**                             |
| ----------------- | -------- | ----------- | ------------------------------------------- |
| `errorThreshold`  | `number` | `5`         | Minimum errors needed before alert triggers |
| `intervalMinutes` | `number` | `1`         | Time window to count errors (minutes)       |

### `alertOnError(message, options)`

Report an error and trigger alerts when threshold is reached.

| **Option**     | **Type** | **Description**                      |
| -------------- | -------- | ------------------------------------ |
| `message`      | `string` | Error message to report              |
| `alertMethods` | `array`  | Available: `['mail', 'sms', 'call']` |

---

## 💡 Examples

### **Express.js Error Handler**

```javascript
const express = require("express");
const { setApiKey, setConfig, alertOnError } = require("snapalert");

const app = express();
setApiKey(process.env.SNAPALERT_API_KEY);

setConfig({
  errorThreshold: 10, // Alert after 10 errors
  intervalMinutes: 5, // Within 5 minutes
});

app.use((err, req, res, next) => {
  alertOnError(err.message, {
    alertMethods: ["mail"],
  });

  res.status(500).json({ error: "Server Error" });
});
```

### **Database Connection Monitoring**

```javascript
const mongoose = require("mongoose");
const { alertOnError } = require("snapalert");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    // Only alerts after threshold is reached
    alertOnError(`Database failed: ${error.message}`, {
      alertMethods: ["sms", "call"],
    });
  }
}
```

## 🎯 Alert Methods

| **Method** | **When to Use**                                     |
| ---------- | --------------------------------------------------- |
| `mail`     | General notifications and reports                   |
| `sms`      | Urgent alerts that need immediate attention         |
| `call`     | Critical system failures requiring instant response |

---

## 🛡️ TypeScript

Full TypeScript support included:

```typescript
import { setApiKey, alertOnError } from "snapalert";

setApiKey("your-key");

alertOnError("Error occurred", {
  alertMethods: ["mail"],
});
```

---

<div align="center">
  <p>Questions? <strong>xslei.dev@gmail.com</strong></p>
</div>
