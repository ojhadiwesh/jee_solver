import { PrismaClient } from '@prisma/client';
import { physicsQuestions } from '../app/data/physicsQuestions';
import { chemistryQuestions } from '../app/data/chemistryQuestions';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.option.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.subject.deleteMany();

    console.log('Cleared existing data');

    // Create subjects
    const physics = await prisma.subject.create({
      data: {
        name: 'Physics',
        description: 'JEE Physics syllabus organized by NCERT chapters'
      }
    });

    const chemistry = await prisma.subject.create({
      data: {
        name: 'Chemistry',
        description: 'JEE Chemistry syllabus organized by NCERT chapters'
      }
    });

    console.log('Created subjects');

    // Create topics and questions for Physics
    for (const [topicName, subtopics] of Object.entries(physicsQuestions)) {
      console.log(`Creating topic: ${topicName}`);
      
      const topic = await prisma.topic.create({
        data: {
          name: topicName,
          subject: { connect: { id: physics.id } }
        }
      });

      for (const [subtopicName, problems] of Object.entries(subtopics)) {
        console.log(`Creating problems for subtopic: ${subtopicName}`);
        
        for (const problem of problems) {
          await prisma.problem.create({
            data: {
              title: problem.title,
              description: problem.description,
              difficulty: problem.difficulty,
              timeLimit: problem.timeLimit,
              type: problem.type,
              subject: { connect: { id: physics.id } },
              topic: { connect: { id: topic.id } },
              options: {
                create: problem.options.map(opt => ({
                  text: opt.text,
                  isCorrect: opt.isCorrect
                }))
              }
            }
          });
        }
      }
    }

    // Create topics and questions for Chemistry
    for (const [topicName, subtopics] of Object.entries(chemistryQuestions)) {
      console.log(`Creating topic: ${topicName}`);
      
      const topic = await prisma.topic.create({
        data: {
          name: topicName,
          subject: { connect: { id: chemistry.id } }
        }
      });

      for (const [subtopicName, problems] of Object.entries(subtopics)) {
        console.log(`Creating problems for subtopic: ${subtopicName}`);
        
        for (const problem of problems) {
          await prisma.problem.create({
            data: {
              title: problem.title,
              description: problem.description,
              difficulty: problem.difficulty,
              timeLimit: problem.timeLimit,
              type: problem.type,
              subject: { connect: { id: chemistry.id } },
              topic: { connect: { id: topic.id } },
              options: {
                create: problem.options.map(opt => ({
                  text: opt.text,
                  isCorrect: opt.isCorrect
                }))
              }
            }
          });
        }
      }
    }

    console.log('Database has been seeded! 🌱');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 