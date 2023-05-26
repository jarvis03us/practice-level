import '@/styles/globals.css';
import 'antd/dist/antd.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <main className="flex flex-col bg-white h-screen w-full mx-auto overflow-hidden px-20">
      <Component {...pageProps} />
    </main>
  );
}
