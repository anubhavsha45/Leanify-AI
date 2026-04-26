import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Sparkles, PlayCircle, CheckCircle, ChevronDown, ChevronUp, Loader2, BookOpen, ArrowLeft, ArrowRight, Video } from 'lucide-react';
import AIModal from '../components/AIModal';

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLecture, setActiveLecture] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/course/${id}`);
        const courseData = res.data?.data?.course || res.data?.data?.enrolledCourse;
        
        if (courseData) {
          setCourse(courseData);
          if (courseData.chapters?.length > 0 && courseData.chapters[0].lecture?.length > 0) {
            setActiveLecture(courseData.chapters[0].lecture[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch course', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const navigateLecture = (direction) => {
    if (!course?.chapters) return;
    
    for (let cIdx = 0; cIdx < course.chapters.length; cIdx++) {
      const chapter = course.chapters[cIdx];
      const lIdx = chapter.lecture?.findIndex(l => l._id === activeLecture?._id);
      
      if (lIdx !== -1 && lIdx !== undefined) {
        if (direction === 'next') {
          if (lIdx < chapter.lecture.length - 1) {
            setActiveLecture(chapter.lecture[lIdx + 1]);
            setExpandedChapter(cIdx);
          } else if (cIdx < course.chapters.length - 1 && course.chapters[cIdx + 1].lecture?.length > 0) {
            setActiveLecture(course.chapters[cIdx + 1].lecture[0]);
            setExpandedChapter(cIdx + 1);
          }
        } else {
          if (lIdx > 0) {
            setActiveLecture(chapter.lecture[lIdx - 1]);
            setExpandedChapter(cIdx);
          } else if (cIdx > 0 && course.chapters[cIdx - 1].lecture?.length > 0) {
            const prevChapter = course.chapters[cIdx - 1];
            setActiveLecture(prevChapter.lecture[prevChapter.lecture.length - 1]);
            setExpandedChapter(cIdx - 1);
          }
        }
        return;
      }
    }
  };

  const openAIModalForLecture = (lecture) => {
    setActiveLecture(lecture); // Keep player in sync with AI
    setIsAIModalOpen(true);
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-dark-bg">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) return <div className="p-8 text-center text-white bg-dark-bg h-[calc(100vh-64px)]">Course not found.</div>;

  const totalLectures = course.chapters?.reduce((acc, c) => acc + (c.lecture?.length || 0), 0) || 0;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-[#0B0E14]">
      
      {/* LEFT COLUMN: Video Player & Details (70%) */}
      <div className="w-full lg:w-[70%] h-full flex flex-col relative overflow-y-auto custom-scrollbar bg-[#0B0E14]">
        
        {/* Video Area */}
        <div className="w-full p-4 md:p-6 lg:p-8 pb-0">
          <div className="bg-black aspect-video w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-white/10">
            {activeLecture?.videoUrl ? (
              <video 
                key={activeLecture._id}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                src={activeLecture.videoUrl}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card/80 backdrop-blur-sm">
                <Video className="w-12 h-12 text-gray-500 mb-3 opacity-50" />
                <p className="text-gray-400 font-medium">No video available for this lecture</p>
              </div>
            )}
          </div>
        </div>

        {/* Details & Controls */}
        <div className="p-4 md:p-6 lg:p-8 flex-grow">
          <div className="max-w-5xl mx-auto">
            
            {/* Title & Nav */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-dark-border pb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                  {activeLecture?.name || 'Lecture Name'}
                </h1>
                <p className="text-gray-400 font-medium flex items-center gap-2">
                  <span className="text-primary">{course.title}</span>
                  <span className="text-gray-600">•</span>
                  <span>{course.createdBy?.name || 'Instructor'}</span>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => navigateLecture('prev')}
                  className="p-3 bg-dark-card hover:bg-dark-border border border-dark-border rounded-xl text-white transition-all transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                <button 
                  onClick={() => navigateLecture('next')}
                  className="p-3 bg-primary hover:bg-primary-hover border border-primary-hover rounded-xl text-white transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Overview */}
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Lecture Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg bg-dark-card/40 p-6 rounded-2xl border border-white/5">
                In this lecture, we cover <strong className="text-white font-medium">{activeLecture?.name}</strong>. 
                Make sure to take notes or use our AI tools to generate a summary and test your knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar Syllabus (30%) */}
      <div className="w-full lg:w-[30%] h-full bg-[#151A23] flex flex-col border-l border-dark-border shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-10">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-dark-border bg-dark-card">
          <h2 className="font-bold text-xl text-white mb-2 tracking-tight">Course Content</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">{course.chapters?.length || 0} sections • {totalLectures} lectures</span>
            <span className="text-primary font-semibold text-xs bg-primary/10 px-2 py-1 rounded-md">
              In Progress
            </span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {(course.chapters || []).map((chapter, chapterIdx) => {
            const isExpanded = expandedChapter === chapterIdx;
            
            return (
              <div key={chapter._id || chapterIdx} className="border-b border-dark-border/50">
                <button 
                  onClick={() => setExpandedChapter(isExpanded ? null : chapterIdx)}
                  className={`w-full px-6 py-5 flex items-start justify-between transition-colors text-left ${isExpanded ? 'bg-dark-border/20' : 'hover:bg-dark-card/80'}`}
                >
                  <div className="flex-1 pr-4">
                    <h3 className={`font-semibold text-[15px] leading-snug mb-1 transition-colors ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
                      Section {chapterIdx + 1}: {chapter.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-medium">0 / {chapter.lecture?.length || 0} completed</p>
                  </div>
                  <div className="mt-1 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Lectures List */}
                {isExpanded && (
                  <div className="bg-[#0B0E14]/50 py-2">
                    {(chapter.lecture || []).map((lecture, lectureIdx) => {
                      const isActive = activeLecture?._id === lecture._id;
                      
                      return (
                        <div 
                          key={lecture._id || lectureIdx}
                          className={`group relative flex items-start justify-between px-6 py-3 transition-all ${
                            isActive 
                              ? 'bg-primary/10' 
                              : 'hover:bg-dark-card/50 cursor-pointer'
                          }`}
                        >
                          {/* Active Indicator Border */}
                          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
                          
                          <div 
                            className="flex-1 flex gap-3 cursor-pointer"
                            onClick={() => setActiveLecture(lecture)}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isActive ? (
                                <PlayCircle className="w-4 h-4 text-primary fill-primary/20" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                              )}
                            </div>
                            <div>
                              <p className={`text-[14px] leading-tight ${isActive ? 'text-white font-semibold' : 'text-gray-300 group-hover:text-gray-200'}`}>
                                {lectureIdx + 1}. {lecture.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <Video className="w-3 h-3 text-gray-500" />
                                <span className="text-[12px] text-gray-500 font-medium">{lecture.duration || '10:00'}</span>
                              </div>
                            </div>
                          </div>

                          {/* AI Button - Appears on hover or active */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openAIModalForLecture(lecture);
                            }}
                            className={`ml-3 p-2 rounded-lg flex-shrink-0 transition-all duration-200 ${
                              isActive 
                                ? 'opacity-100 bg-accent/20 text-accent hover:bg-accent hover:text-white' 
                                : 'opacity-0 group-hover:opacity-100 bg-dark-border text-gray-400 hover:text-white hover:bg-primary'
                            }`}
                            title="Get AI Help for this lecture"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Modal component */}
      {isAIModalOpen && (
        <AIModal 
          isOpen={isAIModalOpen} 
          onClose={() => {
            setIsAIModalOpen(false);
          }} 
          lectureId={activeLecture?._id}
          lectureTitle={activeLecture?.name}
        />
      )}
    </div>
  );
};

export default CoursePlayer;
