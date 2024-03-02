import css from './App.module.css';
import { useEffect, useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../image-api';
import Loader from '../Loader/Loader';
//npm install react-hot-toast
import { Toaster, useToaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToaster();
  const [selectedImage, setSelectedImage] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    //пропустити монтування за умовою
    if (searchQuery === '') {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(searchQuery, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchQuery, page]);

  //ф-ція submit форми
  const handleSearch = newQuery => {
    //початкові стани при новому сабміті
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsLoading(true);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <Toaster />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {modal && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          imageUrl={selectedImage?.largeImageURL}
          imageAlt={selectedImage?.tags}
          closeModal={closeModal}
          content={modalContent}
        />
      )}
    </div>
  );
}
