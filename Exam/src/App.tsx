import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Page1 from "./component/Exam1";
import Home from "./component/Home"
import Page2 from "./component/Exam2"


const App: React.FC = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
);

export default App;
