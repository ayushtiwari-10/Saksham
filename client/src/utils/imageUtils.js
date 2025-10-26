const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http') || imagePath.startsWith('data:') || imagePath === '/placeholder.svg') {
    return imagePath;
  }
  return `${BACKEND_URL}${imagePath}`;
};

export const getImagePreview = (imagePath) => {
  return getFullImageUrl(imagePath);
};

export const getThumbnailUrl = (thumbnail, fallbackImage) => {
  let imageToUse = thumbnail;
  if (!thumbnail || thumbnail === "") {
    imageToUse = fallbackImage;
  }
  if (!imageToUse || imageToUse === "") {
    return "/placeholder.svg";
  }
  return getFullImageUrl(imageToUse);
};
