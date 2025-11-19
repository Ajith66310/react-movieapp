import Navbar from "./components/Navbar";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>

      <MovieProvider>
      <Toaster position="top-right" />
        <Navbar />

        <main>
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected: Home */}
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Home />
                  </SignedIn>

                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />

            {/* Protected: Favourite */}
            <Route
              path="/favourite"
              element={
                <>
                  <SignedIn>
                    <Favourite />
                  </SignedIn>

                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />

          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
