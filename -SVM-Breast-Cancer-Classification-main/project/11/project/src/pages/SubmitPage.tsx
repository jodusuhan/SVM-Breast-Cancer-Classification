import { useState } from 'react';
import { supabase, type StudentResult } from '../lib/supabase';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    student_name: '',
    linear_accuracy: '',
    rbf_accuracy: '',
    best_c_value: '',
    best_gamma_value: '',
    auc_score: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const result: StudentResult = {
        student_name: formData.student_name,
        linear_accuracy: formData.linear_accuracy ? parseFloat(formData.linear_accuracy) : null,
        rbf_accuracy: formData.rbf_accuracy ? parseFloat(formData.rbf_accuracy) : null,
        best_c_value: formData.best_c_value ? parseFloat(formData.best_c_value) : null,
        best_gamma_value: formData.best_gamma_value ? parseFloat(formData.best_gamma_value) : null,
        auc_score: formData.auc_score ? parseFloat(formData.auc_score) : null,
        confusion_matrix: null,
        notes: formData.notes || null,
      };

      const { error } = await supabase.from('student_results').insert([result]);

      if (error) throw error;

      setStatus('success');
      setMessage('Results submitted successfully!');
      setFormData({
        student_name: '',
        linear_accuracy: '',
        rbf_accuracy: '',
        best_c_value: '',
        best_gamma_value: '',
        auc_score: '',
        notes: '',
      });

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit results. Please try again.');
      console.error('Error submitting results:', error);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Results</h1>
      <p className="text-gray-600 mb-8">
        Enter the results from your SVM classification experiment below.
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Linear Kernel Accuracy (%)
            </label>
            <input
              type="number"
              step="0.01"
              name="linear_accuracy"
              value={formData.linear_accuracy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 95.50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RBF Kernel Accuracy (%)
            </label>
            <input
              type="number"
              step="0.01"
              name="rbf_accuracy"
              value={formData.rbf_accuracy}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 97.20"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best C Value
            </label>
            <input
              type="number"
              step="any"
              name="best_c_value"
              value={formData.best_c_value}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best Gamma Value
            </label>
            <input
              type="number"
              step="any"
              name="best_gamma_value"
              value={formData.best_gamma_value}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 0.001"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AUC Score
          </label>
          <input
            type="number"
            step="0.0001"
            name="auc_score"
            value={formData.auc_score}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 0.9850"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes / Observations
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any observations or challenges you faced..."
          />
        </div>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-800">
            <CheckCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-800">
            <AlertCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Results'}
        </button>
      </form>
    </div>
  );
}
