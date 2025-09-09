# Tailwind CSS Cheatsheet for React

This cheatsheet provides a quick reference for using Tailwind CSS in React projects, with examples of common utility classes and patterns for JSX components. It assumes you're using Tailwind CSS with a CDN or installed via npm in a React app.

## Setup in React
To use Tailwind CSS in a React project, include it via CDN or install it:

### Using CDN (for quick prototyping)
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Using npm (recommended for production)
1. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss
   npx tailwindcss init
   ```
2. Configure `tailwind.config.js`:
   ```js
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: { extend: {} },
     plugins: [],
   }
   ```
3. Add to `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Import in `src/index.js` or `src/App.js`:
   ```js
   import './index.css';
   ```

## Common Utility Classes for React Components

### Layout
- **Flexbox**:
  - `flex`: Enable flexbox (`display: flex`)
  - `flex-row`, `flex-col`: Set flex direction
  - `justify-center`, `justify-between`, `justify-around`: Align items on main axis
  - `items-center`, `items-start`, `items-end`: Align items on cross axis
  - `gap-4`: Set gap between flex items (e.g., `gap: 1rem`)
  - Example:
    ```jsx
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Item 1</div>
      <div>Item 2</div>
    </div>
    ```

- **Grid**:
  - `grid`: Enable CSS grid (`display: grid`)
  - `grid-cols-2`, `grid-cols-3`: Define number of columns
  - `gap-4`: Set gap between grid items
  - Example:
    ```jsx
    <div className="grid grid-cols-3 gap-4">
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </div>
    ```

- **Positioning**:
  - `relative`, `absolute`, `fixed`, `sticky`: Set position
  - `top-0`, `right-0`, `bottom-0`, `left-0`: Position offsets
  - Example:
    ```jsx
    <div className="relative">
      <div className="absolute top-0 right-0">Corner Element</div>
    </div>
    ```

### Spacing
- **Margin**:
  - `m-4`: Margin all sides (e.g., `margin: 1rem`)
  - `mx-4`: Margin horizontal (`margin-left`, `margin-right`)
  - `my-4`: Margin vertical (`margin-top`, `margin-bottom`)
  - `mt-4`, `mr-4`, `mb-4`, `ml-4`: Margin specific side
  - Example:
    ```jsx
    <div className="m-4">With Margin</div>
    ```

- **Padding**:
  - `p-4`: Padding all sides
  - `px-4`, `py-4`: Padding horizontal or vertical
  - `pt-4`, `pr-4`, `pb-4`, `pl-4`: Padding specific side
  - Example:
    ```jsx
    <div className="p-4">With Padding</div>
    ```

### Typography
- **Font Size**:
  - `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` (up to `text-9xl`)
  - Example:
    ```jsx
    <h1 className="text-3xl">Large Heading</h1>
    ```

- **Font Weight**:
  - `font-thin`, `font-normal`, `font-bold`, `font-extrabold`
  - Example:
    ```jsx
    <p className="font-bold">Bold Text</p>
    ```

- **Text Alignment**:
  - `text-left`, `text-center`, `text-right`
  - Example:
    ```jsx
    <p className="text-center">Centered Text</p>
    ```

- **Text Color**:
  - `text-gray-500`, `text-blue-600`, `text-red-700`
  - Example:
    ```jsx
    <span className="text-blue-600">Blue Text</span>
    ```

### Colors
- **Background Color**:
  - `bg-gray-100`, `bg-blue-500`, `bg-green-600`
  - Example:
    ```jsx
    <div className="bg-gray-100 p-4">Gray Background</div>
    ```

- **Border Color**:
  - `border-gray-300`, `border-blue-500`
  - Example:
    ```jsx
    <div className="border border-gray-300 p-4">With Border</div>
    ```

### Sizing
- **Width**:
  - `w-full`, `w-1/2`, `w-64` (fixed width in rem), `w-screen`
  - Example:
    ```jsx
    <div className="w-full">Full Width</div>
    ```

- **Height**:
  - `h-full`, `h-1/2`, `h-64`, `h-screen`
  - Example:
    ```jsx
    <div className="h-32 bg-blue-500">Fixed Height</div>
    ```

### Borders
- **Border Width**:
  - `border`, `border-2`, `border-4`
  - Example:
    ```jsx
    <div className="border-2 border-gray-500">Thick Border</div>
    ```

- **Border Radius**:
  - `rounded`, `rounded-md`, `rounded-lg`, `rounded-full`
  - Example:
    ```jsx
    <button className="rounded-full bg-blue-500 p-2">Rounded Button</button>
    ```

### Interactivity
- **Hover Effects**:
  - `hover:bg-blue-700`, `hover:text-white`
  - Example:
    ```jsx
    <button className="bg-blue-500 text-white hover:bg-blue-700 p-2">
      Hover Me
    </button>
    ```

- **Focus Effects**:
  - `focus:ring-2`, `focus:ring-blue-500`
  - Example:
    ```jsx
    <input className="border focus:ring-2 focus:ring-blue-500 p-2" />
    ```

- **Cursor**:
  - `cursor-pointer`, `cursor-not-allowed`
  - Example:
    ```jsx
    <div className="cursor-pointer">Clickable</div>
    ```

### Responsive Design
- Use prefixes like `sm:`, `md:`, `lg:`, `xl:` for breakpoints
- Example:
  ```jsx
  <div className="text-base md:text-lg lg:text-xl">
    Responsive Text
  </div>
  ```

### Example React Component
```jsx
function Card() {
  return (
    <div className="max-w-sm rounded-lg shadow-lg p-6 m-4 bg-white">
      <h2 className="text-xl font-bold mb-2">Card Title</h2>
      <p className="text-gray-700 mb-4">Some description text here.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Action
      </button>
    </div>
  );
}
```

## Tips for Using Tailwind in React
- **Component Reusability**: Create reusable components with consistent Tailwind classes.
- **Custom Classes**: Define custom components in `index.css` using `@layer components`:
  ```css
  @layer components {
    .btn-primary {
      @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
    }
  }
  ```
  Usage:
  ```jsx
  <button className="btn-primary">Custom Button</button>
  ```
- **Avoid Long Class Strings**: Break down complex components into smaller ones to manage class lists.
- **Use Tailwind Plugins**: Add plugins like `typography` or `forms` for enhanced styling.

## Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CDN](https://cdn.tailwindcss.com)
- [React + Tailwind Tutorial](https://tailwindcss.com/docs/guides/create-react-app)