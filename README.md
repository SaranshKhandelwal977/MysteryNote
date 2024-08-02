# MysteryNote - Anonymous Message Receiver - Next.js WebApp

This is a Next.js website where users can receive anonymous messages via their unique link. Users can toggle the state of "accept messages" to control whether they can receive anonymous messages. The project uses Mistral AI API to suggest random messages and has robust sign-up and sign-in functionality.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Anonymous Messaging**: Users can receive anonymous messages through their unique link.
- **Toggle Message State**: Users can toggle "accept messages" to enable or disable receiving anonymous messages.
- **Random Message Suggestions**: Using the Mistral AI API, random messages can be suggested to anonymous message senders.
- **Username Uniqueness Check**: On sign-up, usernames are checked for uniqueness using debouncing technique.
- **Email Verification**: After sign-up, users receive a verification code via email to complete the registration process.
- **User Dashboard**: Users can view received messages, copy their unique link, and toggle the "accept messages" state.
- **Secure Authentication**: Passwords are hashed using bcrypt.js. Sign-in is implemented using NextAuth.js, while sign-up uses custom React-based authentication.
- **Form Handling**: React Hook Form is used for form handling.
- **Email Sending**: Emails are sent using the Resend library and React Email.
- **Type Safety**: The code is written in TypeScript.

## Technologies Used

- Next.js
- React.js
- TypeScript
- bcrypt.js
- NextAuth.js
- React Hook Form
- Resend library
- React Email
- Zod
- Mistral AI API

## Installation

1. Clone this repository:

    ```sh
    git clone https://github.com/SaranshKhandelwal977/MysteryNote.git
    ```

2. Navigate to the project directory:

    ```sh
    cd MysteryNote
    ```

3. Install dependencies:

    ```sh
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

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Sign up with a unique username and email.
3. Verify your email using the code sent to your email.
4. Sign in with your username or email and password.
5. Navigate to your dashboard to see your unique link, and received messages, and toggle the "accept messages" state.

## Live Demo

A live project demo can be found [here](https://mystery-note.vercel.app/).

## Dependencies

- next
- react
- react-dom
- next-auth
- bcryptjs
- react-hook-form
- zod
- resend
- react-email

## Contributing

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. 

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to update the placeholders with your actual information and further customize the README as needed. Let me know if you need any more assistance!
