import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import '../styles/globals.css'
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
              <Link href="/"><h1 className="text-4xl font-bold">My Recipes</h1></Link>
              <p className="text-gray-600">A collection of delicious recipes</p>
              <menu className="mt-4 flex space-x-8">
                <section>
                  <Link href="/catalog"><h2 className="text-xl font-semibold text-gray-700">Catalog</h2></Link>
                  <ul className="flex space-x-4">
                    <li><Link href="/category/main-course" className="text-gray-700 hover:underline">» Main Courses</Link></li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-semibold text-gray-500">Favorites</h2>
                  <ul className="flex space-x-4">
                    <li><Link href="/recipe/spagetti-carbonara" className="text-gray-700 hover:underline">» Spaghetti Carbonara</Link></li>
                  </ul>
                </section>
              </menu>
            </header>
            <main className="bg-white shadow-md rounded-lg p-6">
              {children}
            </main>
          </div>
        </div>
        <footer className="bg-gray-800 text-white py-4 mt-auto relative bottom-0 w-full">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 AIHegedus Recipes. All rights reserved.</p>
          </div>
        </footer>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
