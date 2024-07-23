 const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_YwZxCJdjj6e4c01trWiSacVt4ynbj2vYrnkklbN3&base_currency=INR";
 
 const dropdowns =  document.querySelectorAll(".dropdown select");
 const button = document.querySelector("form button"); 
 const fromcurr = document.querySelector(".from select");
 const tocurr = document.querySelector(".to select"); 
 const msg = document.querySelector(".msg");



 for(let select of dropdowns){
    for(currcode in countryList){
       let newoption = document.createElement("option");
       newoption.innerText = currcode;
       newoption.value = currcode;
       if (select.name === "from" && currcode ==="USD"){
        newoption.selected = "selected";
       }else if(select.name === "to" && currcode ==="INR"){
        newoption.selected = "selected";
       }
       select.append(newoption);
 }
 select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
 })
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


button.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";    
    }


    let fromValue = fromcurr.value;
    let toValue = tocurr.value;

    try {
        let response = await fetch(`${BASE_URL}&base_currency=${fromValue}`);
        let rJson = await response.json();

        if (rJson.data) {
            let toRate = rJson.data[toValue];

            let convertedAmount = (amtval * toRate).toFixed(2);
            msg.innerText = `${amtval} ${fromValue} = ${convertedAmount} ${toValue}`;
        } else {
            msg.innerText = "Error retrieving exchange rates.";
        }
    } catch (error) {
        msg.innerText = "Error retrieving exchange rates.";
        console.error("Error fetching exchange rates:", error);   
    }
});

