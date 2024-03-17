import toRupiah from "../util/formatter";
import { useDispatch } from "react-redux";
import { addItemToOrder } from "../store/reducers/orderSlice";

function ProductCard({ data }) {
    const dispatch = useDispatch();

    function handleAddItem() {
        const payload = {
            product_id: data.id,
            title: data.title,
            quantity: 1,
            price: data.price,
        };
        dispatch(addItemToOrder(payload));
    }

    return (
        <div
            onClick={handleAddItem}
            className='card border border-gray-200 w-44 h-60 rounded-xl flex flex-col justify-between items-center p-4 font-poppins text-sm hover:bg-slate-100 hover:cursor-pointer active:scale-125 transition-all duration-1000 ease-out'
        >
            <img className='w-32 rounded-lg' src={data.image} alt='' />
            <span className='mt-2 text-center'>{data.title}</span>
            <span className='font-couriernew font-semibold'>
                {toRupiah(data.price)}
            </span>
        </div>
    );
}

export default ProductCard;
