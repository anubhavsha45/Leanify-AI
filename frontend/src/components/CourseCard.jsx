import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

const CourseCard = ({ course, isEnrolled }) => {
  // Use mock data if actual data is missing for presentation
  const thumbnail = course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  
  return (
    <div className="glass-effect rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60"></div>
        
        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
          <div className="bg-primary text-white rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <PlayCircle className="w-8 h-8" />
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-medium text-primary mb-2">
          <span className="bg-primary/10 px-2 py-1 rounded-md">{course.category || 'Technology'}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-white line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {course.description || 'Learn the fundamentals and advanced concepts in this comprehensive course.'}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-5 pb-5 border-b border-dark-border/50">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{course.chapters?.length || 0} Chapters</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{course.duration || '12h 30m'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-dark-border overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${course.createdBy?.name || 'Instructor'}&background=random`} alt="Instructor" />
            </div>
            <span className="text-sm font-medium text-gray-300">{course.createdBy?.name || 'Expert Instructor'}</span>
          </div>
          
          <Link 
            to={isEnrolled ? `/player/${course._id}` : `/course/${course._id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isEnrolled 
                ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {isEnrolled ? 'Continue' : 'Enroll'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
