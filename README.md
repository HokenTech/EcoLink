# EcoLink

This project is a full-stack web application built using React for the client-side and Node.js with Express for the server-side. It includes features for displaying city event information, user interaction, and data visualization.

## Technologies Used

### Client-Side
- **React:** A JavaScript library for building user interfaces.
- **axios:** A promise-based HTTP client for making API requests.
- **leaflet:** A JavaScript library for interactive maps.
- **leaflet-defaulticon-compatibility:** A library to ensure compatibility with Leaflet's default icons.
- **react-chartjs-2:** React wrapper for Chart.js for data visualization.
- **react-router-dom:** For routing in the React application.
- **CSS:** For styling the user interface.

### Server-Side
- **Node.js:** A JavaScript runtime environment.
- **Express:** A web application framework for Node.js.
- **axios:** A promise-based HTTP client for making API requests.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing.
- **body-parser:** Middleware for parsing request bodies.

### Other
- **concurrently:** For running the client and server concurrently.
- **chart.js:** JavaScript charting library.

## Project Structure

The project is structured as follows:

- **client/**: Contains the React client-side application.
- **server/**: Contains the Node.js server-side application.
- **package.json**: Contains the dependencies for the root project, which includes concurrently.

## Instructions

To run the project locally, follow these steps:

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Run `npm install` to install all dependencies.
4.  Cd client and run `npm install` to install all dependencies.
5.  Cd server and run `npm install` to install all dependencies.
6.  Run `npm start` to start both the client and server.
7.  Open your browser and navigate to the client application URL (usually http://localhost:3000).

The client application will communicate with the server application to fetch and display data.

## Additional Notes

- The client-side application is built using React and includes components for displaying event information, user interaction, and data visualization.
- The server-side application is built using Node.js with Express and provides API endpoints for the client-side application to fetch data.
- The project uses concurrently to run both the client and server applications simultaneously.
