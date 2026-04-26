import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Plus, BookOpen, Users, Video, Edit, Trash2, Loader2, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        // Using the dedicated 'my courses' route for better performance and reliability
        const res = await api.get('/course/my-courses');
        setCourses(res.data?.data?.courses || []);
      } catch (error) {
        console.error('Failed to fetch teacher courses', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user?._id) {
      fetchMyCourses();
    } else if (!authLoading && !user?._id) {
      setLoading(false);
    }
  }, [user?._id, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-dark-bg">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Instructor Dashboard</h1>
          <p className="text-gray-400 font-medium">Manage your courses and track your student's progress.</p>
        </div>
        <Link 
          to="/teacher/create-course"
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-1 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-white">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
        <div className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Lectures</p>
              <p className="text-2xl font-bold text-white">
                {courses.reduce((acc, c) => acc + (c.chapters?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/2">
          <h2 className="text-xl font-bold text-white">Your Courses</h2>
        </div>
        
        {courses.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6 border border-dashed border-white/10">
              <BookOpen className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No courses yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Start sharing your knowledge with the world by creating your first course.</p>
            <Link 
              to="/teacher/create-course"
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/2">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-white/1 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-10 rounded-lg bg-dark-card overflow-hidden flex-shrink-0 border border-white/5">
                           <img 
                            src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                           />
                        </div>
                        <div>
                          <p className="font-bold text-white">{course.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-300">
                      0 students
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">{course.chapters?.length || 0} Chapters</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/course/${course._id}`}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          title="Preview"
                        >
                          <BookOpen className="w-5 h-5" />
                        </Link>
                        <button 
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
