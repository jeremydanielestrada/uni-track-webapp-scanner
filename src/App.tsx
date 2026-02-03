import { BrowserRouter, Routes, Route } from "react-router";

import Authorize from "./pages/Authorize";
import Scanner from "./pages/Scanner";

function App() {
  return (
    <div className="bg-background h-screen overflow-hidden flex justify-center items-center">
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authorize />} />
            <Route path="scanner" element={<Scanner />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
