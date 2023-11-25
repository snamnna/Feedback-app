const { PrismaClient } = require("@prisma/client");
const request = require('supertest');
const express = require('express');
const lectureRoutes = require('../../controllers/lectureController');
const lectureService = require('../../services/lectureService');
const feedbackService = require('../../services/feedbackService');

describe('Lecture Routes', () => {

    const mockLecture = { 
      lectureName: 'Test Lecture',
      courseId: 123, 
    };
    const mockFeedback = [{ id: 1, comment: "Great!" },
    { id: 2, comment: "Not bad" },];

    const app = express();
    app.use(express.json());
    app.use('/lectures', lectureRoutes);

    // Fake token for simulation
    const fakeToken = 'fake.token.for.testing';

    // Mocking the tokenDecode function that returns expected data
    jest.mock('../../utils/jwtUtils', () => ({
        tokenDecode: jest.fn().mockResolvedValue({ userType: 'TEACHER'}),
    }));

    it('should create a new lecture', async () => {
        const mockLectureData = {
            lectureName: 'Test Lecture',
            courseId: 123,
        };

        // Simulate adding a token to the request
        const response = await request(app)
            .post('/lectures')
            .send(mockLectureData)
            .set('Authorization', `Bearer ${fakeToken}`); // Add token to header

        // Add expected checks to the response
        expect(response.status).toBe(200);
        // Add other expected checks to the response

        // Check that createLecture method is called with the right data
        expect(require('../../services/lectureService').createLecture).toHaveBeenCalledWith({
            lectureName: 'Test Lecture',
            courseId: 123,
        });
    });

    it('should get lecture feedback for a valid lecture ID', async () => {
      // Mocking the necessary services
      const mockLectureId = 2; 
      const mockLecture = { 
        lectureName: 'Test Lecture',
        courseId: 123, 
      };
      const mockFeedback = [{ id: 1, comment: "Great!" },
      { id: 2, comment: "Not bad" },];

      // Mock the service functions
      jest.spyOn(lectureService, 'getLectureById').mockResolvedValue(mockLecture);
      jest.spyOn(feedbackService, 'getAllFeedbacksOfLecture').mockResolvedValue(mockFeedback);

      const response = await request(app)
          .get(`/lectures/${mockLectureId}/feedback`)
          .set('Authorization', `Bearer ${fakeToken}`);

      // Assuming the service returns feedback for the given lecture ID
      expect(response.status).toBe(200);
      // Add more specific assertions based on your application's logic

      // Example: Check if the response body contains expected feedback data
      expect(response.body).toEqual(mockFeedback);
    });


    it('should update a lecture with valid data', async () => {
      const mockLectureId = 2; 
      const mockUpdatedLecture = { lectureName: 'Test Lecture updated',
      courseId: 321, };

      // Mock the service function to update a lecture
      jest.spyOn(lectureService, 'getLectureById').mockResolvedValue({ mockLectureId });
      jest.spyOn(lectureService, 'updateLecture').mockResolvedValue(mockUpdatedLecture);

      const response = await request(app)
          .put(`/lectures/${mockLectureId}`)
          .send({ lectureName: 'Test Lecture updated'}) 
          .set('Authorization', `Bearer ${fakeToken}`);

      // Assuming the service returns the updated lecture data
      expect(response.status).toBe(200);
      // Add more specific assertions based on your application's logic

      // Example: Check if the response body contains the updated lecture data
      expect(response.body.updatedLecture).toEqual(mockUpdatedLecture);
    });


    it('should delete a lecture with a valid ID', async () => {
      const mockLectureId = 2; 

      // Mock the service function to delete a lecture
      jest.spyOn(lectureService, 'getLectureById').mockResolvedValue({ mockLecture });
      jest.spyOn(lectureService, 'deleteLecture').mockResolvedValue(); // Assuming successful deletion

      const response = await request(app)
          .delete(`/lectures/${mockLectureId}`)
          .set('Authorization', `Bearer ${fakeToken}`);

      // Assuming the service deletes the lecture successfully
      expect(response.status).toBe(200);
      // Add more specific assertions based on your application's logic

      // Example: Check if the response body contains a success message
      expect(response.body).toEqual({ message: 'Lecture deleted successfully' });
  });

  it('should get a lecture by a valid ID', async () => {
    const mockLectureId = 2;
    const mockLectureData = { lectureName: 'Test Lecture',
    courseId: 123,  };

    // Mock the service function to retrieve a lecture by ID
    jest.spyOn(lectureService, 'getLectureById').mockResolvedValue(mockLectureData);

    const response = await request(app)
        .get(`/lectures/${mockLectureId}`)
        .set('Authorization', `Bearer ${fakeToken}`);

    // Assuming the service returns the lecture data for the given ID
    expect(response.status).toBe(200);
    // Add more specific assertions based on your application's logic

    // Example: Check if the response body contains the expected lecture data
    expect(response.body.lecture).toEqual(mockLectureData);
  });
});
