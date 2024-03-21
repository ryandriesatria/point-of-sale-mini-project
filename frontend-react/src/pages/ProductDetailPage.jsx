import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import useSWR from "swr";
import Layout from "../layout/Layout";
import { toRupiah } from "../util/formatter";

function ProductDetailPage() {
    const { id } = useParams();

    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const { data: product, isLoading } = useSWR(
        `http://localhost:8080/product/${id}`,
        fetcher
    );
    return (
        <Layout activePage={3}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        Detail Transaksi
                    </span>
                    <Link to={"/product"}>
                        <button className='btn-default text-xs m-0'>
                            Kembali
                        </button>
                    </Link>
                </div>
                <hr className='my-3 border-black' />
                {isLoading ? (
                    <MoonLoader color='#111827' className=' ' />
                ) : (
                    <div className='flex w-full justify-between mt-6'>
                        <div className='grid grid-cols-3 w-2/3 font-poppins  gap-4'>
                            <span>ID Produk</span>
                            <span className='col-span-2'>: {product.id}</span>
                            <span>Nama Product</span>
                            <span className='col-span-2'>
                                : {product.title}
                            </span>
                            <span>Harga Satuan</span>
                            <span className='col-span-2'>
                                : {toRupiah(product.price)}
                            </span>
                            <span>URL Gambar</span>
                            <span className='col-span-2'>
                                : {product.image}
                            </span>
                            <span>ID Kategori</span>
                            <span className='col-span-2'>
                                : {product.category.id}
                            </span>
                            <span>Nama Kategori</span>
                            <span className='col-span-2'>
                                : {product.category.name}
                            </span>
                        </div>
                        <div>
                            <img
                                className='rounded-xl size-60'
                                src={product.image}
                                alt=''
                            />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ProductDetailPage;
