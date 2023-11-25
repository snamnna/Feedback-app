const { PrismaClient } = require("@prisma/client");
const request = require('supertest');
const express = require('express');
const lectureRoutes = require('../../controllers/lectureController');

describe('Lecture Routes', () => {
    const app = express();
    app.use(express.json());
    app.use('/lectures', lectureRoutes);

    // Väärennetty tokeni simulointia varten
    const fakeToken = 'fake.token.for.testing';

    // Mockataan tokenDecode-funktio, joka palauttaa odotetut tiedot
    jest.mock('../../utils/jwtUtils', () => ({
        tokenDecode: jest.fn().mockResolvedValue({ userType: 'TEACHER', /* muut tiedot */ }),
    }));

    it('should create a new lecture', async () => {
        const mockLectureData = {
            lectureName: 'Test Lecture',
            courseId: 123,
        };

        // Simuloi tokenin lisääminen pyyntöön
        const response = await request(app)
            .post('/lectures')
            .send(mockLectureData)
            .set('Authorization', `Bearer ${fakeToken}`); // Lisää tokeni otsakkeeseen

        // Lisää odotetut tarkistukset vastaukseen
        expect(response.status).toBe(200);
        // Lisää muita odotettuja tarkistuksia vastaukseen

        // Tarkista, että createLecture-metodia kutsutaan oikeilla tiedoilla
        expect(require('../../services/lectureService').createLecture).toHaveBeenCalledWith({
            lectureName: 'Test Lecture',
            courseId: 123,
        });
    });

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

});
