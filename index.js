// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var arrCommands = command.split(" ");                    //получаем массив строк
  var action = arrCommands[0];                            //выделяем действие, которое необходимо выполнить
  var name = arrCommands[1];                             //выделяем имя контакта

  if (action === "ADD") {                                 //для каждого действия работает одноименная функция
    return add();
  } else if (action === "REMOVE_PHONE") {
    return remove();
  } else if (action === "SHOW") {
    return show();
  }

  function add(command) {
    var numbersAdd = arrCommands[2];               //номер для добавления
    if (!phoneBook.hasOwnProperty(name)) {         //если тел.книга не содержит имя контакта, то создаем имя и присваиваем номер...
      phoneBook[name] = numbersAdd;
    } else {                                       //...иначе (если в книге есть контакт) проверяем, содержит ли контакт номер, который мы хотим добавить. Нет ? Добавляем номер к телефонам контакта. 
      phoneBook[name].indexOf(numbersAdd) !== -1         
        ? phoneBook[name]
        : (phoneBook[name] = phoneBook[name].concat("," + numbersAdd));
    }
  }

  function remove(command) {
    var numberR = arrCommands[1];                    //номер для удаления
    if (Object.values(phoneBook).join(',').split(',').some(x=> x===numberR)) { //если в списке всех телефонов есть точно такой же номер, как тот, что мы хотим удалить (если да - возвращается true, нет - возвращается false)...
      for (var contact in phoneBook) {               //...отфильтровываем каждый контакт, оставляя только телефоны, не совпадающие с номером для удаления
        phoneBook[contact] = phoneBook[contact]
          .split(",")
          .filter((tel) => tel !== numberR)
          .join(",");
      }
      for (var contact in phoneBook) {                 //проверяем каждый контакт - если в нем не содержится номер, удаляем контакт
        if (phoneBook[contact] === "") {
          delete phoneBook[contact];
        }
      }
      return true;                                 
    }
    return false;
  }

  function show(command) {
    var contacts = [];                                  //создаем пустой массив
    for (var contact in phoneBook) {
             contacts.push(contact + ": " + phoneBook[contact]);     //создаем строку для каждого контакта (имя: телефоны), переносим строку в массив
          }
    return contacts
      .sort()
      .map((tel) => (tel.split(",").join(", ")));   //возвращаем отсортированный по алфавиру массив контактов, где все телефонные номера разделены не только запятой, но и пробелом
  }
}
