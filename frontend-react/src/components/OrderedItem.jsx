import toRupiah from "../util/formatter";
import {
    removeItemFromOrder,
    setItemQuantity,
} from "../store/reducers/orderSlice";
import { useDispatch } from "react-redux";

function OrderedItem({ data }) {
    const dispatch = useDispatch();

    function handleDiscard() {
        dispatch(removeItemFromOrder(data));
    }

    function handleQuantity(val) {
        if (data.quantity === 1 && val === "minus") {
            dispatch(removeItemFromOrder(data));
        } else {
            const payload = {
                product: data,
                sign: val,
            };
            dispatch(setItemQuantity(payload));
        }
    }
    return (
        <div className='item-order'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4 hover:stroke-red-500 hover:cursor-pointer'
                        onClick={handleDiscard}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                        />
                    </svg>
                    <span className='font-poppins ml-4'>{data.title}</span>
                </div>
                <span className='font-couriernew font-semibold'>
                    {toRupiah(data.price)}
                </span>
            </div>
            <div className='quantity'>
                <div className='flex mt-2 justify-end items-center gap-2'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1}
                        stroke='currentColor'
                        className='w-5 h-5 hover:cursor-pointer'
                        onClick={() => handleQuantity("minus")}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                    </svg>
                    <span className='text-sm font-couriernew font-semibold'>
                        {data.quantity}
                    </span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1}
                        stroke='currentColor'
                        className='w-5 h-5 hover:cursor-pointer'
                        onClick={() => handleQuantity("plus")}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default OrderedItem;
