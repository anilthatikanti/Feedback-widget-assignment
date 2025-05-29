import  { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackPreview from './components/FeedbackPreview';
import type { FeedbackData } from './shared/feedback.interface';



const App: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: '',
    rating: '5',
    comment: '',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Feedback Widget</h1>
      <FeedbackForm onSave={setFeedback} />
      <FeedbackPreview feedback={feedback} />
    </div>
  );
};

export default App;
