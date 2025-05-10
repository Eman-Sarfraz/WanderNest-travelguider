import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getImages } from '../utils/api';
import { ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  countryName: string;
}

interface Image {
  id: string;
  url: string;
  alt: string;
  photographer: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ countryName }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const fetchedImages = await getImages(countryName, 6);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [countryName]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-64 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent mb-2"></div>
          <p className="text-gray-500">Loading images...</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 font-montserrat text-gray-800 flex items-center">
        <ImageIcon className="h-6 w-6 mr-2 text-cyan-600" /> Gallery
      </h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
      
      <p className="text-xs text-gray-500 mt-3 text-right">
        Photos provided by Pexels
      </p>
    </div>
  );
};

export default ImageGallery;