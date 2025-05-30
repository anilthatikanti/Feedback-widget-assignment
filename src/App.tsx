import { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackPreview from "./components/FeedbackPreview";
import type { FeedbackData } from "./shared/feedback.interface";
import { defaultValue } from "./shared/feedback.data";

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackData>(defaultValue); // this state holds the current feedback values
  const [isEdit, setIsEdit] = useState<boolean>(false); // this state will update the form vaules dynamically in the FeedbackForm.tsx

  /** this hook will fetch the data from the local storage and update the state  */
  useEffect(() => {
    const saved = localStorage.getItem("user-feedback");
    if (saved) {
      const data = JSON.parse(saved);
      setFeedback(data);
    }
  }, []);

  function handleSaveFrom(value: FeedbackData) {
    setFeedback(value);
    setIsEdit(false);
  }

  return (
    <div className="h-full w-full bg-gray-50 p-4 flex  justify-center items-center">
      <div className="h-full w-[60%] ">
        <h1 className="text-2xl font-bold text-center mb-6">Feedback Widget</h1>
        <FeedbackForm onSave={handleSaveFrom} isEdit={isEdit} />
        {/* this above component is responsible for the form */}
        <FeedbackPreview feedback={feedback}>
          <button
            type="button"
            onClick={() => setIsEdit(true)}
            style={{
              padding: "0px",
              borderRadius: "10%",
              backgroundColor: "transparent",
              cursor:"pointer"
            }}
            className=" bg-blue-500 text-blue rounded hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            </svg>
          </button>
          {/* this button we passed to the FeedbackPreview component as a children so we can easily update the isEdit state 
          instead of sending from the child as an event */}
        </FeedbackPreview>

        {/*  This component is responsible for displaying the user's most recent feedback.*/}
      </div>
    </div>
  );
};

export default App;
