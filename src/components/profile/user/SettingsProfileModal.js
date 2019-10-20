import React from 'react';
import { Link } from 'react-router-dom'

const modal = ({ path, changeUserDetail, handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block": "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main setting-modal">
                <div className="edit-profile-page-header">
                    <Link to={path}>
                        <button onClick={handleClose}>X</button>
                    </Link>
                    <h1>Edit User Details</h1>
                </div>
                <form onSubmit={changeUserDetail} style={{ overflowY: 'auto' }}>
                    {children}
                    <input type="submit" value="Save" className="edit-profile-save-btn"/>
                </form>
            </section>
        </div>
    )
}

export default modal;