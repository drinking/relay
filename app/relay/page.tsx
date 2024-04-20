"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    const handleClick = () => {
        fetch('/api/count').then(res => {
            res.json().then(data => {
                router.push('/relay/acceptor?no=' + data.no)
            })
        })
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-[#ea5504]">

            <Image
                alt="Image Alt"
                src="https://static.vintage.love/images/middle/NMK4ZBMRYBBCQtsr0AsrHEmcBUeJUhCIvltjWAdp.png"
                className="pt-10 pl-10 pr-10"
                width={360}
                height={300}
                objectFit="contain" // Scale your image down to fit into the container
            />

            <button onClick={handleClick}>
                <Image
                    alt="Image Alt"
                    src="https://static.vintage.love/images/middle/51L1ZC4lzAyZggtDl164l6UNGBv5kqq1OpEDfSQJ.png"
                    width={200}
                    height={100}
                    objectFit="contain" // Scale your image down to fit into the container
                />


            </button>

            <Image
                alt="Image Alt"
                src="https://static.vintage.love/images/middle/GOfUUs3UMxdzMZHIflqK7uBanjHAeN0ikQdyb5KJ.png"
                style={{ alignSelf: 'end' }}
                width={300}
                height={300}
                objectFit="contain" // Scale your image down to fit into the container
            />
        </main>
    );
}
