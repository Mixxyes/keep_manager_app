import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {hideModal, clearPostForm} from '../../../store/actions';

import "./modal.scss";

import {IoCloseCircleOutline} from 'react-icons/io5';

function Modal({children}) {

    const visible = useSelector(state => state.modalVisible);
    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(hideModal());
        dispatch(clearPostForm());
    }

    return (
        <div className={`modal ${visible}`}>
            <div className="modal_dialog">
                <div className="modal_content">
                    <div onClick={onCloseModal} className="modal_close"><IoCloseCircleOutline/></div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;