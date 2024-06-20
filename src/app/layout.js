import '@/styles/global.css'

export const metadata = {
  title: "Microsoft Trainee Program",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
