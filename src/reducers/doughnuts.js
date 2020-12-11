const initialState = []

const doughnuts = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_DOUGHNUTS_SUCCESS":
            // debugger
            const doughnuts = [...action.doughnuts]
            return doughnuts
        default:
            return state
    }
}

export default doughnuts