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
                src="/static/part1.png"
                className="pt-10 pl-10 pr-10"
                width={360}
                height={300}
                objectFit="contain" // Scale your image down to fit into the container
            />

            <button onClick={handleClick}>
                <Image
                    alt="Image Alt"
                    src="/static/part2.png"
                    width={200}
                    height={100}
                    objectFit="contain" // Scale your image down to fit into the container
                />


            </button>


            <Image
                alt="Image Alt"
                src="/static/part3.png"
                style={{ alignSelf: 'end' }}
                width={300}
                height={300}
                objectFit="contain" // Scale your image down to fit into the container
            />


            {/* <button className="text-white-900 absolute" onClick={() => {
                // TODO get local cookie
                // request from remote
                fetch('/api/count').then(res => {
                    res.json().then(data => {
                        router.push('/relay/acceptor?no=' + data.no)
                    })
                })

            }}>
                我承诺
            </button> */}

            {/* <div>Copyright@ 2018 Jiaye Co.Ltd.沪ICP备18003803号-1</div> */}
        </main>
    );
}
