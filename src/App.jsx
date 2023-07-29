import Mainpage from "./pages/Mainpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Auth from "./Home page components/Auth/Auth";
import PostDetails from "./pages/PostDetails";
import Projects from "./pages/Projects";
import Creator from "./pages/Creator";


function App() {
  AOS.init();

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/posts" element={<Projects   />} />
          <Route path="/posts/search" element={<Projects  />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path={'/creators/:name'} element={<Creator/>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
  );
}

export default App;
