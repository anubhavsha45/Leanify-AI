import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-dark-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
              <BookOpen className="text-primary h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Leanify<span className="text-primary">AI</span></span>
          </Link>

          <div className="flex items-center gap-4">
            {token ? (
              <>
                {user?.role !== 'teacher' && (
                  <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'teacher' && (
                  <Link to="/teacher/dashboard" className="text-primary hover:text-primary-hover px-3 py-2 rounded-md text-sm font-bold transition-colors">
                    Instructor
                  </Link>
                )}
                <div className="h-6 w-px bg-dark-border mx-2"></div>
                <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center overflow-hidden">
                    {user?.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5">
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
