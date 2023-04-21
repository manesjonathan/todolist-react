import {useEffect, useState} from "react";
import axios from "axios";
import {API_KEY, API_KEY_WEATHER} from "./config.js";

const WeatherApp = () => {
    const [city, setCity] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    const [imageSrc, setImageSrc] = useState("");
    const [date, setDate] = useState(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('fr-BE'));
    const [weather, setWeather] = useState("");

    useEffect(() => {
        setInterval(() => {
            setDate(
                new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('fr-BE'))
        }, 1000);
        axios.get('https://api.ipgeolocation.io/getip')
            .then(res => {
                axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${res.data.ip}`)
                    .then(res => {
                        setCity(res.data.city);
                        setCoordinates([res.data.latitude, res.data.longitude])
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data.latitude}&lon=${res.data.longitude}&appid=${API_KEY_WEATHER}&units=metric`)
                            .then(res => {
                                let imageUrl = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
                                setImageSrc(imageUrl)
                                setWeather(res.data.main.temp.toFixed(1) + "°C")
                            })
                    });
            });

    }, []);


    return (
        <aside
            className={'hidden md:flex md:flex-col items-center fixed bottom-0 right-0 p-2 m-2 rounded-md bg-indigo-900 text-white backdrop-filter backdrop-blur-xl bg-transparent drop-shadow-2xl'}>
            <div className={'flex items-center'}>
                <img src={imageSrc} width={35} alt=""/>
                <p className={''}>{city}</p>
                <p className={' ml-2 '}>{weather}</p>
            </div>
            <p className={'text-sm'}>{date}</p>

        </aside>
    );
}

export default WeatherApp;
