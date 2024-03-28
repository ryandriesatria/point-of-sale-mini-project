import React from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
import Swal from "sweetalert2";
import MoonLoader from "react-spinners/MoonLoader";

function ProductFormPage() {
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const {
        data: categories,
        isLoadingCategory,
        error,
    } = useSWR(`http://localhost:8080/category`, fetcher);

    const { data: product, isLoadingProduct } = useSWR(
        productId ? `http://localhost:8080/product/${productId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                setValue("title", data.title);
                setValue("category", data.category.id);
                setValue("price", data.price);
                setValue("image", data.image);
            },
        }
    );

    const schema = yup.object().shape({
        title: yup.string().max(50).required("This field is required!"),
        category: yup.string().required("This field is required!"),
        image: yup
            .string()
            .required("This field is required!")
            .url("Must be a valid url")
            .test(
                "is-valid-imageUrl",
                "URL must be contain an image file",
                (value) => {
                    return isImgUrl(value);
                }
            ),
        price: yup.number().positive().required("This field is required!"),
    });

    function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    let image = watch("image");

    function onSubmitForm(data) {
        const payload = {
            title: data.title,
            price: data.price,
            image: data.image,
            category_id: data.category,
        };

        if (productId) {
            axios
                .put(`http://localhost:8080/product/${productId}`, payload)
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Product has been updated",
                        text: data.name,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate("/product");
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post("http://localhost:8080/product", payload)
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Product has been added",
                        text: data.name,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate("/product");
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <Layout activePage={3}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        {productId ? "Edit" : "Tambah"} Produk
                    </span>
                    <Link to={"/product"}>
                        <button className='btn-default text-xs m-0'>
                            Kembali
                        </button>
                    </Link>
                </div>
                <hr className='my-3 border-black' />
                {isLoadingCategory ? (
                    <div className='size-full flex justify-center items-center'>
                        <MoonLoader color='#111827' className=' ' />
                    </div>
                ) : (
                    <div className='mt-6 flex'>
                        <form
                            className='w-1/2 flex flex-col gap-6'
                            onSubmit={handleSubmit(onSubmitForm)}
                        >
                            <div>
                                <FormInput
                                    name='title'
                                    label='Nama Produk'
                                    register={register}
                                />
                                {errors.title && (
                                    <p className='text-sm text-red-500 p-2'>
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='category'
                                    className='text-sm font-medium leading-6 text-gray-900'
                                >
                                    Category
                                </label>
                                <div className='mt-2'>
                                    <select
                                        {...register("category")}
                                        id='category'
                                        name='category'
                                        className='w-full border-blue-700 border bg-gainsboro-50 rounded-xl py-2 px-4 text-sm font-mono focus:ring-2 focus:outline-none focus:ring-blue-300'
                                    >
                                        {categories?.map((option) => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className='text-sm text-red-500 p-2'>
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormInput
                                    name='image'
                                    label='URL Gambar'
                                    register={register}
                                />
                                {errors.image && (
                                    <p className='text-sm text-red-500 p-2'>
                                        {errors.image.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <FormInput
                                    name='price'
                                    label='Harga Satuan'
                                    register={register}
                                    type='number'
                                />
                                {errors.price && (
                                    <p className='text-sm text-red-500 p-2'>
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                            <button
                                className='btn-default w-1/2 rounded-xl mt-2'
                                type='submit'
                            >
                                Submit
                            </button>
                        </form>
                        <div className='w-1/2 flex justify-end  '>
                            {errors.image === undefined && image && (
                                <img
                                    className='border border-b rounded-xl size-64'
                                    src={image}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ProductFormPage;
