const initialState = {

    projectList: [
        {id: 'proj_1', title: "English Learning", description: "Improving my language level to Advanced", type: "project"},
        {id: 'proj_2', title: "Changing profession", description: "Training and looking for a new job", type: "project"},
        {id: 'proj_3', title: "Investment Learning", description: "Improving my level in investments", type: "project"},
        {id: 'proj_4', title: "Solving housing issues ", description: "Comfortable accomodation", type: "project"},
        {id: 'proj_5', title: "Health care", description: "Improving my healthy state and lifestyle", type: "project"}
    ],

    taskList: [
        {
            id: 'task_1',
            projectId: 'proj_1',
            number: 1, 
            title: "lexicon 5000 words", 
            description: "5000 English words must be learned", 
            creation: '2022-05-27', 
            deadline: '2023-08-20',
            priority:"low",
            files:{},
            status:"done",
            subtasks:{},
            comments: {}, 
            type: "task"
        },
        {
            id: 'task_2', 
            projectId: 'proj_3',
            number: 2,
            title: "TOEFL", 
            description: "E successful passage of the TOEFL test", 
            creation: '2022-09-09', 
            deadline: '2023-09-01',
            priority:"high",
            files:{},
            status:"queue",
            subtasks:{},
            comments: {}, 
            type: "task"
        },
        {
            id: 'task_3', 
            projectId: "proj_3",
            number: 2,
            title: "A Super specific task", 
            description: "C successful passage of the TOEFL test", 
            creation: '2022-10-16', 
            deadline: '2024-02-05',
            priority:"high",
            files:{},
            status:"development",
            subtasks:{},
            comments: {}, 
            type: "task"
        },
        {
            id: 'task_4', 
            projectId: "",
            number: 2,
            title: "Y Super specific task", 
            description: "D successful passage of the TOEFL test", 
            creation: '2023-01-07', 
            deadline: '2023-10-12',
            priority:"low",
            files:{},
            status:"development",
            subtasks:{},
            comments: {}, 
            type: "task"
        },
        {
            id: 'task_5', 
            projectId: "",
            number: 2,
            title: "L Super specific task", 
            description: "successful passage of the TOEFL test", 
            creation: '2022-11-30', 
            deadline: '2024-12-28',
            priority:"high",
            files:{},
            status:"queue",
            subtasks:{},
            comments: {}, 
            type: "task"
        }
    ],

    taskStatusGroups: ['queue', 'development', 'done'],

    postFormState: {
        type: "project",
        isCreate: true,
        isEdit: false,
        projectFields:{
            title: "",
            description: ""
        },
        taskFields: {
            title: "",
            description: "",
            deadline: "",
            priority: null
        }
    },

    filter: {sort: null, query: '', deadline: ''},

    modalVisible: 'hide',

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        case "SHOW_MODAL":
            return {
                ...state,
                modalVisible: 'show'
            };
        case "HIDE_MODAL":
            return {
                ...state,
                modalVisible: 'hide'
            };
        case "CLEAR_POST_FORM":
            return {
                ...state,
                postFormState: {
                    type: state.postFormState.type,
                    isCreate: true,
                    isEdit: false,
                    projectFields:{
                        title: "",
                        description: ""
                    },
                    taskFields: {
                        title: "",
                        description: "",
                        deadline: "",
                        priority: null
                    }
                }
            };
        case "SET_POST_FORM_DATA":
            return {
                ...state,
                postFormState: {
                    ...state.postFormState,
                    ...action.payload
                }
            }
        case "UPDATE_PROJECT_LIST":
            return {
                ...state,
                projectList: [...action.payload]
            };
        case "UPDATE_TASK_LIST":
            return {
                ...state,
                taskList: [...action.payload]
            };
        case "CREATE_NEW_PROJECT":
            return {
                ...state,
                projectList: [...state.projectList, action.payload]
            };
        case "CREATE_NEW_TASK":
            return {
                ...state,
                taskList: [...state.taskList, action.payload]
            };
        case "REMOVE_PROJECT":
            return {
                ...state,
                projectList: state.projectList.filter(project => project.id !== action.payload)
            }
        case "REMOVE_TASK":
            return {
                ...state,
                taskList: state.taskList.filter(task => task.id !== action.payload)
            }
        default:
            return state;
    }
}

export default reducer;