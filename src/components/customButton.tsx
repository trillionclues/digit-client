import Link from "next/link";

interface CustomButtonProps {
    text: string;
    href: string;
    icon: React.ReactElement;
    className: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const CustomButton: React.FC<CustomButtonProps> = ({text, href, icon, className, handleClick}) => {
    return (
        <button onClick={handleClick}>
         <Link href={href} className={className}>
            <span>{text}</span>
            {icon}
        </Link>
      </button>
    )
}


export default CustomButton