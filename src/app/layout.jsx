import '@/styles/global.scss';

export const metadata = {
  title: 'Revolut | All-in-one Finance App for your Money | Revolut Singapore',
  description: 'Join 55+ million customers globally using Revolut to send money to 100+ countries, hold up-to 30+ currencies in app, spend in 150+ currencies, and manage their money.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
