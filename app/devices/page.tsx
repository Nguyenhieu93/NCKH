"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Device {
  id: string
  name: string
  type: string
  status: "Online" | "Offline"
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "1", name: "Temperature Sensor 1", type: "Temperature", status: "Online" },
    { id: "2", name: "Humidity Sensor 1", type: "Humidity", status: "Online" },
    { id: "3", name: "Soil Moisture Sensor 1", type: "Soil Moisture", status: "Offline" },
  ])

  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceType, setNewDeviceType] = useState("")

  const addDevice = () => {
    if (newDeviceName && newDeviceType) {
      const newDevice: Device = {
        id: Date.now().toString(), // Use timestamp as a unique id
        name: newDeviceName,
        type: newDeviceType,
        status: "Online",
      }
      setDevices([...devices, newDevice])
      setNewDeviceName("")
      setNewDeviceType("")
    }
  }

  const removeDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">IoT Devices</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Device</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Device Name"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
            />
            <Input
              placeholder="Device Type"
              value={newDeviceType}
              onChange={(e) => setNewDeviceType(e.target.value)}
            />
            <Button onClick={addDevice}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => removeDevice(device.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

