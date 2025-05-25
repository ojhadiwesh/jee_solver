import 'dotenv/config';
import connectDB from '../lib/db';
import mongoose from 'mongoose';
import Subject from '../models/Subject';
import Topic from '../models/Topic';
import Problem from '../models/Problem';

interface Option {
  text: string;
  isCorrect: boolean;
}

async function verifyDatabase() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected successfully!\n');

    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in MongoDB:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    console.log();

    // Check Subjects
    const subjects = await Subject.find({});
    console.log('Subjects found:', subjects.length);
    subjects.forEach(subject => {
      console.log(`- ${subject.name}: ${subject.description}`);
    });
    console.log();

    // Check Topics
    const topics = await Topic.find({}).populate('subject');
    console.log('Topics found:', topics.length);
    topics.forEach(topic => {
      console.log(`- ${topic.name} (${topic.subject.name}): ${topic.description}`);
    });
    console.log();

    // Check Problems
    const problems = await Problem.find({}).populate(['subject', 'topic']);
    console.log('Problems found:', problems.length);
    problems.forEach(problem => {
      console.log(`- ${problem.title}`);
      console.log(`  Subject: ${problem.subject.name}`);
      console.log(`  Topic: ${problem.topic.name}`);
      console.log(`  Difficulty: ${problem.difficulty}`);
      console.log('  Options:');
      problem.options.forEach((option: Option) => {
        console.log(`    ${option.isCorrect ? '✓' : '✗'} ${option.text}`);
      });
      console.log();
    });

    process.exit(0);
  } catch (error) {
    console.error('Error verifying database:', error);
    process.exit(1);
  }
}

verifyDatabase(); 