import { HelpCircle } from 'lucide-react';

export default function ConceptsPage() {
  const concepts = [
    {
      question: 'What is margin in SVM?',
      answer:
        'The margin is the distance between the decision boundary (hyperplane) and the nearest data points from each class. SVM tries to maximize this margin to create the best separation between classes. A larger margin generally leads to better generalization on unseen data.',
    },
    {
      question: 'Difference between Linear and RBF Kernel?',
      answer:
        'Linear kernel works best for linearly separable data and creates a straight decision boundary. RBF (Radial Basis Function) kernel can handle non-linear data by mapping it to a higher dimension, creating curved decision boundaries. RBF is more flexible but may overfit with wrong parameters.',
    },
    {
      question: 'What is C parameter?',
      answer:
        'C is the regularization parameter that controls the trade-off between maximizing the margin and minimizing classification errors. A small C creates a wider margin but may misclassify some points. A large C creates a narrower margin but tries to classify all training points correctly, which may lead to overfitting.',
    },
    {
      question: 'What is Gamma?',
      answer:
        'Gamma defines how far the influence of a single training example reaches in RBF kernel. Low gamma means points far apart are considered similar (smooth decision boundary). High gamma means only close points are considered similar (complex, tight decision boundary). High gamma can lead to overfitting.',
    },
    {
      question: 'Why is scaling required for SVM?',
      answer:
        'SVM is sensitive to the scale of features because it relies on distance calculations. Features with larger ranges can dominate the decision boundary. Scaling (using StandardScaler) ensures all features contribute equally, leading to better model performance and faster convergence during training.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Key SVM Concepts</h1>
      <p className="text-gray-600 mb-8">
        Understanding these concepts will help you master Support Vector Machines.
      </p>

      <div className="space-y-6">
        {concepts.map((concept, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mt-1">
                <HelpCircle className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {concept.question}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed ml-11">{concept.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">Pro Tip</h3>
        <p className="text-gray-700">
          When tuning hyperparameters, start with a wide range of values and narrow
          down. Use cross-validation to avoid overfitting. The goal is to find the
          best balance between model complexity and generalization.
        </p>
      </div>
    </div>
  );
}
