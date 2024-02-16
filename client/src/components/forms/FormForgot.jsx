import React from 'react';
import { login } from '../../requests/authenticationRequests.js'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'


const FormForgot = (props) => {
  const handleClose = props.handleClose;
  const emailInputRef = props.emailInputRef
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const loginSuccess = await login(username, email)
    if (loginSuccess) {
      handleClose()
    } else{
      alert('Login failed')
    }
  }
  wrapper()
  }

  return (
    <div>
    <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Forgot Password</h3>
            <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">X</button>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="w-full">
              <Button onClick={handleLogin}>Log in to your account</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormForgot.propTypes = {
  handleClose: PropTypes.func.isRequired,
  emailInputRef: PropTypes.object.isRequired,
}

export default FormForgot;
