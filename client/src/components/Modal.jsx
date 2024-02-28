import { Modal } from 'flowbite-react';
import React from 'react';
import PropTypes from 'prop-types';

function CustomModal(props) {
    const showModal = props.showModal;
    const setShowModal = props.setShowModal;
    const modalContent = props.modalContent;

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} size="md" popup onClose={handleClose}>
        {modalContent}
      </Modal>
    </>
  );
};
CustomModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  modalContent: PropTypes.object.isRequired,
}


export default CustomModal;
