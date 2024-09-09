import { ImageList, ImageListItem } from '@mui/material';

const srcset = (image, size, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export const ImageGallery = ({ images = [] }) => {
    return (
        <ImageList
            sx={{ borderRadius: 2, width: '100%', height: 500 }}
            variant="masonry"
            cols={4}
            rowHeight={200}
        >
            {images.map((image) => (
                <ImageListItem key={image}>
                    <img
                        {...srcset(image, 120, image.rows, image.cols)}
                        alt='image'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
