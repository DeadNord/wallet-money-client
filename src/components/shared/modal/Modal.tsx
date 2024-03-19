import React, { Component } from 'react';
import s from './Modal.module.scss'; // Assumed CSS module for styling
import SvgIcon from '../icons/SvgIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

class Modal extends Component<ModalProps> {
  // Utilize lifecycle methods for event listeners
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Arrow function for binding and to avoid the necessity of binding in constructor
  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, onClose, children } = this.props;

    // Early return for better readability
    if (!isOpen) {
      return null;
    }

    return (
      <div className={s.modalBackground}>
        <div className={s.modalContent}>
          {children}
          <button onClick={onClose} aria-label="Close" className={s.closeButton}>
            <SvgIcon name="icon-close" className={s.iconClose} />
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
