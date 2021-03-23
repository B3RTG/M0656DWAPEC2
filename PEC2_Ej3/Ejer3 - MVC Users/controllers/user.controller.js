/**
 * @class UserController
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
 class UserController {

    constructor(service, view) {
        this.service = service;
        this.view = view;

        this.service.bindUserListChanged(this.onUserListChanged);
        this.service.bindSelectedUserChanged(this.onSelectedUserChanged);
        this.view.bindAddUser(this.handlAddUser);
        this.view.bindDeleteUser(this.handlDeleteUsers)
        this.view.bindSelectUser(this.handleSelectUser);
        this.view.bindEditUser(this.handleEditUser);
    
        // Display initial todos
        this.onUserListChanged(this.service.users);
        this.onSelectedUserChanged(this.service.selectedUser);
    }

    onUserListChanged = users => {
        this.view.displayUsers(users);
    };
    onSelectedUserChanged = user => {
        this.view.editSelectedUser(user);
    };

    handlAddUser = (name, email, address, phone) => {
        this.service.addUser( name, email, address, phone );
    };

    handlDeleteUsers = (ids) => {
        ids.forEach(element => {
            this.service.deleteUser(element);    
        });        
    }

    handleEditUser = (id, name, email, address, phone) => {
        this.service.editUser(id, name, email, address, phone);
    }
    handleSelectUser = (id) => {
        this.service.selectUser(id);
    }

 }