import storageService from '../../services/storageService';

import {useSelector, useDispatch} from 'react-redux';

import {updateTaskList, showModal, setPostFormData} from '../../store/actions';


import {format, parseISO} from 'date-fns';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

import {IoCloseCircleOutline, IoCreateOutline} from 'react-icons/io5';
import { TbStatusChange } from 'react-icons/tb';


import './taskItem.scss';

function TaskItem({ task, number, taskModify, currentDragTaskId, setCurrentDragTaskId}) {

    const {
        id, 
        title, 
        description, 
        creation, 
        deadline, 
        priority, 
        files, 
        status, 
        subtasks, 
        comments, 
        type
    } = task;

    const {set} = storageService();
    const {taskList} = useSelector(state => state);
    const dispatch = useDispatch();
 
    // Toggle task's status
    const toggleStatus = (status) => {
        if (status === 'done') {
            return 'queue';
        } else if (status === 'queue') {
            return 'development';
        }
        return 'done';
    }

    // Modify task's data
    const onTaskModify = () => {
        const currentData = {
            type: "task",
            isCreate: false,
            isEdit: id,
            taskFields: {
                title,
                description,
                deadline,
                priority,
            }
        }
        dispatch(setPostFormData(currentData));
        dispatch(showModal());
    }

    // Remove task at taskList using id
        const taskItemRemove = (id) => {
            const newTaskList = taskList.filter(task => task.id !== id);
            set('taskList', newTaskList);
            dispatch(updateTaskList((newTaskList)));
        }


    // Dragndrop handlers
    const dragEnterHandler = (e) => {
        if (e.target.className === 'task') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none';
    }

    const dragStartHandler = (e, task) => {
        setCurrentDragTaskId(task.id);
    }

    const dragEndHandler = (e) => {
    }

    const dropHandler = (e, task) => {
        e.preventDefault();
        taskModify(currentDragTaskId, {status: task.status});
        e.target.style.boxShadow = 'none';
    }

    return (
        <div 
            className="task" 
            draggable={true}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, task)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, task)}
        >
            <div className="task_controls">
                <div 
                    className="task_priority"
                    style={priority === 'high' ? {color: 'rgb(255, 114, 71)'}
                        :
                            {color: 'rgb(65, 206, 65)'}}
                > {priority} priority</div>

                <div className="task_status" onClick={() => {taskModify(id, {status: toggleStatus(status)})}}>
                    <TbStatusChange/>
                </div>
                <div 
                    className="task_modify_icon"
                    onClick={onTaskModify} 
                    >
                        <IoCreateOutline/>
                </div>
                <div 
                    className="task_delete" 
                    onClick={() => taskItemRemove(id)}>
                        <IoCloseCircleOutline/>
                </div>
            </div>
           
            <div className="task_header">
                <div className="task_id"></div>
                <div className="task_title">{number}. {title}</div>
            </div>

            <div className="task_description">{description}</div>

            <div className="task_time">
                    <div className="task_time_creation"><span>Created at:</span> <span>{format(parseISO(creation), 'dd/MM/yyyy')}</span></div>
                    <div className="task_time_lifetime"><span>In dev:</span> <span>{formatDistanceToNowStrict(parseISO(creation))}</span></div>
                    <div className="task_time_deadline"><span>Best before:</span> <span>{format(parseISO(deadline), 'dd/MM/yyyy')}</span></div>
            </div>
        </div>
    );
}

export default TaskItem;