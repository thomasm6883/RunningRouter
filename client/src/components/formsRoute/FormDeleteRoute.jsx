import React from 'react';
import { deleteRoute } from '../../requests/routeRequests.js'
import { Button, Modal } from 'flowbite-react';
import PropTypes from 'prop-types'


const FormDeleteRoute = (props) => {
  const handleClose = props.handleClose;
  const route = props.route;

  const handleDeleteRoute = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const deleteSuccess = await deleteRoute(route)
    if (deleteSuccess) {

      handleClose()
    } else{
      alert('Route deletion failed')
    }
  }
  wrapper()
  }

  return (
    <div>
    <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Delete Route</h3>
            <p className="text-gray-700 dark:text-gray-400">Are you sure you want to delete this route?</p>
            <p className="text-black-700 dark:text-gray-400 rounded border-2 font-bold ">{route.name}</p>
            <div className="w-full">
              <Button onClick={handleDeleteRoute}>Confirm Delete</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormDeleteRoute.propTypes = {
  handleClose: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
}

export default FormDeleteRoute;
