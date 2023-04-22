import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';

import storageService from '../../services/storageService';

import {clearPostForm, updateTaskList, updateProjectList, hideModal} from '../../store/actions';

import PostFilter from '../postFilter/PostFilter';
import ProjectList from '../projectList/ProjectList';
import TaskList from '../taskList/TaskList';
import Modal from '../UI/modal/Modal';
import PostForm from '../postForm/PostForm';


function AppMain() {
    const {set} = storageService();
    
    const { taskList, projectList } = useSelector(state => state);
    const dispatch = useDispatch();

    const [selectedProject, setSelectedProject] = useState(null);

    //Modify project item

    const projectModify = (id, projectOptions) => {

        const newProjectList = [...projectList];
        console.log("projectModify", projectOptions);
        newProjectList.forEach((project,i,list) => {
            if (project.id === id) {
                list[i] = {...project, ...projectOptions};
            }
        });
        
        set('projectList', newProjectList);
        dispatch(updateProjectList(newProjectList));
        dispatch(hideModal());
        dispatch(clearPostForm());
    }

    // Modify task item

    const taskModify = (id, taskOptions) => {

        const newTaskList = [...taskList];
        newTaskList.forEach((task,i,list) => {
            if (task.id === id) {
                list[i] = {...task, ...taskOptions};
            }
        });
        
        set('taskList', newTaskList);
        dispatch(updateTaskList(newTaskList));
        dispatch(hideModal());
        dispatch(clearPostForm());
    }

    return (
        <main>
            <div className="container">
                <PostFilter/>
                <Routes>
                    <Route path='/' element={
                        <ProjectList/>
                    }/>
                    <Route path='/tasks/:projectId' element={
                        <TaskList 
                            taskModify={taskModify}
                            setSelectedProject={setSelectedProject}
                        />
                    }/>
                    <Route path='/tasks' element={
                        <TaskList 
                            taskModify={taskModify}
                            setSelectedProject={setSelectedProject}
                        />
                    }/>
                </Routes>

                <Modal>
                    <PostForm 
                        taskModify={taskModify}
                        projectModify={projectModify}
                        selectedProject={selectedProject}
                    />
                </Modal>   
            </div>
        </main>
    );
}

export default AppMain;