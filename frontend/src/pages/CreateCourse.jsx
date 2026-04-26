import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { 
  Plus, 
  Video, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload,
  Loader2,
  Trash2,
  ChevronRight
} from 'lucide-react';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State for Course
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    id: null
  });

  // State for Chapters
  const [chapters, setChapters] = useState([]);
  const [newChapterName, setNewChapterName] = useState('');

  // State for Lectures (mapping chapterId -> list of lectures)
  const [lectures, setLectures] = useState({});
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // --- STEP 1: CREATE COURSE ---
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!courseData.title.trim()) return;

    try {
      setLoading(true);
      const res = await api.post('/course', {
        title: courseData.title,
        description: courseData.description
      });
      
      const createdCourse = res.data?.data?.course;
      setCourseData({ ...courseData, id: createdCourse._id });
      setStep(2);
    } catch (error) {
      console.error('Failed to create course', error);
      alert('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: CREATE CHAPTERS ---
  const handleAddChapter = async () => {
    if (!newChapterName.trim()) return;

    try {
      setLoading(true);
      const res = await api.post(`/course/chapters/${courseData.id}`, {
        name: newChapterName,
        number: chapters.length + 1
      });
      
      const createdChapter = res.data?.data?.chapter;
      setChapters([...chapters, createdChapter]);
      setNewChapterName('');
    } catch (error) {
      console.error('Failed to add chapter', error);
      alert('Failed to add chapter');
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 3: CREATE LECTURES ---
  const [lectureForm, setLectureForm] = useState({
    name: '',
    description: '',
    video: null,
    notes: null
  });

  const handleAddLecture = async (chapterId) => {
    if (!lectureForm.name || !lectureForm.video || !lectureForm.description) {
      alert('Lecture name, description, and video are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', lectureForm.name);
    formData.append('description', lectureForm.description);
    formData.append('number', (lectures[chapterId]?.length || 0) + 1);
    formData.append('video', lectureForm.video);
    if (lectureForm.notes) formData.append('notes', lectureForm.notes);

    try {
      setLoading(true);
      const res = await api.post(`/course/lectures/${chapterId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newLecture = res.data?.data?.lecture;
      setLectures({
        ...lectures,
        [chapterId]: [...(lectures[chapterId] || []), newLecture]
      });
      setLectureForm({ name: '', video: null, notes: null });
    } catch (error) {
      console.error('Failed to add lecture', error);
      alert('Failed to upload lecture. Check file sizes and format.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-effect p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Course Foundations</h2>
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Course Title</label>
            <input 
              type="text" 
              value={courseData.title}
              onChange={(e) => setCourseData({...courseData, title: e.target.value})}
              className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. Advanced Web Development 2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea 
              value={courseData.description}
              onChange={(e) => setCourseData({...courseData, description: e.target.value})}
              className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32"
              placeholder="What will students learn in this course?"
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !courseData.title}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Next: Add Chapters <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-effect p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Structure Your Course</h2>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Step 2 of 3</span>
        </div>
        
        <div className="space-y-4 mb-8">
          {chapters.map((chapter, i) => (
            <div key={chapter._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-dark-card flex items-center justify-center text-gray-400 font-bold text-xs">{i + 1}</span>
                <span className="text-white font-medium">{chapter.name}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          ))}
          
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              className="flex-grow bg-dark-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter chapter name..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddChapter()}
            />
            <button 
              onClick={handleAddChapter}
              disabled={loading || !newChapterName}
              className="px-6 py-3 bg-dark-card hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setStep(1)}
            className="flex-1 py-4 border border-white/10 text-gray-400 rounded-xl font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button 
            onClick={() => setStep(3)}
            disabled={chapters.length === 0}
            className="flex-[2] py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Final Step: Upload Content <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const currentChapter = chapters[currentChapterIndex];
    if (!currentChapter) return null;

    return (
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Left Column: Chapter Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Chapters</h3>
          {chapters.map((ch, i) => (
            <button
              key={ch._id}
              onClick={() => setCurrentChapterIndex(i)}
              className={`w-full p-4 rounded-xl text-left transition-all border ${
                currentChapterIndex === i 
                  ? 'bg-primary/10 border-primary/30 text-white' 
                  : 'bg-white/2 border-transparent text-gray-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium truncate pr-4">{i + 1}. {ch.name}</span>
                {lectures[ch._id]?.length > 0 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
              <p className="text-[10px] mt-1 opacity-50">{lectures[ch._id]?.length || 0} lectures uploaded</p>
            </button>
          ))}
          
          <button 
            onClick={() => navigate('/teacher/dashboard')}
            className="w-full mt-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Finish Course
          </button>
        </div>

        {/* Right Column: Lecture Content Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-effect p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Upload Lectures for: {currentChapter.name}</h2>
            <p className="text-gray-400 text-sm mb-8">Each lecture requires a title and a video file (MP4/WebM).</p>

            {/* List of uploaded lectures in this chapter */}
            <div className="space-y-3 mb-10">
              {(lectures[currentChapter._id] || []).map((lec, i) => (
                <div key={lec._id} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded-lg border border-white/5">
                   <div className="flex items-center gap-3">
                     <Video className="w-4 h-4 text-primary" />
                     <span className="text-sm text-gray-200">{i + 1}. {lec.name}</span>
                   </div>
                   <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded">Uploaded</span>
                </div>
              ))}
            </div>

            {/* Add New Lecture Form */}
            <div className="bg-dark-card p-6 rounded-xl border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> Add New Lecture
              </h4>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lecture Title</label>
                <input 
                  type="text"
                  value={lectureForm.name}
                  onChange={(e) => setLectureForm({...lectureForm, name: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary mb-3"
                  placeholder="e.g. Setting up the Environment"
                />
                
                <label className="block text-xs font-medium text-gray-500 mb-1">Lecture Description (For AI Context)</label>
                <textarea 
                  value={lectureForm.description}
                  onChange={(e) => setLectureForm({...lectureForm, description: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary h-20"
                  placeholder="Briefly explain what this lecture covers..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Video File (Required)</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-dark-bg border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-all text-xs text-gray-400">
                    <Upload className="w-4 h-4" />
                    <span className="truncate">{lectureForm.video ? lectureForm.video.name : 'Choose Video'}</span>
                    <input type="file" className="hidden" accept="video/*" onChange={(e) => setLectureForm({...lectureForm, video: e.target.files[0]})} />
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Notes File (Optional)</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-dark-bg border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-all text-xs text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="truncate">{lectureForm.notes ? lectureForm.notes.name : 'Choose PDF'}</span>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => setLectureForm({...lectureForm, notes: e.target.files[0]})} />
                  </label>
                </div>
              </div>

              <button 
                onClick={() => handleAddLecture(currentChapter._id)}
                disabled={loading || !lectureForm.name || !lectureForm.video}
                className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Upload Lecture</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-dark-bg pb-20">
      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -z-10"></div>
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-dark-card text-gray-600 border border-white/5'
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-gray-600'}`}>
                {s === 1 ? 'Foundations' : s === 2 ? 'Structure' : 'Content'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default CreateCourse;
