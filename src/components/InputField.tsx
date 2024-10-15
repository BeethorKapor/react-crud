// import { Field, ErrorMessage, useField } from "formik";

// interface InputFieldProps {
//   name: string;
//   type: string;
//   label: string;
//   placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   name,
//   type,
//   label,
//   placeholder,
// }) => {
//   const [field, meta] = useField(name);
//   return (
//     <div>
//       <label htmlFor={name} className="block text-sm">
//         {label}
//       </label>
//       <Field
//         id={name}
//         {...field}
//         type={type}
//         placeholder={placeholder}
//         className={`border p-2 w-full bg-gray-100 rounded text-base focus:outline-none focus:border ${
//           meta.touched && meta.error ? "border-red-500" : "border-gray-300" // Conditional border color
//         }`}
//       />
//       <ErrorMessage
//         name={name}
//         component="div"
//         className="text-red-500 text-sm"
//       />
//     </div>
//   );
// };

// export default InputField;

import { useState, FC, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  touched?: boolean;
  id: string;
  name: string;
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
}

const InputField: FC<InputFieldProps> = ({
  onBlur,
  onChange,
  errors,
  touched,
  id,
  name,
  icon,
  type = "text",
  placeholder = "Enter.....",
  value = "",
  disabled = false,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-[#000000] font-[400]">
          {label}
        </label>
      )}
      <div className="input-container flex flex-col">
        <div
          className={`border w-full rounded p-2 text-base focus:outline-none focus:border input-wrapper flex gap-x-2 items-center ${
            disabled ? "bg-[#F9FAFA] hover:pointer-events-none" : "bg-white" // Conditional border color
          }`}
          style={{ borderColor: errors && touched ? "red" : "" }}
        >
          {icon && (
            <label htmlFor={id} className="icon">
              {icon}
            </label>
          )}
          <input
            className="outline-none w-full border-none"
            type={showPassword ? "text" : type}
            id={id}
            name={name}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            disabled={disabled}
          />
          {type === "password" && (
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <Eye size={22} color="gray" />
              ) : (
                <EyeOff size={22} color="gray" />
              )}
            </span>
          )}
        </div>
      </div>
      {errors && touched && <p className="text-red-500 text-sm">{errors}</p>}
    </div>
  );
};

export default InputField;
