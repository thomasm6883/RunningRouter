import { Modal } from 'flowbite-react';
import React from 'react';
import PropTypes from 'prop-types';

function CustomModal(props) {
    const showModal = props.showModal;
    const setShowModal = props.setShowModal;
    const modalContent = props.modalContent;

  const handleClose = () => setShowModal(false);
    const emailInputRef = React.useRef(null);

  return (
    <>
      <Modal dismissible show={showModal} size="md" popup onClose={handleClose} initialFocus={emailInputRef}>
        {modalContent}
      </Modal>
    </>
  );
}
CustomModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  modalContent: PropTypes.string.isRequired,
}


export default CustomModal;
