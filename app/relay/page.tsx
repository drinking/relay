"use client";
import { default as NextImage } from "next/image";
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    const searchParams = useSearchParams()

    const [imageUrl, setImageURL] = useState('/static/bg2.png');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasImageSrc, setCanvasImageSrc] = useState<string>('');
    const [shareImage, setShareImage] = useState<boolean>(false);
    const [NO, setNO] = useState<Number>(0);


    useEffect(() => {


        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Set the canvas dimensions to match the browser window
                canvas.width = window.innerWidth * 2;
                canvas.height = window.innerHeight * 2;

                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Load the image
                const img = new Image();
                img.src = imageUrl;
                img.onload = function () {

                    const imageAspectRatio = img.width / img.height;
                    const canvasAspectRatio = canvas.width / canvas.height;

                    let renderableWidth, renderableHeight;

                    // If image's aspect ratio is less than canvas's aspect ratio
                    // if (imageAspectRatio < canvasAspectRatio) {
                    //     renderableHeight = canvas.height;
                    //     renderableWidth = img.width * (renderableHeight / img.height);
                    // } else {
                    renderableWidth = canvas.width;
                    renderableHeight = img.height * (renderableWidth / img.width);
                    // }

                    // Calculate the position to draw the image
                    const xStart = (canvas.width - renderableWidth) / 2;
                    const yStart = 0; //(canvas.height - renderableHeight) / 2;

                    // Draw the image on the canvas
                    const scale = 2;
                    ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);


                    // Set the font and text styles
                    ctx.font = '45px Microsoft YaHei';
                    ctx.fillStyle = 'black';
                    // ctx.strokeStyle = 'black';
                    // ctx.lineWidth = 1;

                    const textWidth = 4 * 45 + String(NO).length * 28;

                    const textStart = (canvas.width - textWidth) / 2;
                    const textYStart = canvas.height / 7;
                    // Write the text on the image
                    ctx.fillText('您是第', textStart, textYStart);
                    ctx.fillStyle = 'red';
                    ctx.fillText(String(NO), textStart + 140, textYStart);
                    ctx.fillStyle = 'black';
                    ctx.fillText('位', textStart + 140 + String(NO).length * 28, textYStart);

                    const textStart2 = (canvas.width - 530) / 2;
                    ctx.fillText('电动自行车用车安全承诺人', textStart2, textYStart + 70);

                    // Convert the canvas to a data URL
                    const canvasDataUrl = canvas.toDataURL('image/png');
                    setCanvasImageSrc(canvasDataUrl);
                }
            }
        }
    }, [NO]);

    const handleClick = () => {
        fetch('/api/count').then(res => {
            res.json().then(data => {
                setShareImage(true)
                setNO(data.no)
                // router.push('/relay/acceptor?no=' + data.no)
            })
        })
    };

    return (
        <>
            <div id='wx_pic' style={{ margin: '0 auto', display: 'none' }}>
                <img src='/static/share.jpg' />
            </div>


            {!shareImage && <main className="flex min-h-screen flex-col items-center justify-between bg-[#ea5504]">

                {
                    !shareImage && <NextImage
                        alt="Image Alt"
                        src="https://static.vintage.love/images/middle/MYoAjX2uZz0CeDXEbBaaHRiTyD5QRDNDBZSLUfwL.png"
                        // src='/static/part1.png'
                        className="pt-10 pl-10 pr-10"
                        width={360}
                        height={300}
                        objectFit="contain" // Scale your image down to fit into the container
                    />
                }

                {
                    !shareImage &&

                    <button onClick={handleClick}>
                        <NextImage
                            alt="Image Alt"
                            src="https://static.vintage.love/images/middle/vZ9yhRotmJvnDQTiGe97fYiiCGBVf5n8xgOW9JzX.png"
                            // src='/static/part2.png'
                            width={200}
                            height={100}
                            objectFit="contain" // Scale your image down to fit into the container
                        />


                    </button>
                }

                {
                    !shareImage &&
                    <NextImage
                        alt="Image Alt"
                        src="https://static.vintage.love/images/middle/A8veLbKptGBwXmdZdzRBRx21TE6LuycHecpDbLSA.png"
                        // src='/static/part3.png'
                        style={{ alignSelf: 'end' }}
                        width={300}
                        height={300}
                        objectFit="contain" // Scale your image down to fit into the container
                    />
                }

            </main>
            }

            {
                shareImage && <div className='bg-white'>
                    {!canvasImageSrc && <canvas ref={canvasRef} style={{ border: '1px solid black', transform: 'scale(0.5,0.5)', transformOrigin: '0 0' }} />}
                    {canvasImageSrc &&
                        <NextImage src={canvasImageSrc} alt="Background Image" layout="fill" objectFit="cover" quality={100} />
                    }
                </div>
            }
        </>
    );
}
