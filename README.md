# MediMart

**Medicine E-Commerce Shop**

---

## Project Overview

MediMart is an online platform where users can browse, search, and purchase medicines. The platform includes user authentication, an intuitive shopping experience, secure payment integration, and an order-tracking system. The shop sells medicines only and complies with necessary regulations regarding prescription-based purchases.

---


## All Link
- **Website Live Link**: <a href="https://medimart-client-one.vercel.app" target="_blank" rel="noopener noreferrer">MediMart</a>
- **GitHub Server Repo**: <a href="https://github.com/developerFarukk/Medi-Mart-Server" target="_blank" rel="noopener noreferrer">MediMart Server</a> <br />
  **VIDIO Review Link**: <a href="https://drive.google.com/file/d/1y9zvirvIaLDjQ5o1nPifF7OZy0X3GOvM/view?usp=sharing" target="_blank" rel="noopener noreferrer">Video Presentation</a>


## Key Features

### User Authentication
- Custom login system for users and admin using email and password.

### User Roles
- **Customers**: Can browse, add medicines to the cart, and place orders.
- **Admin**: Manages products, orders, and users queries.


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
- **MongoDB** (with Mongoose) for storing user data, medicine inventory, and orders manege.
- **JWT** for authentication.
- **bcryptjs** for password hashing.
---
## How to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/developerFarukk/MediMart-Client.git
   cd medimart
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**  
    Create a `.env` file in the root directory. Refer to `.env.example` for guidance:

   ```
   NEXT_PUBLIC_BASE_API=********
   NEXT_PUBLIC_BASE_API_CLIENT=********
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=********
   NEXT_PUBLIC_CLOUDINARY_API_KEY=********
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=********
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=********
   NEXT_PUBLIC_ADMIN_EMAIL=********
   NEXT_PUBLIC_ADMIN_PASSWORD=********
   NEXT_PUBLIC_USER_EMAIL=********
   NEXT_PUBLIC_USER_PASSWORD=********
   ```

   Refer to `.env.example` for additional configuration options.

## Getting Started

First, run the development server:

```bash
npm run dev
```
The app will run at `http://localhost:3000`.


📬 **Contact**  
For issues or inquiries, reach out to [Developerfaruk](mailto:web.omarfaruk.dev@gmail.com). Thank you 💜


