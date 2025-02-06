import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHER_API_KEY
const CITY = 'Hanoi'
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`

export async function GET() {
  console.log('Weather API route called')

  if (!API_KEY) {
    console.error('OpenWeather API key is not configured')
    return NextResponse.json(
      { error: 'OpenWeather API key is not configured' },
      { status: 500 }
    )
  }

  try {
    console.log('Fetching weather data from OpenWeather API')
    const res = await fetch(API_URL, { 
      next: { revalidate: 300 },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`Weather API responded with status: ${res.status}`)
      return NextResponse.json(
        { error: `Weather API responded with status: ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    console.log('Received data from OpenWeather API:', JSON.stringify(data))

    if (data.cod !== 200) {
      console.error('OpenWeather API error:', data.message || 'Unknown error')
      return NextResponse.json(
        { error: data.message || 'Failed to fetch weather data' },
        { status: 500 }
      )
    }

    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      city: data.name,
      timestamp: new Date().toISOString()
    }
    console.log('Processed weather data:', JSON.stringify(weatherData))

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Weather API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

