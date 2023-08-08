import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { ProgressiveImage } from './ProgressiveImage';

describe('ProgressiveImage', () => {
    it('renders without errors', () => {
        render(<ProgressiveImage src="test.jpg" />);
    });

    it('loads image successfully', () => {
        const { getByAltText } = render(<ProgressiveImage src="test.jpg" alt="image loaded successfully" />);

        const image = getByAltText('image loaded successfully');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test.jpg');
    });

    it('renders placeholder image if src is not provided', () => {
        const { getByAltText } = render(<ProgressiveImage placeholderSrc="test.jpg" alt="placeholder image" />);
        const placeholderImage = getByAltText('placeholder image');
        expect(placeholderImage).toHaveAttribute('src', 'test.jpg');
    });
});
