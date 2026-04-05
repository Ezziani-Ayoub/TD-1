import { useState, useCallback } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import useProjects from '../hooks/useProjects';
import Header from '../components/Header'; 
import Sidebar from '../components/Sidebar'; 
import MainContent from '../components/MainContent'; 
import ProjectForm from '../features/projects/projectForm'; 
import styles from './Dashboard.module.css'; 
  
export default function Dashboard() { 
  const { user } = useSelector((state: RootState) => state.auth);
  const reduxDispatch = useDispatch();
  const { projects, columns, loading, error, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [showForm, setShowForm] = useState(false);
  const dangerousName = '<img src=x onerror=alert("HACK")>';

  // Stable references for callback props
  const handleMenuClick = useCallback(() => {
    setSidebarOpen(p => !p);
  }, []);

  const handleLogout = useCallback(() => {
    reduxDispatch(logout());
  }, [reduxDispatch]);

  const handleShowForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleAddProject = useCallback((name: string, color: string) => {
    addProject(name, color);
    setShowForm(false);
  }, [addProject]);
  
  if (loading) return <div className={styles.loading}>Chargement...</div>; 
  
  return ( 
    <div className={styles.layout}> 
      <Header 
        title="TaskFlow" 
        onMenuClick={handleMenuClick} 
        userName={user?.name} 
        onLogout={handleLogout} 
      /> 
      <div className={styles.body}> 
        <Sidebar projects={projects} isOpen={sidebarOpen} /> 
        <div className={styles.content}> 
          <div className={styles.toolbar}> 
            {!showForm ? ( 
              <button className={styles.addBtn} 
                onClick={handleShowForm}> 
                + Nouveau projet 
              </button> 
            ) : ( 
              <ProjectForm 
                submitLabel="Créer" 
                onSubmit={handleAddProject}
                onCancel={handleCloseForm}
                error={error} 
                saving={false} 
              /> 
            )} 
          </div> 
          <MainContent columns={columns} /> 
          <p>{dangerousName}</p> 
        </div> 
      </div> 
    </div> 
  ); 
}