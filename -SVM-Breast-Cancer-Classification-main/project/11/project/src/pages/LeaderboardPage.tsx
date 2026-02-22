import { useState, useEffect } from 'react';
import { supabase, type StudentResult } from '../lib/supabase';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';

export default function LeaderboardPage() {
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('student_results')
        .select('*')
        .order('rbf_accuracy', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">Top performing students in SVM classification</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <Trophy className="text-blue-600" size={32} />
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <Trophy className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Results Yet
          </h3>
          <p className="text-gray-600">
            Be the first to submit your results and appear on the leaderboard!
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Linear Acc
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    RBF Acc
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    AUC Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr
                    key={result.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {index === 0 && (
                          <Trophy className="text-yellow-500" size={20} />
                        )}
                        <span className="font-semibold text-gray-900">
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {result.student_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">
                        {result.linear_accuracy?.toFixed(2) || '-'}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="text-green-600" size={16} />
                        <span className="font-semibold text-gray-900">
                          {result.rbf_accuracy?.toFixed(2) || '-'}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">
                        {result.auc_score?.toFixed(4) || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <Calendar size={14} />
                        <span>{result.created_at ? formatDate(result.created_at) : '-'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Highest RBF Accuracy
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {Math.max(...results.map((r) => r.rbf_accuracy || 0)).toFixed(2)}%
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Average AUC Score
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {(
                results.reduce((acc, r) => acc + (r.auc_score || 0), 0) /
                results.length
              ).toFixed(4)}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Submissions
            </h3>
            <p className="text-3xl font-bold text-gray-900">{results.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
