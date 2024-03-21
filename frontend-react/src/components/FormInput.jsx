function FormInput({ name, label, type = "text", register }) {
    return (
        <>
            <label
                htmlFor={name}
                className='text-sm font-medium leading-6 text-gray-900'
            >
                {label}
            </label>
            <div className='mt-2'>
                <input
                    {...register(name)}
                    id={name}
                    name={name}
                    type={type}
                    className='w-full border-blue-700 border bg-gainsboro-50 rounded-xl py-2 px-4 text-sm font-mono focus:ring-2 focus:outline-none focus:ring-blue-300'
                />
            </div>
        </>
    );
}

export default FormInput;
