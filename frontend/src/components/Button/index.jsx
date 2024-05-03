
export const Button = ({
    type='',
    className='',

})=>{

    return(
        <button type={type} className={` bg-primary hover:bg-primary-light focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 my-3 focus:outline-none text-white w-1/2  ${className}`}>Submit</button>
    );
}