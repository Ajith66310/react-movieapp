import Navbar from "./components/Navbar";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
