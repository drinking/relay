"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, Fragment } from "react";

export default function Home() {
  const router = useRouter()

  const [NO, setNO] = useState(1);

  useEffect(() => {

  }, [])



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Image
        src='/static/bg2.jpg'
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      <div className="absolute text-gray-900">
        您是第{NO}位承诺人
      </div>



    </main>
  );
}
