import React, { useRef, useState, useEffect, forwardRef, useMemo, Ref } from 'react';

export interface IProgressiveImage extends React.HTMLProps<HTMLDivElement> {
    placeholderSrc?: string;
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    imgClassName?: string;
    loading?: 'lazy' | 'eager';
    styles?: {
        img?: React.CSSProperties;
        loading?: React.CSSProperties;
        loaded?: React.CSSProperties;
        wrapper?: React.CSSProperties;
        error?: React.CSSProperties;
    };
}

const defaultPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='-.6' x2='511' y1='-1' y2='511.4' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23f2f2f2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' d='M0 0h512v512H0z'/%3E%3C/svg%3E";

export const ProgressiveImage = forwardRef<HTMLDivElement, IProgressiveImage>(
    ({ placeholderSrc, src, alt = '', width = 'auto', height = 'auto', className = '', imgClassName = '', loading = 'lazy', styles = {}, ...props }, ref: Ref<HTMLDivElement>) => {
        const imgRef = useRef<HTMLImageElement | null>(null);

        const [imgSrc, setImgSrc] = useState<string | null>(() => placeholderSrc || defaultPlaceholder);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [isError, setIsError] = useState<boolean>(false);

        const defaultStyles = useMemo(
            () => ({
                img: {
                    width: '100%',
                    maxWidth: '100%',
                    height: 'auto'
                },
                loading: {
                    filter: 'blur(5px)',
                    clipPath: 'inset(0)'
                },
                loaded: {
                    filter: 'blur(0px)',
                    transition: 'filter 0.5s ease-in-out'
                },
                wrapper: {
                    position: 'relative' as React.CSSProperties['position'],
                    overflow: 'hidden'
                },
                error: {
                    position: 'absolute' as React.CSSProperties['position'],
                    inset: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1rem',
                    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
                    color: 'gray',
                    letterSpacing: '0.2em',
                    textAlign: 'center' as React.CSSProperties['textAlign'],
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f9f9f9'
                }
            }),
            []
        );

        const mergedStyles = useMemo(
            () => ({
                ...defaultStyles,
                ...styles
            }),
            [styles, defaultStyles]
        );

        useEffect(() => {
            if (!src) {
                setIsError(true);
                return;
            }

            if (src === imgSrc) {
                return;
            }

            const img = imgRef.current;

            if (img) {
                img.src = src;
                img.onload = () => {
                    setImgSrc(src);
                    setIsLoading(false);
                };
                img.onerror = () => {
                    setIsError(true);
                };
            }
        }, [src, imgSrc]);

        return (
            <div className={`progressive-image ${className}`} role="img" style={{ ...mergedStyles.wrapper, aspectRatio: `${width}/${height}` }} ref={ref} {...props}>
                <img
                    ref={imgRef}
                    className={`progressive-image__img ${imgClassName}`}
                    src={imgSrc}
                    alt={alt}
                    style={isLoading ? { ...mergedStyles.loading, ...mergedStyles.img } : { ...mergedStyles.loaded, ...mergedStyles.img }}
                    loading={loading}
                    width={width}
                    height={height}
                />

                {isError && (
                    <div className="progressive-image__error-message" style={mergedStyles.error}>
                        <pre>Image failed to load.</pre>
                    </div>
                )}
            </div>
        );
    }
);
