# react-werkzeug

react-werkzeug is a comprehensive React component library designed to provide developers with a set of powerful and easy-to-use components that enhance user experiences and performance in web applications. The package currently includes a ProgressiveImage component, with plans to expand and add more useful components in the future.

### Installation

```bash
npm i react-werkzeug
```

## Progressive Image Component

The `ProgressiveImage` component is a React component that provides a smooth transition when loading images. It displays a placeholder image first and then replaces it with the actual image once it's loaded. Additionally, it handles error cases and displays an error message when the image fails to load.

### Import components

```bash
import { ProgressiveImage } from "react-werkzeug";
```

### Example Usage

Here's an example of how to use the `ProgressiveImage` component:

```jsx
import { ProgressiveImage } from "react-werkzeug";

const App = () => {
  return (
    <div>
      {/* Example with custom placeholder image */}
      <ProgressiveImage
        src="https://example.com/large-image.jpg"
        placeholderSrc="https://example.com/placeholder.jpg"
        alt="Large Image"
        width="800"
        height="600"
        className="custom-image"
      />

      {/* Example with default placeholder image */}
      <ProgressiveImage
        src="https://example.com/another-image.jpg"
        alt="Another Image"
        width="400"
        height="300"
      />
    </div>
  );
};

export default App;
```

In this example, we import the `ProgressiveImage` component and use it twice in the `App` component. The first instance uses a custom placeholder image, while the second instance uses the default placeholder image. The `width` and `height` props define the aspect ratio of the image, and the `className` prop allows us to apply additional CSS classes to the container div. The `alt` prop provides alternative text for the images, which is essential for accessibility.

### Props

The `ProgressiveImage` component accepts the following props:

- `placeholderSrc`: (Optional) The URL of the placeholder image to be displayed while the actual image is loading. If not provided, a default placeholder image will be used.
- `src`: The URL of the actual image to be loaded and displayed.
- `alt`: (Optional) The alternative text for the image, used for accessibility purposes.
- `width`: (Optional) The width of the image in pixels or any valid CSS width value. Default is `"auto"`.
- `height`: (Optional) The height of the image in pixels or any valid CSS height value. Default is `"auto"`.
- `className`: (Optional) Additional CSS class name(s) to be applied to the container div.
- `imgClassName`: (Optional) Additional CSS class name(s) to be applied to the img element.
- `...restProps`: (Optional) Any other props you want to pass to the underlying `div` element.

### useRef

`ProgressiveImage` uses `forwardRef` to forward your refs

## How to Customize Styling

The `ProgressiveImage` component offers a straightforward way to customize its styling by utilizing the `styles` prop. This prop allows you to override the default styling by providing your own style definitions.

### Default Styles Object (defaultStyles)

Here's the `defaultStyles` object that you can reference to customize different parts of the `ProgressiveImage` component:

```jsx
defaultStyles: {
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
}
```

#### Example

Here's an example of how to change the styling of the `ProgressiveImage` component:

```jsx
      <ProgressiveImage
        src="https://example.com/large-image.jpg"
        placeholderSrc="https://example.com/placeholder.jpg"
        alt="Large Image"
        width="800"
        height="600"
        className="custom-image"
        styles={{ 
          img: { borderRadius: "50%" },
          loading: { filter: "blur(20px)" },
          loaded: { transition: "filter 0.3s ease"},
          wrapper: { backgroundColor: "#123456"},
          error: { backgroundColor: "#654321"},
          }}
      />
```

## Known Bugs

### Transitioning the Image Itself

If you attempt to transition the `<img>` element itself, you may encounter some issues. This is because the loaded state includes a `transition: "filter 0.5s ease-in-out"` property. Applying your own transition can lead to unexpected behavior.

#### Workaround

One possible workaround is to use the `!important` declaration to override the existing transition.

## Changelog for Version 1.0.8

- Added BEM (Block Element Modifier) methodology for classNames to enhance maintainability and readability of CSS classes.
- Added support for a `style` object prop, allowing developers to customize various visual aspects of the `ProgressiveImage` component using inline styles.
- Introduced the `imgClassName` prop, which allows users to apply additional CSS class names specifically to the `<img>` element for more targeted styling.
- Added the ability to set the `loading` attribute of the `<img>` element using the `loading` prop. This enables the use of the `"lazy"` loading attribute, which defers loading of the image until it enters the viewport, enhancing performance.
- Default `width` and `height` props have been removed, and they now default to `"auto"`. This provides more flexibility when using the `ProgressiveImage` component within various layout contexts.

Developers can take advantage of these new features and improvements to further enhance the usability, performance, and styling capabilities of the `ProgressiveImage` component in their React applications.

As always, feedback and contributions are welcome as we continue to refine and expand the `react-werkzeug` library. Thank you for your support!