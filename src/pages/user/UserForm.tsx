import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useUsers } from "../../api/user";
import { userModel } from "../../utils/userModel";
import InputField from "../../components/InputField";
import { useEffect, useState } from "react";

export const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, createUser, fetchUserById, updateUser, loading, error } =
    useUsers();
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const [initialValues, setInitialValues] = useState<userModel>({
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
  });

  useEffect(() => {
    const getUserDetails = async () => {
      const fetchedUser = await fetchUserById(Number(id));
      if (fetchedUser) {
        setInitialValues(fetchedUser);
      }
    };

    if (id) {
      const cachedUser = users.find((u) => u.id === Number(id));
      if (cachedUser) {
        setInitialValues(cachedUser);
      } else {
        getUserDetails();
      }
    }
  }, [id, fetchUserById, users]);

  const handleSubmit = async (values: userModel) => {
    try {
      if (id) {
        const updatedUser = await updateUser(Number(id), values);
        if (updatedUser) {
          navigate("/");
        }
      } else {
        const newUser = await createUser(values);
        if (newUser) {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Error while creating/updating user:", err);
      setSubmitError("Failed to save user. Please try again.");
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} User</h1>
      {error && <p className="text-red-500">{error}</p>}
      {submitError && <p className="text-red-500">{submitError}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          values,
          isSubmitting,
        }) => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name}
                touched={touched.name}
              />
              <InputField
                id="username"
                name="username"
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.username}
                touched={touched.username}
              />
              <InputField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.email}
                touched={touched.email}
              />
            </div>
            <h2 className="my-4 text-base font-[500]">Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                id="address.street"
                name="address.street"
                label="Street"
                type="text"
                placeholder="Enter your street"
                value={values.address.street}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.street}
                touched={touched.address?.street}
              />
              <InputField
                id="address.suite"
                name="address.suite"
                label="Suite"
                type="text"
                placeholder="Enter your suite"
                value={values.address.suite}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.suite}
                touched={touched.address?.suite}
              />
              <InputField
                id="address.city"
                name="address.city"
                label="City"
                type="text"
                placeholder="Enter your city"
                value={values.address.city}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.city}
                touched={touched.address?.city}
              />
              <InputField
                id="address.zipcode"
                name="address.zipcode"
                label="Zipcode"
                type="text"
                placeholder="Enter your zipcode"
                value={values.address.zipcode}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.zipcode}
                touched={touched.address?.zipcode}
              />
              <InputField
                id="address.geo.lat"
                name="address.geo.lat"
                label="Latitude"
                type="text"
                placeholder="Enter latitude"
                value={values.address.geo.lat}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.geo?.lat}
                touched={touched.address?.geo?.lat}
              />
              <InputField
                id="address.geo.lng"
                name="address.geo.lng"
                label="Longitude"
                type="text"
                placeholder="Enter longitude"
                value={values.address.geo.lng}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.address?.geo?.lng}
                touched={touched.address?.geo?.lng}
              />
            </div>
            <div className="my-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.phone}
                touched={touched.phone}
              />
              <InputField
                id="website"
                name="website"
                label="Website"
                type="url"
                placeholder="Enter your website"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.website}
                touched={touched.website}
              />
            </div>
            <h2 className="my-4 text-base font-[500]">Company</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InputField
                id="company.name"
                name="company.name"
                label="Company Name"
                type="text"
                placeholder="Enter your company name"
                value={values.company.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.company?.name}
                touched={touched.company?.name}
              />
              <InputField
                id="company.catchPhrase"
                name="company.catchPhrase"
                label="Catch Phrase"
                type="text"
                placeholder="Enter catch phrase"
                value={values.company.catchPhrase}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.company?.catchPhrase}
                touched={touched.company?.catchPhrase}
              />
              <InputField
                id="company.bs"
                name="company.bs"
                label="BS"
                type="text"
                placeholder="Enter bs"
                value={values.company.bs}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.company?.bs}
                touched={touched.company?.bs}
              />
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? "Submitting..." : id ? "Update" : "Create"} User
              </button>
              <Link
                to="/"
                className=" bg-red-500 text-base font-[500] px-4 py-2 rounded hover:bg-red-600"
              >
                Back
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
