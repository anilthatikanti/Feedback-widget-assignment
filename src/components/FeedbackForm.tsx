import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { FeedbackData, Props } from '../shared/feedback.interface';

const FeedbackForm: React.FC<Props> = ({ onSave }) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm<FeedbackData>({
    defaultValues: {
      name: '',
      rating: '5',
      comment: '',
    },
  });

  // Watch form values for live updates (optional)
//   const formValues = watch();

  // Load existing feedback from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user-feedback');
    if (saved) {
      const data = JSON.parse(saved);
      reset(data); // Pre-fill form with saved data
      onSave(data);
    }
  }, [reset, onSave]);

  // Form submission handler
  const onSubmit = (data: FeedbackData) => {
    localStorage.setItem('user-feedback', JSON.stringify(data));
    onSave(data);
  };

  // Reset form and localStorage
  const handleReset = () => {
    const defaultValues = {
      name: '',
      rating: '5',
      comment: '',
    };
    reset(defaultValues);
    localStorage.removeItem('user-feedback');
    onSave(defaultValues);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register('name',{required:true})}
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Your name"
        />
         {errors.name && <p className="text-red-500">Name is required.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select
          {...register('rating',{required:true})}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          {...register('comment')}
          className="w-full border px-3 py-2 rounded"
          rows={3}
          placeholder="Your feedback"
        />
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-blue px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
