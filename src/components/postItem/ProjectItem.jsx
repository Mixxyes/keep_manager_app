import {NavLink} from 'react-router-dom';

import storageService from '../../services/storageService';

import {useDispatch, useSelector} from 'react-redux';
import {updateProjectList, setPostFormData, showModal} from '../../store/actions';

import {IoCloseCircleOutline, IoCreateOutline} from 'react-icons/io5';

import './projectItem.scss';

function ProjectItem({project, number}) {
    const {set} = storageService();

    const {projectList, taskList} = useSelector(state => state);
    const dispatch = useDispatch();

    const {id, title, description} = project;
    
    const taskQuality = taskList.filter(item => item.projectId === id).length;

    // Removing Project at projectList using id
    const projectItemRemove = (id) => {
        const newProjectList = projectList.filter(project => project.id !== id)
        set('projectList', newProjectList);
        dispatch(updateProjectList(newProjectList));
    }

    // Modify project's data
    const onProjectModify = () => {
        const currentData = {
            type: "project",
            isCreate: false,
            isEdit: id,
            projectFields: {
                title,
                description,
            }
        }
        dispatch(setPostFormData(currentData));
        dispatch(showModal());
    }

    return (
        <div className='project'>

            <div className="project_controls">
                <div 
                    className="project_change"
                    onClick={onProjectModify}>
                    <IoCreateOutline/>
                </div>

                <div 
                className="project_delete" 
                onClick={() => {projectItemRemove(id)}}>
                    <IoCloseCircleOutline/>
                </div>
            </div>
            
            <div>
                <div className="project_id"></div>
                <div className="project_title">{number}. {title}</div>
            </div>

            <div className="project_desription">{description}</div>

            <NavLink to={`/tasks/${id}`} style={{'width': 'max-content'}}>
                <div className="project_tasks_quality">{`Total tasks in the project - `}<b>{`${taskQuality}. View tasks...`}</b></div>
            </NavLink>
        </div>
    );
}

export default ProjectItem;