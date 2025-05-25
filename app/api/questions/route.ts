import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { TestConfig, Problem } from '../../types/problem';

export async function POST(request: Request) {
  try {
    const config: TestConfig = await request.json();
    console.log('Received config:', config);
    
    // Validate config
    if (!config.subjects || !Array.isArray(config.subjects) || config.subjects.length === 0) {
      console.error('Invalid subjects in config:', config.subjects);
      return NextResponse.json(
        { error: 'Invalid subjects configuration' },
        { status: 400 }
      );
    }

    // Build the where clause
    const whereClause: any = {
      AND: [
        {
          subject: {
            name: {
              in: config.subjects
            }
          }
        }
      ]
    };

    // Only add topic filter if topics are specified
    if (config.topics && config.topics.length > 0) {
      whereClause.AND.push({
        topic: {
          name: {
            in: config.topics
          }
        }
      });
    }

    // Only add difficulty filter if specified
    if (config.difficulty) {
      whereClause.AND.push({
        difficulty: config.difficulty
      });
    }

    console.log('Query where clause:', JSON.stringify(whereClause, null, 2));

    try {
      // First check if we can connect to the database
      await prisma.$connect();
      console.log('Successfully connected to database');

      // Fetch questions based on config
      const questions = await prisma.problem.findMany({
        where: whereClause,
        include: {
          subject: {
            select: {
              name: true
            }
          },
          topic: {
            select: {
              name: true,
              description: true
            }
          },
          options: true
        },
        take: config.numberOfQuestions
      });

      console.log(`Found ${questions.length} questions`);

      if (questions.length === 0) {
        console.log('No questions found. Checking database state...');
        
        // Check what subjects exist
        const subjects = await prisma.subject.findMany({
          select: { name: true }
        });
        console.log('Available subjects:', subjects);

        // Check what topics exist in the database
        const topics = await prisma.topic.findMany({
          select: {
            name: true,
            subject: {
              select: { name: true }
            }
          }
        });
        console.log('Available topics:', topics);

        // Check what problems exist
        const problemCount = await prisma.problem.count();
        console.log('Total problems in database:', problemCount);

        // Check problems for the specific subject
        const subjectProblems = await prisma.problem.count({
          where: {
            subject: {
              name: {
                in: config.subjects
              }
            }
          }
        });
        console.log(`Problems for subjects ${config.subjects.join(', ')}:`, subjectProblems);

        // If no questions found but database has data, return empty array
        return NextResponse.json([]);
      }

      // Format questions to match our Problem type
      const formattedQuestions = questions.map((q: any): Problem => ({
        id: q.id,
        title: q.title,
        description: q.description,
        subject: q.subject.name as 'Physics' | 'Chemistry' | 'Mathematics',
        topic: q.topic.name,
        subtopic: q.topic.name, // Using topic name as subtopic for now
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
        timeLimit: q.timeLimit,
        type: q.type as 'Single Choice' | 'Multiple Choice',
        options: q.options.map((opt: any) => ({
          text: opt.text,
          isCorrect: opt.isCorrect
        }))
      }));

      return NextResponse.json(formattedQuestions);
    } catch (error) {
      console.error('Database operation failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Database operation failed');
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error('Error in questions API:', error);
    // Return a more detailed error message
    return NextResponse.json(
      { 
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 