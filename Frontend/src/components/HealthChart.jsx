import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the mental health chart
const generateMockData = () => {
  const data = [];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const wellnessScore = Math.min(85, Math.max(40, 40 + (30 - i) * 1.5 + (Math.random() * 10 - 5)));

    data.push({
      day,
      wellnessScore: Math.round(wellnessScore),
      anxietyLevel: Math.round(100 - wellnessScore + (Math.random() * 10 - 5)),
    });
  }

  return data;
};

const HealthChart = ({ isDarkMode }) => {
  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...chartData];
      const lastItem = newData[newData.length - 1];

      newData[newData.length - 1] = {
        ...lastItem,
        wellnessScore: Math.min(85, Math.max(40, lastItem.wellnessScore + (Math.random() * 4 - 2))),
      };

      setChartData(newData);
    }, 3000);

    return () => clearInterval(interval);
  }, [chartData]);

  // Dynamic styles based on dark/light mode
  const cardBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const cardText = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardSubText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const gridColor = isDarkMode ? '#4b5563' : '#e5e7eb';
  const tooltipBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const tooltipBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <Card className={`w-full shadow-lg ${cardBg} ${borderColor} border`}>
      <CardHeader>
        <CardTitle className={`text-lg md:text-xl ${cardText}`}>Mental Health Improvement</CardTitle>
        <CardDescription className={cardSubText}>30-day wellness trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: cardSubText }}
                tickFormatter={(value, index) => (index % 5 === 0 ? value : '')}
              />
              <YAxis tick={{ fontSize: 12, fill: cardSubText }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderRadius: '8px',
                  border: `1px solid ${tooltipBorder}`,
                  color: cardText,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="wellnessScore"
                name="Wellness Score"
                stroke={isDarkMode ? '#a5b4fc' : '#4f46e5'} // Indigo shades
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: isDarkMode ? '#a5b4fc' : '#4f46e5', stroke: 'white', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="anxietyLevel"
                name="Anxiety Level"
                stroke={isDarkMode ? '#f87171' : '#dc2626'} // Red shades
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: isDarkMode ? '#f87171' : '#dc2626', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChart;