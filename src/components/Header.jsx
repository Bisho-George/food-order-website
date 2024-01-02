import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';
const Header = () => {
    const userProgressCtx = useContext(UserProgressContext);
    const handleShowCart = () => {
        userProgressCtx.showCart()
    }
    const cartContext = useContext(CartContext);
    const totalCartItems = cartContext.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo image" />
                <h1>React Food Orders</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header
