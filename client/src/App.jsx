import { useEffect, useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SideBar from './components/SideBar';
import SelectedProject from './components/SelectedProject';

function App() {
  // const [projectState, setProjectState] = useState({
  //   selectedProjectId: undefined,
  //   projects: [],
  //   tasks: [],
  // });

  const [projectState, setProjectState] = useState(() => {
    // Load initial state from localStorage, if available
    const savedState = localStorage.getItem('projectState');
    return savedState
      ? JSON.parse(savedState)
      : {
          selectedProjectId: undefined,
          projects: [],
          tasks: [],
        };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('projectState', JSON.stringify(projectState));
  }, [projectState]);

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const newTask = {
        id: projectState.tasks.length
          ? projectState.tasks[projectState.tasks.length - 1].id + 1
          : 1,
        projectId: prevState.selectedProjectId,
        text,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }
  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleStopAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleAddNewProject(projectData) {
    setProjectState((prevProject) => {
      const newProject = {
        ...projectData,
        id:
          projectState.projects && projectState.projects.length
            ? projectState.projects[projectState.projects.length - 1].id + 1
            : 1,
      };

      return {
        ...prevProject,
        selectedProjectId: undefined,
        projects: [...prevProject.projects, newProject],
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDelete() {
    setProjectState((prevState) => {
      const updatedProjects = prevState.projects.filter(
        (item) => item.id !== prevState.selectedProjectId
      );

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
    //  const storedProject = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

    // localStorage.setItem('selectedPlaces', JSON.stringify(updatedProjects));
  }

  const selectedProject = projectState.projects
    ? projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId
      )
    : null;

  // console.log(selectedProject);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddNewProject} onStop={handleStopAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onAddProject={handleStartAddProject}
        projectState={projectState.projects}
        onSelect={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
