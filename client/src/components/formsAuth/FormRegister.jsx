import React from 'react';
import { register } from '../../requests/authenticationRequests.js'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'
import FormLogin from './FormLogin.jsx'
import { GlobalContext } from '../App.jsx';


const FormRegister = (props) => {
  const { setLoggedIn, setModalContent, setUserData } = React.useContext(GlobalContext)
  const handleClose = props.handleClose;

  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = React.useState('')

  const emailRef = React.useRef(null) // Focus the Email Input Field on Render
  React.useEffect(() => {
    emailRef.current.focus()
  }, [])

  const handleRegister = (e) => {
    e.preventDefault()
    let error = false
    if (!validateEmail(email)) {
      setEmailErrorMessage('Invalid email')
      error = true
    }
    if (!validatePassword(password)) {
      setPasswordErrorMessage('Password must be at least 8 characters')
      error = true
    }
    if (!validateMatchPassword(password, passwordConfirm)) {
      setPasswordConfirmErrorMessage('Passwords do not match')
      error = true
    }
    if (error) {
      return
    }
    const wrapper = async () => {
    const registerSuccess = await register(email, password, passwordConfirm)
    if (registerSuccess) {
      handleClose()
      setLoggedIn(true)
      setUserData({ email })
    } else{
      alert('Register failed')
    }
  }
  wrapper()
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailErrorMessage('')
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordErrorMessage('')
  }
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
    setPasswordConfirmErrorMessage('')
  }

  return (
    <div>
    <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register with our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
                <div className="text-red-500 text-sm">{emailErrorMessage}</div>
              </div>
              <TextInput id="email" ref={emailRef} placeholder="name@company.com" required onChange={handleEmailChange} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
                <div className="text-red-500 text-sm">{passwordErrorMessage}</div>
              </div>
              <TextInput id="password" type="password" required onChange={handlePasswordChange}/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm your password" />
                <div className="text-red-500 text-sm">{passwordConfirmErrorMessage}</div>
              </div>
              <TextInput id="passwordConfirm" type="password" required onChange={handlePasswordConfirmChange}/>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Receive emails about product updates</Label>
              </div>
            </div>
            <div className="w-full">
              <Button onClick={handleRegister}>Create an account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Have an account?&nbsp;
              <a className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={()=>setModalContent(<FormLogin handleClose={handleClose} />)}>
                Login
              </a>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormRegister.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default FormRegister;

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePassword(password) {
  return password.length >= 8;
}
function validateMatchPassword(password, passwordConfirm) {
  return password === passwordConfirm;
}
