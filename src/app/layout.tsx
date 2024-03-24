import '@/app/globals.css'
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import StoreProvider from "@/app/StoreProvider";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: 'Max',
        template: 'Max | %s'
    },
    description: 'Max Book List App',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className='container'>
        <StoreProvider>
            <Navbar/>
            <main className='mainContent'>
                {children}
            </main>
            <Footer/>
        </StoreProvider>

        </body>
        </html>
    )
}
