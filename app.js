const base_url =" https://open.er-api.com/v6/latest";

let options=document.querySelectorAll("select");
let button=document.querySelector("button");
let rate=document.querySelector("#rate");
let fromCurr=document.querySelector("#from");
let toCurr=document.querySelector("#to");
let amount=document.querySelector("input")

for(let option of options){
    for(country in countryList ){
        let newCountry=document.createElement("option");
        newCountry.innerText=country;
        newCountry.value=country;
        if(option.id==="from" && country==="USD"){
            newCountry.selected="selected";
        }
        else if(option.id==="to" && country==="INR"){
            newCountry.selected="selected";
        }
        
        option.append(newCountry);
        
    }
}

for(let option of options){
    option.addEventListener("change",(event)=>{
        update(event.target);
    })
}
let update=(element)=>{
    let code=element.value; //dont use innerText as it returns the text of all the child nodes that is all the country codes will be logged
    let country=countryList[code];
    let img=element.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${country}/flat/64.png`;

}

button.addEventListener("click",(event)=>{
    event.preventDefault(); //prevents refreshing of the page or any default action that takes place due to clicking a button
    update_rate();
})

const update_rate=async()=>{
    let value=amount.value;
    if(value==""||value<1){
        value=1;
        amount.value=1;
    }
    //The select.value is used to get or set the value of the selected option in a <select> dropdown menu. It returns the value of the currently selected <option> element within the <select> element.
    const from=fromCurr.value;
    const to=toCurr.value;
    let url=`${base_url}/${from.toUpperCase()}`;
    let response=await fetch(url);
    let data=await response.json();
    conversion_rate=data.rates[to];
    rate.innerText=`${value} ${from}=${value*conversion_rate} ${to}`;
}

window.addEventListener("load",()=>{
    update_rate();
})

