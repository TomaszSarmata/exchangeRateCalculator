const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/b46651af6394c073d2647b48/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate}${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//EVENT LISTENERS
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate); //input fires when a user either types in something or uses the arrows
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value; //need to store it as on the next line this value is overriden
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();

//code below was my implementation which is a little convoluted and had problems implementing swap functionality
// const currencyOne = document.getElementById("currency-one");
// const currencyTwo = document.getElementById("currency-two");
// const swap = document.getElementById("swap");
// const amountOne = document.getElementById("amount-one");
// const amountTwo = document.getElementById("amount-two");
// const rate = document.getElementById("rate");

// let dataFromFirstFetch = {};
// let dataFromSwapFetch = {};

// //HELPER FUNCTIONS
// function firstFunction() {
//   fetch(
//     `https://v6.exchangerate-api.com/v6/b46651af6394c073d2647b48/latest/${currencyOne.value}`
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       const baseRate = data.base_code;
//       const baseRateValue = data.conversion_rates[baseRate];
//       amountOne.value = baseRateValue;
//       dataFromFirstFetch = data;
//       console.log(data);
//       secondFunction();
//       rate.innerHTML = `${baseRateValue} ${baseRate} = ${amountTwo.value} ${currencyTwo.value}`;
//     });
// }

// const thirdFunction = () => {};

// const secondFunction = () => {
//   const currencyToFind = currencyTwo.value;
//   const rateValue = dataFromFirstFetch.conversion_rates[currencyToFind];
//   if (rateValue) {
//     amountTwo.value = rateValue;
//   } else {
//     console.log("rate not found for selected currency");
//   }
// };

// //EVENT LISTENERS
// currencyOne.addEventListener("change", firstFunction);
// currencyTwo.addEventListener("change", secondFunction);
// swap.addEventListener("click", thirdFunction);
