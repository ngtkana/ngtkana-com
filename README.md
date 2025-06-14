# ながたかな Official Website

This is the official website for ながたかな, a Japanese vocalist. The website showcases the artist's profile, music, and social media presence.

## 🚀 Technologies

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts**: [Geist Font](https://vercel.com/font)
- **Deployment**: Standalone output

## 📂 Project Structure

```
ngtkana-com/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── components/ # Reusable UI components
│   │   ├── profile/    # Profile page
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
```

## 🧩 Components

- **MobileNav**: Mobile navigation menu with hamburger button
- **Layout**: Root layout with header, footer, and navigation

## 🎨 Design System

The website uses a custom color scheme with light and dark mode support:

- **Light Mode**: Warm, light background with orange accents
- **Dark Mode**: Dark, warm background with orange accents

CSS variables are used for theming and can be found in `globals.css`.

## 🔧 Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ngtkana-com.git
   cd ngtkana-com
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build

```bash
npm run build
# or
yarn build
```

## 🌐 Deployment

The project is configured for standalone output, making it easy to deploy to various platforms.

## 📝 License

All rights reserved © ながたかな
