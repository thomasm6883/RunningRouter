import React from 'react';
import { register } from '../../requests/authenticationRequests.js'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'

const FormRegister = (props) => {
  const handleClose = props.handleClose;
  const emailInputRef = props.emailInputRef
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const registerSuccess = await register(username, password, passwordConfirm, email)
    if (registerSuccess) {
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">Close</button>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </div>
            <div className="flex justify-between">
            </div>
            <div className="w-full">
              <Button onClick={handleRegister}>Create an account</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormRegister.propTypes = {
  handleClose: PropTypes.func.isRequired,
  emailInputRef: PropTypes.object.isRequired,
}

export default FormRegister;
