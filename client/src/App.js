import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import CreateLogin from "./CreateLogin";
import Page from "./createPage";  // ⬅️ Import your protected page
import Event from "./createEvent";

function App() {
  return (
    <Router>
      <Routes>
        {/* default path → CreateAccount page */}
        <Route path="/" element={<CreateAccount />} />

        {/* /login path → CreateLogin page */}
        <Route path="/login" element={<CreateLogin />} />

        {/* /page path → Protected Page */}
        <Route path="/page" element={<Page />} />
        <Route path="/event" element={<Event  />}/>
      </Routes>
    </Router>
  );
}

export default App;
