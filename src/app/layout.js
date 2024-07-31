'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Login from "./login";
import React,{ Children, useEffect,useState } from "react";
import Navbar from "./navbar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const [session, setSession] = useState(null);

  useEffect(() => {
    const jsonsession = JSON.parse(sessionStorage.getItem('asamblea-sesion-id'));
    if (jsonsession) {
      setSession(jsonsession);
    }
  }, []);

  if(session==null){
    return(
      <html>
          <body>
              <Login></Login>
          </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session}></Navbar>
          {children}
      </body>
    </html>
  );
}
