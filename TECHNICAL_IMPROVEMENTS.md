# 技術的な改善点

このドキュメントでは、ウェブサイトに実装された技術的な改善点について説明します。

## 1. コンポーネントの最適化

ウェブサイトのコードベースを改善するために、以下のコンポーネントを新たに作成・分割しました：

### Hero コンポーネント

```tsx
// src/app/components/Hero.tsx
export default function Hero({
    title,
    subtitle,
    description,
    imageSrc,
    imageAlt,
}: HeroProps) {
    // ...
}
```

ヒーローセクションを独立したコンポーネントとして抽出することで、再利用性を高め、メインページのコードをよりシンプルにしました。

### Section コンポーネント

```tsx
// src/app/components/Section.tsx
export default function Section({
    id,
    title,
    children,
    className = "",
    animationDelay = "",
}: SectionProps) {
    // ...
}
```

セクションの共通スタイルとアニメーションを統一するためのコンポーネントを作成しました。これにより、新しいセクションの追加が容易になり、一貫性のあるデザインを維持できます。

## 2. テストの導入

Jest と React Testing Library を使用して、コンポーネントのテストを実装しました：

### テスト環境のセットアップ

```bash
# テスト関連パッケージのインストール
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest babel-jest
```

### テスト設定ファイル

- `jest.config.js` - Jest の設定
- `jest.setup.js` - テスト環境のセットアップ

### コンポーネントテスト

```tsx
// src/app/components/__tests__/Hero.test.tsx
describe('Hero Component', () => {
    it('renders the hero component with all props', () => {
        // ...
    });
    
    // ...
});
```

## 3. テストの実行方法

package.json に以下のスクリプトを追加しました：

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

テストを実行するには：

```bash
# すべてのテストを実行
npm test

# ファイル変更を監視しながらテストを実行
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

### CI/CD パイプラインの設定

GitHub Actions を使用して、継続的インテグレーション（CI）とデプロイ（CD）のパイプラインを設定しました：

#### テストワークフロー

```yaml
# .github/workflows/ci.yml
name: Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
```

#### デプロイワークフロー

```yaml
# .github/workflows/deploy.yml (一部抜粋)
name: Deploy to Google Cloud Run

jobs:
  # Check if tests have passed
  test-status:
    name: Check Test Status
    runs-on: ubuntu-latest
    steps:
      - name: Wait for tests to succeed
        uses: lewagon/wait-on-check-action@v1.3.1
        with:
          ref: ${{ github.ref }}
          check-name: 'Run Tests (20.x)'
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          wait-interval: 10

  # Build and deploy only if tests pass
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    needs: test-status
    steps:
      # デプロイ手順...
```

このCI/CDパイプラインにより、以下のことが自動化されます：

1. **テストの自動化**：
   - メインブランチへのプッシュ時とプルリクエスト時にテストが実行される
   - Node.js 18.x と 20.x の両方でテストが実行される
   - テストが失敗した場合、デプロイは実行されない

2. **デプロイの自動化**：
   - テストが成功した場合のみデプロイが実行される
   - リント、ビルド、コンテナ化、Google Cloud Runへのデプロイが自動的に行われる
   - デプロイの各ステップが順番に実行され、いずれかのステップが失敗した場合はデプロイが中止される

これにより、コードの品質を継続的に監視し、問題を早期に発見するとともに、テスト済みのコードのみが本番環境にデプロイされることが保証されます。

## 4. 今後の改善案

### 状態管理の導入

現在は比較的シンプルなウェブサイトですが、機能を拡張する場合は、Zustandなどの軽量な状態管理ライブラリを導入することで、状態の管理が容易になります。

```bash
# Zustandのインストール例
npm install zustand
```

### コンテンツ管理システムの導入

更新頻度が高い場合は、ContentfulやSanityなどのヘッドレスCMSを導入することで、コンテンツの管理が容易になります。

```bash
# Contentfulクライアントのインストール例
npm install contentful
```

### 国際化対応

多言語対応が必要な場合は、next-i18nextなどのライブラリを使用して、言語切り替え機能を実装できます。

```bash
# next-i18nextのインストール例
npm install next-i18next
```

## まとめ

これらの技術的な改善により、コードの保守性、拡張性、テスト容易性が向上しました。今後の機能追加や変更にも対応しやすい基盤が整いました。
