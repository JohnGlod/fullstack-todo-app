module.exports = class UserDto {
  login;
  id;
  firstName;
  lastName;
  managerId;
  constructor ({ login, id, firstName, lastName, managerId }) {
    this.login = login;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.managerId = managerId;
  }
}
