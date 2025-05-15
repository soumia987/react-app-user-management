import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import API from '../api';

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async(values) => {
        try{
            await API.post('/forgot-password',{email:values.email});
            alert ('password reset link has been sent to  ${values.email}');

        }catch(error){
            alert(error.response?.data?.message ||'failed to send reset link');
        }
      console.log(values);
      // Here you would typically send the reset password link to the email
      alert(`Password reset link has been sent to ${values.email}`);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-lg">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold mb-6">Forgot Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your password.
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
            
            <button
              type="submit"
              className="w-full bg-green-600 text-gray-800 py-2 rounded hover:bg-green-500 transition"
            >
              Send Reset Link
            </button>

            <div className="flex justify-between text-sm mt-4">
              <div>
                Remember your password? {' '}
                <Link to="/login" className="text-green-400 hover:underline">
                  Login here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}