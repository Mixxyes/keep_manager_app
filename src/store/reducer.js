const initialState = {

    projectList: [
        {
            "id": "proj_1",
            "title": "English learning",
            "description": "Improve my language level to Advanced",
            "type": "project"
        },
        {
            "id": "proj_2",
            "title": "Change professional area",
            "description": "Get trained and find a new job",
            "type": "project"
        },
        {
            "id": "proj_3",
            "title": "Home repairs",
            "description": "Make home repairs",
            "type": "project"
        },
        {
            "id": "proj_5",
            "title": "Healthy food",
            "description": "Change eating habits",
            "type": "project"
        }
    ],

    taskList: [
        {
            "id": "task_1",
            "projectId": "proj_1",
            "title": "lexicon 5000 words",
            "description": "5000 English words must be learned",
            "creation": "2022-05-27",
            "deadline": "2023-08-20",
            "priority": "low",
            "files": {},
            "status": "development",
            "subtasks": {},
            "comments": {},
            "type": "task"
        },
        {
            "id": "task_2",
            "projectId": "proj_3",
            "title": "Walls",
            "description": "Paint the walls",
            "creation": "2022-09-09",
            "deadline": "2023-09-01",
            "priority": "high",
            "files": {},
            "status": "development",
            "subtasks": {},
            "comments": {},
            "type": "task"
        },
        {
            "id": "task_3",
            "projectId": "proj_3",
            "title": "New furniture",
            "description": "Buy new furniture",
            "creation": "2022-10-16",
            "deadline": "2024-02-05",
            "priority": "low",
            "files": {},
            "status": "queue",
            "subtasks": {},
            "comments": {},
            "type": "task"
        },
        {
            "title": "Make resume",
            "description": "Prepare a detailed resume and post it on hh.",
            "deadline": "2023-04-29",
            "priority": "high",
            "id": "task_1682181672857",
            "projectId": "proj_2",
            "creation": "2023-04-22",
            "status": "development",
            "type": "task"
        },
        {
            "title": "Learn React",
            "description": " Learn React and related libraries",
            "deadline": "2022-12-31",
            "priority": "high",
            "id": "task_1682181952473",
            "projectId": "proj_2",
            "creation": "2023-04-22",
            "status": "done",
            "type": "task"
        },
        {
            "title": "learn redux",
            "description": "Learn redux and redux tool",
            "deadline": "2023-04-30",
            "priority": "high",
            "id": "task_1682182012153",
            "projectId": "proj_2",
            "creation": "2023-04-22",
            "status": "done",
            "type": "task"
        },
        {
            "title": "LinguoLeo",
            "description": "Take courses on LinguoLeo",
            "deadline": "2023-06-21",
            "priority": "low",
            "id": "task_1682182394578",
            "projectId": "proj_1",
            "creation": "2023-04-22",
            "status": "development",
            "type": "task"
        },
        {
            "title": "lexicon 1000 words",
            "description": "1000 English words must be learned",
            "deadline": "2022-08-10",
            "priority": "low",
            "id": "task_1682182450688",
            "projectId": "proj_1",
            "creation": "2023-04-22",
            "status": "done",
            "type": "task"
        },
        {
            "title": "Language school",
            "description": "Spend the summer at a language school",
            "deadline": "2024-05-31",
            "priority": "low",
            "id": "task_1682182531503",
            "projectId": "proj_1",
            "creation": "2023-04-22",
            "status": "queue",
            "type": "task"
        },
        {
            "title": "TOEFL",
            "description": "successful passage of the TOEFL test",
            "deadline": "2024-06-26",
            "priority": "high",
            "id": "task_1682182945347",
            "projectId": "proj_1",
            "creation": "2023-04-22",
            "status": "queue",
            "type": "task"
        },
        {
            "title": "Cleaning",
            "description": "Throw away old things and rubbish",
            "deadline": "2023-10-25",
            "priority": "high",
            "id": "task_1682183508866",
            "projectId": "proj_3",
            "creation": "2023-04-22",
            "status": "done",
            "type": "task"
        },
        {
            "title": "Buy food",
            "description": "buy healthy food",
            "deadline": "2023-04-14",
            "priority": "high",
            "id": "task_1682183627270",
            "projectId": "proj_5",
            "creation": "2023-04-22",
            "status": "queue",
            "type": "task"
        },
        {
            "title": "Список покупок",
            "description": "Составить список покупок",
            "deadline": "2023-04-28",
            "priority": "low",
            "id": "task_1682183654185",
            "projectId": "proj_5",
            "creation": "2023-04-22",
            "status": "development",
            "type": "task"
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