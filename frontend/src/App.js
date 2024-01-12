import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" Component={Homepage} />
        <Route path="/" Component={ChatPage} />
      </Routes>
    </div>
  );
}

export default App;
