# SVM Breast Cancer Classification - Student Project

A web application for students to document and share their Support Vector Machine (SVM) classification results for the breast cancer dataset.

## Project Overview

This project is designed for students completing Task 11 of their Machine Learning internship. It provides:

- **Task Overview**: Clear explanation of the SVM classification project requirements
- **Results Submission**: Form to submit your model performance metrics
- **Concept Learning**: Interactive explanations of key SVM concepts
- **Leaderboard**: Compare your results with other students

## Features

### 1. Home Page
- Complete task description and requirements
- Step-by-step implementation guide
- Learning outcomes

### 2. Submit Results
Students can submit:
- Student name
- Linear kernel accuracy
- RBF kernel accuracy
- Best C value (from GridSearchCV)
- Best Gamma value (from GridSearchCV)
- AUC score
- Notes and observations

### 3. Learn Concepts
Interactive explanations of:
- What is margin in SVM?
- Difference between Linear and RBF kernel
- Understanding the C parameter
- Understanding Gamma
- Why scaling is required for SVM

### 4. Leaderboard
- View all submitted results
- Compare accuracy scores
- Track progress across the class
- Statistics: highest accuracy, average AUC, total submissions

## Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and add your Supabase credentials
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Schema

The application uses a single table `student_results` with the following structure:

- `id`: Unique identifier
- `student_name`: Student's name
- `linear_accuracy`: Accuracy with linear kernel (%)
- `rbf_accuracy`: Accuracy with RBF kernel (%)
- `best_c_value`: Optimal C parameter from tuning
- `best_gamma_value`: Optimal gamma parameter from tuning
- `auc_score`: Area Under Curve score
- `confusion_matrix`: JSON object storing confusion matrix
- `notes`: Student observations and notes
- `created_at`: Submission timestamp
- `updated_at`: Last update timestamp

## For Students

### Completing the Task

1. Work on your Python notebook using scikit-learn
2. Train SVM models with Linear and RBF kernels
3. Use GridSearchCV to tune hyperparameters
4. Generate ROC curve and calculate AUC score
5. Submit your results through this web application
6. Review concepts and compare with classmates

### Learning Resources

The "Learn Concepts" page provides detailed explanations of:
- SVM fundamentals
- Kernel functions
- Hyperparameter tuning
- Model evaluation metrics

## Project Structure

```
src/
├── components/
│   └── Navigation.tsx       # Main navigation bar
├── pages/
│   ├── HomePage.tsx         # Task overview and introduction
│   ├── SubmitPage.tsx       # Results submission form
│   ├── ConceptsPage.tsx     # Learning concepts
│   └── LeaderboardPage.tsx  # Results comparison
├── lib/
│   └── supabase.ts          # Database client configuration
├── App.tsx                  # Main application component
└── main.tsx                 # Application entry point
```

## Security

- Row Level Security (RLS) is enabled on the database
- Public read access for educational transparency
- Anonymous submissions allowed for ease of use
- No authentication required (suitable for classroom environment)

## Future Enhancements

Potential improvements for this project:
- User authentication for personalized dashboards
- Upload confusion matrix visualizations
- ROC curve image display
- Export results to CSV
- Detailed model comparison analytics
- Comments and discussion features

## License

This project is created for educational purposes as part of the Machine Learning Internship program.

## Support

For questions or issues:
- Review the "Learn Concepts" section
- Check the task submission guidelines
- Consult with your instructor or peers

---

Happy Learning and Good Luck with your SVM Classification Project!
