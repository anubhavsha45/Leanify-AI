import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import { Loader2, LayoutDashboard, Compass, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    if (!authLoading && user?.role === 'teacher') {
      navigate('/teacher/dashboard');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch enrollments (the backend route is /enroll)
        const enrollRes = await api.get('/enroll');
        
        // Fetch all courses for exploration
        // the backend overview or all courses route might be /course or /course/overview
        // based on courseRoutes.js: router.route("/").get(authController.restrictTo("admin"), ...)
        // Wait, regular users might not have access to "/" based on restrictTo("admin").
        // There is /overview route: router.route("/overview").get(courseController.getOverview);
        const coursesRes = await api.get('/course/overview');
        
        // Assuming enrollments API returns array of enrollment objects with course details populated
        setEnrolledCourses(enrollRes.data?.data?.enrollCourses || []);
        setAllCourses(coursesRes.data?.data?.courses || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
        <p className="text-gray-400">Ready to continue your learning journey?</p>
      </div>

      {/* Custom Tabs */}
      <div className="flex gap-4 mb-8 border-b border-dark-border pb-px">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'enrolled' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          My Learning
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'explore' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Compass className="w-4 h-4" />
          Explore Courses
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'enrolled' && (
          <div>
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-20 glass-effect rounded-2xl border border-dashed border-dark-border">
                <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Not enrolled in any courses</h3>
                <p className="text-gray-400 mb-6">Explore our catalog and start learning today.</p>
                <button 
                  onClick={() => setActiveTab('explore')}
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => (
                  <CourseCard 
                    key={enrollment._id || enrollment.course?._id} 
                    course={enrollment.course || enrollment} 
                    isEnrolled={true} 
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'explore' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => {
                const isEnrolled = enrolledCourses.some(e => 
                  (e.course?._id === course._id) || (e.course === course._id)
                );
                return (
                  <CourseCard 
                    key={course._id} 
                    course={course} 
                    isEnrolled={isEnrolled} 
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
