import css from './App.module.css';
import { useEffect, useState } from 'react';
//npm install axios
import axios from 'axios';
// npm install --save react-modal
import Modal from 'react-modal';
//npm install react-hot-toast
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../image-api';

export default function App() {
  const [images, setImages] = useState([]);

  const handleSearch = async newQuery => {
    const data = await fetchImages(newQuery);
    setImages(data);
  };

  // useEffect(() => {
  //   async function getImages() {
  //     try {
  //       const data = await fetchImages();
  //       setImages(data);
  //     } catch (error) {
  //       console.error('Error fetching images:', error);
  //     }
  //   }
  //   getImages();
  // }, []);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}
