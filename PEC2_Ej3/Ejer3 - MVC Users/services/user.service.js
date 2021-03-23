/**
 * @class Service
 *
 * Manages the data of the application.
 */
 class UserService {
    constructor() {
      this.users = (JSON.parse(localStorage.getItem("users")) || []).map(
        user => new User(user.name, user.email, user.address, user.phone)
      );
      this.selectedUser = null;
    }

    
  bindUserListChanged(callback) {
    this.onUserListChanged = callback;
  }

  bindSelectedUserChanged(callback) {
    this.onSelectedUserChanged = callback;
  }

  _commit(users) {
    this.onUserListChanged(users);
    localStorage.setItem("users", JSON.stringify(users));
  }

  addUser( name, email, address, phone ) {
    this.users.push(new User(name, email, address, phone));
    this._commit(this.users);
  }

  selectUser(_id) {
    this.selectedUser = this.users.filter(({ id }) => id === _id);
    if(this.selectedUser.length > 0) this.onSelectedUserChanged(this.selectedUser[0]);
  }

  editUser(_id, name, email, address, phone) {
    this.users = this.users.map(user =>
      user.id === _id
        ? new User(name, email, address, phone)
        : user
    );

    this._commit(this.users);
  }

  deleteUser(_id) {
    this.users = this.users.filter(({ id }) => id !== _id);
    this._commit(this.users);
  }

}