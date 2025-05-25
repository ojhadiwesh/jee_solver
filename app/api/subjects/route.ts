import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        topics: {
          select: {
            id: true,
            name: true,
            description: true,
            problems: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Transform the data to include problem counts
    const transformedSubjects = subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      topics: subject.topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        description: topic.description,
        problemCount: topic.problems.length,
      })),
    }));

    return NextResponse.json(transformedSubjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
} 