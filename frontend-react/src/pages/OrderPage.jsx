import axios from "axios";
import OrderedItem from "../components/OrderedItem";
import ProductCard from "../components/ProductCard";
import Layout from "../layout/Layout";
import useSWR from "swr";
import MoonLoader from "react-spinners/MoonLoader";
import React, { useEffect, useState } from "react";
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { toRupiah } from "../util/formatter";

function OrderPage() {
    const navigate = useNavigate();

    const { dataOrder, total_amount } = useSelector((state) => state.order);

    const [searchParams] = useSearchParams();
    const category_id = searchParams.get("category_id");
    const title = searchParams.get("title");
    const sort_by = searchParams.get("sort_by");
    const sort_order = searchParams.get("sort_order");

    const [activeTab, setActiveTab] = useState(0);
    const [sortOption, setSortOption] = useState("default");
    const [searchInput, setSearchInput] = useState("");

    const fetcher = (url, params) =>
        axios
            .get(url, {
                params: params,
            })
            .then((res) => res.data.data);

    const {
        data: products,
        isLoading,
        error,
    } = useSWR(
        category_id
            ? [`http://localhost:8080/product`, { category_id }]
            : [`http://localhost:8080/product`, { title, sort_by, sort_order }],
        ([url, params]) => fetcher(url, params)
    );

    const { data: categories, isLoadingCategories } = useSWR(
        `http://localhost:8080/category`,
        fetcher
    );

    function handleActiveTab(val) {
        setActiveTab(val);
        setSortOption("default");
        setSearchInput("");
        if (val !== activeTab) {
            if (val === 0) {
                navigate("/");
            } else {
                navigate({
                    pathname: "",
                    search: createSearchParams({ category_id: val }).toString(),
                });
            }
        }
    }

    function handleSearchInput(e) {
        setSearchInput(e.target.value);
    }

    function handleSelectedOptionChange(e) {
        let value = e.target.value;
        let sortOption = value.split(" ");

        setSortOption(value);
        setActiveTab(-1);
        if (value === "default") {
            navigate({
                pathname: "",
                search: createSearchParams({
                    ...(title ? { title: title } : {}),
                }).toString(),
            });
        } else {
            navigate({
                pathname: "",
                search: createSearchParams({
                    sort_by: sortOption[0],
                    sort_order: sortOption[1],
                    ...(title ? { title: title } : {}),
                }).toString(),
            });
        }
    }

    function handleSearchProduct(e) {
        e.preventDefault();
        navigate({
            pathname: "",
            search: createSearchParams({
                title: searchInput,
                ...(sort_by ? { sort_by } : {}),
                ...(sort_order ? { sort_order } : {}),
            }).toString(),
        });
        setActiveTab(-1);
    }

    function handleNavigatePayment() {
        if (dataOrder.length > 0) {
            navigate("/payment");
        }
    }

    return (
        <Layout activePage={1}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex gap-2 divide-x-2 divide-zinc-500 h-full'>
                    <div className='order-section w-2/3 mr-6'>
                        <div className='flex justify-between items-center'>
                            <span className='font-franklin text-2xl'>Menu</span>
                            <div className='flex gap-4'>
                                <select
                                    value={sortOption}
                                    name='sort'
                                    id='sort'
                                    onChange={(e) =>
                                        handleSelectedOptionChange(e)
                                    }
                                    className='font-poppins bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 px-2.5 py-1'
                                >
                                    <option value='default'>Sort By</option>
                                    <option value='title asc'>
                                        Name - ASC
                                    </option>
                                    <option value='title desc'>
                                        Name - DESC
                                    </option>
                                    <option value='price asc'>
                                        Price - ASC
                                    </option>
                                    <option value='price desc'>
                                        Price - DESC
                                    </option>
                                </select>

                                <form
                                    className='max-w-md mx-auto'
                                    onSubmit={(e) => handleSearchProduct(e)}
                                >
                                    <label
                                        htmlFor='default-search'
                                        className='mb-2 text-sm font-medium text-gray-900 sr-only '
                                    >
                                        Search
                                    </label>
                                    <div className='relative flex gap-2'>
                                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                            <svg
                                                className='w-4 h-4 text-gray-500 '
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 20 20'
                                            >
                                                <path
                                                    stroke='currentColor'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            onChange={(e) =>
                                                handleSearchInput(e)
                                            }
                                            value={searchInput}
                                            type='search'
                                            id='default-search'
                                            className='block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                                            placeholder='Search ...'
                                            required
                                        />
                                        <button
                                            type='submit'
                                            className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-6'>
                            <ul className='flex flex-wrap -mb-px'>
                                <li className='me-2 hover:cursor-pointer'>
                                    <span
                                        onClick={() => handleActiveTab(0)}
                                        className={
                                            activeTab === 0
                                                ? "active-tab"
                                                : "default-tab"
                                        }
                                    >
                                        Semua
                                    </span>
                                </li>
                                {categories?.map((category) => (
                                    <li
                                        key={category.id}
                                        className='me-2 hover:cursor-pointer'
                                    >
                                        <span
                                            onClick={() =>
                                                handleActiveTab(category.id)
                                            }
                                            className={
                                                activeTab === category.id
                                                    ? "active-tab"
                                                    : "default-tab"
                                            }
                                        >
                                            {category.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='border-2 border-gray-200  h-[83%] p-4 grid grid-cols-4 justify-items-center gap-4 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'>
                            {isLoading || error ? (
                                <div className='col-span-4 justify-self-center self-center'>
                                    <MoonLoader color='#111827' className=' ' />
                                </div>
                            ) : (
                                products.map((item) => (
                                    <ProductCard key={item.id} data={item} />
                                ))
                            )}
                        </div>
                    </div>

                    <div className='payment-section pl-6 flex flex-col w-1/3 '>
                        <span className='font-franklin text-2xl'>
                            Daftar Pesanan
                        </span>
                        <div className='order-list mt-14 overflow-auto pr-2 flex flex-col scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300'>
                            {dataOrder.length > 0 ? (
                                dataOrder.map((item) => (
                                    <React.Fragment key={item.product_id}>
                                        <OrderedItem data={item} />
                                        <hr className='my-3 border-black' />
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className='mx-auto flex flex-col justify-center items-center'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z'
                                        />
                                    </svg>
                                    Pesanan Kosong
                                </div>
                            )}
                        </div>
                        <div className='mt-auto'>
                            <div className='flex justify-between my-4 pr-2 mt-auto '>
                                <span className='font-poppins text-xl font-semibold'>
                                    Total
                                </span>
                                <span className='font-couriernew font-semibold text-xl'>
                                    {toRupiah(total_amount)}
                                </span>
                            </div>
                            <button
                                onClick={handleNavigatePayment}
                                type='button'
                                className={`w-full ${
                                    total_amount !== 0
                                        ? "btn-default"
                                        : "btn-disabled"
                                }`}
                            >
                                BAYAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default OrderPage;
