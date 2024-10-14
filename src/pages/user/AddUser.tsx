import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from "../../api/user";
import { userModel } from "../../utils/userModel";
import InputField from "../../components/InputField";

export const AddUser = () => {
  const navigate = useNavigate();
  const { createUser, loading, error } = useUsers();

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      suite: Yup.string().required("Suite is required"),
      city: Yup.string().required("City is required"),
      zipcode: Yup.string().required("Zipcode is required"),
      geo: Yup.object().shape({
        lat: Yup.string().required("Latitude is required"),
        lng: Yup.string().required("Longitude is required"),
      }),
    }),
    phone: Yup.string().required("Phone is required"),
    website: Yup.string().url("Invalid URL").required("Website is required"),
    company: Yup.object().shape({
      name: Yup.string().required("Company name is required"),
      catchPhrase: Yup.string().required("Catchphrase is required"),
      bs: Yup.string().required("Business strategy is required"),
    }),
  });

  const initialValues = {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={async (values: userModel) => {
          await createUser(values);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-4 gap-4">
              <InputField
                name="name"
                type="text"
                label="Name"
                placeholder="John"
              />
              <InputField
                name="username"
                type="text"
                label="User Name"
                placeholder="Doe"
              />
              <InputField
                name="email"
                type="email"
                label="Email"
                placeholder="john@acme.com"
              />
            </div>
            <h2 className="my-4 text-base font-[500]">Address</h2>
            <div className="grid grid-cols-4 gap-4">
              <InputField
                name="address.street"
                type="text"
                label="Street"
                placeholder="123 Main St"
              />
              <InputField
                name="address.suite"
                type="text"
                label="Suite"
                placeholder="Apt 1"
              />
              <InputField
                name="address.city"
                type="text"
                label="City"
                placeholder="Anytown"
              />
              <InputField
                name="address.zipcode"
                type="text"
                label="Zipcode"
                placeholder="12345"
              />
              <InputField
                name="address.geo.lat"
                type="text"
                label="Latitude"
                placeholder="42.42"
              />
              <InputField
                name="address.geo.lng"
                type="text"
                label="Longitude"
                placeholder="42.42"
              />
            </div>
            <div className="my-4"></div>
            <div className="grid grid-cols-4 gap-4">
              <InputField
                name="phone"
                type="text"
                label="Phone"
                placeholder="555-555-5555"
              />
              <InputField
                name="website"
                type="text"
                label="Website"
                placeholder="https://example.com"
              />
            </div>
            <h2 className="my-4 text-base font-[500]">Company</h2>
            <div className="grid grid-cols-4 gap-4">
              <InputField
                name="company.name"
                type="text"
                label="Company Name"
                placeholder="Acme Inc."
              />
              <InputField
                name="company.catchPhrase"
                type="text"
                label="Catchphrase"
                placeholder="Awesome Company"
              />
              <InputField
                name="company.bs"
                type="text"
                label="Business Strategy"
                placeholder="We are awesome"
              />
            </div>
            <div className="my-4 flex gap-4">
              <Link
                to={"/"}
                className="bg-red-500 text-white py-2 px-4 rounded "
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddUser;
