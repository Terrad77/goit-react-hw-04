import css from './ImageCard.module.css';

export default function ImageCard({ src, alt }) {
  return (
    <div className={css.cardBox}>
      <img src={src} alt={alt} />
    </div>
  );
}
