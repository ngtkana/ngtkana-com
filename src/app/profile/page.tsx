import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b border-border">
        Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/3">
          <div className="relative w-full aspect-9/16 rounded-lg overflow-hidden bg-muted mb-6">
            <Image
              src="/profile.png"
              alt="ながたかなのプロフィール画像"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">ながたかな</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="mb-4">
                2021年12月に、YouTubeにて活動を開始。
                ボカロ曲を中心に、歌ってみた動画を投稿しております。
                みんなの心に届くような歌声を目指して、これからも活動を続けていきたいです。
              </p>
              <p>よかったら遊びにきてね！</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">SNS</h2>
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.youtube.com/@ngtkana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all"
              >
                <div className="mr-4 text-red-500 mb-2 sm:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">YouTube</h3>
                  <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                  <p className="text-sm mt-1">
                    ボカロ曲を中心に、歌ってみた動画を投稿しております。
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/ngtkana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap sm:flex-nowrap items-start sm:items-center p-4 bg-muted rounded-lg hover:bg-opacity-80 transition-all"
              >
                <div className="mr-4 text-blue-500 mb-2 sm:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">X (Twitter)</h3>
                  <p className="text-gray-600 dark:text-gray-400">@ngtkana</p>
                  <p className="text-sm mt-1">
                    新作のダジャレを投稿しております。
                  </p>
                </div>
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">活動履歴</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  2021年12月
                </div>
                <div className="font-medium">YouTubeチャンネル開設</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
