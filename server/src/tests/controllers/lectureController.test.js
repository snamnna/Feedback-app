const { PrismaClient } = require("@prisma/client");

const request = require('supertest');
const express = require('express');
const lectureRoutes = require('../../controllers/lectureController');

describe('Lecture Routes', () => {
    const app = express();
    app.use(express.json());
    app.use('/lectures', lectureRoutes);
  
    // Mockataan tarvittavat palvelut
    jest.mock('../../services/lectureService', () => ({
      createLecture: jest.fn().mockResolvedValue({ id: 1, lectureName: 'Test Lecture' }),
      getLectureById: jest.fn().mockImplementation((id) => {
        if (id === 1) {
          return { id: 1, lectureName: 'Test Lecture' };
        } else {
          return null;
        }
      }),
      getAllFeedbacksOfLecture: jest.fn().mockResolvedValue([
        { id: 1, feedback: 'Feedback 1' },
        { id: 2, feedback: 'Feedback 2' },
      ]),
      updateLecture: jest.fn().mockResolvedValue({ id: 1, lectureName: 'Updated Lecture' }),
      deleteLecture: jest.fn().mockResolvedValue({ message: 'Lecture deleted successfully' }),
    }));
  
    it('should create a new lecture', async () => {
      // Testaa POST /lectures
      // ...
    });
  
    it('should get lecture feedback', async () => {
      // Testaa GET /lectures/:id/feedback
      // ...
    });
  
    it('should update a lecture', async () => {
      // Testaa PUT /lectures/:id
      // ...
    });
  
    it('should delete a lecture', async () => {
      // Testaa DELETE /lectures/:id
      // ...
    });
  
    it('should get a lecture by ID', async () => {
      // Testaa GET /lectures/:id
      // ...
    });
  
    // Lisää testejä tarpeen mukaan
  });