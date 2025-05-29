export interface FeedbackData {
    name: string;
    rating: string;
    comment: string;
  }
  export interface Props {
    onSave: (data: FeedbackData) => void;
  }