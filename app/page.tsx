"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Image
        src='/static/bg1.jpg'
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      {/* <div className="absolute">
        做规范使用
        电动自行车的践行者
        倡导者和传播者！
      </div> */}

      <button className="text-white-900 absolute" onClick={() => {
        router.push('/acceptor')
      }}>
        我承诺
      </button>


      <div>Copyright@ 2018 Jiaye Co.Ltd.沪ICP备18003803号-1</div>

    </main>
  );
}
