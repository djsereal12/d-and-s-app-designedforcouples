export const COLORS = {
  primary: '#1E1B19',
  secondary: '#796F68',
  background: '#F3EFEA',
  card: '#F9F7F4',
  text: '#1A1817',
  textSecondary: '#6E665F',
  border: 'rgba(30,27,25,0.10)',
  success: '#5D6B5B',
  warning: '#A17C52',
  inputBg: '#F0ECE7',
};

export const MOOD_MAP: Record<string, { emoji: string; color: string; label: string }> = {
  happy:      { emoji: '😊', color: '#D8C49A', label: 'Happy' },
  sad:        { emoji: '😢', color: '#9AA7B1', label: 'Sad' },
  angry:      { emoji: '😠', color: '#BA7B5C', label: 'Angry' },
  anxious:    { emoji: '😰', color: '#B7A9B9', label: 'Anxious' },
  grateful:   { emoji: '🙏', color: '#9AA98F', label: 'Grateful' },
  frustrated: { emoji: '😤', color: '#C78C73', label: 'Frustrated' },
  loved:      { emoji: '🥰', color: '#C7A6A0', label: 'Loved' },
  neutral:    { emoji: '😐', color: '#A7A29B', label: 'Neutral' },
};

export const MOODS = Object.keys(MOOD_MAP) as (keyof typeof MOOD_MAP)[];

export const REFLECTION_TYPES = [
  { key: 'hard_time', label: 'Hard Time', color: '#B57B5C' },
  { key: 'good_time', label: 'Good Time', color: '#9AA98F' },
  { key: 'gratitude', label: 'Gratitude', color: '#D8C49A' },
  { key: 'growth',    label: 'Growth',    color: '#B7A9B9' },
  { key: 'general',   label: 'General',   color: '#A7A29B' },
];

export const GOAL_CATEGORIES = [
  { key: 'travel',       label: 'Travel',       emoji: '✈️' },
  { key: 'financial',    label: 'Financial',    emoji: '💰' },
  { key: 'health',       label: 'Health',       emoji: '💪' },
  { key: 'relationship', label: 'Relationship', emoji: '💑' },
  { key: 'family',       label: 'Family',       emoji: '👨‍👩‍👧' },
  { key: 'personal',     label: 'Personal',     emoji: '🌱' },
  { key: 'other',        label: 'Other',        emoji: '⭐' },
];

export const TODO_CATEGORIES = [
  { key: 'chore',    label: 'Chore',    emoji: '🧹' },
  { key: 'date',     label: 'Date',     emoji: '💕' },
  { key: 'errand',   label: 'Errand',   emoji: '🛒' },
  { key: 'activity', label: 'Activity', emoji: '🎉' },
  { key: 'other',    label: 'Other',    emoji: '📌' },
];

export const MEMORY_PROMPTS = [
  'Our happiest moment',
  'A place we love',
  'Something silly we did',
  'A challenge we overcame',
  'Date night',
  'Everyday magic',
];

export const THEME_COLORS = [
  '#2F2D2A', '#4F4A46', '#7E756E', '#B7A99F',
  '#D7CFC5', '#F1E8DF', '#9DA59F', '#78807D',
  '#A4A38C', '#8B8A76', '#C6B89E', '#E3D9C6',
  '#B9A89A', '#8E7E71', '#6D6258', '#D6CFCA',
  '#A4A5A0', '#7C7C7A', '#594F49', '#B4AEA0',
  '#9EA6A3', '#6A726E', '#D0C5B7', '#F5F0E8',
];

export const FONT_OPTIONS = [
  { key: 'System',         label: 'System',      fontFamily: undefined },
  { key: 'SpaceMono',      label: 'Space Mono',  fontFamily: 'SpaceMono' },
];
