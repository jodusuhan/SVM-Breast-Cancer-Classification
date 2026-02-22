import { CheckCircle, Code, Database, LineChart } from 'lucide-react';

type HomePageProps = {
  onNavigate: (page: string) => void;
};

export default function HomePage({ onNavigate }: HomePageProps) {
  const steps = [
    {
      title: 'Load & Inspect Dataset',
      description: 'Use sklearn breast cancer dataset and explore features',
      icon: Database,
    },
    {
      title: 'Preprocess Data',
      description: 'Apply StandardScaler and split into train-test sets',
      icon: Code,
    },
    {
      title: 'Train Models',
      description: 'Train SVM with Linear and RBF kernels, tune parameters',
      icon: LineChart,
    },
    {
      title: 'Evaluate & Save',
      description: 'Generate ROC curve, confusion matrix, and save model',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Task 11: SVM Classification Project
        </h1>
        <p className="text-xl text-gray-600">
          Build a Support Vector Machine model to classify breast cancer cases
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">
          Project Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Dataset:</strong> Sklearn Breast Cancer Dataset
          </div>
          <div>
            <strong>Tools:</strong> Python, Scikit-learn, Matplotlib
          </div>
          <div>
            <strong>Goal:</strong> Build and tune SVM classifier
          </div>
          <div>
            <strong>Deliverables:</strong> Notebook, ROC curve, Saved model
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Implementation Steps
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-green-900 mb-2">Learning Outcome</h3>
        <p className="text-gray-700">
          By completing this task, you will understand kernel-based classification,
          hyperparameter tuning with GridSearchCV, and model evaluation techniques
          including ROC-AUC analysis.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate('submit')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Submit Your Results
        </button>
      </div>
    </div>
  );
}
