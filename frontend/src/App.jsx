import Navbar from "./components/Navbar";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // Wait until Clerk session is loaded
  if (!isLoaded) return null;

  return (
    <MovieProvider>
      <Toaster position="top-right" />

      {/* Redirect immediately if user is signed out */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {/* Show Navbar only for signed-in users */}
      {isSignedIn && <Navbar />}

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected: Home */}
          <Route
            path="/"
            element={
              <SignedIn>
                <Home />
              </SignedIn>
            }
          />

          {/* Protected: Favourite */}
          <Route
            path="/favourite"
            element={
              <SignedIn>
                <Favourite />
              </SignedIn>
            }
          />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
