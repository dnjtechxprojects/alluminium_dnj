"use client";

import { useForm } from "react-hook-form";
import SectionHeader from "@/components/common/SectionHeader";

type FormValues = {
  name: string;
  company: string;
  task: string;
  phone: string;
  email: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    reset(); 
  };

  return (
    <div>
      <SectionHeader title="Contact Us" maintitle="connect"/>
    <section className="w-full py-16 px-4 md:px-12 lg:px-20 bg-white">
      

      <div className="flex justify-center mb-10">
        <span className="inline-block px-2   py-1  text-[#F39E00]  text-md lg:text-2xl xl:text-2xl normal-case tracking-widest md:tracking-normal">
          Contact Infor
        </span>
      </div>

      <div className="text-center mt-6">
        <div className="lg:flex lg:flex-row lg:items-end lg:justify-center lg:gap-4">
          <p className="text-md md:text-lg text-[#4a5565]">E-mail</p>
          <p className="text-xl lg:text-5xl md:text-3xl tracking-wide text-[#101828]">
           info@natrajaluform.com

          </p>
        </div>

        <div className="lg:flex lg:flex-row lg:items-end lg:justify-center lg:gap-4 mt-5">
          <p className="text-md md:text-lg text-[#4a5565]">Phone No.</p>
          <p className="text-xl lg:text-5xl md:text-3xl tracking-wide text-[#101828]">
            +91 96388 11159
          </p>
        </div>
      </div>

      <div className="w-full border-b border-gray-300 mt-12 mb-10"></div>

      <div className="flex justify-center mb-10">
        <span className="inline-block px-2 py-1 text-[#F39E00]  text-md lg:text-2xl xl:text-2xl normal-case tracking-widest md:tracking-normal">
          Your Contact Info
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4"
      >
        
        <div className="bg-[#f4f4f4] rounded-2xl p-6">
          <label className="font-medium text-lg text-black">Name</label>
          <input
            type="text"
            placeholder="What should we call you?"
            className="mt-2 w-full bg-transparent outline-none text-gray-600"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">Name is required</p>
          )}
        </div>

        <div className="bg-[#f4f4f4] rounded-2xl p-6">
          <label className="font-medium text-lg text-black">Company</label>
          <input
            type="text"
            placeholder="Your company name"
            className="mt-2 w-full bg-transparent outline-none text-gray-600"
            {...register("company", { required: true })}
          />
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">Company is required</p>
          )}
        </div>

        <div className="bg-[#f4f4f4] rounded-2xl p-6 md:row-span-2">
          <label className="font-medium text-lg text-black">
            Describe Your task
          </label>
          <textarea
            placeholder="How can we help you?"
            rows={6}
            className="mt-2 w-full bg-transparent outline-none text-gray-600 resize-none"
            {...register("task", { required: true })}
          />
          {errors.task && (
            <p className="text-sm text-red-500 mt-1">
              Task description is required
            </p>
          )}
        </div>

        <div className="bg-[#f4f4f4] rounded-2xl p-6">
          <label className="font-medium text-lg text-black">Phone</label>
          <input
            type="text"
            placeholder="Your contact number"
            className="mt-2 w-full bg-transparent outline-none text-gray-600"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">Phone is required</p>
          )}
        </div>

        <div className="bg-[#f4f4f4] rounded-2xl p-6">
          <label className="font-medium text-lg text-black">Email</label>
          <input
            type="email"
            placeholder="Your email address"
            className="mt-2 w-full bg-transparent outline-none text-gray-600"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">Email is required</p>
          )}
        </div>

        <div className="md:col-span-3 flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#101828] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-95 transition hover:cursor-pointer"
          >
            Submit request →
          </button>
        </div>
      </form>
    </section>
    </div>
  );
};
export default ContactUs;
