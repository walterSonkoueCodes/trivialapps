import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ServiceCarousel({ services }) {
    return (
        <Carousel showThumbs={false}>
            {services.map(service => (
                <div key={service.id}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </Carousel>
    );
}