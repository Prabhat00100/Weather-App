let url = "https://api.open-meteo.com/v1/forecast?timezone=auto&current=temperature_2m,is_day,weather_code&daily=weather_code"

let btn = document.querySelector("button");


async function getWeather() {
    try {
        let lt = document.querySelector("#lt").value.trim();
        let ln = document.querySelector("#ln").value.trim();
        let compURL = `${url}&latitude=${lt}&longitude=${ln}`;
        
        let req = await axios.get(compURL);
        return req.data;
    }
    catch(e) {
        return `There was an error : ${e}`;
    }
}
 
btn.addEventListener("click",async () => {
        let res = await getWeather();
        let temp = res.current.temperature_2m;
        let code = res.current.weather_code;
        let ul = document.createElement("ul");
        for(let i=0; i<7; i++){
            let li = document.createElement("li");
            li.innerHTML = `${res.daily.time[i]} &nbsp;&nbsp;&nbsp ${res.daily.weather_code[i]}`;
            ul.appendChild(li);
        }
        let date = ul.outerHTML;
        // console.log(date);
        // console.log(res);
        show(code,temp,date); 
})

function show(code,temp,date,dailyCode) {
    let p = document.querySelector("#result");
    p.innerHTML = `Current temperature of your location is : ${temp}°C <br><br>Weather code : ${code} <br><br>Here are the 7 days forecast which contains date and the corresponding weather code : <br>${date}<br><br>Descriptions for respective weather code are given below.`;

    
}