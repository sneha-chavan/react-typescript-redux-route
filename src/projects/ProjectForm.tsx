import { Project } from "./Project";
import React, { SyntheticEvent, useState } from "react";
interface ProjectFormProp {
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}
function ProjectForm({
  onCancel,
  onSave,
  project: initialProject
}: ProjectFormProp) {
  const [project, setProject] = useState(initialProject);
  const [error, setError] = useState({ name: "", description: "", budget: "" });
  console.log("initialProject: " + JSON.stringify(project));

  function validate(project: Project) {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length <= 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be greater than $0";
    }
    return errors;
  }
  function isValid() {
    return (
      error.name.length === 0 &&
      error.description.length === 0 &&
      error.budget.length === 0
    );
  }
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;
    //if input type is number convert the updatedValue string to a +number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue
    };

    let updatedProject: Project;
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });
    setError(() => validate(updatedProject));
    console.log(project);
    console.log("error: " + error);
  };
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid) {
      onSave(project);
    }
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {error.name.length > 0 && (
        <div className="card error">
          <p>{error.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {error.description.length > 0 && (
        <div className="card error">
          <p>{error.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {error.budget.length > 0 && (
        <div className="card error">
          <p>{error.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
