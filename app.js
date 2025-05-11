const BASE_URL = "https://api.currencylayer.com/convert?access_key=YOUR_API_KEY";

 
 const dropdowns = document.querySelectorAll(".dropdown select");
 const inputVal = document.querySelector(".amount input");
 const btn = document.querySelector("form button");
 const msg = document.querySelector(".msg p");

for (let select of dropdowns){
    for( currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}


const updateExchange = async () => {
    let amount = document.querySelector(".amount input" );
    let amtVal = amount.value
    console.log(amtVal);

    let fromCurrency = document.querySelector("select[name=from]");
    let fromCurr = fromCurrency.value;
    let toCurrency = document.querySelector("select[name=to]");
    let toCurr = toCurrency.value;


    const URL = `${BASE_URL}&from=${fromCurr}&to=${toCurr}&amount=${amtVal}`;
    try{
        let response = await fetch(URL);
        let exchange = await response.json();
        console.log(exchange);
        console.log(exchange.success);

        if (exchange.success && exchange.result !== undefined) {
            msg.innerText = `${amtVal} ${fromCurr} = ${exchange.result} ${toCurr}`;
        } else {
            msg.innerText = "API is little bit slow! Try Again :)";
        }
    }
    catch(err) {
        alert("Opps! there's some issues" +err);
    };
    
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchange();
});

inputVal.addEventListener("input", () =>{
    const amtVal = inputVal.value.trim();
    if(amtVal && !isNaN(amtVal)){
        updateExchange();
    }
});


