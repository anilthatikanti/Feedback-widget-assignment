import { useMemo } from "react";
import type { FeedbackData } from "../shared/feedback.interface";


interface Props {
  feedback: FeedbackData;
  children?: React.ReactNode;
}

const FeedbackPreview: React.FC<Props> = ({ feedback ,children }) => {
  // Show message if there's no feedback (all fields are empty or default)
  const isEmpty =
    !feedback.name && !feedback.comment && (!feedback.rating || feedback.rating === '5');

    const renderStars = useMemo(() => {
      const stars = [];
      let ratingNumber = parseInt(feedback.rating || '1', 10); // if feed comes in decimals then it will convert into integer
      ratingNumber = Math.min(Math.max(ratingNumber, 1), 5); // this condition will restrict the rating upto 5 
      for (let i = 1; i <= ratingNumber; i++) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 inline-block"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
      return stars;
    }, [feedback.rating]);

  return (
    <div className="bg-gray-100 p-6 rounded shadow-md max-w-md mx-auto mt-6">
     <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold mb-4">Feedback Preview</h2>
      {!isEmpty&&children}
      </div>
       {isEmpty ? (
        <p className="text-gray-500">No feedback available.</p>
      ) : (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {feedback.name || 'N/A'}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <div className="flex items-center">
              {renderStars}
            </div>
          </div>
          <p>
            <span className="font-medium">Comment:</span> {feedback.comment || 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPreview;
