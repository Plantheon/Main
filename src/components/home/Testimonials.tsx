import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Yoga Instructor",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    content: "Urban Oasis has transformed how I conduct my yoga sessions. The wellness garden provides the perfect atmosphere for my clients to connect with nature while practicing mindfulness.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Executive",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    content: "I hosted my team's quarterly meeting in one of the social gardens. The change of environment boosted creativity, and the rooftop views were stunning. Will definitely book again!",
    rating: 5,
  },
  {
    id: 3,
    name: "Alicia Rodriguez",
    role: "Dog Owner",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    content: "Finding pet-friendly outdoor spaces in the city was always a challenge until I discovered Urban Oasis. Now my dog Max and I have our weekly green space routine!",
    rating: 4,
  },
  {
    id: 4,
    name: "David Williams",
    role: "Freelance Writer",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    content: "As someone who works from home, having access to these garden spaces has been incredible for my mental health. I book a 2-hour session whenever I need to reset and find inspiration.",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="section bg-primary-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">What Our Members Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hear from the urban gardeners who have transformed their city living experience
            with our rooftop retreats.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-3 pb-6">
                <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-accent-500">
                        {i < testimonial.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 italic flex-grow">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;