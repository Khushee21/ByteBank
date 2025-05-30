BYTEBANK 💰

BYTEBANK is your personal wallet application that allows users to:

-Exchange currency
-Track transaction history
-Generate a unique QR code for each user
-View their personal wallet
-Support multiple currencies

🚧 This project is currently under development.

Getting Started 🛠
To run this project locally, follow the steps below:

1. Setup .env Files
For Client
In the .env file inside the client folder:

env
Copy
Edit
NEXT_PUBLIC_API_URL="http://localhost:<your-client-port>"

For Server
In the .env file inside the server folder:

env
Copy
Edit
MONGO_URL="<your-mongodb-connection-string>"
PORT=<your-server-port>
JWT_SECRET="<your-secret-key>"