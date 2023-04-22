import { useState } from 'react';
import storageService from '../../services/storageService';
import {useSelector, useDispatch} from 'react-redux';
import {clearPostForm, createNewProject, createNewTask, hideModal} from '../../store/actions';

import {format} from 'date-fns';

import ProjectModalView from './ProjectModalView';
import TaskModalView from './TaskModalView';


function PostForm({taskModify, projectModify, selectedProject}) {

    const {set} = storageService();
    const {projectList, taskList, postFormState} = useSelector(state => state);
    const {type, isCreate, isEdit, taskFields, projectFields} = postFormState;
    const dispatch = useDispatch();
    const [formError, setFormError] = useState({status: false, message: ''})
    
        // Create new Project at projectList
        const projectItemCreate = (formFields) => {
            
            const newProject = {
                id: `proj_${new Date().getTime() }`,
                ...formFields,
                type: "project"
            };
    
            set('projectList', [...projectList, newProject]);
            dispatch(createNewProject(newProject));
            dispatch(hideModal());
            dispatch(clearPostForm());
        }

        // Create new Task at taskList
        const taskItemCreate = (formFields) => {

            const newTask = {
                ...formFields,
                id: `task_${new Date().getTime()}`,
                projectId: selectedProject ? selectedProject : "",
                creation: format(new Date(), 'yyyy-MM-dd'),
                status: "queue",
                type: "task"
            };
            
            set('taskList', [...taskList, newTask]);
            dispatch(createNewTask(newTask));
            dispatch(hideModal());
            dispatch(clearPostForm());
        }


    const onItemCreate = (e) => {
        e.preventDefault();
        const error = checkFormFields();
        if (!error.status) {
            type === "project" ? projectItemCreate(projectFields) : taskItemCreate(taskFields);
        }
        
    }

    const onItemModify = (e) => {
        e.preventDefault();
        const error = checkFormFields();
        if (!error.status) {
            type === "project" ? projectModify(isEdit, projectFields) : taskModify(isEdit, taskFields);
        }
    }

    const checkFormFields = () => {
        let fields;
        type === "project" ? fields = projectFields : fields = taskFields;
        let newError;
        if (fields.title.length < 3) {
            newError = {
                status: true,
                message: "Check title"
            }
            setFormError(newError); 
            return newError;
        }
        if (fields.description.length < 3) {
            newError = {
                status: true,
                message: "Check description"
            }
            setFormError(newError); 
            return newError;
        }
        
        if (fields.deadline === null || fields.deadline === '') {
            newError = {
                status: true,
                message: "Check deadline date"
            }
            setFormError(newError); 
            return newError;
        }
        
        if (fields.priority && fields.priority !== 'low' && fields.priority !== 'high') {
            newError = {
                status: true,
                message: "Check priority"
            }
            setFormError(newError); 
            return newError;
        }
       
            newError = {
                status: false,
                message: ""
            }
            setFormError(newError); 
            return newError;
    }
    const error = formError.status ? <div className='form_error'>Warning: {formError.message}</div> : null;
    
    return (
            <form action="#">

                <div className="modal_title">{isCreate ? "Let's add the new "+ type : "Editing of the "+ type}</div>

                {type === "project" ? 
                <ProjectModalView/> 
                : 
                <TaskModalView/>}

                {error}
                

                {isCreate && <button onClick={onItemCreate} className="btn postform_btn">Create new {type}</button>}
                {isEdit && <button onClick={onItemModify} className="btn postform_btn">Make changes for {type}</button>}

            </form>

    );
}

export default PostForm;