const $ = document.querySelector.bind(document)
var iconSearch = $('.fa-magnifying-glass');
var input = $("input");
var search = $(".search");
var city = $(".city");
var nhietdo = $(".nhietdo");
var dayNight = $(".day-night");
var icon = $(".icon img");
var iconTomorrow = $('.item__tomorrow .icon img');
var textWeather = $(".textWeather");
var windText = $(".wind");
var eyeText = $(".eye");
var cloudText = $(".cloud");
var sunRise = $(".sunrise");
var sunSet = $(".sunset");
var humidity = $(".humidity");
var contentHeader = document.querySelectorAll('.content__header h3');
var bodyContents = document.querySelectorAll('.body-content')
contentHeader.forEach((itemHeader,index)=>{
    var bodyContent = bodyContents[index]
    itemHeader.addEventListener("click",()=>{
    console.log(bodyContent);
        $('.content__header h3.active').classList.remove("active")
        itemHeader.classList.add("active")
        $('.body-content.active').classList.remove("active")
        bodyContent.classList.add("active")
    })
})
iconSearch.addEventListener("click",()=>{
    city.classList.toggle("active");
    search.classList.toggle("active")
    iconSearch.classList.toggle("active")
    input.classList.toggle("active");
})
setInterval(function(){
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var date = time.getDate();
    var month = time.getMonth();
    var boxDate = $('.date');
    var day = time.getDay();
    var dayTomorrow;
    switch (day){
        case 0:
            dayTomorrow = 'Thứ 2'
            break
        case 1:
            dayTomorrow = 'Thứ 3'
            break
        case 2:
            dayTomorrow = 'Thứ 4'
            break
        case 3:
            dayTomorrow = 'Thứ 5'
            break
        case 4:
            dayTomorrow = 'Thứ 6'
            break
        case 5:
            dayTomorrow = 'Thứ 7'
            break
        case 6:
            dayTomorrow = 'Chủ nhật'
            break
    }
    var dateTomorrow = $('.dateTomorrow');
    hours = hours< 10 ? `0${hours}`: hours
    minutes = minutes< 10 ? `0${minutes}`: minutes
    seconds = seconds< 10 ? `0${seconds}`: seconds
    boxDate.innerHTML = `${hours}:${minutes}:${seconds} PM, Ngày ${date} Tháng ${month + 1}`;
    dateTomorrow.innerHTML = `${dayTomorrow}, Ngày ${date+1} Tháng ${month + 2}`;
},1000)
var preTime = new Date();
var hoursPre = preTime.getHours();
var container = $('.container')
if(hoursPre > '6' && hoursPre < '18'){
    container.style.background = 'radial-gradient(rgb(0,132,239) 0%, rgb(0,85,154) 100%)'
}
else{
    container.style.background = 'radial-gradient(rgb(0,76,152) 0%, rgb(0,44,87) 100%)'
}
async function weatherAPI(cityApi){
    var content = $('.content')
    var apiId = 'e2bd9c487f7266bd3d3ead99561e938c'; 
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&lang=vi&appid=${apiId}`  
    var dataApi = await fetch(api).then(response => response.json());  
    var apiWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityApi}&cnt=40&lang=vi&appid=${apiId}`;
    var dataWeather = await fetch(apiWeather).then(response => response.json())
    console.log(dataApi);
    console.log(dataWeather);
    if(dataApi.code == 200 || dataWeather.cod == 200){
        content.classList.remove("hide");
        city.innerText = dataWeather.city.name
        nhietdo.innerText = Math.floor(dataApi.main.temp-273)
        icon.src =`http://openweathermap.org/img/wn/${dataApi.weather[0].icon}@2x.png`
        if(dataApi.weather[0].icon == '01d' || dataApi.weather[0].icon == '01n'){
            textWeather.innerText = dataApi.weather[0].description.charAt(0).toUpperCase() + dataApi.weather[0].description.slice(1)
        }else if(dataApi.weather[0].icon == '02d' || dataApi.weather[0].icon == '02n'){
            textWeather.innerText = dataApi.weather[0].description.charAt(0).toUpperCase() + dataApi.weather[0].description.slice(1)
        }else if(dataApi.weather[0].icon == '03d' || dataApi.weather[0].icon == '03n'){
            textWeather.innerText = dataApi.weather[0].description.charAt(0).toUpperCase() + dataApi.weather[0].description.slice(1)
        }else if(dataApi.weather[0].icon == '04d' || dataApi.weather[0].icon == '04n'){
            textWeather.innerText = dataApi.weather[0].description.charAt(0).toUpperCase() + dataApi.weather[0].description.slice(1)
        }else if(dataApi.weather[0].icon == '10d' || dataApi.weather[0].icon == '10n'){
            textWeather.innerText = dataApi.weather[0].description.charAt(0).toUpperCase() + dataApi.weather[0].description.slice(1)
        }
        windText.innerHTML = `<i class="fa-solid fa-wind"></i>Tốc độ gió: ${dataApi.wind.speed}m/s`;
        eyeText.innerHTML = `<i class="fa-regular fa-eye"></i>Tầm nhìn: ${dataApi.visibility}m`;
        cloudText.innerHTML = `<i class="fa-solid fa-cloud"></i>Mây: ${dataApi.clouds.all}%`;
        humidity.innerHTML = `<i class="fa-solid fa-droplet"></i>Độ ẩm: ${dataApi.main.humidity}%`;
        var timeSunrise = new Date(dataApi.sys.sunrise*1000);
        var timeSunSet = new Date(dataApi.sys.sunset*1000);
        var itemTimeSunrise = timeSunrise.toLocaleTimeString(undefined,"Asia/Kolkata").replace(':00',''); 
        var itemTimeSunSet = timeSunSet.toLocaleTimeString(undefined,"Asia/Kolkata").replace(':00',''); 
        sunRise.innerHTML = `<i class="fa-solid fa-sun"></i>Mặt trời mọc: ${itemTimeSunrise}`;
        sunSet.innerHTML = `<i class="fa-solid fa-mountain-sun"></i>Mặt trời lặn: ${itemTimeSunSet}`;
        var boxHourly = document.querySelector(".box__hourly");
        for(let i=1; i < 7;i++){
            var div = document.createElement('div')
            var timeHourly = new Date(dataWeather.list[i].dt_txt)
            timeHourly = timeHourly.toLocaleTimeString().replace(':00','')
            div.classList.add("item__hourly")
            div.innerHTML = `<div class="time__hourly">${timeHourly}</div>
                            <img src="http://openweathermap.org/img/wn/${dataWeather.list[i].weather[0].icon}@2x.png" alt="">
                            <span class="temp_hourly">${Math.round(dataWeather.list[i].main.temp -273)}°C</span>`
            boxHourly.appendChild(div)
        }
    }
    else{
        content.classList.add("hide")
    }
    // ----Nhiệt độ ngày mai------
    for(let i=7; i<15;i+=8){
        console.log(dataWeather.list[i]);
        var nhietdoTomorrow = $('.nhietdoTomorrow');
        var textWeatherTomorrow = $('.textWeatherTomorrow');
        var windTomorrow = $('.windTomorrow');
        var eyeTomorrow = $(".eyeTomorrow");
        var cloudTomorrow =$(".cloudTomorrow");
        var humidityTomorrow = $('.humidityTomorrow');
        nhietdoTomorrow.innerHTML = `${Math.round(dataWeather.list[i].main.temp-273)}`
        iconTomorrow.src = `http://openweathermap.org/img/wn/${dataWeather.list[i].weather[0].icon}@2x.png`
        textWeatherTomorrow.innerHTML = `${dataWeather.list[i].weather[0].description.charAt(0).toUpperCase() + dataWeather.list[i].weather[0].description.slice(1)}`;
        windTomorrow.innerHTML = `<i class="fa-solid fa-wind"></i>Tốc độ gió: ${dataWeather.list[i].wind.speed}m/s`;
        eyeTomorrow.innerHTML = `<i class="fa-regular fa-eye"></i>Tầm nhìn: ${dataWeather.list[i].visibility}m`;
        cloudTomorrow.innerHTML = `<i class="fa-solid fa-cloud"></i>Mây: ${dataWeather.list[i].clouds.all}%`;
        humidityTomorrow.innerHTML = `<i class="fa-solid fa-droplet"></i>Độ ẩm: ${dataWeather.list[i].main.humidity}%`;
    }
    // ----------dự báo theo ngày----------
    for(let i=8; i<dataWeather.list.length; i+=8){
        console.log(dataWeather.list[i]);
        var dateItem = new Date(dataWeather.list[i].dt_txt);
        var option = { weekday: 'long', year:'numeric', month:'long', day:'numeric'};
        dateItem = dateItem.toLocaleDateString(undefined,option);
        var divDate = document.createElement("div");
        divDate.classList.add("item_date")
        var boxDate = $(".boxDate");
        divDate.innerHTML = `
                            <div class="textItem-date">
                                <h3 class="title-textItem">${dateItem}</h3>
                                <div class="desciption">${dataWeather.list[i].weather[0].description}</div>
                            </div>
                            <div class="temperatureItem-date">
                                <div class="icon-date">
                                    <img src="http://openweathermap.org/img/wn/${dataWeather.list[i].weather[0].icon}@2x.png" alt="">
                                </div>
                                <div class="temp_max">${Math.round(dataWeather.list[i].main.temp-273)}°C</div>
                            </div>
                            `
        boxDate.appendChild(divDate);
    }

}
input.addEventListener("keypress",(e)=>{
    var inputValue = input.value.trim();
    if(e.key == 'Enter'){
        setTimeout(function(){
            var boxItem = document.querySelectorAll(".item__hourly")
            var boxDateItem = document.querySelectorAll(".item_date")
            for(let i =0; i<boxItem.length;i++){
                boxItem[i].remove()
            }
            for(let i =0; i<boxDateItem.length;i++){
                boxDateItem[i].remove()
            }
            console.log(boxItem);
            weatherAPI(inputValue);
            search.classList.remove("active");
            input.classList.remove("active");
            city.classList.remove("active");
            input.value = ''
        },100)
    }
})
weatherAPI('Ha noi')


