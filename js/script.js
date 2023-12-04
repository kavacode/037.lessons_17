let userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100,
  },
  bankData = {
    USD: {
      max: 3000,
      min: 100,
      img: "💵",
    },
    EUR: {
      max: 1000,
      min: 50,
      img: "💶",
    },
    UAH: {
      max: 0,
      min: 0,
      img: "💴",
    },
    GBP: {
      max: 10000,
      min: 100,
      img: "💷",
    },
  };
function getMoney(userData, bankData) {
  return new Promise((resolve, reject) => {
    const viewBalance = confirm("Посмотреть баланс на карте?");

    if (viewBalance) {
      resolve(userData);
    } else {
      reject({ userData, bankData });
    }
  })
    .then((userData) => {
      let isValidCurrency = false;
      let currency;

      while (!isValidCurrency) {
        currency = prompt(
          "Введите название валюты в формате USD, EUR, UAH, BIF, AOA:"
        ).toUpperCase();

        if (userData[currency]) {
          isValidCurrency = true;
        } else {
          console.log(
            "Неверная валюта. Пожалуйста, введите актуальную валюту."
          );
        }
      }

      console.log(`Баланс составляет: ${userData[currency]} ${currency}`);
      return userData;
    })
    .catch(({ userData, bankData }) => {
      let isValidWithdrawalCurrency = false;
      let withdrawalCurrency;

      while (!isValidWithdrawalCurrency) {
        withdrawalCurrency = prompt(
          "Введите название валюты в формате USD, EUR, UAH, BIF, AOA:"
        ).toUpperCase();

        if (userData[withdrawalCurrency]) {
          isValidWithdrawalCurrency = true;
        } else {
          console.log(
            "Неверная валюта. Пожалуйста, введите актуальную валюту."
          );
        }
      }

      const amount = parseFloat(
        prompt(
          `Введите сумму для вывода (min: ${bankData[withdrawalCurrency].min}, max: ${bankData[withdrawalCurrency].max}):`
        )
      );

      if (amount > bankData[withdrawalCurrency].max) {
        console.log(
          `Введенная сумма больше допустимой. Максимальная сумма снятия: ${bankData[withdrawalCurrency].max}`
        );
        throw { userData, bankData };
      } else if (amount < bankData[withdrawalCurrency].min) {
        console.log(
          `Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bankData[withdrawalCurrency].min}`
        );
        throw { userData, bankData };
      } else {
        console.log(
          `Вот Ваши денежки ${amount} ${withdrawalCurrency} ${bankData[withdrawalCurrency].img}`
        );
        return userData;
      }
    })
    .finally(() => {
      console.log("Спасибо, хорошего дня 😊");
    });
}

getMoney(userData, bankData);
