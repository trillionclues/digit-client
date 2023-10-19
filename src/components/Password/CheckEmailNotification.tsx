import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";

type userEmailProps = {
  userEmail: string;
};

const CheckEmailNotification: React.FC<userEmailProps> = ({ userEmail }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <div className="w-full max-w-sm md:max-w-md mt-4 bg-white rounded px-6 pt-3 pb-8 mb-4 shadow-md flex flex-col items-center justify-center">
        <Image
          src="/images/email.jpg"
          width={150}
          height={100}
          layout="responsive"
          className="mb-4 object-cover"
          alt="Email Icon"
        />
        <button
          type="submit"
          className="bg-[#072F5F] cursor-pointer hover:bg-teal text-white text-sm font-bold py-3 mt-5 w-full px-4 rounded-full focus:outline-none"
        >
          <Link
            href={`mailto:${userEmail}`}
            className="flex flex-row justify-center items-center gap-2"
          >
            Check Your Email{" "}
            <FiArrowRight className="font-medium text-lg inline-block ml-1" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CheckEmailNotification;
