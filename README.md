# EcoLink

This project is a full-stack web application built using React for the client-side and Node.js with Express for the server-side. It includes features for displaying city event information, user interaction, and data visualization.

EcoLink is an innovative solution that integrates smart urban waste management with a dynamic ticketing system for events, creating a complete ecosystem for urban sustainability. The application uses advanced technologies such as IoT sensors and IBM WatsonX.ai artificial intelligence to optimize both waste collection and sustainable participation in city events.

In terms of waste management, the platform optimizes collection routes through smart sensors and real-time data analysis, significantly reducing CO2 emissions from transportation and improving operational efficiency. This system ensures greater urban cleanliness and dynamically adapts to specific territorial needs.

On the events front, EcoLink introduces an innovative dynamic ticketing system based on environmental impact. The price of the ticket varies based on the distance traveled by the user and the means of transportation chosen. For example, while the standard price could be €30, those who use sustainable means such as public transportation or bicycle could pay less, while those who use a private car could have to pay a supplement (e.g. €40). This mechanism is supported by a bonus system that rewards eco-sustainable behaviors.

The integration of these features into a single platform creates a complete solution that:

Optimizes urban waste management
Reduces CO2 emissions both in waste collection and in mobility to events
Promotes sustainable behaviors through economic incentives
Improves the operational efficiency of urban services
Contributes to the creation of smarter and more sustainable cities

This solution represents an innovative and concrete approach to improving the quality of life of citizens, promoting an ecological transition in urban practices through the intelligent use of technology and behavioral incentives.

Key Components:

1. Smart Sensors

Ultrasonic sensors to monitor waste container fill levels
Temperature sensors for fire prevention
Solar-powered Arduino/ESP32 controllers for autonomous operation
LoRa/WiFi connectivity for real-time data transmission

2. Intelligent System Features

Real-time monitoring of waste container status
Interactive mapping using Leaflet for container visualization
WatsonX.ai integration for predictive analytics and route optimization
Dynamic route planning for collection vehicles
Interactive chat interface for operator communication

3. Economic Benefits

Initial setup cost of approximately €1,000 for 100 containers
Server infrastructure costs between €500-1,000 annually
Installation and integration costs around €2,000
Long-term cost savings through optimized routes and resource allocation

4. Environmental Impact

Reduced CO2 emissions through optimized collection routes
Prevention of waste overflow and environmental contamination
Enhanced recycling efficiency
Decreased fuel consumption by collection vehicles

5. Scalability & Future Development

Adaptable to both urban and rural environments
Expandable sensor network capabilities
Potential integration with electric vehicle fleets
AI-powered predictive maintenance and waste generation forecasting
Integration possibilities with major events (Olympics, Jubilee, Expo)

The system particularly shines in its ability to adapt to different municipal needs while promoting environmental sustainability and operational efficiency through smart technology integration.

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
