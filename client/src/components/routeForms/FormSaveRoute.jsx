import React from 'react';
import { saveRoute } from '../../requests/routeRequests.js'
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'


const FormSaveRoute = (props) => {
  const handleClose = props.handleClose;
  const route = props.route;
  const length = props.length

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [nameErrorMessage, setnameErrorMessage] = React.useState('')
  const [descriptionErrorMessage, setdescriptionErrorMessage] = React.useState('')

  const nameRef = React.useRef(null)
  React.useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleSaveRoute = (e) => {
    e.preventDefault()
    let error = false
    if (!validateName(name)) {
      setnameErrorMessage('Invalid name')
      error = true
    }
    if (!validateDescription(description)) {
      setdescriptionErrorMessage('description must be at least 8 characters')
      error = true
    }
    if (error) {
      return
    }
    const wrapper = async () => {
    const saveRouteSuccess = await saveRoute(name, description, route, length)
    if (saveRouteSuccess) {
      handleClose()
    } else{
      alert('Save route failed')
    }
  }
  wrapper()
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
    setnameErrorMessage('')
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    setdescriptionErrorMessage('')
  }

  return (
    <div>
    <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Save your route</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="routeName" value="Route name" />
                <div className="text-red-500 text-sm">{nameErrorMessage}</div>
              </div>
              <TextInput id="routeName" ref={nameRef} placeholder="Route Name" required onChange={handleNameChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Route description" />
                <div className="text-red-500 text-sm">{descriptionErrorMessage}</div>
              </div>
              <TextInput id="description" type="description" required onChange={handleDescriptionChange}/>
            </div>
            <div className="w-full">
              <Button onClick={handleSaveRoute}>Save Route</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormSaveRoute.propTypes = {
  handleClose: PropTypes.func.isRequired,
  route: PropTypes.array.isRequired
}

export default FormSaveRoute;

function validateName(name) {
  return name.length >= 1;
}
function validateDescription(description) {
  return description.length >= 1;
}

