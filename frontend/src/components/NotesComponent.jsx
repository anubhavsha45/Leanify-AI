import { useState, useRef } from 'react';
import api from '../services/api';
import { Loader2, Download, CheckCircle, FileText } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const NotesComponent = ({ lectureId }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const notesRef = useRef(null);

  const generateNotes = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/ai/generate-notes/${lectureId}`);
      const fetchedNotes = res.data?.data?.aiNotes || res.data?.data?.notes;
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      } else {
        throw new Error('No notes returned from AI');
      }
    } catch (error) {
      console.error("Failed to generate notes", error);
      alert(error.response?.data?.message || error.message || "Failed to generate notes");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!notesRef.current) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(notesRef.current, {
        scale: 2,
        backgroundColor: '#16171d' // Use dark theme color for PDF
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('ai-notes.pdf');
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF: " + (error.message || error));
    } finally {
      setDownloading(false);
    }
  };

  if (!notes && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Ready to generate notes?</h3>
        <p className="text-gray-400 mb-6 max-w-md">Our AI will analyze the lecture content and create comprehensive study notes for you.</p>
        <button 
          onClick={generateNotes}
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
        >
          Generate Notes Now
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4 mx-auto" />
        <p className="text-white font-medium">Analyzing lecture and extracting key points...</p>
        <p className="text-gray-400 text-sm mt-2">This might take a few seconds.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center bg-dark-card/50 p-4 rounded-xl border border-dark-border">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">Notes generated successfully!</span>
        </div>
        <button 
          onClick={downloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-dark-border hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download PDF
        </button>
      </div>

      {/* Content to be converted to PDF */}
      <div 
        ref={notesRef} 
        className="bg-dark-card rounded-2xl p-6 sm:p-8 border border-dark-border space-y-8"
      >
        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">01</span>
            Summary
          </h3>
          <p className="text-gray-300 leading-relaxed p-4 bg-dark-bg/50 rounded-xl border border-dark-border/50">
            {notes.summary}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">02</span>
            Key Points
          </h3>
          <ul className="space-y-3">
            {(notes.keyPoints || []).map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">03</span>
            Detailed Explanation
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {notes.explanation}
          </p>
        </div>

        {notes.importantTerms?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">04</span>
              Important Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.importantTerms.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-dark-border bg-dark-bg/50 hover:border-primary/50 transition-colors">
                  <h4 className="font-bold text-white mb-1">{item.term}</h4>
                  <p className="text-sm text-gray-400">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesComponent;
