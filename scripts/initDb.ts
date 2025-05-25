import 'dotenv/config';
import connectDB from '../lib/db';
import User from '../models/User';
import Subject from '../models/Subject';
import Topic from '../models/Topic';
import Problem from '../models/Problem';

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected successfully!');

    // Clear existing data
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Topic.deleteMany({});
    await Problem.deleteMany({});

    // Create sample subjects
    const subjects = await Subject.create([
      { name: 'Physics', description: 'Study of matter and energy' },
      { name: 'Chemistry', description: 'Study of substances and their interactions' },
      { name: 'Mathematics', description: 'Study of numbers, quantities, and shapes' }
    ]);

    // Create sample topics for each subject
    const physicsTopics = await Topic.create([
      { name: 'Mechanics', description: 'Study of motion and forces', subject: subjects[0]._id },
      { name: 'Thermodynamics', description: 'Study of heat and temperature', subject: subjects[0]._id },
    ]);

    const chemistryTopics = await Topic.create([
      { name: 'Organic Chemistry', description: 'Study of carbon compounds', subject: subjects[1]._id },
      { name: 'Inorganic Chemistry', description: 'Study of non-carbon compounds', subject: subjects[1]._id },
    ]);

    const mathsTopics = await Topic.create([
      { name: 'Calculus', description: 'Study of continuous change', subject: subjects[2]._id },
      { name: 'Algebra', description: 'Study of mathematical symbols', subject: subjects[2]._id },
    ]);

    // Create sample problems
    await Problem.create([
      {
        title: 'Newton\'s Laws Problem',
        description: 'A block slides down an inclined plane. Calculate the acceleration.',
        difficulty: 'Medium',
        timeLimit: 5,
        type: 'Single Choice',
        topic: physicsTopics[0]._id,
        solution: 'Use F = ma and resolve forces along the plane',
        subject: subjects[0]._id,
        options: [
          { text: '9.8 m/s²', isCorrect: false },
          { text: '4.9 m/s²', isCorrect: true },
          { text: '2.45 m/s²', isCorrect: false },
          { text: '0 m/s²', isCorrect: false }
        ]
      },
      {
        title: 'Organic Chemistry Nomenclature',
        description: 'Name the following compound: CH3-CH2-OH',
        difficulty: 'Easy',
        timeLimit: 3,
        type: 'Single Choice',
        topic: chemistryTopics[0]._id,
        solution: 'The compound is Ethanol',
        subject: subjects[1]._id,
        options: [
          { text: 'Methanol', isCorrect: false },
          { text: 'Ethanol', isCorrect: true },
          { text: 'Propanol', isCorrect: false },
          { text: 'Butanol', isCorrect: false }
        ]
      },
      {
        title: 'Differential Calculus',
        description: 'Find the derivative of f(x) = x² + 2x + 1',
        difficulty: 'Easy',
        timeLimit: 4,
        type: 'Single Choice',
        topic: mathsTopics[0]._id,
        solution: 'f\'(x) = 2x + 2',
        subject: subjects[2]._id,
        options: [
          { text: 'x² + 2', isCorrect: false },
          { text: '2x + 2', isCorrect: true },
          { text: '2x + 1', isCorrect: false },
          { text: 'x + 2', isCorrect: false }
        ]
      },
    ]);

    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 