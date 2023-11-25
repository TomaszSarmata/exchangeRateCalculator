function calculate() {
  fetch("items.json")
    .then(function (response) {
      //   console.log(response); //to get a proper response with the content of the actual json file we have to format the response with the json() and return it if we don't use shortened version of arrow function

      console.log("here response", response);
      return response.json(); //we have to return it as we are using the returned value for the next .then
    })
    .then(function (data) {
      console.log("here data", data);
      //   document.body.innerHTML = data[0].text; and that will replace the whole body for the 'Item One'
    });
}
calculate();
