const categoryColors: Record<string, string> = {
  '学校・勉強': 'bg-blue-100 text-blue-700 border-blue-200',
  '友人関係': 'bg-green-100 text-green-700 border-green-200',
  '恋愛': 'bg-pink-100 text-pink-700 border-pink-200',
  '家族': 'bg-orange-100 text-orange-700 border-orange-200',
  '進路・就職': 'bg-purple-100 text-purple-700 border-purple-200',
  'メンタルヘルス': 'bg-teal-100 text-teal-700 border-teal-200',
  'その他': 'bg-gray-100 text-gray-600 border-gray-200',
};

const categoryIcons: Record<string, string> = {
  '学校・勉強': '📚',
  '友人関係': '🤝',
  '恋愛': '💕',
  '家族': '🏠',
  '進路・就職': '🎯',
  'メンタルヘルス': '🌱',
  'その他': '💭',
};

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  const icon = categoryIcons[category] ?? '💭';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      <span>{icon}</span>
      <span>{category}</span>
    </span>
  );
}
