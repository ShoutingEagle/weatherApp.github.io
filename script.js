


var userData = [];
var data1;

async function fetchData(searchedData){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedData}&appid=818e623f5a6175dd5045f7c9dcb6ec6a&units=metric`);
        const data = await response.json();
       
        data1 = data;
        processData(data);
        
    } catch (error) {
        alert(data1.message);
    }
    

}





function processData(data){
    const temp = Math.floor(data.main.temp)
    const temp_max = Math.floor(data.main.temp_max);
    const temp_min = Math.floor(data.main.temp_min);
    const name = data.name;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const Country = data.sys.country;

    

    for(let i=0;i<userData.length;i++){
        if(name === userData[i].cityName){
            return alert('City already added');
        }
    }
    

    let a = {
        temperature      :     temp,
        maxTemperature   :     temp_max,
        minTemperature   :     temp_min,
        cityName         :     name,
        weatherType      :     description,
        image            :     icon,
        country          :     Country,
    }


    userData.push(a);
    if(userData.length>1){
        userData.sort((a,b) => {
            return a.temperature - b.temperature;
        });
    }
    
    
    

    renderData(data);
}



function renderData (data){
   
    // const temp = Math.floor(data.main.temp)
    // const temp_max = Math.floor(data.main.temp_max);
    // const temp_min = Math.floor(data.main.temp_min);
    // const name = data.name;
    // const description = data.weather[0].description;
    
    const cards = document.getElementById("cards-container");
    cards.innerHTML = '';
    for(let i=0;i<userData.length;i++){
        

        cards.innerHTML += `<div class="cards">
        <div class="left-data">
        <div class="temperature">${userData[i].temperature}°</div>
        <div class="high-low"><span class="high">H: ${userData[i].maxTemperature}°</span><span class="low">L: ${userData[i].minTemperature}°</span></div>
        <div class="city">${userData[i].cityName}, ${userData[i].country}</div>
        </div>
        <div class="right-data">
        <div class="image"><img src="https://openweathermap.org/img/wn/${userData[i].image}@2x.png" alt="" width = "160px"></div>
        <div class="type">${userData[i].weatherType}</div>
        </div>
        </div>`
    }
    
    const searchedData = document.getElementById("search");
    searchedData.value = '';

}






function addData(){
    const searchedData = document.getElementById("search").value;
    if(searchedData === ''){
        return alert("Enter a city name");
    }
    fetchData(searchedData);
}






