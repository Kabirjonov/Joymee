  import React, { useEffect, useState } from 'react';
  import { UncontrolledCarousel } from 'reactstrap';
  import { BsBookmark } from "react-icons/bs";
  import { BsBookmarkFill } from "react-icons/bs";
  import './style.css';
  import { useLanguage } from '../../changeLanguage/changer';
  import Skeleton from 'react-loading-skeleton';

  const Carousel = ({ house, id ,show}) => {
    const [checked, setChecked] = useState(false);
    const { setCart } = useLanguage();
    useEffect(() => {
      const storedIds = JSON.parse(localStorage.getItem('saveIds')) || [];
      if (storedIds.includes(id)) {
        setChecked(true);
      }
    }, [id, setCart]);

    useEffect(() => {
      const storedIds = JSON.parse(localStorage.getItem('saveIds')) || [];
      setCart(storedIds.length > 0);
      if (checked) {
        if (!storedIds.includes(id)) {
          const updatedIds = [...storedIds, id];
          localStorage.setItem('saveIds', JSON.stringify(updatedIds));
          setCart(true);
        }
      } else {
        if (storedIds.includes(id)) {
          const updatedIds = storedIds.filter(i => i !== id);
          localStorage.setItem('saveIds', JSON.stringify(updatedIds));
          setCart(updatedIds.length > 0);
        }
      }
    }, [checked, id]);

    if (!house) {
      return <div className='mt-5'><Skeleton height={100} /></div>;
    }

    const carouselItems = house.fileUrls.map((fileUrl, index) => ({
      src: fileUrl, 
      altText: `Slide ${index + 1}`,
      key: index + 1
    }));

    return (
      <div>
      {carouselItems.length > 0 ? (
        <UncontrolledCarousel
          items={carouselItems}
          className='position-relative caruselImages'
        />
      ) : (
        <div>No images available</div>
      )}
      {show && (
        <div className="CardSaveStyle" onClick={() => setChecked(!checked)}>
          {checked 
            ? <BsBookmarkFill className='text-light w-100 h-100' /> 
            : <BsBookmark className='text-light w-100 h-100' />}
        </div>
      )}
    </div>
    
    );
  };

  export default Carousel;
