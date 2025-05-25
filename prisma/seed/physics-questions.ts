import { PrismaClient, Prisma } from '.prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Physics topics and their subtopics with weights (to distribute questions proportionally)
const physicsTopics = {
  'Mechanics': {
    weight: 0.25, // 25% of questions
    subtopics: [
      'Kinematics',
      'Laws of Motion',
      'Work, Energy and Power',
      'Rotational Motion',
      'Gravitation',
      'Properties of Matter',
    ]
  },
  'Thermodynamics': {
    weight: 0.15, // 15% of questions
    subtopics: [
      'Heat and Temperature',
      'Kinetic Theory of Gases',
      'Laws of Thermodynamics',
      'Heat Transfer',
      'Thermal Properties of Matter',
    ]
  },
  'Waves and Sound': {
    weight: 0.15, // 15% of questions
    subtopics: [
      'Wave Motion',
      'Sound Waves',
      'Doppler Effect',
      'Musical Instruments',
      'Standing Waves',
    ]
  },
  'Optics': {
    weight: 0.15, // 15% of questions
    subtopics: [
      'Ray Optics',
      'Wave Optics',
      'Optical Instruments',
      'Interference',
      'Diffraction',
    ]
  },
  'Electricity and Magnetism': {
    weight: 0.15, // 15% of questions
    subtopics: [
      'Electrostatics',
      'Current Electricity',
      'Magnetic Effects',
      'Electromagnetic Induction',
      'AC Circuits',
    ]
  },
  'Modern Physics': {
    weight: 0.15, // 15% of questions
    subtopics: [
      'Photoelectric Effect',
      'Nuclear Physics',
      'Quantum Mechanics',
      'Relativity',
      'Atomic Structure',
    ]
  },
};

// Question templates for different types of problems
const questionTemplates = {
  calculation: [
    "Calculate {quantity} when {parameter1} is {value1} and {parameter2} is {value2}.",
    "Find the {quantity} of a {object} with {parameter1} = {value1} and {parameter2} = {value2}.",
    "Determine the {quantity} if {parameter1} changes from {value1} to {value2}.",
    "What is the {quantity} required for a {object} to {action} with {parameter1} = {value1}?",
    "If {parameter1} is {value1}, calculate the resulting {quantity} when {parameter2} becomes {value2}.",
  ],
  conceptual: [
    "Explain what happens to {quantity} when {parameter} {action}.",
    "Which principle explains why {phenomenon} occurs when {condition}?",
    "Compare the behavior of {object1} and {object2} under {condition}.",
    "How does {quantity} change when {parameter} increases?",
    "What is the relationship between {quantity} and {parameter} in this scenario?",
  ],
};

// Physical quantities and their units with realistic ranges
const quantities = {
  force: { name: 'force', unit: 'N', range: [1, 1000] },
  velocity: { name: 'velocity', unit: 'm/s', range: [0, 100] },
  acceleration: { name: 'acceleration', unit: 'm/s²', range: [0, 20] },
  energy: { name: 'energy', unit: 'J', range: [1, 10000] },
  power: { name: 'power', unit: 'W', range: [1, 1000] },
  temperature: { name: 'temperature', unit: 'K', range: [273, 1000] },
  pressure: { name: 'pressure', unit: 'Pa', range: [1000, 100000] },
  frequency: { name: 'frequency', unit: 'Hz', range: [1, 1000] },
  wavelength: { name: 'wavelength', unit: 'm', range: [0.1, 10] },
  current: { name: 'current', unit: 'A', range: [0.1, 10] },
  voltage: { name: 'voltage', unit: 'V', range: [1, 1000] },
  resistance: { name: 'resistance', unit: 'Ω', range: [1, 1000] },
};

// Helper functions
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateValue(quantity: keyof typeof quantities): string {
  const { range, unit } = quantities[quantity];
  const value = randomInRange(range[0], range[1]);
  return `${value} ${unit}`;
}

function generateOptions(correctAnswer: string): Omit<Prisma.OptionCreateInput, 'problem'>[] {
  const [value, unit] = correctAnswer.split(' ');
  const correctValue = parseFloat(value);
  
  // Generate wrong answers with realistic variations
  const variations = [0.7, 1.3, 1.5, 0.5].slice(0, 3);
  const wrongAnswers = variations.map(v => ({
    text: `${(correctValue * v).toFixed(2)} ${unit}`,
    isCorrect: false
  }));
  
  return [...wrongAnswers, { text: correctAnswer, isCorrect: true }]
    .sort(() => Math.random() - 0.5);
}

function generateQuestion(
  topic: string,
  subtopic: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  subjectId: string,
  topicId: string
): Prisma.ProblemCreateInput {
  const questionType = Math.random() < 0.7 ? 'calculation' : 'conceptual';
  const template = questionTemplates[questionType][Math.floor(Math.random() * questionTemplates[questionType].length)];
  
  const quantity = Object.keys(quantities)[Math.floor(Math.random() * Object.keys(quantities).length)] as keyof typeof quantities;
  const correctAnswer = generateValue(quantity);
  
  const title = `${topic} - ${subtopic}`;
  const description = template
    .replace('{quantity}', quantities[quantity].name)
    .replace('{parameter1}', Object.keys(quantities)[Math.floor(Math.random() * Object.keys(quantities).length)])
    .replace('{parameter2}', Object.keys(quantities)[Math.floor(Math.random() * Object.keys(quantities).length)])
    .replace('{value1}', generateValue(quantity))
    .replace('{value2}', generateValue(quantity))
    .replace('{object}', ['particle', 'body', 'system', 'object'][Math.floor(Math.random() * 4)])
    .replace('{action}', ['moves', 'accelerates', 'rotates', 'oscillates'][Math.floor(Math.random() * 4)])
    .replace('{phenomenon}', ['motion', 'acceleration', 'energy transfer', 'oscillation'][Math.floor(Math.random() * 4)])
    .replace('{condition}', ['constant force', 'varying temperature', 'uniform field', 'periodic motion'][Math.floor(Math.random() * 4)]);

  return {
    id: uuidv4(),
    title,
    description,
    difficulty,
    timeLimit: difficulty === 'Easy' ? 2 : difficulty === 'Medium' ? 3 : 4,
    type: 'Single Choice',
    subject: { connect: { id: subjectId } },
    topic: { connect: { id: topicId } },
    options: {
      create: generateOptions(correctAnswer)
    }
  };
}

async function seedPhysicsQuestions() {
  try {
    console.log('Starting physics questions seeding...');

    // Get or create Physics subject
    const physics = await prisma.subject.upsert({
      where: { name: 'Physics' },
      update: {},
      create: {
        name: 'Physics',
        description: 'Study of matter, energy, and their interactions',
      },
    });

    let totalQuestionsCreated = 0;
    const TOTAL_QUESTIONS = 500;

    // Create topics and questions
    for (const [topicName, topicData] of Object.entries(physicsTopics)) {
      // Calculate questions for this topic based on weight
      const topicQuestions = Math.floor(TOTAL_QUESTIONS * topicData.weight);
      const questionsPerSubtopic = Math.floor(topicQuestions / topicData.subtopics.length);
      
      console.log(`\nCreating ${topicQuestions} questions for ${topicName}...`);

      // Create topic
      const dbTopic = await prisma.topic.create({
        data: {
          name: topicName,
          description: `Questions related to ${topicName}`,
          subject: { connect: { id: physics.id } },
        },
      });

      // Generate questions for each subtopic
      for (const subtopic of topicData.subtopics) {
        console.log(`  - Generating ${questionsPerSubtopic} questions for ${subtopic}`);

        // Create questions with distributed difficulty
        const questions = Array(questionsPerSubtopic).fill(null).map(() => {
          const rand = Math.random();
          const difficulty = rand < 0.4 ? 'Easy' : rand < 0.7 ? 'Medium' : 'Hard';
          return generateQuestion(topicName, subtopic, difficulty, physics.id, dbTopic.id);
        });

        // Batch create questions
        await Promise.all(
          questions.map(question =>
            prisma.problem.create({
              data: question,
            })
          )
        );

        totalQuestionsCreated += questionsPerSubtopic;
      }
    }

    // Create remaining questions if needed due to rounding
    if (totalQuestionsCreated < TOTAL_QUESTIONS) {
      const remaining = TOTAL_QUESTIONS - totalQuestionsCreated;
      console.log(`\nCreating ${remaining} additional questions to reach total of 500...`);
      
      // Add remaining questions to Mechanics (main topic)
      const mechanicsTopic = await prisma.topic.findFirst({
        where: { name: 'Mechanics' },
      });

      const remainingQuestions = Array(remaining).fill(null).map(() => {
        const difficulty = Math.random() < 0.4 ? 'Easy' : Math.random() < 0.7 ? 'Medium' : 'Hard';
        return generateQuestion('Mechanics', 'Kinematics', difficulty, physics.id, mechanicsTopic!.id);
      });

      await Promise.all(
        remainingQuestions.map(question =>
          prisma.problem.create({
            data: question,
          })
        )
      );

      totalQuestionsCreated += remaining;
    }

    console.log(`\nSuccessfully created ${totalQuestionsCreated} physics questions!`);
  } catch (error) {
    console.error('Error seeding physics questions:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the seeding
seedPhysicsQuestions()
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 