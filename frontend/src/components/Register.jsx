import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user' // default role
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      role: Yup.string()
        .oneOf(['user', 'admin'], 'Invalid role')
        .required('Role is required')
    }),
    onSubmit: (values) => {
      console.log(values);
      // Here you would typically send the data to your backend
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-lg">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-6">Register</h2>
          <p className="text-gray-600 text-sm">
            Create your account by filling the form below.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-gray-800 text-white p-10">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-400 text-xs mt-1">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-400 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-400 text-xs mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-400 text-xs mt-1">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm mb-1">Account Type</label>
              <div className="flex space-x-4 mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formik.values.role === 'user'}
                    onChange={formik.handleChange}
                    className="text-purple-500"
                  />
                  <span className="ml-2">User</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formik.values.role === 'admin'}
                    onChange={formik.handleChange}
                    className="text-purple-500"
                  />
                  <span className="ml-2">Admin</span>
                </label>
              </div>
              {formik.touched.role && formik.errors.role ? (
                <div className="text-red-400 text-xs mt-1">{formik.errors.role}</div>
              ) : null}
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-gray-800 py-2 rounded hover:bg-green-500 transition mt-6"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}