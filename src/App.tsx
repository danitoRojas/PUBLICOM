import Publicidad from "./components/publicidad/Publicidad";
import Navbar from "./components/navbar/navbar"; // Import Navbar

function App() {
    return (
        <div style={{ display: "flex" }}>
            <Navbar /> {/* Render Navbar */}
            <Publicidad />
        </div>
    );
}

export default App;
