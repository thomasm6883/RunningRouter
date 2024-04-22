import Express from 'express'

import getSavedRoutes from '../endpoints/runningRoutes/getSavedRoutes.js'
import saveRoute from '../endpoints/runningRoutes/saveRunningRoute.js'
import deleteRoute from '../endpoints/runningRoutes/deleteRunningRoute.js'

import login from '../endpoints/authentication/login.js'
import register from '../endpoints/authentication/register.js'
import logout from '../endpoints/authentication/logout.js'
import forgotPassword from '../endpoints/authentication/forgotPassword.js'
import resetPassword from '../endpoints/authentication/resetPassword.js'
import googleOAuth from '../endpoints/authentication/googleOAuth.js'
import checkCookie from '../endpoints/authentication/checkCookie.js'

import getUser from '../endpoints/account/getUser.js'
import updateUser from '../endpoints/account/updateUser.js'
import deleteUser from '../endpoints/account/deleteUser.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

import saveLocation from '../endpoints/specificLocations/saveLocation.js'
import deleteLocation from '../endpoints/specificLocations/deleteLocation.js'
import getLocations from '../endpoints/specificLocations/getLocations.js' 



import createCheckoutSession from '../endpoints/stripe/createCheckoutSession.js'
import createPortalSession from '../endpoints/stripe/createPortalSession.js'
import webhook from '../endpoints/stripe/webhook.js'
import sessionStatus from '../endpoints/stripe/sessionStatus.js'

import { validator, validationErrorMiddleware } from '../middleware/inputValidation.js'

const dataRouter = new Express.Router()

dataRouter.get('/test', (req, res) => {
    res.send('Hello from the server!')
})

//dataRouter.get('/routes', isAuthenticated, getSavedRoutes); //can remove isAuthenticated for testing
dataRouter.get('/routes', getSavedRoutes);
//dataRouter.post('/routes', isAuthenticated, saveRoute);
dataRouter.post('/routes',  saveRoute);
//dataRouter.delete('/routes', isAuthenticated, deleteRoute);
dataRouter.delete('/routes', deleteRoute);



//dataRouter.post('/locations',  saveLocation);
dataRouter.post('/locations', isAuthenticated,  saveLocation);
//dataRouter.delete('/locations',  deleteLocation);
dataRouter.delete('/locations', isAuthenticated,  deleteLocation);
dataRouter.get('/locations/:latitude/:longitude/:dist',  getLocations);


//dataRouter.delete('/routes', isAuthenticated, deleteRoute);
//dataRouter.delete('/routes', deleteRoute);


// Authentication Routes
dataRouter.post('/login', login);
dataRouter.post('/register', register);
dataRouter.get('/logout', logout);



dataRouter.post('/forgotPassword', forgotPassword);
dataRouter.post('/resetPassword', resetPassword);
dataRouter.post('/auth/google', googleOAuth);
dataRouter.get('/cookie', checkCookie);
// User Account Routes
dataRouter.get('/user', isAuthenticated, getUser);
dataRouter.post('/user', isAuthenticated, updateUser);
dataRouter.delete('/user', isAuthenticated, deleteUser);
// Stripe Routes
dataRouter.post('/create-checkout-session', isAuthenticated, createCheckoutSession);
dataRouter.post('/create-portal-session', isAuthenticated, createPortalSession);
dataRouter.post('/webhook', isAuthenticated, webhook);
dataRouter.get('/session-status', isAuthenticated, sessionStatus);

export default dataRouter
