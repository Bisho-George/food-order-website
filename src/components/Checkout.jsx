import useHttp from "../hooks/useHttp.js";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../utils/format.js";
import Modal from "./Modal.jsx";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import { useContext } from "react";
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}
const Checkout = () => {
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.price * item.quantity)
    }, 0)
    const handleClose = () => {
        userProgressCtx.hideCheckout()
    }
    const handleFinish = () => {
        userProgressCtx.hideCheckout()
        cartCtx.resetCart(),
        clearData()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const customerData = Object.fromEntries(formData.entries)
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customerData
            }
        }))
    }
    
    let actions = (
        <>
            <Button onClick={handleClose} type="button" textOnly>Close</Button>
            <Button onClick={handleFinish}>Submit Order</Button>
        </>
    )
    if (isSending) {
        actions = <span>Sending order data...</span>
    }
    if (data) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email with the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleClose}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={userProgressCtx.progress === 'checkout' ? handleClose : null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" />
                <Input label="E-Mail Address" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                {error && <Error title="Failed to submit the order" message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export default Checkout
