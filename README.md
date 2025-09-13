 Socket.IO Chat App

A simple **real-time chat application** built with **React (Vite)** for the frontend and **Node.js + Express + Socket.IO + MongoDB** for the backend.  

Users can join with a username, send messages in real time, and see who’s online.  
Messages are stored in MongoDB and only the last 10 are kept.



 Tech Stack

- Frontend:React + Vite + Socket.IO Client  
- Backend:  Node.js, Express, Socket.IO  
- Database: MongoDB (local or Atlas)  



 Setup & Installation

1. Clone the Repo

git clone https://github.com/priyanshu24071/chatApp.git
cd chatApp

2. Install Server Dependencies

cd server
npm install

3. Create .env file in server/

MONGO_URI=mMONGODB_URI
PORT=4000
CORS_ORIGIN=http://localhost:5173

4. Run the Server

npm start


You should see:

[server] listening on http://localhost:4000
[server] CORS origin: http://localhost:5173
[mongo] connected

5. Install Client Dependencies

cd ../client
npm install

6. Start the Client
npm run dev

Vite will print a URL like:

Local:   http://localhost:5173