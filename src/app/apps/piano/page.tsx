import type { Metadata } from 'next';
import { Container } from '@/app/components/Container';
import Piano from './components/Piano';

export const metadata: Metadata = {
  title: 'ピアノ',
  description: 'ブラウザで演奏できるシンプルなピアノアプリ。Web Audio APIを使用してリアルタイムで音を生成します。',
  keywords: ['ピアノ', 'piano', 'music', '音楽', 'web audio', 'instrument'],
};

export default function PianoPage() {
  return (
    <Container size="lg">
      <div className="min-h-screen flex items-center justify-center">
        <Piano />
      </div>
    </Container>
  );
}
