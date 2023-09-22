const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test", 10);
  // Create Users
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password_hash: hashedPassword,
      userType: "ADMIN",
    },
  });

  const teacher = await prisma.user.create({
    data: {
      username: "teacher",
      password_hash: hashedPassword,
      userType: "TEACHER",
    },
  });

  const anotherTeacher = await prisma.user.create({
    data: {
      username: "test",
      password_hash: hashedPassword,
      userType: "TEACHER",
    },
  });

  const student = await prisma.user.create({
    data: {
      username: "student",
      password_hash: hashedPassword,
      userType: "STUDENT",
    },
  });

  // Create Course
  const course = await prisma.course.create({
    data: {
      name: "Introduction to Mathematics",
      description: "A beginner course on mathematics",
      lecturer: {
        connect: {
          id: teacher.id,
        },
      },
    },
  });

  const anotherCourse = await prisma.course.create({
    data: {
      name: "Introduction to Mathematics",
      description: "A beginner course on mathematics",
      lecturer: {
        connect: {
          id: anotherTeacher.id,
        },
      },
    },
  });

  // Enroll student to the course
  await prisma.courseEnrollment.create({
    data: {
      userId: student.id,
      courseId: course.id,
      status: "APPROVED",
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: student.id,
      courseId: anotherCourse.id,
      status: "APPROVED",
    },
  });

  // Create Lecture
  const lecture = await prisma.lecture.create({
    data: {
      name: "Lecture 1: Basics",
      courseId: course.id,
    },
  });

  const anotherLecture = await prisma.lecture.create({
    data: {
      name: "Lecture 1: Basics",
      courseId: anotherCourse.id,
    },
  });

  // Create Feedback
  await prisma.feedback.create({
    data: {
      feedbackType: "GREAT",
      comment: "Very informative lecture!",
      userId: student.id,
      lectureId: lecture.id,
    },
  });

  await prisma.feedback.create({
    data: {
      feedbackType: "GREAT",
      comment: "Very informative lecture!",
      userId: student.id,
      lectureId: anotherLecture.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
