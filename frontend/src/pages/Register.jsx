import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Loader2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);

    const res = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirm,
      formData.role
    );
    
    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-md w-full space-y-8 glass-effect p-8 sm:p-10 rounded-2xl">
        <div className="text-center">
          <div className="mx-auto bg-accent/20 p-3 rounded-xl w-fit mb-4">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create an account</h2>
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm text-white"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm text-white"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-300 mb-1">Confirm</label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
               <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">I am a</label>
               <select
                 id="role"
                 name="role"
                 value={formData.role}
                 onChange={handleChange}
                 className="appearance-none block w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all sm:text-sm"
               >
                 <option value="student">Student</option>
                 <option value="teacher">Instructor</option>
               </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-dark-bg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
