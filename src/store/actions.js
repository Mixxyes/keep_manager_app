// Filter action
export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

// Modal actions
export const showModal = () => {
    return {
        type: 'SHOW_MODAL'
    }
}
export const hideModal = () => {
    return {
        type: 'HIDE_MODAL'
    }
}

// postForm actions
export const clearPostForm = () => {
    return {
        type: 'CLEAR_POST_FORM'
    }
}
export const setPostFormData = (data) => {
    return {
        type: 'SET_POST_FORM_DATA',
        payload: data
    }
}

/// project's and task's actions

// update actions
export const updateProjectList = (newProjectList) => {
    return {
        type: 'UPDATE_PROJECT_LIST',
        payload: newProjectList
    }
}
export const updateTaskList = (newTaskList) => {
    return {
        type: 'UPDATE_TASK_LIST',
        payload: newTaskList
    }
}

// create actions
export const createNewProject = (newProject) => {
    return {
        type: 'CREATE_NEW_PROJECT',
        payload: newProject
    }
}
export const createNewTask = (newTask) => {
    return {
        type: 'CREATE_NEW_TASK',
        payload: newTask
    }
}

// remove actions
export const removeProject = (removeProjectId) => {
    return {
        type: 'REMOVE_PROJECT',
        payload: removeProjectId
    }
}
export const removeTask = (removeTaskId) => {
    return {
        type: 'REMOVE_TASK',
        payload: removeTaskId
    }
}
