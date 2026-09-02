"use client";

interface StaticContactProps {
  image: string;
  title: string;
  description: string;
  secondtitle?: string;
  seconddescription?: string;
}

export default function StaticContent({ 
  image, 
  title, 
  description,
  secondtitle,
  seconddescription 
}: StaticContactProps) {
  return (
    <section className="w-full  px-4 md:px-5 lg:px-5 bg-white">
      <div className="w-full mx-auto flex flex-col lg:flex-row">
        <div className=" grid grid-cols-1 lg:grid-cols-2 items-center gap-36">
        
          <div className=" h-[250px] md:h-[400px]  shrink-0 lg:hidden flex justify-center" >
            <img
              src={image}
              alt={title}
              className="  h-full "
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg text-center md:text-start font-medium md:font-normal md:text-3xl  text-[#524F4B]">
              {title}
            </h3>
            <p className="mt-4 text-[#524F4B] text-sm md:text-lg text-center md:text-start leading-relaxed">
              {description}
            </p>
            {secondtitle && (
              <>
                <h3 className="sm:text-lg text-center md:text-start font-medium md:font-normal md:text-3xl  text-[#524F4B] mt-6">
                  {secondtitle}
                </h3>
                <p className="mt-4 text-[#524F4B] text-sm md:text-lg text-center md:text-start leading-relaxed">
                  {seconddescription}
                </p>
              </>
            )}
            </div>
            <div className="flex justify-center items-center">
            <div className="w-full h-full p-2 shrink-0 hidden lg:block">
            <img
              src={image}
              alt={title}
              className="object-cover w-full"
            />
          </div>
          </div> 
        </div>

      </div>
    </section>
  );
}
