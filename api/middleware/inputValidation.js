import { Validator, ValidationError } from 'express-json-validator-middleware'

export const validator = new Validator({ allErrors: true })

export const loginSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' }
  }
}
export const signupSchema = {
  type: 'object',
  required: ['username', 'password', 'passwordConfirm', 'email'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    passwordConfirm: { type: 'string' },
    email: { type: 'string' }
  }
}

export function validationErrorMiddleware (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const isValidationError = err instanceof ValidationError
  if (!isValidationError) {
    return next()
  }

  res.status(400).json({ error: true, message: err.validationErrors })
  next()
}