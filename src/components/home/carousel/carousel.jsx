import React, { useEffect, useState } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import './style.css';
import {useLanguage} from '../../changeLanguage/changer'
import Skeleton from 'react-loading-skeleton';

const Carousel = ({ house, id }) => {
  const [checked, setChecked] = useState(false);
  const {setCart}=useLanguage()

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('saveIds')) || [];
    
    if (storedIds.includes(id)) {
      setChecked(true);
    }
  }, [id,setCart]);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('saveIds')) || [];
    setCart(storedIds.length>0)
    if (checked) {
      if (!storedIds.includes(id)) {
        const updatedIds = [...storedIds, id];
        localStorage.setItem('saveIds', JSON.stringify(updatedIds));
        setCart(true)
      }
    } else {
      if (storedIds.includes(id)) {
        const updatedIds = storedIds.filter(i => i !== id);
        localStorage.setItem('saveIds', JSON.stringify(updatedIds));
        setCart(updatedIds.length>0)
      }
    }
  }, [checked, id]);

  if (!house) {
    return <div className='mt-5'><Skeleton height={100} /></div>;
  }
  return (
    <>
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 1',
            key: 1,
            src: 'http://localhost:3001/images/1735679129518-icon512.png'
          },
          {
            altText: 'Slide 2',
            key: 2,
            src: 'http://localhost:3001/images/1735679129519-pp_wide.png'
          },
          {
            altText: 'Slide 3',
            key: 3,
            src: 'https://picsum.photos/id/678/1200/600'
          }
        ]}
  //       items={house.fileUrls.map((item,id) => ({
  //         altText: `Slide ${id+1}`,
  //         key: id,
  //         src: item
  //  }))}
        className='position-relative'
      />
      <div className="CardSaveStyle" onClick={() => setChecked(!checked)}>
        {checked 
          ? <BsBookmarkFill className='text-light w-100 h-100' /> 
          : <BsBookmark className='text-light w-100 h-100' />}
      </div>
    </>
  );
};

export default Carousel;
