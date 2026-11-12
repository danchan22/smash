import './globals.css'

export const metadata = {
  title: 'SMASH Tracker',
  description: 'Family activity tracking app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen pb-20">
          {children}
        </main>
      </body>
    </html>
  )
}
