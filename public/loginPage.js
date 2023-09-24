const userForm = new UserForm();

function loginCallback(responseBody) {
  if (responseBody.success) {
    location.reload();
  } else {
    userForm.setLoginErrorMessage(responseBody.error);
  }
} 

function registerCallback(responseBody) {
  if (responseBody.success) {
    location.reload();
  } else {
    userForm.setRegisterErrorMessage(responseBody.error);
  }
} 

userForm.loginFormCallback = data => { 
  ApiConnector.login(data, loginCallback) 
}

userForm.registerFormCallback = data => { 
  ApiConnector.register(data, registerCallback) 
}