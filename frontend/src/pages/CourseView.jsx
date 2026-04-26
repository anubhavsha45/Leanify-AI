import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PlayCircle, Clock, BookOpen, CheckCircle, Loader2, Award } from 'lucide-react';

const CourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/course/${id}`);
        const enrolledData = res.data?.data?.enrolledCourse;
        const courseData = res.data?.data?.course || enrolledData;
        
        if (enrolledData) {
          setIsAlreadyEnrolled(true);
        }
        
        setCourse(courseData || null);
      } catch (error) {
        console.error('Failed to fetch course', error);
        // Mock data
        setCourse({
          _id: id,
          title: 'Advanced React Patterns & Performance',
          description: 'Take your React skills to the next level. Learn about render optimization, advanced hooks, state machines, and how to build large scale enterprise applications with React and Vite.',
          instructor: { name: 'Sarah Drasner', bio: 'Senior Engineer & Web Expert' },
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          price: 49.99,
          chapters: [
            { title: 'Introduction to Advanced Hooks', lectures: [{ title: 'useMemo and useCallback' }, { title: 'Custom Hooks Architecture' }] },
            { title: 'Performance Optimization', lectures: [{ title: 'Code Splitting' }, { title: 'React.memo Deep Dive' }] }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await api.post(`/enroll/${id}`);
      navigate(`/player/${id}`);
    } catch (error) {
      console.error('Failed to enroll', error);
      // Simulate success for demo if api fails
      setTimeout(() => {
        navigate(`/player/${id}`);
      }, 1000);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) return <div className="text-center py-20 text-white">Course not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
            <p className="text-xl text-gray-400 mb-6">{course.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-dark-border overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${course.instructor?.name || 'Instructor'}&background=random`} alt="Instructor" />
                </div>
                <div>
                  <p className="font-medium text-white">{course.instructor?.name || 'Expert Instructor'}</p>
                  <p className="text-xs text-gray-500">{course.instructor?.bio || 'Course Creator'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-dark-card px-3 py-2 rounded-lg">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>{course.chapters?.length || 5} Chapters</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Build scalable React applications',
                'Implement advanced performance techniques',
                'Master complex state management',
                'Create custom reusable hooks'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
            <div className="space-y-4">
              {(course.chapters || []).map((chapter, i) => (
                <div key={i} className="glass-effect rounded-xl overflow-hidden border border-dark-border">
                  <div className="p-4 bg-dark-card/50 flex justify-between items-center">
                    <h3 className="font-medium text-white">Chapter {i + 1}: {chapter.name}</h3>
                    <span className="text-sm text-gray-400">{chapter.lecture?.length || 0} lectures</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Checkout Card */}
        <div className="lg:col-span-1">
          <div className="glass-effect rounded-2xl overflow-hidden sticky top-24 border border-dark-border/60 shadow-2xl">
            <div className="relative aspect-video">
              <img 
                src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                alt={course.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                  <PlayCircle className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-3xl font-bold text-white mb-6">
                ${course.price || 'Free'}
              </div>
              
              {isAlreadyEnrolled ? (
                <button 
                  onClick={() => navigate(`/player/${id}`)}
                  className="w-full py-4 bg-accent hover:bg-accent/80 text-white rounded-xl font-medium text-lg transition-all shadow-lg shadow-accent/20 flex items-center justify-center mb-4"
                >
                  Continue Learning
                </button>
              ) : (
                <button 
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium text-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center mb-4 disabled:opacity-70"
                >
                  {enrolling ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Enroll Now'}
                </button>
              )}
              
              <div className="space-y-4 text-sm text-gray-400 mt-6">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-300" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-300" />
                  <span>Full lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CourseView;
