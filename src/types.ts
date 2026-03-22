export interface DiaryEntry {
  id: string;
  date: string;
  dayOfWeek: string;
  title: string;
  content: string;
  intensity: number;
  tendency: number;
  colors: string[];
  image: string;
  generatedLandscape?: string;
  score: string;
  timestamp: number;
}
