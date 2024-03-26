import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import TransactionDetailPage from "./pages/TransactionDetail";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";
import CategoryListPage from "./pages/CategoryListPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";

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
                <Route path='/category' element={<CategoryListPage />} />
                <Route path='/category/add' element={<CategoryFormPage />} />
                <Route path='/category/:id' element={<CategoryDetailPage />} />
                <Route
                    path='/category/:id/edit'
                    element={<CategoryFormPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
