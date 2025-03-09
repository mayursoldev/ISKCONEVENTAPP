# Event Management App

A full-stack event management system designed for admins and users to manage and register for events. Built with React for the frontend and Node.js with SQL Server for the backend, this application provides a seamless experience for event management and registration.

---

## Project Structure

The project is organized into two main directories: backend and frontend. Below is the detailed directory structure:

```
EventManagementApp/
├── event-management-backend/        # Backend service
│   ├── config/
│   │   └── db.js                   # Database configuration
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   ├── eventRegistration.js    # Event registration routes
│   │   ├── events.js               # Event CRUD routes
│   │   ┗── locations.js            # Location management routes
│   ├── .env                        # Environment variables
│   ├── .gitignore                  # Git ignore file
│   ├── package-lock.json           # Dependency lock file
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Entry point for backend server
│
├── event-web-client/               # Frontend client
│   ├── public/                     # Static assets
│   │   ├── favicon.ico             # Favicon for the app
│   │   ├── index.html              # Main HTML file
│   │   ├── logo192.png             # App logo (192x192)
│   │   ├── logo512.png             # App logo (512x512)
│   │   ├── manifest.json           # PWA manifest file
│   │   ┗── robots.txt              # Robots.txt for web crawlers
│   ├── src/                        # Source code for the frontend
│   │   ├── common/                 # Common utility functions
│   │   │   ┗── commonMethods.js    # Shared utility methods
│   │   ├── components/             # Reusable UI components
│   │   │   ┗── Navbar.js           # Navigation bar component
│   │   ├── context/                # React context for state management
│   │   │   ┗── GlobalContext.js    # Global state management
│   │   ├── pages/                  # Page-level components
│   │   │   ├── Dashboard/          # Dashboard page
│   │   │   │   ┗── Home.js         # Dashboard logic
│   │   │   ├── EventRegistrations/ # Event registration pages
│   │   │   │   ├── AddEventModal.js # Modal for adding events
│   │   │   │   ├── AdminRegistrations.js # Admin registrations page
│   │   │   │   ┗── MyRegistrations.js # User registrations page
│   │   │   ┗── Login/              # Login page
│   │   │       ┗── Login.js        # Login logic
│   │   ├── service/                # API service calls
│   │   │   ├── event-service.js    # Event-related API calls
│   │   │   ┗── location-service.js # Location-related API calls
│   │   ├── App.css                 # Global app styles
│   │   ├── App.js                  # Main application component
│   │   ├── App.test.js             # App component tests
│   │   ├── index.css               # Global styles
│   │   ├── index.js                # Entry point for the app
│   │   ├── logo.svg                # App logo (SVG)
│   │   ├── reportWebVitals.js      # Web vitals reporting
│   │   ┗── setupTests.js           # Test setup
│   ├── .env                        # Frontend environment variables
│   ├── .gitignore                  # Git ignore file
│   ├── package-lock.json           # Dependency lock file
│   ├── package.json                # Frontend dependencies
│   ┗── README.md                   # Frontend-specific documentation
│
└── README.md                       # Project documentation (you are here)
```

---

## Tech Stack

- Frontend: React, React-Bootstrap, Axios
- Backend: Node.js, Express.js, Knex.js
- Database: SQL Server
- Authentication: JWT (JSON Web Tokens)
- Styling: CSS, React-Bootstrap

---

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- SQL Server (or a compatible database)
- NPM (Node Package Manager)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd event-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `event-management-backend` directory and add the following:
   ```plaintext
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=EventManagementSystem
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd event-web-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `event-web-client` directory and add the following:
   ```plaintext
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

4. Start the frontend app:
   ```bash
   npm start
   ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Features

### Admin Features
- Event Management:
  - Create, update, and delete events.
  - Filter events by date, category, and location.
- User Management:
  - View all user registrations with event details.
- Inline Actions:
  - Edit or delete events directly from the dashboard.

### User Features
- Event Registration:
  - Register for upcoming events.
  - View and manage personal event registrations.
- Event Discovery:
  - Filter and search for events dynamically.

---

## API Endpoints

### Event Management
- `GET /events`: Fetch all events.
- `POST /events/addOrUpdate`: Add or update an event.
- `POST /events/delete`: Delete an event.

### Event Registration
- `POST /events/:id/register`: Register for an event.
- `GET /registrations`: Fetch all event registrations.

### Locations
- `GET /locations`: Fetch available locations.

### Authentication
- `POST /auth/login`: User login.
- `POST /auth/register`: User registration.

---

## Key Highlights

- Pagination & Filters: Implemented on the frontend for seamless user experience.
- Error Handling: Robust error handling with user-friendly feedback.
- Security: JWT-based authentication for secure access.
- Scalability: Modular codebase for easy scalability.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- React and Node.js communities for their extensive documentation.
- Knex.js for simplifying database interactions.
- SQL Server for reliable data storage.

---

## Contact

For questions or feedback, please reach out to:

- Mayur Solanki
  Email: mayursolankiprofessional@gmail.com
  GitHub: https://github.com/mayursoldev

---
