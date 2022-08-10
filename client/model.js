// @ts-check
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';

export function toJson(object) {
  return JSON.stringify(object)
}

export function toObject(json) {
  return JSON.parse(json)
}

function validateRole(role) {
  return role == homeowner || role == serviceProvider;
}

function validateName(name) {
  return name.length >= 2;
}

function validateEmailAddress(emailAddress) {
  return emailAddress.length >= 3 && emailAddress.includes('@');
}

function validateStreetAddress(streetAddress) {
  return streetAddress.length < 7;
}

function validatePin(pin) {
  return pin.length == 7;
}

function validateDateTime(datetime) {
  return datetime.length === 24;
}

function validateId(id) {
  return id > 0;
}

function validateNumber(number) {
  return number > 0;
}

function validateNotEmpty(string) {
  let isNotEmpty;
  try {
    isNotEmpty = string.length >= 0;
  } catch {
    isNotEmpty = false;
  }
  return isNotEmpty;
}

const roleInvalidMessage = 'A valid role must be selected.';
const nameInvalidMessage = 'For name, enter at least 2 characters.'
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.';
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.';
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.';
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ';
const idInvalidMessage = 'An id must be greater than 0.'
const numberInvalidMessage = 'A number must be greater than 0.'
const emptyInvalidMessage = 'This field must not be empty. Enter some text.';

export class Registration {
  static create(role, name, emailAddress, streetAddress) {
    return {
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress
    }    
  }

  static validate(role, name, emailAddress, streetAddress) {
    const errors = [];
    if (!validateRole(role)) errors.push(roleInvalidMessage);
    if (!validateName(name)) errors.push(nameInvalidMessage);
    if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
    if (!validateStreetAddress(streetAddress)) errors.push(streetAddressInvalidMessage);
    return errors;
  }
}

export class Credentials {
  static create(emailAddress, pin) {
    return {
      emailAddress: emailAddress,
      pin: pin
    }    
  }

  static validate(emailAddress, pin) {
    const errors = [];
    if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
    if (!validatePin) errors.push(pinInvalidMessage);
    return errors;
  }
}

export class Status {
  static success() {
    return {
      success: true,
      error: ''
    }
  }
  static fail(error) {
    return {
      success: false,
      error: error
    }
  }
}

export class UserServiceProvidersWorkOrders {
  static success(user, serviceproviders, workorders) {
    return {
      success: true,
      error: '',
      user: user,
      serviceproviders: serviceproviders,
      workorders: workorders
    }    
  }
  static fail(error) {
    return {
      success: false,
      error: error,
      user: {},
      serviceproviders: [],
      workorders: []
    }    
  }
}

export class WorkOrders {
  static success(workorders) {
    return {
      success: true,
      error: '',
      workorders: workorders
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      workorders: []
    }    
  }
}

export class WorkOrder {
  static create(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    return {
      number: number,
      homeownerId: homeownerId,
      serviceProviderId: serviceProviderId,
      title: title,
      issue: issue,
      imageUrl: imageUrl,
      resolution: resolution,
      opened: opened,
      closed: closed
    }
  }

  static success(workorder) {
    return {
      success: true,
      error: '',
      workorder: workorder
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      workorder: {}
    }    
  }

  static validate(number, homeownerId, serviceProviderId, title, issue, imageUrl, resolution, opened, closed) {
    const errors = [];
    if (!validateNumber(number)) errors.push(numberInvalidMessage);
    if (!validateId(homeownerId)) errors.push(idInvalidMessage);
    if (!validateId(serviceProviderId)) errors.push(idInvalidMessage);
    if (!validateNotEmpty(title)) errors.push(emptyInvalidMessage);
    if (!validateNotEmpty(issue)) errors.push(emptyInvalidMessage);
    if (!validateNotEmpty(imageUrl)) errors.push(emptyInvalidMessage);
    if (!validateNotEmpty(resolution)) errors.push(emptyInvalidMessage);
    if (!validateDateTime(opened)) errors.push(datetimeInvalidMessage);
    if (!validateNotEmpty(closed)) errors.push(emptyInvalidMessage);
    return errors;
  }
}

export class Users {
  static success(users) {
    return {
      success: true,
      error: '',
      users: users
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      users: []
    }    
  }
}

export class User {
  static create(id, role, name, emailAddress, streetAddress, registered) {
    return {
      id: id,
      role: role,
      name: name,
      emailAddress: emailAddress,
      streetAddress: streetAddress,
      registered: registered,
      pin: ''
    }
  }

  static success(user) {
    return {
      success: true,
      error: '',
      user: user
    }    
  }

  static fail(error) {
    return {
      success: false,
      error: error,
      user: {}
    }    
  }

  static validate(id, role, name, emailAddress, streetAddress, registered) {
    const errors = [];
    if (!validateId(id)) errors.push(idInvalidMessage);
    if (!validateRole(role)) errors.push(roleInvalidMessage);
    if (!validateName(name)) errors.push(nameInvalidMessage);
    if (!validateEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage);
    if (!validateStreetAddress(streetAddress)) errors.push(streetAddressInvalidMessage);
    if (!validateDateTime(registered)) errors.push(datetimeInvalidMessage);
    return errors;
  }
}