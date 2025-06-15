import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../Hero';

// Define the props type for the mocked Image component
interface MockImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    className?: string;
    sizes?: string;
    quality?: number;
    [key: string]: unknown;
}

// Mock the next/image component
jest.mock('next/image', () => ({
    __esModule: true,
    // Use a more specific type instead of any
    default: (props: MockImageProps) => {
        // Convert boolean attributes to strings for HTML compatibility
        const { alt, ...restProps } = props;
        const htmlProps = {
            ...restProps,
            fill: props.fill ? "true" : undefined,
            priority: props.priority ? "true" : undefined,
        };
        // eslint-disable-next-line @next/next/no-img-element -- This is a test mock
        return <img alt={alt || ""} {...htmlProps} />;
    },
}));

// Mock the Container component
jest.mock('@/app/components/Container', () => ({
    Container: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="container">{children}</div>
    ),
}));

describe('Hero Component', () => {
    const defaultProps = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        imageSrc: '/test-image.jpg',
        imageAlt: 'Test Image',
    };

    it('renders the hero component with all props', () => {
        render(<Hero {...defaultProps} />);

        // Check if title is rendered
        expect(screen.getByText('Test Title')).toBeInTheDocument();

        // Check if subtitle is rendered
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();

        // Check if description is rendered
        expect(screen.getByText('Test Description')).toBeInTheDocument();

        // Check if image is rendered with correct alt text
        const image = screen.getByAltText('Test Image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/test-image.webp');
    });

    it('renders without subtitle and description', () => {
        const { title, imageSrc, imageAlt } = defaultProps;
        render(<Hero title={title} imageSrc={imageSrc} imageAlt={imageAlt} />);

        // Check if title is rendered
        expect(screen.getByText('Test Title')).toBeInTheDocument();

        // Check if subtitle is not rendered
        expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();

        // Check if description is not rendered
        expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
    });

    it('has the correct accessibility attributes', () => {
        render(<Hero {...defaultProps} />);

        // Check if banner role is applied
        const banner = screen.getByRole('banner');
        expect(banner).toBeInTheDocument();

        // Check if aria-labelledby is correctly set
        expect(banner).toHaveAttribute('aria-labelledby', 'hero-title');

        // Check if the title has the correct ID
        const title = screen.getByText('Test Title');
        expect(title).toHaveAttribute('id', 'hero-title');
    });
});
