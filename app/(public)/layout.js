import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";



export default function Publiclayout({children}) {
    return (
        <>
            <Navbar/>
            <main className="flex-1">
                {children}
            </main>
            <Footer/>
        </>
    );
}