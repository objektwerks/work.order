// @ts-check

// @ts-ignore
import { homeowner, serviceProvider } from './entity.js';

const roleInvalidMessage = 'A valid role must be selected.';
const nameInvalidMessage = 'For name, enter at least 2 characters.'
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.';
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.';
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.';
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ';
const idInvalidMessage = 'An id must be greater than 0.'
const numberInvalidMessage = 'A number must be greater than 0.'
const definedInvalidMessage = 'This field may be empty, but must be defined.';

function validateRole(role) {
  return role === homeowner || role === serviceProvider;
}

function validateEmailAddress(emailAddress) {
  return validateLengthRange(emailAddress, 3, 128) && emailAddress.includes('@');
}

function validateLength(string, length) {
  return string.length === length;
}

function validateLengthRange(string, lower, upper) {
  return string.length >= lower && string.length <= upper;
}

function validateGreaterThanZero(number) {
  return number > 0;
}

function validateDefined(string) {
  let isDefined;
  try {
    isDefined = string !== undefined && string !== null && string.length >= 0;
  } catch {
    isDefined = false;
  }
  return isDefined;
}

export function validateRegistration(role, name, emailAddress, streetAddress) {
  const errors = [];
  if (!validateRole(role)) errors.push(roleInvalidMessage);
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage);
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage);
  return errors;
}

export function validateCredentials(emailAddress, pin) {
  const errors = [];
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
  if (!validateLength(pin, 7)) errors.push(pinInvalidMessage);
  return errors;
}

export function validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
  const errors = [];
  if (!validateGreaterThanZero(number)) errors.push(numberInvalidMessage);
  if (!validateGreaterThanZero(homeownerId)) errors.push(idInvalidMessage);
  if (!validateGreaterThanZero(serviceProviderId)) errors.push(idInvalidMessage);
  if (!validateLengthRange(title, 4, 64)) errors.push(definedInvalidMessage);
  if (!validateLengthRange(issue, 4, 255)) errors.push(definedInvalidMessage);
  if (!validateDefined(imageUrl)) errors.push(definedInvalidMessage);
  if (!validateDefined(resolution)) errors.push(definedInvalidMessage);
  if (!validateLength(opened, 24)) errors.push(datetimeInvalidMessage);
  if (!validateDefined(closed)) errors.push(definedInvalidMessage);
  return errors;
}

export function validateUser(id, role, name, emailAddress, streetAddress, registered) {
  const errors = [];
  if (!validateGreaterThanZero(id)) errors.push(idInvalidMessage);
  if (!validateRole(role)) errors.push(roleInvalidMessage);
  if (!validateLengthRange(name, 2, 64)) errors.push(nameInvalidMessage);
  if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
  if (!validateLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage);
  if (!validateLength(registered, 24)) errors.push(datetimeInvalidMessage);
  return errors;
}