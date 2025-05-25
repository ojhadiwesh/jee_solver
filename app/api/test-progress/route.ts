import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../lib/prisma';

// Save test progress
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { testId, answers, timeRemaining, selectedTopic, config } = data;

    const progress = await prisma.testProgress.upsert({
      where: {
        userEmail_testId: {
          userEmail: session.user.email,
          testId: testId,
        },
      },
      update: {
        answers,
        timeRemaining,
        selectedTopic,
        config,
        lastUpdated: new Date(),
      },
      create: {
        userEmail: session.user.email,
        testId,
        answers,
        timeRemaining,
        selectedTopic,
        config,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error saving test progress:', error);
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}

// Get test progress
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('testId');

    if (!testId) {
      return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
    }

    const progress = await prisma.testProgress.findUnique({
      where: {
        userEmail_testId: {
          userEmail: session.user.email,
          testId: testId,
        },
      },
    });

    return NextResponse.json(progress || null);
  } catch (error) {
    console.error('Error fetching test progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

// Delete test progress
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('testId');

    if (!testId) {
      return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
    }

    await prisma.testProgress.delete({
      where: {
        userEmail_testId: {
          userEmail: session.user.email,
          testId: testId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting test progress:', error);
    return NextResponse.json({ error: 'Failed to delete progress' }, { status: 500 });
  }
} 