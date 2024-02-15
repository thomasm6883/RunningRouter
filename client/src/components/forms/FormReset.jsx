import React from 'react';
import { resetPassword } from '../../requests/authenticationRequests.js'
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'


const FormReset = (props) => {
  const handleClose = props.handleClose;
  const emailInputRef = props.emailInputRef
  const [pin, setPin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')

  const handleReset = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const registerSuccess = await resetPassword(pin, password, passwordConfirm)
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Reset Password</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="pin" value="Your Access Key" />
              </div>
              <TextInput id="pin" ref={emailInputRef} placeholder="Enter your security pin" required onChange={(e) => setPin(e.target.value)} />
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
              <Button onClick={handleReset}>Create an account</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormReset.propTypes = {
  handleClose: PropTypes.func.isRequired,
  emailInputRef: PropTypes.object.isRequired,
}

export default FormReset;
