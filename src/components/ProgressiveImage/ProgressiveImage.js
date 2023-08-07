import React, { useRef, useState, useEffect, forwardRef, useMemo } from "react";

// SVG data URI for the default placeholder image
const defaultPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='-.6' x2='511' y1='-1' y2='511.4' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23f2f2f2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23a)' d='M0 0h512v512H0z'/%3E%3C/svg%3E";

const ProgressiveImage = forwardRef(({ placeholderSrc, src, alt = "", width = "auto", height = "auto", className = "", imgClassName = "", loading = "lazy", styles, ...restProps }, ref) => {
    // Create a reference for the image element
    const imgRef = useRef(null);

    // State to manage the image source and loading status
    const [imgSrc, setImgSrc] = useState(() => placeholderSrc ?? null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Styles for the loading and loaded states of the image
    const defaultStyles = useMemo(() => {
        return {
            // img (default styling)
            img: {
                width: "100%",
                maxWidth: "100%",
                height: "auto"
            },
            loading: {
                filter: "blur(5px)",
                clipPath: "inset(0)",
            },
            loaded: {
                filter: "blur(0px)",
                transition: "filter 0.5s ease-in-out",
            },
            // .progressive-image (default styling)
            wrapper: {
                position: "relative",
                overflow: "hidden",
            },
            // .progressive-image__error-message (default styling)
            error: {
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                textTransform: "uppercase",
                color: "gray",
                letterSpacing: "0.2em",
                textAlign: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "#f9f9f9",
            }
        };
    }, []);

    // Merge the default styles with the passed custom styles
    const mergedStyles = useMemo(() => {
        return {
            ...defaultStyles,
            ...styles,
        };
    }, [styles, defaultStyles]);

    // useEffect hook to handle image loading and error states
    useEffect(() => {
        // Check if both src and placeholderSrc are missing, set error state
        if (!src && !placeholderSrc) {
            setIsError(true);
            return;
        }

        // If the src and current image source are the same, image is already loaded or being loaded, return
        if (src === imgSrc) {
            return;
        }

        // Create a new Image instance and set its source to the provided src
        const img = imgRef.current;

        if (img) {
            img.src = src;
            img.onload = () => {
                // If the image loads successfully, update the image source and set loading to false
                setImgSrc(src);
                setIsLoading(false);
            };
            img.onerror = () => {
                // If there is an error loading the image, set error state
                setIsError(true);
            };
        }

    }, [src, imgSrc, placeholderSrc]);

    return (
        <div className={`progressive-image ${className}`} style={{ ...mergedStyles.wrapper, aspectRatio: width + "/" + height }} ref={ref} {...restProps}>

            {imgSrc ? (
                // If the image source is available, display the image with loading or loaded styles
                <img ref={imgRef} className={`progressive-image__img ${imgClassName}`} imgClassName src={imgSrc} alt={alt} style={isLoading ? { ...mergedStyles.loading, ...mergedStyles.img } : { ...mergedStyles.loaded, ...mergedStyles.img }} loading={loading} width={width} height={height} />
            ) : (
                // If the image source is not available, display the default placeholder image
                <img ref={imgRef} src={defaultPlaceholder} alt={alt} className={`progressive-image__img ${imgClassName}`} style={isLoading ? { ...mergedStyles.loading, ...mergedStyles.img } : { ...mergedStyles.loaded, ...mergedStyles.img }} loading={loading} width={width} height={height} />
            )}

            {isError && <div className="progressive-image__error-message" style={mergedStyles.error}><pre>Image failed to load.</pre></div>}

        </div>
    );
});

export default ProgressiveImage;