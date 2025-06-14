import { Container } from "@/app/components/Container";

/**
 * Loading component
 *
 * This component is displayed while the page is loading.
 * It provides a visual indication that content is being loaded.
 */
export default function Loading() {
  return (
    <Container className="py-16">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-primary border-opacity-20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium">読み込み中...</p>
      </div>
    </Container>
  );
}
