# Umulopa Safe Transfer

> A secure, modern blood-bank management and transfer platform designed to improve the way blood, blood products, inventory, requests, and transfers are managed.

## 🩸 About Umulopa Safe Transfer

**Umulopa Safe Transfer** is a web-based blood-bank management system built to support the secure and efficient management of blood and blood-product operations.

The platform is designed to provide a centralized system where authorized users can manage blood inventory, monitor availability, process requests, coordinate transfers, and maintain accurate records.

The goal is to replace fragmented or manual processes with a reliable digital platform that improves **visibility, accountability, traceability, and operational efficiency**.

---

## 🎯 Project Goals

Umulopa Safe Transfer aims to:

* 🩸 Improve blood inventory management
* 🔄 Simplify blood and blood-product transfers
* 📦 Provide real-time visibility of available stock
* 📋 Improve the management of blood requests
* 🔐 Protect sensitive information through controlled access
* 👥 Support different user roles and responsibilities
* 📊 Provide useful operational information and dashboards
* 🧾 Maintain accurate transaction and transfer records
* 🔎 Improve traceability throughout the blood-management process
* ⚡ Reduce reliance on manual and fragmented workflows

---

## ✨ Core Features

### 🔐 Authentication & Access Control

* Secure user authentication
* Role-based access
* Protected application routes
* User profile management
* Controlled access to sensitive functionality

### 🩸 Blood Inventory Management

* View available blood stock
* Track blood groups
* Monitor quantities
* Manage inventory records
* Track stock movements
* Identify low-stock situations

### 📋 Blood Requests

* Create blood requests
* View pending requests
* Track request status
* Process requests
* Maintain request history
* Improve communication between requesting facilities and blood-bank personnel

### 🔄 Blood Transfers

* Initiate blood transfers
* Track transfer status
* Record transfer information
* Maintain transfer history
* Support traceability from request through fulfillment

### 📊 Dashboard

The system provides a centralized dashboard for viewing important operational information, including:

* Blood inventory
* Requests
* Transfers
* Activity
* System statistics
* Important alerts and status information

### 👤 User Management

Depending on the user's role, authorized administrators can manage:

* Users
* Roles
* Permissions
* Profiles
* Account status

---

## 🏗️ System Architecture

Umulopa Safe Transfer is structured as a full-stack application with separate frontend and backend components.

```text
Umulopa Safe Transfer
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── Components
│   ├── Pages
│   ├── API integration
│   └── User interface
│
├── Backend
│   ├── API
│   ├── Business logic
│   ├── Authentication
│   └── Data processing
│
└── Database
    └── PostgreSQL
```

---

## 🛠️ Technology Stack

### Frontend

* **React**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS**
* REST API integration

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* PostgreSQL

### Development Tools

* Git
* GitHub
* npm
* Visual Studio Code

---

## 📁 Project Structure

The frontend application is organized approximately as follows:

```text
frontend-umulopa/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── config.js
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── assets/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

You can verify your installations with:

```bash
node --version
npm --version
git --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Ahliah4/Umulopa-Safe-Transfer.git
```

Move into the project directory:

```bash
cd Umulopa-Safe-Transfer
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Frontend

Umulopa uses **Vite**, so start the development server with:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173/
```

> Note: This project uses Vite and therefore `npm start` is not the default command. Use `npm run dev`.

---

## 🔧 Environment Configuration

If the application requires environment variables, create a `.env` file in the project root.

Example:

```env
VITE_API_URL=http://localhost:5000
```

Use the appropriate API URL for your development or production environment.

> Never commit passwords, private keys, database credentials, API secrets, or other sensitive information to GitHub.

---

## 🔌 API Configuration

The frontend communicates with the backend through the API configuration located in:

```text
src/api/config.js
```

The API configuration should point to the correct backend server.

For local development, the backend may run on a URL such as:

```text
http://localhost:5000
```

The exact API configuration depends on the backend environment.

---

## 👥 User Roles

The system is designed to support role-based workflows.

Typical roles may include:

| Role                | Responsibilities                                          |
| ------------------- | --------------------------------------------------------- |
| Administrator       | Manage users, system configuration and overall operations |
| Blood Bank Staff    | Manage inventory, requests and blood operations           |
| Requesting Facility | Submit and monitor blood requests                         |
| Authorized User     | Access functionality according to assigned permissions    |

> Roles and permissions may evolve as the system continues to be developed.

---

## 🔒 Security

Because the system deals with sensitive operational information, security is a core consideration.

The application is designed with principles including:

* Authentication
* Authorization
* Role-based access control
* Protected routes
* Secure API communication
* Input validation
* Controlled access to sensitive records
* Protection of environment variables and secrets

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Before committing changes, check the project status:

```bash
git status
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Describe your changes"
```

Push changes:

```bash
git push
```

---

## 📌 Current Development Status

Umulopa Safe Transfer is an **actively developing application**.

Current development focuses on building a robust, scalable and user-friendly platform for:

* Blood inventory management
* Blood requests
* Blood transfers
* User management
* Role-based access
* Dashboards
* Reporting
* Operational monitoring
* Secure record keeping

Additional functionality will continue to be introduced as the system evolves.

---

## 🗺️ Future Improvements

Planned or potential improvements include:

* Advanced reporting and analytics
* Inventory alerts
* Expiry monitoring
* Enhanced transfer tracking
* Notification system
* Audit logs
* Advanced user permissions
* Improved search and filtering
* Mobile responsiveness
* Performance optimization
* Comprehensive testing
* Production deployment
* Backup and recovery mechanisms

---

## 🤝 Contributing

Contributions, suggestions and improvements are welcome.

For major changes:

1. Create a branch
2. Make your changes
3. Test the application
4. Commit your changes
5. Push the branch
6. Open a pull request

Example:

```bash
git checkout -b feature/new-feature
```

---

## 📄 License

This project currently does not specify a public open-source license.

All rights and usage conditions should be determined by the project owner.

---

## 👩‍💻 Project

**Umulopa Safe Transfer**

A digital platform focused on improving the management, traceability and secure transfer of blood and blood products.

**Repository:**
https://github.com/Ahliah4/Umulopa-Safe-Transfer
