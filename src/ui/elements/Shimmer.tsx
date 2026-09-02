import React from "react";

interface ShimmerProps {
    className?: string;
}
const Shimmer = (props: ShimmerProps) => {
    const { className = "" } = props;
    return (
        <div className={`${className} animate-pulse duration-150 bg-gray-300 border`}></div>
    );
};

export default Shimmer;
