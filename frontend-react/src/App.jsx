import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<OrderPage />} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/history' element={<TransactionHistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
