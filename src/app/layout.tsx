import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import './globals.css';

const font = Nunito({ subsets: ['latin', 'vietnamese'], weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Kidlingo - Premium Learning App',
  description: 'A colorful app for kids to learn new words in different languages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-[#fdfbf7] text-slate-700 min-h-screen selection:bg-pink-300 selection:text-white dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Background decorative blobs */}
          <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-pink-200/40 dark:bg-purple-900/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] bg-blue-200/40 dark:bg-indigo-900/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <div className="fixed top-[20%] right-[10%] w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] bg-yellow-200/40 dark:bg-amber-900/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
