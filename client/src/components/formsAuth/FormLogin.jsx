import React from 'react';
import { login } from '../../requests/authenticationRequests.js'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types'
import FormForgot from './FormForgot.jsx'
import FormRegister from './FormRegister.jsx';
import { GoogleLogin } from '@react-oauth/google'
import { googleOAuth } from '../../requests/authenticationRequests.js';
import { jwtDecode } from 'jwt-decode'
import { GlobalContext } from '../App.jsx';


const FormLogin = (props) => {

  const { setLoggedIn, setUserData, setModalContent } = React.useContext(GlobalContext)
  const handleClose = props.handleClose

  const handleGoogleSuccess = (credentialResponse) => {
    const authorizationCode = credentialResponse;
    const wrapper = async () => {
      const googleLoginSuccess = await googleOAuth(authorizationCode)
      if (googleLoginSuccess) {
        //console.log('Google login success', googleLoginSuccess)

        setUserData(googleLoginSuccess.user)
        setLoggedIn(true)
        handleClose()
      } else {
        alert('Google login failed')
      }
    }
    wrapper()
  };

  const handleGoogleError = (errorResponse) => {
    console.log('Login Failed', errorResponse);
  };

  const emailRef = React.useRef(null) // Focus the Email Input Field on Render
  React.useEffect(() => {
    emailRef.current.focus()
  }, [])

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const wrapper = async () => {
    const loginSuccess = await login(email, password)
    if (loginSuccess) {
      handleClose()
      setLoggedIn(true)
      setUserData({ email })
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" type="email" ref={emailRef} placeholder="name@company.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a className="text-sm text-cyan-700 hover:underline dark:text-cyan-500" onClick={()=>setModalContent(<FormForgot handleClose={handleClose} setModalContent={setModalContent} />)}>
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={handleLogin}>Log in to your account</Button>
            </div>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap flow="auth-code" />
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={()=>setModalContent(<FormRegister handleClose={handleClose} />)}>
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
    </div>
  );
};
FormLogin.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default FormLogin;
