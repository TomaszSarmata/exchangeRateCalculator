const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const swap = document.getElementById("swap");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");

let dataFromFirstFetch = {};

//HELPER FUNCTIONS
function firstFunction() {
  fetch(
    `https://v6.exchangerate-api.com/v6/b46651af6394c073d2647b48/latest/${currencyOne.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const baseRate = data.base_code;
      const baseRateValue = data.conversion_rates[baseRate];
      amountOne.value = baseRateValue;
      dataFromFirstFetch = data;
      secondFunction();
    });
}

const secondFunction = () => {
  //set up currencyToFind variable
  //set up rateValue to display that will match the value of the foud currency

  const currencyToFind = currencyTwo.value;

  const rateValue = dataFromFirstFetch.conversion_rates[currencyToFind];
  if (rateValue) {
    amountTwo.value = rateValue;
  } else {
    console.log("rate not found for selected currency");
  }
};

const thirdFunction = () => {};

//EVENT LISTENERS
currencyOne.addEventListener("change", firstFunction);
currencyTwo.addEventListener("change", secondFunction);
swap.addEventListener("click", thirdFunction);

// //HELPER FUNCTIONS
// function firstFunction() {
//     fetch(`https://v6.exchangerate-api.com/v6/b46651af6394c073d2647b48/latest/${currencyOne.value}`)
//       .then(response => response.json())
//       .then(data => {
//         dataFromFirstFetch = data; // Store data in the global variable
//         updateUI(); // Update UI elements based on fetched data
//       });
//   }

//   function updateUI() {
//     // Assuming you want to update amountOne with the base rate value
//     const baseRate = dataFromFirstFetch.base_code;
//     const baseRateValue = dataFromFirstFetch.conversion_rates[baseRate];
//     amountOne.value = baseRateValue;

//     // Call secondFunction to update amountTwo
//     secondFunction();
//   }

//   function secondFunction() {
//     const currencyToFind = currencyTwo.value;
//     const currencyValue = dataFromFirstFetch.conversion_rates[currencyToFind];
//     amountTwo.value = currencyValue;
//   }

//   //EVENT LISTENERS
//   currencyOne.addEventListener("change", firstFunction);
//   currencyTwo.addEventListener("change", secondFunction);
//   // ... other event listeners
