import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.galleryContainer}>
      {images.map(image => (
        <li className={css.galleryItem} key={image.id}>
          <ImageCard src={image.urls.small} alt={image.slug} />
        </li>
      ))}
    </ul>
  );
}
