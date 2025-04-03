import React from 'react';

/**
 * @interface ButtonProps
 * @description Defines the props accepted by the Button component.
 * It extends standard HTML button attributes to allow passthrough of common properties like `type`, `onClick`, `disabled`, etc.
 * @property {React.ReactNode} children - The content to be displayed inside the button (e.g., text, icons).
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Button Component
 *
 * Purpose:
 * Provides a reusable, styled button element consistent with the application's design system.
 * It leverages Tailwind CSS for styling and accepts all standard HTML button attributes via props.
 *
 * Responsibilities:
 * - Renders a standard HTML `<button>` element.
 * - Applies consistent base, hover, focus, and disabled styles using Tailwind utilities.
 * - Accepts and renders children elements (text, icons, etc.).
 * - Passes through all standard HTML button attributes (`type`, `onClick`, `disabled`, etc.) to the underlying button element.
 *
 * Styling:
 * - Styled exclusively with Tailwind CSS utility classes.
 * - Adheres to the application's dark theme (blue primary action color).
 * - Includes states for hover, focus (with visible ring on dark background), and disabled.
 * - Applies smooth color transitions.
 *
 * Usage:
 * ```jsx
 * import Button from './Button';
 *
 * <Button type="submit" onClick={() => console.log('Clicked!')} disabled={false}>
 *   Submit
 * </Button>
 * ```
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {React.ReactNode} props.children - Content to render inside the button.
 * @param {string} [props.className] - Optional additional CSS classes to apply. Standard button attributes are passed via rest props.
 * @returns {React.ReactElement} The rendered button element.
 */
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  // Combine base styles with any additional classes passed via props
  const combinedClassName = `
    py-2 px-4 rounded font-medium text-white bg-blue-600
    hover:bg-blue-500
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className || ''}
  `.trim(); // trim to remove leading/trailing whitespace if className is empty

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;