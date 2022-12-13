import { useEffect, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import { projectAPI } from "./ProjectAPI";
import ProjectList from "./ProjectList";
function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [ currentPage, setCurrentPage ] = useState(1);

  const saveProject = (project: Project) => {
    console.log("Saving Project: ", project);
projectAPI.put(project)
.then((updatedProject) => {
  let updatedProjects = projects.map((p: Project) => {
    return p.id === updatedProject.id ? new Project(updatedProject) : p;

  });
  setProjects(updatedProjects);
})
.catch((error) => {if (error instanceof Error) {setError(error.message)}})

  };

  useEffect(()=>{

    async function loadProject(){
      setLoading(true);
      try{
        const data = await  projectAPI.get(currentPage)
          setError('');
          if ( currentPage === 1 ){
            setProjects(data);
          }
          else {
            setProjects(projects => [...projects, ...data])
          }
          
      }
      catch(error)  {
        if( error instanceof Error ){
          setError(error.message)
        }
      }
      finally { setLoading(false);}
    }
      
    loadProject();
  },[currentPage]);

  function handleNextPage(){
    setCurrentPage(previousPage => previousPage + 1);
  }

  return (
    <>
      <h1>Projects</h1>
      {loading && <div className="center-page">
                  <span className="spinner primary"></span>
                  <p>Loading...</p>
                </div>
      }
      {error && <div className="row">
                <div className="card large error">
                <section>
                  <p>
                    <span className="icon-alert inverse "></span>
                    {error}
                  </p>
                </section>
              </div>
            </div>
      }
      <ProjectList projects={projects} onSave={saveProject} />
      {!loading && !error &&  (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleNextPage}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;
