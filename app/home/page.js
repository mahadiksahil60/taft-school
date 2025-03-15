"use client";
import React, { useState, useEffect } from "react";
import Request from "../pages/Request/Request";

export default function Home() {
  const [user, setUser] = useState([]);
  return (
    <>
      <Request />
    </>
  );
}
