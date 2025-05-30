import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { FeedbackData, Props } from "../shared/feedback.interface";
import { defaultValue, ratingOptions } from "../shared/feedback.data";

const FeedbackForm: React.FC<Props> = ({ onSave, isEdit }) => {
  // Initialize react-hook-form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackData>({
    defaultValues: {
      ...defaultValue,
    },
  });

  // Load existing feedback from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user-feedback");
    if (saved) {
      const data = JSON.parse(saved);
      if (isEdit) reset(data);
      else reset(defaultValue); // Pre-fill form with saved data
    }
  }, [isEdit, reset]);

  // Form submission handler
  const onSubmit = (data: FeedbackData) => {
    localStorage.setItem("user-feedback", JSON.stringify(data));
    onSave(data);
    reset(defaultValue);
  };

  // Reset form and localStorage
  const handleReset = () => {
    reset(defaultValue);
    localStorage.removeItem("user-feedback");
    onSave(defaultValue);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow-md space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Your name"
        />
        {errors.name && <p className="text-red-500">Name is required.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select
          {...register("rating", { required: true })}
          className="w-full border px-3 py-2 rounded"
        >
          {ratingOptions.map((rate: any) => {
            return <option key={rate.value} value={rate.value}>{rate.label}</option>;
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          {...register("comment")}
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
