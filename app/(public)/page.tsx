'use client';

import { useEffect, useState } from "react";
import api from "../services/api";


export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/").then(res => {
      setStatus(res.data.status);
    });
  }, []);

  return <h1>Backend status: {status}</h1>;
}