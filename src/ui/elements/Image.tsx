import React from "react";
import I, { ImageProps as IProps } from "next/image";

export interface ImageProps extends IProps { }

const Image = (props: ImageProps) => {
    const { ...rest } = props;
    return <I {...rest} />;
};

export default Image;
