import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import TransactionDetailPage from "./pages/TransactionDetail";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<OrderPage />} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/history' element={<TransactionHistoryPage />} />
                <Route
                    path='/history/:id'
                    element={<TransactionDetailPage />}
                />
                <Route path='/product' element={<ProductListPage />} />
                <Route path='/product/add' element={<ProductFormPage />} />
                <Route path='/product/:id' element={<ProductDetailPage />} />
                <Route path='/product/:id/edit' element={<ProductFormPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
