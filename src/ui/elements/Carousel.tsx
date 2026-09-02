"use client";
import React, { useEffect } from "react";

// UI IMPORT
import Image, { ImageProps } from "./Image";

// THIRD - PARTY IMPORT
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

interface CarouselProps {
    images: ImageProps[];
    className?: typeof clsx;
}
const Carousel = (props: CarouselProps) => {
    const { images = [] } = props;
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 2000 }),
    ]);

    return (
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
            <ul className="flex gap-5">
                {images?.map((image, index) => {
                    const { className, ...rest } = image;
                    return (
                        <li className={clsx("relative w-full flex-none min-w-0 rounded-md",images?.length - 1 === index && "mr-5")} >
                            <Image
                                className={clsx(
                                    "transition-all ease-in-out hover:scale-105 flex-none min-w-0 w-full object-cover rounded-md",
                                    className
                                )}
                                {...rest}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Carousel;
