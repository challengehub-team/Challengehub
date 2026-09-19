import { motion } from "framer-motion";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl w-80 text-center"
      >
        <h2 className="text-lg font-semibold mb-4">
          Submit Exam?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to submit your answers?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Yes, Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;