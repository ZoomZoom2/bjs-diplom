const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((responseBody) => {
    if (responseBody.success) {
      location.reload()
    }
  })
}

ApiConnector.current((responseBody) => {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
  }
});

const ratesBoard = new RatesBoard();

function updateRates(responseBody) {
  if (responseBody.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(responseBody.data);
  }  
}

ApiConnector.getStocks(updateRates);

let timerId = setInterval(() => ApiConnector.getStocks(updateRates), 60000);

const moneyManager = new MoneyManager();

function plusMoneyCallback(responseBody) {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
    moneyManager.setMessage(responseBody.success, 'Операция пополнения счета успешно завершена');
  } else {
    moneyManager.setMessage(responseBody.success, responseBody.error);
  }
}  

moneyManager.addMoneyCallback = (data) => {ApiConnector.addMoney(data, plusMoneyCallback)}

function convertMoneyCallback(responseBody) {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
    moneyManager.setMessage(responseBody.success, 'Операция конвертации валют успешно завершена');
  } else {
    moneyManager.setMessage(responseBody.success, responseBody.error);
  }
}  

moneyManager.conversionMoneyCallback = (data) => {ApiConnector.convertMoney(data, convertMoneyCallback)}

function sendMoneyCallback(responseBody) {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
    moneyManager.setMessage(responseBody.success, 'Операция перевода средств успешно завершена');
  } else {
    moneyManager.setMessage(responseBody.success, responseBody.error);
  }
}

moneyManager.sendMoneyCallback = (data) => {ApiConnector.transferMoney(data, sendMoneyCallback)}

const favoritesWidget = new FavoritesWidget();

function updateFavoritesWidget(responseBody) {
  favoritesWidget.clearTable();
  favoritesWidget.fillTable(responseBody.data);
  moneyManager.updateUsersList(responseBody.data);
}

function updateFavorites(responseBody) {
  if (responseBody.success) {
    updateFavoritesWidget(responseBody);
  }  
}

ApiConnector.getFavorites(updateFavorites);

function addUserCallback(responseBody) {
  if (responseBody.success) {
    updateFavoritesWidget(responseBody);
    moneyManager.setMessage(responseBody.success, 'Пользователь успешно добавлен в адресную книгу');
  } else {
    moneyManager.setMessage(responseBody.success, responseBody.error);
  }
}  

favoritesWidget.addUserCallback = (data) => {ApiConnector.addUserToFavorites(data, addUserCallback)}

function removeUserCallback(responseBody) {
  console.log(responseBody);
  if (responseBody.success) {
    updateFavoritesWidget(responseBody);
    moneyManager.setMessage(responseBody.success, 'Пользователь успешно удален из адресной книги');
  } else {
    moneyManager.setMessage(responseBody.success, responseBody.error);
  }
}  

favoritesWidget.removeUserCallback = (data) => {ApiConnector.removeUserFromFavorites(data, removeUserCallback)}