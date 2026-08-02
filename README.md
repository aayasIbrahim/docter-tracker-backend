# 🩺 Healthcare Doctor-Patient Management System

A robust, scalable, and fully typed RESTful API backend for managing doctors, patient assignments, and administrative analytics. Built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB with Mongoose**.

---

## 🚀 Live Demo & API Documentation

- **Base URL:** `https://your-api-domain.com/api/v1`
- **Postman Collection:** [Download / View Collection](https://github.com/aayasIbrahim/docter-tracker-backend/blob/master/postman/Docter%20app.postman_collection.json)

---

## ✨ Features

- 👨‍⚕️ **Doctor Management:** Full CRUD operations with advanced search, filtering by specialization, and pagination.
- 🏥 **Patient Management:** Complete patient record keeping, status tracking, and sorting.
- 🔗 **Nested Doctor-Patient Assignment:** Assign patients under specific doctors and fetch doctor-wise patient lists (`/doctors/:id/patients`).
- 📊 **Dashboard & Analytics:** Mongoose Aggregation pipelines for real-time visual charts (Total Counts, Patients per Doctor, Date-wise trend).
- 🔐 **Authentication & Authorization:** Role-based Access Control (RBAC) supporting `ADMIN` and `DOCTOR` permissions via JWT.
- 🛡️ **Type Safety & Reliability:** Built with strict TypeScript checks and centralized error handling with `catchAsync`.

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM/ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT), Bcrypt.js

---

## 🔑 Demo Credentials (Testing)

Test the endpoints using the following pre-configured user credentials:

| Role             | Email              | Password | Access Rights                              |
| :--------------- | :----------------- | :------- | :----------------------------------------- |
| **System Admin** | `admin1@gmail.com` | `12345`  | Full Access (CRUD Doctors/Patients, Stats) |

---

## 📌 API Endpoints Summary

### 👨‍⚕️ Doctor Routes (`/api/doctors`)

| Method   | Endpoint        | Description                                  | Access  |
| :------- | :-------------- | :------------------------------------------- | :------ |
| `POST`   | `/`             | Create a new doctor                          | `ADMIN` |
| `GET`    | `/`             | Get all doctors (Search, Filter, Pagination) | `ADMIN` |
| `GET`    | `/:id`          | Get single doctor details                    | `ADMIN` |
| `PUT`    | `/:id`          | Update doctor details                        | `ADMIN` |
| `DELETE` | `/:id`          | Delete a doctor                              | `ADMIN` |
| `GET`    | `/:id/patients` | Get all patients under a specific doctor     | `ADMIN` |
| `POST`   | `/:id/patients` | Assign a new patient under a specific doctor | `ADMIN` |

### 🩺 Patient Routes (`/api/patients`)

| Method   | Endpoint | Description                | Access  |
| :------- | :------- | :------------------------- | :------ |
| `GET`    | `/`      | Get all patients           | `ADMIN` |
| `GET`    | `/:id`   | Get single patient details | `ADMIN` |
| `PUT`    | `/:id`   | Update patient record      | `ADMIN` |
| `DELETE` | `/:id`   | Delete/Discharge patient   | `ADMIN` |

### 📊 Analytics & Stats Routes (`/api/stats`)

| Method | Endpoint     | Description                                      | Access  |
| :----- | :----------- | :----------------------------------------------- | :------ |
| `GET`  | `/dashboard` | Retrieve chart data & summary stats for Admin UI | `ADMIN` |

---

## ⚡ Local Setup & Installation

Follow these steps to run the project locally on your machine:

### 1. Clone the repository

### 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aayasIbrahim/docter-tracker-backend.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd docter-tracker-backend
   ```
