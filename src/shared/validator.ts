// @ts-ignore
import { homeowner, serviceProvider } from './entity.js'

const roleInvalidMessage = 'A valid role must be selected.'
const nameInvalidMessage = 'For name, enter at least 2 characters.'
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.'
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.'
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.'
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ'
const idInvalidMessage = 'An id must be greater than 0.'
const numberInvalidMessage = 'A number must be greater than 0.'
const definedInvalidMessage = 'This field may be empty, but must be defined.'

function validateRole(role: string) {
  return role === homeowner || role === serviceProvider
}

function validateEmailAddress(emailAddress: string) {
  return validateLengthRange(emailAddress, 3, 128) && emailAddress.includes('@')
}

function validateLength(string: string, length: number) {
  return string.length === length
}

function validateLengthRange(string: string, lower: number, upper: number) {
  return string.length >= lower && string.length <= upper
}

function validateGreaterThanZero(number: number) {
  return number > 0
}

function validateGreaterThanOrEqualZero(number: number) {
  return number >= 0
}

function validateDefined(string: string) {
  let isDefined
  try {
    isDefined = string !== undefined && string !== null && string.length >= 0
  } catch {
    isDefined = false
  }
  return isDefined
}

export function validateRegistration(role: string, name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateRole(role)) errors.push(roleInvalidMessage)
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}

export function validateCredentials(emailAddress: string, pin: string) {
  const errors = []
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLength(pin, 7)) errors.push(pinInvalidMessage)
  return errors
}

export function validateWorkOrder(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string) {
  const errors = []
  if (!validateGreaterThanOrEqualZero(number)) errors.push(numberInvalidMessage)
  if (!validateGreaterThanZero(homeownerId)) errors.push(idInvalidMessage)
  if (!validateGreaterThanZero(serviceProviderId)) errors.push(idInvalidMessage)
  if (!validateLengthRange(title, 4, 64)) errors.push(definedInvalidMessage)
  if (!validateLengthRange(issue, 4, 255)) errors.push(definedInvalidMessage)
  if (!validateDefined(imageUrl)) errors.push(definedInvalidMessage)
  if (!validateDefined(resolution)) errors.push(definedInvalidMessage)
  if (!validateLength(opened, 24)) errors.push(datetimeInvalidMessage)
  if (!validateDefined(closed)) errors.push(definedInvalidMessage)
  return errors
}

export function validateUser(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string) {
  const errors = []
  if (!validateGreaterThanZero(id)) errors.push(idInvalidMessage)
  if (!validateLength(registered, 24)) errors.push(datetimeInvalidMessage)
  errors.concat( validateRegistration(role, name, emailAddress, streetAddress) )
  return errors
}

export function validateUserInfo(name: string, emailAddress: string, streetAddress: string) {
  const errors = []
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}