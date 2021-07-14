import Image from 'next/image';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

  interface ImageProps {
    src?: string;
    alt?: string;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | undefined;
    width?: string;
    height?: string;
    maxWidth?: string;
    minWidth?: string;
    className?: string;
    wrapperClassName?: string;
    onLoad?: () => void;
    onClick?: (e) => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    onMouseLeave?: () => void;
    style?: object;
  }
 type widths = {
 width?: string,
 maxWidth?: string
 }
 
const NextImageComponent = ({
  src,
  alt,
  layout,
  width,
  height,
  maxWidth,
  className,
  wrapperClassName,
  minWidth,
  onLoad,
  onClick,
  onMouseOver,
  onMouseOut,
  onMouseLeave,
  style
}: ImageProps) => {
  const myLoader:(src) => string = ({src}) => { return `${src}`} 
  const widths:widths = {'width':"100%", 'maxWidth':"100%"}
  if(width) widths['width'] = width;
  if(maxWidth) widths['maxWidth'] = maxWidth ;
  const classes = useStyles();
  
  return (
    <div 
    style={{ width:widths.width, maxWidth:widths.maxWidth }} 
    className={`${classes.container} ${wrapperClassName ? wrapperClassName : ''}`} 
    onLoad={onLoad}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onMouseLeave={onMouseLeave}> 
    <Image
      loader = {myLoader}
      layout="fill"
      src={src}
      alt={alt}
      className={`${classes.image} ${className ? className : ''}`}
    />
    </div>
  );
};

export default NextImageComponent;

const useStyles = makeStyles((theme: Theme) => ({
  container:{
    position: "relative",
   '& div':{
     position: "unset !important"
   }
  },
  image:{
    objectFit: "contain",
    width: "100%",
    position: "relative",
  }
}))

