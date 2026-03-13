import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import SessionWrapper from "../components/ui/SessionWrapper";



export default function Publiclayout({ children }) {
    return (
        <>
            {/* <Navbar /> */}
            <main className="flex-1">
                <SessionWrapper>
                    {children}
                </SessionWrapper>
            </main>
            {/* <Footer /> */}

        </>
    );
}