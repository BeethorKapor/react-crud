import { Field, ErrorMessage, useField } from "formik";

interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  label,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <label htmlFor={name} className="block text-sm">
        {label}
      </label>
      <Field
        id={name}
        {...field}
        type={type}
        placeholder={placeholder}
        className={`border p-2 w-full bg-gray-100 rounded text-base focus:outline-none focus:border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300" // Conditional border color
        }`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default InputField;
