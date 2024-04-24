import React from 'react';
import { resetPassword } from '../../requests/authenticationRequests.js'
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'


const FormReset = (props) => {
  const handleClose = props.handleClose;
  const email = props.email
  const [pin, setPin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')

  const pinRef = React.useRef(null) // Focus the Pin Input Field on Render
  React.useEffect(() => {
    pinRef.current.focus()
  }, [])

  const handleReset = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const resetSuccess = await resetPassword(email, pin, password, passwordConfirm)
    if (resetSuccess) {
      handleClose()
    } else{
      alert('Reset failed')
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
              <TextInput id="pin" ref={pinRef} placeholder="Enter your security pin" required onChange={(e) => setPin(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm your password" />
              </div>
              <TextInput id="passwordConfirm" type="password" required onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </div>
            <div className="flex justify-between">
            </div>
            <div className="w-full">
              <Button onClick={handleReset}>Reset Password</Button>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormReset.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default FormReset;
