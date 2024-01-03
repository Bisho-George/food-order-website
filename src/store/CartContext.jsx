import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    resetCart: () => { }
})
const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex((item) => item.id === action.item.id)
        if (existingCartItemIndex > -1) {
            const existingItem = updatedItems[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }
        else {
            updatedItems.push({
                ...action.item,
                quantity: 1
            })
        }
        return { ...state, items: updatedItems };
    }
    if (action.type === 'REMOVE_ITEM') {
        const updatedItems = [...state.items]
        const existingItemIndex = updatedItems.findIndex((item) => item.id === action.id)
        if (existingItemIndex > -1) {
            const existingItem = updatedItems[existingItemIndex];
            if (existingItem.quantity > 1) {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity - 1
                }
                updatedItems[existingItemIndex] = updatedItem
            } else {
                updatedItems.splice(existingItemIndex, 1)
            }
            return {
                ...state,
                items: updatedItems
            }
        }
    }
    if (action.type === 'CLEAR_CART') {
        const updatedItems = []
        return {
            ...state,
            items: updatedItems
        }
    }
    return state;
}
export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })
    
    const addItem = (item) => { 
        dispatchCartAction({
            type: 'ADD_ITEM',
            item
        })
    }
    
    const removeItem = (id) => { 
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        })
    }
    const resetCart = () => {
        dispatchCartAction({
            type: 'CLEAR_CART'
        })
    }
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        resetCart
    }
        
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext