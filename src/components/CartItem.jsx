import { currencyFormatter } from "../utils/format.js"
const CartItem = ({ name, quantity, price, onDecrease, onIncrease }) => {
    const formattedPrice = currencyFormatter.format(price)

    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} X {formattedPrice}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}

export default CartItem
