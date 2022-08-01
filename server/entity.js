export const admin = "admin";
export const homeowner = "homeowner";
export const serviceProvider = "serviceprovider"

export class User {
  constructor(id, role, name, emailAddress, streetAddress, registered) {
    this.id = id;
    this.role = role;
    this.emailAddress = emailAddress;
    this.streetAddress = streetAddress;
    this.registered = registered;
  }
}