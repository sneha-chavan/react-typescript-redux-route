import "./app.css";
import ProjectPage from "./projects/ProjectPage";
import { BrowserRouter as Router,Routes, Route, NavLink} from 'react-router-dom'
import Home from "./home/home";
import ProjectsPage from "./projects/ProjectsPage";
export default function App() {
  return (
    <Router>
      
        <header className="sticky">
          <span className="logo">
                    <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/"  className="button rounded">
           <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
        </header>
        <div className="cpntainer">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        </Routes>
        </div>
      </Router>
    
  );
}
