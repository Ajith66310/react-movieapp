# **Movie App with Clerk and OpenAI Integration**

A **MERN movie application** that allows users to view popular movies, search for movie descriptions and ratings using **OpenAI**, and manage authentication with **Clerk**.

---

## **Features**

- **User Authentication**: Login and signup using **Clerk**.
- **Popular Movies**: Display a list of popular movies fetched from a movie API.
- **Movie Search**: Search for any movie to get its **description** and **rating** powered by **OpenAI**.
- **Search Limit**: Each user is limited to **2 searches**.
- **Responsive UI**: Works on both desktop and mobile devices.

---

## **Tech Stack**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS 

---

## **Installation**

### **Clone the Repository**

<pre>
  <code>
git clone https://github.com/ajith66310/react-movieapp.git
cd react-movieapp
  </code>
</pre>

## Backend Setup
<pre>
  <code>
cd backend
npm install

  </code>
</pre>

## Create a ***.env*** file:

<pre>
  <code>
PORT=YOUR_PORT
WATCHMODE_API_KEY=YOUR_WATCHMODE_API_KEY
WATCHMODE_BASE_URL=YOUR_WATCHMODE_BASE_URL
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
MONGO_URI=YOUR_MONGO_URI
  </code>
</pre> 

## Start the server:

<pre>
  <code>
    npm run server
  </code>
</pre>

## Frontend Setup

<pre>
  <code>
cd frontend
npm install
  </code>
</pre>

## Create a ***.env*** file:

<pre>
  <code>
VITE_BACKEND_URL=YOUR_VITE_BACKEND_URL
VITE_CLERK_PUBLISHABLE_KEY=YOUR_VITE_CLERK_PUBLISHABLE_KEY
  </code>
</pre>


## Start the React app:

<pre>
  <code>
npm run dev
  </code>
</pre>

## Live: https://react-movieapp-alpha.vercel.app/
