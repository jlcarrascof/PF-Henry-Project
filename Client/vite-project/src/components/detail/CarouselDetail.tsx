import React from 'react';
import { Carousel, Image } from 'antd';

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <Carousel >
      {images.map((image, index) => (
        <div key={index}>
          <Image src={image} alt={`Image ${index + 1}`} width={400} height={200}/>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
