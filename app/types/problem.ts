export type Subject = string;
export type Topic = string;
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'Single Choice' | 'Multiple Choice' | 'Numerical';

export interface Problem {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  topic: Topic;
  subtopic?: string;
  difficulty: Difficulty;
  timeLimit: number;
  type: QuestionType;
  options: Option[];
  hint?: string;
  solution?: string;
  formulaSheet?: string;
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface TestConfig {
  subjects: Subject[];
  topics: Topic[];
  difficulty: Difficulty;
  duration: number;
  numberOfQuestions: number;
} 