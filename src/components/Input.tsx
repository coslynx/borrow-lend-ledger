import React, { ChangeEventHandler } from 'react';

/**
 * @interface InputProps
 * @description Defines the props accepted by the Input component.
 * It extends standard HTML input attributes to allow passthrough of common properties
 * like `placeholder`, `required`, `disabled`, `min`, `max`, `pattern`, etc.
 * @property {string} id - Required. Unique identifier for the input, used for label association (`htmlFor`) and DOM identification.
 * @property {string} name - Required. The name attribute for the input element, used in form submission.
 * @property {string} type - Required. The type attribute for the input element (e.g., 'text', 'number', 'email').
 * @property {string | number} value - Required. The current value of the input, making it a controlled component.
 * @property {ChangeEventHandler<HTMLInputElement>} onChange - Required. Handler function to be called when the input value changes.
 * @property {string} [label] - Optional. Text to display in an associated `<label>` element. If provided, `id` is used for `htmlFor`.
 * @property {string} [className] - Optional. Additional CSS classes to apply specifically to the `<input>` element, merged with base styles.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  className?: string;
}

/**
 * Input Component
 *
 * Purpose:
 * Provides a reusable, styled input field with an optional associated label,
 * consistent with the application's dark theme and design system.
 * Designed to be used as a controlled component within forms.
 *
 * Responsibilities:
 * - Renders a standard HTML `<input>` element.
 * - Optionally renders an associated `<label>` element linked via `id` and `htmlFor`.
 * - Applies consistent base, focus, disabled, and placeholder styles using Tailwind utilities.
 * - Passes through all standard HTML input attributes (`placeholder`, `required`, `disabled`, etc.) to the underlying input element.
 * - Facilitates the controlled component pattern via `value` and `onChange` props.
 *
 * Styling:
 * - Styled exclusively with Tailwind CSS utility classes.
 * - Adheres to the application's dark theme (gray backgrounds, light text, blue focus ring).
 * - Includes states for focus (visible ring) and disabled (opacity reduction).
 * - Applies smooth transitions for visual feedback.
 *
 * Accessibility:
 * - Ensures proper label association using `htmlFor={id}` when the `label` prop is provided.
 *
 * Usage:
 * ```jsx
 * import Input from './Input';
 *
 * const [name, setName] = useState('');
 *
 * <Input
 *   id="lender-name"
 *   name="lender"
 *   type="text"
 *   label="Lender Name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   placeholder="Enter lender's name"
 *   required
 * />
 * ```
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {string} props.id - Required identifier for input and label.
 * @param {string} props.name - Required name attribute for the input.
 * @param {string} props.type - Required type attribute for the input.
 * @param {string | number} props.value - Required value for controlled input.
 * @param {ChangeEventHandler<HTMLInputElement>} props.onChange - Required change handler.
 * @param {string} [props.label] - Optional label text.
 * @param {string} [props.className] - Optional additional classes for the input element.
 * @param {object} [props...rest] - Any other standard input attributes.
 * @returns {React.ReactElement} The rendered input element with an optional label.
 */
const Input: React.FC<InputProps> = ({
  label,
  id,
  className,
  type, // Ensure type is destructured to avoid passing it in ...rest again
  ...rest // Spread the remaining standard input attributes
}) => {
  // Combine base input styles with any additional classes passed via props
  const inputClassName = `
    block w-full p-2 border rounded bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transition duration-200 ease-in-out
    ${className || ''}
  `.trim(); // trim potential whitespace

  return (
    // Using a div wrapper allows for consistent spacing between label and input
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <input id={id} type={type} className={inputClassName} {...rest} />
    </div>
  );
};

export default Input;