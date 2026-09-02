"use client";

// UI IMPORT
import { Button, ControlledInput } from "@/ui";
import Text from "@/ui/typography/Text";

// THIRD-PARTY IMPORT
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TITLE } from "@/lib/constant";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { onLogin, isLoading } = useAuth();
  const router = useRouter();

  const schema = yup.object({
    email: yup.string().required("Please enter a email"),
    password: yup.string().required("Please enter a password"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <div
  className="flex items-center justify-center h-full bg-center bg-cover bg-no-repeat px-6"
  style={{ backgroundImage: "url('/images/loginbg.png')" }}
>

        <div className="bg-white shadow-xl rounded-3xl! px-8 py-10 flex flex-col gap-6 max-w-[400px] w-full border-2  border-[#efefef]">
          <div className="flex flex-col items-center">
            <Text
              Tag="h1"
              className="text-xl font-medium  text-black "
            >
          Log in to Natraj  {TITLE} 
            </Text>
            {/* <p className="text-sm text-gray-500 mt-1">Sign in to continue</p> */}
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onLogin)}
          >
            <ControlledInput
              name="email"
              type="email"
              placeholder="Enter your email"
              control={control}
              errors={errors}
              
            />
            <ControlledInput
              name="password"
              variant="Password"
              type="password"
              placeholder="Enter your password"
              control={control}
              errors={errors}
              
            />
            <Button
              isLoading={isLoading}
             
              type="submit"
              className="w-full h-[50px] text-white bg-[#212121] rounded-2xl"
            >
              Continue 
            </Button>
          </form>
          </div>
      </div>
    </>
  );
};

export default LoginForm;
