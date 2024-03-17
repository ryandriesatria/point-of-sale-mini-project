import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<OrderPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
