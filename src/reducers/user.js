const user = (state={}, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return action.user
        case 'LOGOUT_SUCCESS':
            return {}
        case 'FETCH_USER_SUCCESS':
            // debugger
            return action.user
        default:
            return state
    }
} 

export default user