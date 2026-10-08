'use client'
//서버 아닌건 '유즈 클라이언트' 써주기
import React from 'react'
import styles from './page.module.scss'
import { useState } from 'react'
import type { WeatherData } from '@/types/weather'


const WeatherPage = () => {
    const [city, setCity]=useState('Seoul')
    const [loading, setLoading]=useState(false)
    // const [answer, setAnswer]=useState('')
    const [weather, setWeather]=useState<WeatherData | null>(null)
    const [error, setError]=useState('')
    const funcWeather=async()=>{
        if(!city.trim()){
            return;
        }
        try{
            setLoading(true)
            setError('')
            setWeather(null)

            const res=await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
            if(!res.ok){
                throw new Error("날씨 요청에 실패했습니다")
            }

            const data:WeatherData=await res.json()
            setWeather(data)
        }catch{
            setError("날씨 정보를 불러오지 못했습니다")
        }finally{
            setLoading(false)
        }
    }
  return (
    <section className={styles.inner}>
        <div className={styles.title}>
            <p>open weather API</p>
            <h2>현재 날씨</h2>
            <span>현재 도시 이름을 입력하시면 도시의 현재 날씨를 알 수 있습니다</span>
        </div>

        <div className={styles.searchBox}>
            <div className={styles.ip}>
            <input placeholder='Seoul' type="text" value={city} onChange={(e)=>setCity(e.target.value)} />
            <button
  onClick={funcWeather}
  disabled={loading || !city.trim()}
>
  {loading ? "검색중입니다" : "날씨검색"}
</button>
</div>
        </div>
        {
            error&&(
                <div>
                    {error}
                </div>
            )
        }
        {  weather&&(
            <div className={styles.answer}>
                <h2>{weather.name}</h2>
                <span>{weather.weather[0].description}</span>
                <p>{weather.main.temp}</p>
                <p>풍속:{weather.wind.speed}</p>
            </div>
        )

        }

    </section>
  )
}

export default WeatherPage
