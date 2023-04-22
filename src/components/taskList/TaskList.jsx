import {useState, useEffect, useMemo} from 'react';
import {useParams} from 'react-router-dom';

import {useFilter} from '../../services/hooks/useFilter';
import storageService from '../../services/storageService';
import {useDispatch, useSelector} from 'react-redux';
import {showModal, setPostFormData, updateTaskList, setFilter} from '../../store/actions';


import TaskItem from '../postItem/TaskItem';

import './taskList.scss';

function TaskList({taskModify, setSelectedProject}) {
    const {get, set} = storageService();
    const {filter, taskList, postFormState, taskStatusGroups} = useSelector(state => state);
    const dispatch = useDispatch();

    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProjectTitle, setSelectedProjectTitle] = useState(undefined);

    const [currentDragTaskId, setCurrentDragTaskId] = useState(null);

    let {projectId} = useParams();
    let isFilterOn = Boolean(filter.query) || Boolean(filter.deadline) || Boolean(filter.sort);

    useEffect(() => {
        get('taskList')
        .then(data => {
            if (data) {
                dispatch(updateTaskList(data));
            } else {
                set('taskList', taskList);
            } 
        })
            
        dispatch(setPostFormData({type: "task"}));
        dispatch(setFilter({sort: null, query: '', deadline: ''}));
    }, []);

    useEffect(() => {
        setSelectedProjectId(projectId);
        setSelectedProject(projectId);
        get('projectList')
        .then(data => {
            projectId ? setSelectedProjectTitle(data.find(project => project.id === projectId).title)
                : setSelectedProjectTitle(undefined);

        });
    }, [projectId]);

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dropHandler = (e, status) => {
        e.preventDefault();
        taskModify(currentDragTaskId, {status: status});
        e.target.style.boxShadow = 'none';
    }
    
    const visibleTaskList = useMemo(() => {
        return selectedProjectId ? taskList.filter(task => task.projectId === selectedProjectId) : taskList;
    }, [taskList, selectedProjectId])
   
    const filteredTaskList = useFilter(visibleTaskList, filter.sort, filter.query, filter.deadline);

    const message = isFilterOn ? 'There are no tasks for this filter request' : 'There are no tasks for this project';

    return (
        <>                       
            <div className="list_title"><h2>{selectedProjectId ? <span>{selectedProjectTitle}</span> : 'Task list'}</h2></div>  

            {
                filteredTaskList.length ? 
                    <div className="task_wrapper">
                        {taskStatusGroups.map((status) => {
                            return (
                                <div 
                                    key = {status} 
                                    className={`task_wrapper_status ${status}`}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dropHandler(e, status)}
                                >
                                    <div className="task_wrapper_title">{status}</div>

                                    {filteredTaskList.filter(task => task.status === status).map((task, i) => {
                                        return <TaskItem 
                                            key={task.id} 
                                            number={i+1} 
                                            task={task}
                                            taskModify={taskModify}
                                            currentDragTaskId={currentDragTaskId}
                                            setCurrentDragTaskId={setCurrentDragTaskId}
                                        />
                                    })}
                                </div>
                            )
                        })}
                    </div>
                : 
                    <p> {message} </p>
            }      

            <button className='btn add_task' onClick={() => dispatch(showModal())}>Add Task</button>             
        </>
    );
}

export default TaskList;