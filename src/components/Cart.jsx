import { useContext } from 'react';
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../utils/format.js";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";
const Cart = () => {
    const userProgressCtx = useContext(UserProgressContext);
    const { items } = useContext(CartContext);
    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity)
    }, 0)
    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }
    const handleShowCheckout = () => {
        userProgressCtx.showCheckout()
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} close={userProgressCtx.progress === ''} >
            <h2>Your Cart</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} - {item.quantity}</li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleShowCheckout}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}

export default Cart
