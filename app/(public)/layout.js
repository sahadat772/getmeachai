

// import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import SessionWrapper from "../components/ui/SessionWrapper";



export default function Publiclayout({ children }) {
    return (
        <>

            <main className="flex-1">
                <SessionWrapper>
                    <Navbar />
                    {children}
                    {/* <Footer /> */}
                </SessionWrapper>
            </main>


        </>
    );
}