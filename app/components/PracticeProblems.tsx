import React from 'react';
import Link from 'next/link';

interface ProblemCardProps {
  title: string;
  subject: string;
  difficulty: string;
  topic: string;
  solvedCount: number;
  href: string;
}

const ProblemCard = ({ title, subject, difficulty, topic, solvedCount, href }: ProblemCardProps) => (
  <div className="border rounded-lg p-6 bg-white">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <div className="flex gap-2 mb-3">
      <span className={`px-3 py-1 rounded-full text-sm ${
        subject === 'Physics' ? 'bg-blue-100 text-blue-800' :
        subject === 'Chemistry' ? 'bg-green-100 text-green-800' :
        'bg-purple-100 text-purple-800'
      }`}>
        {subject}
      </span>
      <span className={`px-3 py-1 rounded-full text-sm ${
        difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {difficulty}
      </span>
    </div>
    <p className="text-gray-600 mb-2">Topic: {topic}</p>
    <p className="text-gray-600 mb-4">Solved by {solvedCount} students</p>
    <Link 
      href={href}
      className="block w-full text-center bg-[#2563EB] text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
      Solve Now
    </Link>
  </div>
);

const SubjectTabs = ({ subject }: { subject: string }) => {
  const tabs = {
    Physics: ['Mechanics', 'Electromagnetism', 'Modern Physics', 'Thermodynamics', 'Optics'],
    Chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Equilibrium', 'Thermochemistry'],
    Mathematics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors']
  };

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {tabs[subject as keyof typeof tabs]?.map((tab) => (
        <button
          key={tab}
          className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const PracticeProblems = () => {
  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const problems = [
    {
      title: 'Projectile Motion',
      subject: 'Physics',
      difficulty: 'Medium',
      topic: 'Mechanics',
      solvedCount: 458,
      href: '/problems/projectile-motion'
    },
    {
      title: 'Electric Field Calculation',
      subject: 'Physics',
      difficulty: 'Hard',
      topic: 'Electromagnetism',
      solvedCount: 458,
      href: '/problems/electric-field'
    },
    {
      title: 'Reaction Equilibrium',
      subject: 'Chemistry',
      difficulty: 'Medium',
      topic: 'Physical Chemistry',
      solvedCount: 458,
      href: '/problems/reaction-equilibrium'
    },
    {
      title: 'Organic Compound Identification',
      subject: 'Chemistry',
      difficulty: 'Hard',
      topic: 'Organic Chemistry',
      solvedCount: 458,
      href: '/problems/organic-compound'
    },
    {
      title: 'Definite Integration',
      subject: 'Mathematics',
      difficulty: 'Hard',
      topic: 'Calculus',
      solvedCount: 458,
      href: '/problems/definite-integration'
    },
    {
      title: 'Complex Numbers',
      subject: 'Mathematics',
      difficulty: 'Medium',
      topic: 'Algebra',
      solvedCount: 458,
      href: '/problems/complex-numbers'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Practice Problems by Subject</h2>
        
        {subjects.map((subject, index) => (
          <div key={subject} className={`mb-16 ${index === subjects.length - 1 ? '' : 'border-b pb-16'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-[#2563EB]">{subject}</h3>
              <Link 
                href={`/${subject.toLowerCase()}`}
                className="text-[#2563EB] hover:underline"
              >
                View All {subject} Problems
                <span className="block text-sm text-gray-500">500+ problems available</span>
              </Link>
            </div>
            
            <SubjectTabs subject={subject} />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {problems
                .filter(problem => problem.subject === subject)
                .map((problem, idx) => (
                  <ProblemCard key={idx} {...problem} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeProblems; 