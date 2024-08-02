# MysteryNote - Anonymous Message Receiver - Next.js Project

Welcome to the Anonymous Message Receiver project repository, a Next.js application designed to allow users to receive anonymous messages through their unique link. This project includes features such as user authentication, profile management, message suggestions using Mistral AI API, and more.

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Project Functionalities](#2-project-functionalities)
- [3. Technologies Used](#3-technologies-used)
- [4. Installation](#4-installation)
- [5. Usage](#5-usage)
- [6. Live Demo](#6-live-demo)
- [7. Dependencies](#7-dependencies)

## 1. Introduction

The Anonymous Message Receiver project aims to provide a platform where users can receive anonymous messages through a unique link. Users can control the state of message acceptance and utilize AI-generated message suggestions. The project includes a robust sign-up and sign-in process, a user dashboard, and secure authentication.

## 2. Project Functionalities

- **User Authentication:**
  - Users can sign up with a unique username and email.
  - Upon sign-up, usernames are checked for uniqueness using a debouncing technique.
  - An OTP is sent to the user's email for verification.
  - Users can sign in using their username or email and password.

- **User Profile Management:**
  - Upon login, users are directed to their dashboard.
  - Users can see their received messages and manage their profile.

- **Anonymous Messaging:**
  - Users can receive anonymous messages through their unique link.
  - They can toggle the "accept messages" state to enable or disable message reception.
  - Anonymous message senders can send messages via the user's unique link.
  - Suggested messages can be generated using the Mistral AI API.

- **Random Message Suggestions:**
  - Users can generate random messages using the Mistral AI API.
  - Suggested messages can be modified or sent as they are.

## 3. Technologies Used

- **Frontend**:
  - Next.js: For building the user interface.
  - React.js: For building components.
  - TypeScript: For type safety.
  - React Hook Form: For form handling.
  - Zod: For form validation.
  
- **Backend**:
  - Node.js: For server-side logic.
  - bcrypt.js: For password hashing.
  - NextAuth.js: For authentication.
  - Resend library: For sending emails.
  - React Email: For email templates.

- **Other Technologies**:
  - Mistral AI API: For generating random message suggestions.

## 4. Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/SaranshKhandelwal977/MysteryNote.git
    ```

2. Navigate to the project directory:
    ```bash
    cd MysteryNote
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add the following environment variables:
    ```sh
    MONGODBURL="your_mongodbrl"
    RESEND_API_KEY="your_resend_api_key"
    NEXTAUTH_SECRET="your_nextauth_secret"
    MISTRAL_API_KEY = "your_mistral_api_key"
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## 5. Usage

1. Open your browser and go to `http://localhost:3000`.
2. Sign up with a unique username and email.
3. Verify your email using the code sent to your email.
4. Sign in with your username or email and password.
5. Navigate to your dashboard to see your unique link, received messages, and toggle the "accept messages" state.

## 6. Live Demo

A live project demo can be found [here](https://mystery-note.vercel.app/).

## 7. Dependencies

- next
- react
- react-dom
- next-auth
- bcryptjs
- react-hook-form
- zod
- resend
- react-email

## 8. Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

