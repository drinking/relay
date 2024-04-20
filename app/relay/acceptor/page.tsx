"use client"
import React, { useEffect, useRef, useState } from 'react';
import { default as NextImage } from "next/image";
import { useSearchParams } from 'next/navigation'


const ImageWithText = () => {

    const searchParams = useSearchParams()
    const NO = searchParams.get('no')

    const [imageUrl, setImageURL] = useState('/static/bg2.png');
    const [text, setText] = useState('您是第' + NO + '位');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasImageSrc, setCanvasImageSrc] = useState<string>('');

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
                    ctx.font = '38px Microsoft YaHei';
                    ctx.fillStyle = 'black';
                    // ctx.strokeStyle = 'black';
                    // ctx.lineWidth = 1;


                    const textStart = (canvas.width - 150) / 2;
                    const textYStart = canvas.height / 7;

                    // Write the text on the image
                    ctx.fillText(text, textStart, textYStart);
                    // ctx.strokeText(text, textStart, textYStart);

                    const textStart2 = (canvas.width - 370) / 2;
                    ctx.fillText('电动自行车用车安全承诺人', textStart2, textYStart + 60);
                    // ctx.strokeText('电动自行车用车安全承诺人', textStart2, textYStart+40);

                    // Convert the canvas to a data URL
                    const canvasDataUrl = canvas.toDataURL('image/png');
                    setCanvasImageSrc(canvasDataUrl);
                }
            }
        }
    }, [imageUrl, text]);

    return (
        <div className='bg-white'>
            {!canvasImageSrc && <canvas ref={canvasRef} style={{ border: '1px solid black', transform: 'scale(0.5,0.5)', transformOrigin: '0 0' }} />}
            {canvasImageSrc &&
                <NextImage src={canvasImageSrc} alt="Background Image" layout="fill" objectFit="cover" quality={100} />
            }
        </div>
    );
}

export default ImageWithText;