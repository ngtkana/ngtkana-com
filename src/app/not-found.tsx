import { Container } from "@/app/components/Container";
import { LinkButton } from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import { Metadata } from "next";
import { generateMetadata } from "@/app/components/SEO";

/**
 * Metadata for the 404 page
 */
export const metadata: Metadata = generateMetadata({
  title: "ページが見つかりません",
  description: "お探しのページは見つかりませんでした。",
});

/**
 * NotFound component
 *
 * Custom 404 page that is displayed when a user navigates to a non-existent route.
 * Provides a user-friendly error message and navigation options.
 */
export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="text-9xl font-bold opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">ページが見つかりません</h1>

        <p className="text-lg mb-8 max-w-md mx-auto">
          申し訳ありませんが、お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton href="/" icon={<Icon name="home" />}>
            ホームに戻る
          </LinkButton>
          <LinkButton
            href="/profile"
            variant="outline"
            icon={<Icon name="profile" />}
          >
            プロフィールを見る
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
