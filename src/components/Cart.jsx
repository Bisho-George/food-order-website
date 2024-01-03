import { useContext } from 'react';
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../utils/format.js";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";
import CartItem from './CartItem.jsx';
const Cart = () => {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const increaseQuantity = (item) => {
        cartCtx.addItem(item);
    }
    const decreaseQuantity = (id) => {
        cartCtx.removeItem(id);
    }
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity)
    }, 0)
    const handleCloseCart = () => {
        userProgressCtx.hideCart()
    }
    const handleShowCheckout = () => {
        userProgressCtx.showCheckout()
    }
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} >
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (
                    <CartItem key={item.id} {...item} onDecrease={() => decreaseQuantity(item.id)} onIncrease={() => increaseQuantity(item)}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}

export default Cart
