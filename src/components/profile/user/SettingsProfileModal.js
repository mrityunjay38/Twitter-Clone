import React from 'react';
import { Link } from 'react-router-dom'

const modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block": "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose}>X</button>
                {children}
            </section>
        </div>
    )
}

export default modal;