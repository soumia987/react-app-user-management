import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-lg">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-6">Login</h2>
          <p className="text-gray-600 text-sm">
            Welcome, please enter your Email and Password.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-gray-800 text-white p-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
            
            <button
              type="submit"
              className="w-full bg-green-600 text-gray-800 py-2 rounded hover:bg-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}