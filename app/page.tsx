"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="h2">
        一起签署电动自行车用车安全承诺书，守护平安家园
      </div>

      <div>Copyright@ 2018 Jiaye Co.Ltd.沪ICP备18003803号-1</div>

    </main>
  );
}
