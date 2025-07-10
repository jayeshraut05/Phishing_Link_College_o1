import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PlantMonitoring = () => {
  const [plantName, setPlantName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [atmosphere, setAtmosphere] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [
        ...prevData.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          humidity: Math.random() * 100,
          water: Math.random() * 50,
        },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <Input placeholder="Plant Name" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
          <Input placeholder="Humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
          <Input placeholder="Atmosphere" value={atmosphere} onChange={(e) => setAtmosphere(e.target.value)} />
          <Input placeholder="Water Intake" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Real-Time Data</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
              <Line type="monotone" dataKey="water" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantMonitoring;
