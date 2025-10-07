# :seat: Chairstore - Modern E-Commerce :fire:

Build, browse, and buy with ease using this sleek full-stack E-commerce built on the React + Vite stack.

## [Live Link](https://chairsstore.vercel.app/) :link:

<div align="center">
  <img src="https://jsgo.pro/media/gif/chairstore.gif" alt="Chairstore Demo" />
  <br>
</div>

## Folder structure :open_file_folder:

<div align="center">
  <img src="https://jsgo.pro/media/structure/chairstore_project_structure.png" alt="Chairstore Folder structure" width="100%" />
  <br>
</div>

## How To Use :closed_lock_with_key:

### 1️⃣ Create Firebase and Stripe Accounts

You'll need accounts for authentication and payment integration:

🔗 [Firebase](https://firebase.google.com/)
🔗 [Stripe](https://stripe.com/)

### 2️⃣ Clone the Repository

Open a terminal or command prompt and run:

```sh
git clone git@github.com:mux-mux/chairstore.git
cd chairstore
```

### 3️⃣ Configure Environment Variables

In the project root, create a `.env` file with the following values:

```sh
# App Config
NODE_ENV=development

# Firebase Config
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID

# Stripe Config
VITE_STRIPE_PUBLIC_KEY=YOUR_STRIPE_SANDBOX_PUBLIC_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SANDBOX_SECRET_KEY
```

### 4️⃣ Install Dependencies & Start the App

This will Open the browser & listen to files changes<br/>

```sh
npm install
npm run dev
```

Your app should now be running!<br/>
On: 🔗 http://localhost:5173

### Tech Stack

<ul>
<li>⚛️ React + Vite</li>
<li>🔥 Firebase (Auth, Database)</li>
<li>💳 Stripe (Payments)</li>
<li>🎨 Styled Components / CSS</li>
<li>🚀 Deployed on Vercel</li>
</ul>
