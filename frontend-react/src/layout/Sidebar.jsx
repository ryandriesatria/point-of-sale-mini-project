import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(activePage);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    function handleSidebarClick(val) {
        setIsActive(val);
        setIsOpen(false);
    }

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 bg-gray-900 my-5 rounded-2xl w-64 px-5 py-4 transition-transform duration-300 transform ${
                isOpen ? "-translate-x-5" : "-translate-x-48"
            }`}
        >
            <div className='flex justify-between items-center'>
                <div className='ml-6 text-white font-impact text-sm'>
                    PoS System
                </div>
                <button
                    className='text-white focus:outline-none mr-1'
                    onClick={toggleSidebar}
                >
                    <svg
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        ) : (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16m-7 6h7'
                            />
                        )}
                    </svg>
                </button>
            </div>
            <nav className='ml-4 mt-16 font-poppins'>
                <ul className='flex flex-col gap-4'>
                    <Link to={"/"} onClick={() => handleSidebarClick(1)}>
                        <li className='flex items-center justify-between gap-4 hover:bg-slate-500 hover:cursor-pointer rounded-lg '>
                            <div className='text-white block py-2 pl-2'>
                                Order
                            </div>

                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className={`w-8 h-8 ${
                                    isActive === 1
                                        ? "stroke-sky-200"
                                        : "stroke-white"
                                }`}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z'
                                />
                            </svg>
                        </li>
                    </Link>
                    <hr className='my-4 -mx-5' />
                    <Link to={"/history"} onClick={() => handleSidebarClick(2)}>
                        <li className='flex items-center justify-between gap-4 hover:bg-slate-500 hover:cursor-pointer rounded-lg'>
                            <div className='text-white block py-2 pl-2'>
                                Transaction
                            </div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className={`w-8 h-8 ${
                                    isActive === 2
                                        ? "stroke-sky-200"
                                        : "stroke-white"
                                }`}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
                                />
                            </svg>
                        </li>
                    </Link>
                    <hr className='my-4 -mx-5' />
                    <li
                        className='flex items-center justify-between gap-4 hover:bg-slate-500 hover:cursor-pointer rounded-lg'
                        onClick={() => handleSidebarClick(3)}
                    >
                        <div className='text-white block py-2 pl-2'>
                            Products
                        </div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={`w-8 h-8 ${
                                isActive === 3
                                    ? "stroke-sky-200"
                                    : "stroke-white"
                            }`}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                            />
                        </svg>
                    </li>
                    <hr className='my-4 -mx-5' />
                    <li
                        className='flex items-center justify-between gap-4 hover:bg-slate-500 hover:cursor-pointer rounded-lg'
                        onClick={() => handleSidebarClick(4)}
                    >
                        <div className='text-white block py-2 pl-2'>
                            Categories
                        </div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={`w-8 h-8 ${
                                isActive === 4
                                    ? "stroke-sky-200"
                                    : "stroke-white"
                            }`}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 6h.008v.008H6V6Z'
                            />
                        </svg>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
