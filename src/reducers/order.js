const initialState = []

const order = (state=initialState, action) => {

    switch(action.type) {
        case 'ORDER_SUBMIT_SUCCESS':
            // debugger
            return [...state, action.order]
        default:
            return state
    }
}

export default order