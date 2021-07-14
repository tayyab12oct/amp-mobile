import Image from 'next/image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
interface ImageProps {
  src: string;
  alt?: string;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | undefined;
  width?: number | string;
  height?: number | string;
  className?: string;
  onLoad?: () => void;
  onClick?: (e) => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onMouseLeave?: () => void;
  style?: object;
}

const ImageComponent = ({
  src,
  alt,
  layout,
  width,
  height,
  className,
  onLoad,
  onClick,
  onMouseOver,
  onMouseOut,
  onMouseLeave,
  style,
}: ImageProps) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      //   layout={layout ? layout : "responsive"}
      width={width ? width : 'auto'}
      height={height ? height : 'auto'}
      className={className ? className : ''}
      onLoad={onLoad}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseLeave={onMouseLeave}
      style={style}
    />
  );
};

export default ImageComponent;
