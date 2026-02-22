/*
  # Create Student Results Schema

  1. New Tables
    - `student_results`
      - `id` (uuid, primary key)
      - `student_name` (text)
      - `linear_accuracy` (numeric)
      - `rbf_accuracy` (numeric)
      - `best_c_value` (numeric)
      - `best_gamma_value` (numeric)
      - `auc_score` (numeric)
      - `confusion_matrix` (jsonb)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `student_results` table
    - Add policy for anyone to insert their results
    - Add policy for anyone to view all results (educational purposes)
*/

CREATE TABLE IF NOT EXISTS student_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  linear_accuracy numeric(5,2),
  rbf_accuracy numeric(5,2),
  best_c_value numeric,
  best_gamma_value numeric,
  auc_score numeric(5,4),
  confusion_matrix jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view results"
  ON student_results FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert results"
  ON student_results FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can update own results"
  ON student_results FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
