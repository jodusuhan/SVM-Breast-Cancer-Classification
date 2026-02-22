import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type StudentResult = {
  id?: string;
  student_name: string;
  linear_accuracy: number | null;
  rbf_accuracy: number | null;
  best_c_value: number | null;
  best_gamma_value: number | null;
  auc_score: number | null;
  confusion_matrix: number[][] | null;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
};
