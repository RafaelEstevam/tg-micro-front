import { createStore, combineReducers } from 'redux';

const token = localStorage.getItem("token");

const task = {};

const accessibilityContext = {
    contrast: 0,
    brightness: 0,
    fontSize: 0,
    nightMode: true
}

const chatContext = {
    showChat: false,
    dataChat: {}
}

const decode = {
    email: localStorage.getItem("username"),
    permission: localStorage.getItem("permission")
}

const tasks = {
    totalTasks: 0,
    toDoTasks: 0,
    doingTasks: 0,
    finishTasks: 0
};

const taskList = [];

function chatReducer(state = chatContext, action){
    switch (action.type){
        case 'SET_CHAT':
            state = action.chat;
            return state;
        default:
            return state;
    }
}

function decodeReducer(state = decode, action) {
    const data = action.decode;

    switch (action.type) {
        case 'SET_DECODE':
            state = { ...state, ...data };
            return state;
        default:
            return state;
    }
}

function setTokenReducer(state = token, action) {
    const hash = action.token;
    switch (action.type) {
        case 'SET_TOKEN':
            state = hash;
            return state;
        default:
            return state;
    }
}

function setAccessibilityReducer(state = accessibilityContext, action) {

    switch (action.type) {
        case 'SET_CONTRAST':
            state = { ...state, contrast: action.contrast }
            return state;
        case 'SET_BRIGHTNESS':
            state = { ...state, brightness: action.brightness }
            return state;
        case 'SET_FONTSIZE':
            state = { ...state, fontSize: action.fontSize }
            return state;
        case 'SET_NIGHTMODE':
            state = { ...state, nightMode: action.nightMode }
            return state;
        default:
            return state;
    }
}

function taskListReducer(state = taskList, action) {
    const list = action.list;

    switch (action.type) {
        case 'LIST_ALL_TASKS':
            state = [...state, list]
            return state;
        default:
            return state;
    }
}

function taskReducer(state = task, action) {
    const status = action.status
    switch (action.type) {
        case 'ADD_TASK':
            state = { ...state, status: status };
            return state;
        default:
            return state;
    }
}

// function tasksReducer(state = tasks, action){

//     const count = action.count;

//     switch (action.type){

//         case 'ADD_TASK':
//             state = {...state, totalTasks: count};
//             return state;
//         case 'TODO_TASK':
//             state = {...state, toDoTasks: count};
//             return state;
//         case 'DOING_TASK':
//             state = {...state, totalTasks: count};
//             return state;
//         case 'FINISH_TASK':
//             state = {...state, totalTasks: count};
//             return state;
//         default:
//             return state;
//     }
// }

export default createStore(combineReducers({
    decode: decodeReducer,
    token: setTokenReducer,
    task: taskReducer,
    taskList: taskListReducer,
    accessibility: setAccessibilityReducer,
    chat: chatReducer,
}));