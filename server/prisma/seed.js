const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: { password_hash: hashedPassword },
    create: {
      username: "admin",
      password_hash: hashedPassword,
      userType: "ADMIN",
    },
  });

  const teacher1 = await prisma.user.upsert({
    where: { username: "teacher1" },
    update: { password_hash: hashedPassword },
    create: {
      username: "teacher1",
      password_hash: hashedPassword,
      userType: "TEACHER",
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { username: "teacher2" },
    update: { password_hash: hashedPassword },
    create: {
      username: "teacher2",
      password_hash: hashedPassword,
      userType: "TEACHER",
    },
  });

  const student1 = await prisma.user.upsert({
    where: { username: "student1" },
    update: { password_hash: hashedPassword },
    create: {
      username: "student1",
      password_hash: hashedPassword,
      userType: "STUDENT",
    },
  });

  const student2 = await prisma.user.upsert({
    where: { username: "student2" },
    update: { password_hash: hashedPassword },
    create: {
      username: "student2",
      password_hash: hashedPassword,
      userType: "STUDENT",
    },
  });

  const course1 = await prisma.course.create({
    data: {
      name: "Introduction to Mathematics",
      description: "A beginner course on mathematics",
      lecturer: {
        connect: {
          id: teacher1.id,
        },
      },
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "Advanced Mathematics",
      description: "An advanced course on mathematics",
      lecturer: {
        connect: {
          id: teacher2.id,
        },
      },
    },
  });

  // Enroll students to the courses
  await prisma.courseEnrollment.create({
    data: {
      userId: student1.id,
      courseId: course1.id,
      status: "APPROVED",
    },
  });

  await prisma.courseEnrollment.create({
    data: {
      userId: student2.id,
      courseId: course2.id,
      status: "APPROVED",
    },
  });

  const lecture1 = await prisma.lecture.create({
    data: {
      name: "Lecture 1: Basics",
      courseId: course1.id,
    },
  });

  const lecture2 = await prisma.lecture.create({
    data: {
      name: "Lecture 1: Complex Numbers",
      courseId: course2.id,
    },
  });

  await prisma.feedback.create({
    data: {
      feedbackType: "GREAT",
      comment: "Very informative lecture!",
      userId: student1.id,
      lectureId: lecture1.id,
    },
  });

  await prisma.feedback.create({
    data: {
      feedbackType: "NEUTRAL",
      comment: "It was okay.",
      userId: student2.id,
      lectureId: lecture2.id,
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
