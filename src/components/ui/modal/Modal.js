import { Fragment } from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

const Backdrop = props => {
  return <div onClick={() => props.onHide()} className="backdrop"></div>;
};

const overlay = document.getElementById('overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(<Backdrop onHide={props.onHide} />, overlay)}
      {ReactDom.createPortal(
        <div className="modal">{props.children}</div>,
        overlay
      )}
    </Fragment>
  );
};
export { Modal };
