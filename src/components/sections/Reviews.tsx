import { business } from '../../data/business';
import { reviews } from '../../data/reviews';
import { Button } from '../ui/Button';
import { PlaceholderTag } from '../ui/Placeholder';
import { SectionHeading } from '../ui/SectionHeading';

export const Reviews = () => (
  <section id="resenas" aria-labelledby="resenas-title" className="py-20 md:py-32">
    <div className="container-wb">
      <SectionHeading id="resenas-title" index="06" eyebrow="Reseñas" title="Lo que dicen los clientes" />
      {reviews.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-card border border-line bg-surface p-6" data-reveal>
              <blockquote className="text-lg">“{review.text}”</blockquote>
              <p className="mt-4 text-sm font-bold text-muted">{review.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-5 rounded-card border border-dashed border-line p-6 md:flex-row md:items-center md:justify-between md:p-8" data-reveal>
          <div className="grid gap-3">
            <PlaceholderTag>Reseñas reales con permiso del cliente</PlaceholderTag>
            <p className="max-w-lg text-muted">Mientras tanto, las reseñas de los clientes están en el destacado “Reviews” de nuestro Instagram.</p>
          </div>
          <Button href={business.instagram.reviewsHighlightUrl} icon="instagram" tone="ghost" external>
            Ver reseñas en Instagram
          </Button>
        </div>
      )}
    </div>
  </section>
);
