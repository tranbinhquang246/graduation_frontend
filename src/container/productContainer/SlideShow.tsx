import React from "react";
import ImageGallery from "react-image-gallery";

function SlideShow(props: { data: any }) {
  const images: any = [];
  props?.data.map((element: string) => {
    images.push({
      original: element,
      thumbnail: element,
    });
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ImageGallery items={images} showNav={false} showPlayButton={false} />
    </div>
  );
}

export default SlideShow;
