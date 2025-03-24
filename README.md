# MediMart

**Medicine E-Commerce Shop**

---

## Project Overview

MediMart is an online platform where users can browse, search, and purchase medicines. The platform includes user authentication, an intuitive shopping experience, secure payment integration, and an order-tracking system. The shop sells medicines only and complies with necessary regulations regarding prescription-based purchases.

---

## Key Features

### User Authentication
- Custom login system for users and admins using email and password.

### User Roles
- **Customers**: Can browse, add medicines to the cart, and place orders.
- **Admin**: Manages products, orders, and user queries.


### Shopping Cart & Checkout
- Users can add medicines to the cart and modify quantities or remove items.
- Prescription upload for medicines requiring a prescription.
- Secure checkout with payment integration ShurjoPay.

### Order Management & Tracking
- Users can track their orders (Pending, Processing, Shipped, Delivered, Cenceled).
- Admins can manage orders and update their status.
- Email notifications for order updates.

### Admin Dashboard
- **Manage Medicines**: Add, update, or remove medicines.
- **Monitor Stock Levels**: Update inventory.
- **Manage Orders**: View and process user orders.
- **Verify Prescriptions**: Approve or reject prescription-based orders.
- **Manage Users**: View customer details and order history.
- **Manage Payments**: Track successful transactions.


---

## Tech Stack

### Frontend
- **Next.js** for server-side rendering and routing.
- **TypeScript** for type safety.
- **React** for building user interfaces.
- **Tailwind CSS** for styling.

### Backend
- **Node.js** with **Express** for REST APIs.
- **MongoDB** (with Mongoose) for storing user data, medicine inventory, and orders.
- **JWT** for authentication.
- **bcryptjs** for password hashing.
---
## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/developerFarukk/MediMart-Client.git
   cd medimart

## Getting Started

First, run the development server:
First, run the development server:

```bash
npm run dev

