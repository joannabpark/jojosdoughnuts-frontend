export const addItemSuccess = (order_items) => {
    // debugger
    return {
        type: 'ADD_ITEM_SUCCESS',
        order_items: order_items
    }
  }

  export const fetchOrderSuccess = (order_items) => {
    // debugger
    return {
        type: 'FETCH_ORDER_SUCCESS',
        order_items: order_items
    }
  }

  export const removeItemSuccess = (order_items) => {
    // debugger
    return {
        type: 'REMOVE_ITEM_SUCCESS',
        order_items: order_items
    }
  }

  export const clearCartSuccess = () => {
    // debugger
    return {
        type: 'CLEAR_CART_SUCCESS',
    }
  }