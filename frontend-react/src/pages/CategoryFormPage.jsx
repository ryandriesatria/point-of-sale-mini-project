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

function CategoryFormPage() {
    const navigate = useNavigate();
    const { id: categoryId } = useParams();
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const { data: category, isLoading } = useSWR(
        categoryId
            ? `http://localhost:8080/category/product_count/${categoryId}`
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                setValue("name", data.name);
            },
        }
    );

    const schema = yup.object().shape({
        name: yup.string().max(15).required("This field is required!"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    function onSubmitForm(data) {
        const payload = {
            name: data.name,
        };

        if (categoryId) {
            axios
                .put(`http://localhost:8080/category/${categoryId}`, payload)
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Category has been updated",
                        text: data.name,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate("/category");
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post("http://localhost:8080/category", payload)
                .then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Category has been added",
                        text: data.name,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate("/category");
                })
                .catch((err) => console.log(err));
        }
    }
    return (
        <Layout activePage={4}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        {categoryId ? "Edit" : "Tambah"} Kategori
                    </span>
                    <Link to={"/category"}>
                        <button className='btn-default text-xs m-0'>
                            Kembali
                        </button>
                    </Link>
                </div>
                <hr className='my-3 border-black' />
                {isLoading ? (
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
                                    name='name'
                                    label='Nama Kategori'
                                    register={register}
                                />
                                {errors.name && (
                                    <p className='text-sm text-red-500 p-2'>
                                        {errors.name.message}
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
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default CategoryFormPage;
