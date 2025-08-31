import Navbar from "./components/navbar/navbar"; // Import Navbar
import Publicacion from "./components/publicacion/Publicacion";

function App() {
    return (
        <div style={{ display: "flex" }}>
            <Navbar onFilter={function (): void {
                throw new Error("Function not implemented.");
            } } /> 
            <Publicacion />
        </div>
    );
}

export default App;
