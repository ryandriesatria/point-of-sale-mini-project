import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import { toRupiah } from "../util/formatter";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import Swal from "sweetalert2";
import axios from "axios";
import { clearOrder } from "../store/reducers/orderSlice";
import { useDispatch } from "react-redux";

function PaymentPage() {
    const nominal = [1000, 2000, 5000, 10000, 20000, 50000, 100000];

    const { dataOrder, total_amount } = useSelector((state) => state.order);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [totalPayInput, setTotalPayInput] = useState(0);
    const [change, setChange] = useState(0);

    useEffect(() => {
        if (totalPayInput >= total_amount) {
            setChange(totalPayInput - total_amount);
        } else {
            setChange(0);
        }
    }, [totalPayInput]);

    if (dataOrder.length === 0) {
        return <Navigate to={"/"} />;
    }

    function handleInputChange(values) {
        setTotalPayInput(values.value);
    }

    function handleNominalChange(value) {
        setTotalPayInput(parseInt(totalPayInput) + value);
    }

    function handlePayment() {
        if (total_amount > totalPayInput) {
            Swal.fire({
                title: "Pembayaran Gagal",
                text: "Nominal yang dibayarkan tidak mencukupi!",
                icon: "warning",
            });
            return;
        }

        const transactionDetails = [];

        dataOrder.forEach((item) => {
            const obj = {
                product_id: item.product_id,
                quantity: item.quantity,
                subtotal: item.quantity * item.price,
            };

            transactionDetails.push(obj);
        });

        const payload = {
            total_amount,
            total_pay: parseInt(totalPayInput),
            transaction_date: new Date().toISOString(),
            transactionDetails,
        };

        axios
            .post("http://localhost:8080/transaction", payload)
            .then(() => {
                Swal.fire({
                    title: "Pembayaran Berhasil",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                });
                dispatch(clearOrder());
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Pembayaran Gagal",
                    text: "Sistem mengalami kendala",
                    icon: "warning",
                });
            });
    }
    return (
        <Layout activePage={1}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex gap-2 divide-x-2 divide-zinc-500 h-full'>
                    <div className='order-details-section w-2/3 mr-6'>
                        <div className='flex justify-between items-center'>
                            <span className='font-franklin text-2xl'>
                                Rincian Pesanan
                            </span>
                        </div>
                        <div className='mt-10 overflow-y-auto h-[90%] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'>
                            {dataOrder.map((item) => (
                                <React.Fragment key={item.product_id}>
                                    <div className='ordered-item grid grid-cols-4'>
                                        <img
                                            className='size-28 rounded-xl'
                                            src={item.image}
                                            alt=''
                                        />
                                        <div className=''>
                                            <p className=''>{item.title}</p>
                                            <p className='font-couriernew font-semibold mt-4'>
                                                {toRupiah(item.price)}
                                            </p>
                                        </div>
                                        <div className='justify-self-center'>
                                            x{item.quantity}
                                        </div>
                                        <div className='font-couriernew font-semibold justify-self-end mr-3'>
                                            {toRupiah(
                                                item.price * item.quantity
                                            )}
                                        </div>
                                    </div>
                                    <hr className='my-4 border-black' />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className='payment-section pl-6 flex flex-col w-1/3 gap-6'>
                        <span className='font-franklin text-2xl'>
                            Pembayaran
                        </span>
                        <div className='flex justify-between my-4 pr-2 mt-10 '>
                            <span className='font-poppins text-xl font-semibold'>
                                Total
                            </span>
                            <span className='font-couriernew font-semibold text-xl'>
                                {toRupiah(total_amount)}
                            </span>
                        </div>

                        <div>
                            <span className='font-poppins text-xl font-semibold'>
                                Dibayar
                            </span>
                            <CurrencyFormat
                                className='block w-full px-4 py-2 mt-4  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                allowNegative={false}
                                prefix={"Rp "}
                                suffix={",00"}
                                value={totalPayInput}
                                onValueChange={(values) =>
                                    handleInputChange(values)
                                }
                            />
                            <div className='grid grid-cols-4 font-poppins mt-4 justify-stretch gap-2'>
                                {nominal.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() =>
                                            handleNominalChange(value)
                                        }
                                        type='button'
                                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded-full text-sm px-5 py-2.5 '
                                    >
                                        {value}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setTotalPayInput(0)}
                                    type='button'
                                    className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5'
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-between my-4 pr-2  '>
                            <span className='font-poppins text-xl font-semibold'>
                                Kembalian
                            </span>
                            <span className='font-couriernew font-semibold text-xl'>
                                {toRupiah(change)}
                            </span>
                        </div>
                        <button
                            onClick={handlePayment}
                            type='button'
                            className={`w-full mt-auto ${
                                totalPayInput >= total_amount
                                    ? "btn-default"
                                    : "btn-disabled"
                            }`}
                        >
                            SELESAIKAN
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentPage;
