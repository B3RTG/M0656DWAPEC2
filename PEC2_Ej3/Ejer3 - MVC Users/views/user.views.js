/**
 * @class View
 *
 * Visual representation of the model.
 */
class UserView {
  constructor() {
      this.app = this.getElement(".container");
      this.table = this.getElement("#user-table");
      this.tableBody = this.table.getElementsByTagName('tbody')[0];
      this.headerActions = this.getElement("#header-actions");

      this.buttonAddEmployees = this.createLinkButton("Add New Employee","add_circle",["btn","btn-success"], "#addEmployeeModal");
      this.buttonDeleteEmployee = this.createLinkButton("Delete","remove_circle",["btn","btn-danger"], "#deleteEmployeeModal");
      this.headerActions.append(this.buttonAddEmployees, this.buttonDeleteEmployee);

      this.addEmployeeContainer = this.getElement("#addEmployeeModal")
      this.addEmployeeForm = this.getElement("#addEmployeeModal form")

      this.editEmployeeContainer = this.getElement("#editEmployeeModal")
      this.editEmployeeForm = this.getElement("#editEmployeeModal form")

      this.deleteEmployeeModal = this.getElement("#deleteEmployeeModal");
      this.deleteEmployeeForm = this.getElement("#deleteEmployeeModal form");

      this.checkboxAll = this.getElement("#selectAll");
      this._initLocalListeners();
  }


  getElement(selector) {
      const element = document.querySelector(selector);
      return element;
  }

  createElement(tag, className) {
      const element = document.createElement(tag);    
      if (className) element.classList.add(className);    
      return element;
  }

  displayUsers(users) {
    // Delete all table rows (not header)
    while(this.table.rows.length > 1) {
        this.table.deleteRow(1);
    }

    // Show default message
    if (users.length === 0) {
      //do somenthing
      console.log("No users")
    } else {
      // Create nodes
      users.forEach(user => {
        this.createTableRow(user);
      });
    }

    // Debugging
    console.log(users);
  }

  createTableRow(user) {

    const row = this.tableBody.insertRow();
    row.id = user.id;
    row.insertCell().appendChild(document.createTextNode(user.name));
    row.insertCell().appendChild(document.createTextNode(user.email));
    row.insertCell().appendChild(document.createTextNode(user.address));
    row.insertCell().appendChild(document.createTextNode(user.phone));    

    const cellEditDelete = row.insertCell();
    const editButton = this.createLinkButton("","edit",["edit"]);
    const deleteButton = this.createLinkButton("","delete",["delete"]);
    cellEditDelete.append(editButton, deleteButton);

    const spanChk = this.createElement("span", "custom-checkbox");        
    const checkbox = this.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checbox"+user.id;
    checkbox.name = "options[]";
    checkbox.value = row.rowIndex;
    
    const lbl = this.createElement("label");
    lbl.setAttribute("for", "checkbox1")

    spanChk.append(checkbox, lbl)
    row.insertCell(0).appendChild(spanChk);
  
  }

  _initLocalListeners() {
    this.table.addEventListener("click", event => {
      const button = event.target.parentElement;
      const tr = button.parentElement.parentElement;
      if (button.className === "delete") {
        const idField = this.deleteEmployeeForm.querySelector("input[type=hidden]");
        if(idField) idField.value = tr.id;
        $(deleteEmployeeModal).modal('show');
      }
    });

    this.checkboxAll.addEventListener('click', event => { 
      const tableCheckbox = this.table.querySelectorAll("input[type=checkbox]");
      tableCheckbox.forEach( chk => {
        chk.checked = this.checkboxAll.checked;
      })
    }); 
  }

  bindAddUser(handler) {
    this.addEmployeeForm.addEventListener("submit", event => {
        event.preventDefault();
        var data = new FormData(this.addEmployeeForm);
        $(this.addEmployeeContainer).modal("hide");
        handler(data.get("name"), data.get("email"), data.get("address"), data.get("phone"));

        this._clearForm(this.addEmployeeForm);
      });
  }
    
  bindDeleteUser(handler) {
    this.deleteEmployeeForm.addEventListener("submit", event => {
      event.preventDefault();
      var data = new FormData(this.deleteEmployeeForm);
      if(data.get("userId")) {
        handler([data.get("userId")]);
      } else {
        //borrar desde checks
        const values = this.table.querySelectorAll("input[type=checkbox]");
        const selectedValues = [...values].filter( chk => chk.checked && chk.id!="selectAll");
        var ids = selectedValues.map( s => s.parentElement.parentElement.parentElement.id);
        handler(ids);
      }      
      $(this.deleteEmployeeModal).modal("hide");
      this._clearForm(this.deleteEmployeeForm);      
    });
  }

  bindEditUser(handler) {
    this.editEmployeeContainer.addEventListener("submit", event => {
      event.preventDefault();
      var data = new FormData(this.editEmployeeForm);
      handler(data.get("userId"), data.get("name"), data.get("email"), data.get("address"), data.get("phone"));

      $(this.editEmployeeContainer).modal("hide");
      this._clearForm(this.addEmployeeForm);
    });
  }

  bindSelectUser(handler) {
    this.table.addEventListener("click", event => {
      const button = event.target.parentElement;
      const tr = button.parentElement.parentElement;
      if (button.className === "edit") {
        handler(tr.id);
      }
    });
  }

  editSelectedUser(user) {
    if(user)  {
      $(this.editEmployeeContainer).modal('show');
      const idField = this.editEmployeeContainer.querySelector("input[type=hidden]");
      const nameField = this.editEmployeeContainer.querySelector("input[name=name]");
      const mailField = this.editEmployeeContainer.querySelector("input[type=email]");
      const addressField = this.editEmployeeContainer.querySelector("textarea");
      const phoneField = this.editEmployeeContainer.querySelector("input[name=phone]");
      mailField.value = user.email;
      nameField.value = user.name;
      addressField.value = user.address;
      phoneField.value = user.phone;
      idField.value = user.id;
    }
    
  }

  _clearForm(form) {
    form.reset();
  }

  createLinkButton( text, icon, styles, dialog)
  {
      const spanElement = this.createElement("span");
      const iconElement = this.createElement("i", "material-icons");
      iconElement.innerText = icon;
      spanElement.innerText = text;
      
      const lb = this.createElement("a");
      lb.href = dialog;
      lb.setAttribute("data-toggle", "modal"); 
      if(styles) styles.forEach( s => lb.classList.add(s));
      lb.append(iconElement, spanElement);
    
      return lb;
  }

}