import Mainpage from "./pages/Mainpage";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import HomePage from "./pages/HomePage";
import Auth from "./Home page components/Auth/Auth";
import PostDetails from "./pages/PostDetails";
import Projects from "./pages/Projects";
import Creator from "./pages/Creator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

function App() {
  AOS.init();

  const [currentID, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/posts" element={<HomePage  currentID={currentID} setCurrentId={setCurrentId}/>} />
          <Route path="/posts/projects" element={<Projects   />} />
          <Route path="/posts/projects/search" element={<Projects  />} />
          <Route path="/posts/:id" element={<PostDetails  currentID={currentID} setCurrentId={setCurrentId} />} />
          <Route path={'/creators/:name'} element={<Creator  currentID={currentID} setCurrentId={setCurrentId}/>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
  );
}

export default App;
