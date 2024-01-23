import { FC } from 'react';
import { ButtonTypes } from './button.type';

const ChapButton: FC<ButtonTypes> = ({ children, type, variant, size, ...props }) => {
    const variantCSS = {
        cheese: 'bg-primary-cheese shadow-dropCheese hover:shadow-innerCheese focus:shadow-innerCheese',
        peanut: 'bg-primary-peanut shadow-dropPeanut hover:shadow-innerPeanut focus:shadow-innerPeanut',
        noResults: 'bg-primary-peanut hover:bg-primary-cheese text-primary-cheese hover:text-primary-peanut',
    };
    const sizeCSS = {
        circle: 'w-20 h-20 rounded-full',
        rounded: 'w-[274px] h-[80px] rounded-[29px] text-[28px]',
        square: 'w-[238px] h-[60px] rounded-[8px] text-[14px] ',
    };

    return (
        <button
            type={type}
            {...props}
            className={`${variantCSS[variant]} ${sizeCSS[size]} transition duration-500 ease-in-out`}
        >
            {children}
        </button>
    );
};
export default ChapButton;