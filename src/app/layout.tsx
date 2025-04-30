export const metadata = {
  title: "Mapping Disabilities in Guimbal, Iloilo",
  description: "An ethnographic and geospatial analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
