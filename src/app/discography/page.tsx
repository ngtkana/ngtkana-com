import Image from "next/image";
import Link from "next/link";

export default function DiscographyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b border-border">
        ディスコグラフィー
      </h1>

      <div className="mb-12">
        <p className="text-lg mb-8">
          ボカロ曲を中心に、歌ってみた動画を投稿しています。
          最新の投稿はYouTubeチャンネルでご確認ください。
        </p>

        <a
          href="https://www.youtube.com/@ngtkana"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-opacity-90 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
          YouTubeチャンネルを見る
        </a>
      </div>

      <h2 className="text-2xl font-bold mb-6">人気の投稿</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* 動画カード1 */}
        <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-primary text-opacity-30 text-4xl font-bold">
                動画サムネイル
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              3:42
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">ボカロカバー「タイトル」</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              2023年5月公開・再生回数 1.2万回
            </p>
            <a
              href="https://www.youtube.com/@ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              動画を見る
            </a>
          </div>
        </div>

        {/* 動画カード2 */}
        <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-primary text-opacity-30 text-4xl font-bold">
                動画サムネイル
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              4:15
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">
              ボカロカバー「タイトル2」
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              2023年3月公開・再生回数 8.5千回
            </p>
            <a
              href="https://www.youtube.com/@ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              動画を見る
            </a>
          </div>
        </div>

        {/* 動画カード3 */}
        <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-primary text-opacity-30 text-4xl font-bold">
                動画サムネイル
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
              3:58
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">
              ボカロカバー「タイトル3」
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              2023年1月公開・再生回数 7.3千回
            </p>
            <a
              href="https://www.youtube.com/@ngtkana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 mr-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              動画を見る
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          その他の動画はYouTubeチャンネルでご覧いただけます。
        </p>
        <a
          href="https://www.youtube.com/@ngtkana"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
        >
          もっと見る
        </a>
      </div>
    </div>
  );
}
