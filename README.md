# 💰 Personal Finance Tracker

A full-stack web application that helps users manage income and expenses, track spending habits, and monitor savings through an interactive dashboard.

---

## 🚀 Features

* 🔐 User Authentication (Register & Login)
* ➕ Add Transactions (Income & Expense)
* 📋 View Transaction History
* ✏️ Edit Transactions
* ❌ Delete Transactions
* 📊 Dashboard with Income, Expense & Savings Summary
* 🥧 Expense Chart Visualization (Chart.js)
* 💰 Budget Tracking with Alerts
* 👤 Profile Menu with Logout Option
* 🔒 Protected Dashboard Access

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Chart.js

### Backend

* Java Servlets (J2EE)
* JDBC

### Database

* MySQL

### Tools & Server

* Apache Tomcat
* Git & GitHub

---

## 📂 Project Structure

```
PersonalFinanceTracker/
│
├── src/
│   ├── com.finance.servlets/
│   │   ├── RegisterServlet.java
│   │   ├── LoginServlet.java
│   │   ├── AddTransactionServlet.java
│   │   ├── GetTransactionServlet.java
│   │   ├── DeleteTransactionServlet.java
│   │   └── EditTransactionServlet.java
│   │
│   └── com.finance.db/
│       └── DBConnection.java
│
├── WebContent/
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── dashboard.html
│   │   └── add-transaction.html
│   │
│   ├── css/
│   ├── js/
│   └── WEB-INF/
│       └── web.xml
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/personal-finance-tracker.git
cd personal-finance-tracker
```

---

### 2. Setup Database

Create database:

```sql
CREATE DATABASE finance_tracker;
```

Create tables:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    amount DOUBLE,
    category VARCHAR(50),
    type VARCHAR(20),
    date DATE
);
```

---

### 3. Configure Environment Variables

#### Windows:

```bash
setx DB_PASSWORD yourpassword
```

#### Mac/Linux:

```bash
export DB_PASSWORD=yourpassword
```

---

### 4. Run the Project

* Import project into Eclipse / IntelliJ
* Configure Apache Tomcat
* Deploy project
* Open in browser:
  http://localhost:8080/PersonalFinanceTracker/

---

## 📌 Future Improvements

* 📱 Responsive UI (Mobile Friendly)
* 📅 Monthly & Weekly Reports
* 🔎 Search & Filter Transactions
* 👤 User Profile with Avatar Upload
* 🔐 Secure Authentication (JWT / Sessions)
* ☁️ Deployment (AWS / Render)

---

## 🙋‍♂️ Author

**Vigneswaran S**

📧 Email: [vigneswaranvalarmathy@gmail.com](mailto:your-vigneswaranvalarmathy@gmail.com)
🔗 LinkedIn: https://www.linkedin.com/in/vigneswaran-s-779ba92a0/
💻 GitHub: https://github.com/VigneswaranValarmathy

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
