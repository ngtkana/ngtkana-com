import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/home.png"
            alt="ながたかな"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">ながたかな</h1>
        <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">
          お歌の世界を、私の声で繋いでいきたいです。
        </p>
        {/* YouTube embed */}
        <div className="relative w-full max-w-3xl mx-auto aspect-video mb-12 rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/videoseries?si=7C_sU_ZCgZmRAY8p&amp;list=PLthQZA1nE6DLzxQZfPr4LHaUFHOe3zt71"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-4 px-2">
          <Link
            href="https://www.youtube.com/@ngtkana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all"
          >
            YouTube
          </Link>
          <Link
            href="https://x.com/ngtkana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all"
          >
            X (Twitter)
          </Link>
        </div>
      </div>
    </div>
  );
}
