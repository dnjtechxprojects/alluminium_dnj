import { getImageProps } from "next/image";

/**
 * Turns a stored image value into a src that next/image can optimize.
 *
 * Uploads are stored as bare filenames (older rows carry an "/uploads/"
 * prefix) and served by /api/image. Keeping the src relative lets the
 * optimizer fetch it in-process instead of going back out through nginx.
 * Legacy base64 data URLs and absolute URLs are passed through unchanged.
 */
export const getImageSrc = (image: string): string => {
  if (/^(data:|https?:)/.test(image)) return image;
  return `/api/image/${image.split("/").pop()}`;
};

/**
 * CSS background-image for a stored image, routed through the Next image
 * optimizer so cards get a resized WebP instead of the original upload.
 */
export const getBackgroundImage = (
  image: string | undefined,
  width: number,
): string | undefined => {
  if (!image) return undefined;

  const { props } = getImageProps({
    alt: "",
    src: getImageSrc(image),
    width,
    height: width,
  });

  return `url("${props.src}")`;
};
