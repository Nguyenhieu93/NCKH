"use client"

import { useEffect, useState } from "react"
import { Thermometer, Droplets, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WeatherData {
  temperature: number
  humidity: number
  city: string
  timestamp: string
}

export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        console.log("Fetching weather data from API route")
        const response = await fetch("/api/weather")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if ("error" in data) {
          throw new Error(data.error)
        }

        console.log("Processed weather data:", data)
        setWeatherData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch weather data")
        setWeatherData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()

    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Garden Dashboard</h1>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : weatherData ? (
                `${weatherData.temperature.toFixed(1)}°C`
              ) : (
                "N/A"
              )}
            </div>
            {weatherData && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(weatherData.timestamp).toLocaleTimeString()}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : weatherData ? (
                `${weatherData.humidity.toFixed(1)}%`
              ) : (
                "N/A"
              )}
            </div>
            {weatherData && <p className="text-xs text-gray-500 mt-1">Location: {weatherData.city}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

