import * as React from "react";
import defaultImage from "@img//bg01.jpg";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props extends ImageProps {
  fallBackSrc?: string;
}

const ImageWithFallback: React.FC<Props> = (props) => {
  const { src, fallBackSrc = defaultImage, alt } = props;
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      {...props}
      alt={alt ? alt : "default image"}
      src={imageError || typeof src !== "string" ? fallBackSrc : src}
      onError={() => setImageError(true)}
      onLoadedData={() => setImageError(false)}
    />
  );
};

export default ImageWithFallback;
