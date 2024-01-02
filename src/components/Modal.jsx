import { createPortal } from "react-dom"
import { useRef, useEffect } from "react";
const Modal = ({ children, open, className = '' }) => {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current
        if (open) {
            modal.showModal()
        }
        return () => modal.close()
    }, [open]);
    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
            {children}
        </dialog>,
        document.querySelector('#modal')
    )
}

export default Modal
