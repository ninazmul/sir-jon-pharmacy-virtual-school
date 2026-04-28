"use client";

import { ICourseSafe } from "@/lib/database/models/course.model";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CourseLink } from "./CourseLink";
import CountdownTimer from "./CountdownTimer";

function Courses({
  courses,
}: {
  courses?: ICourseSafe[];
}) {
  return (
    <main className="relative w-full py-12 md:py-20 flex flex-col items-center justify-center text-center px-6 md:px-12 bg-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm bg-maroon/10 text-maroon border border-maroon/20">
          Popular Courses
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-maroon">
          Explore Our Courses
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-gray-600 text-base md:text-lg"
        >
          Build skills with flexible, accredited online programs taught by
          experienced instructors.
        </motion.p>
      </motion.div>

      {/* Courses List */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {courses &&
          courses.slice(0, 3).map((course) => (
            <motion.div
              key={course._id.toString()}
              className="border rounded-2xl overflow-hidden shadow-md flex flex-col bg-white"
              whileHover={{ scale: 1.02 }}
            >
              {/* Course Image */}
              <div className="relative w-full h-48">
                <Image
                  src={course.photo}
                  alt={course.title}
                  fill
                  className="object-cover"
                />

                {/* Timer badge */}
                {course.registrationDeadline && (
                  <div className="absolute top-1 left-0">
                    <CountdownTimer deadline={course.registrationDeadline} />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-5 flex flex-col flex-1 text-left">
                <CourseLink id={course._id.toString()}>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 line-clamp-2 hover:text-primary transition">
                    {course.title}
                  </h3>
                </CourseLink>
                <div className="mt-auto flex justify-between items-center">
                  {course.discountPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 line-through text-sm">
                        $ {course.price}
                      </span>
                      <span className="font-bold text-lg text-primary">
                        $ {course.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-lg text-primary">
                      $ {course.price}
                    </span>
                  )}

                  {course.certification && (
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `maroon20`,
                        color: `maroon`,
                      }}
                    >
                      {course.certification}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* More Button */}
      {courses && courses.length > 6 && (
        <Link
          href="/courses"
          className="mt-10 inline-block bg-white border-2 border-primary text-primary font-semibold py-2 px-5 rounded-xl shadow hover:bg-primary hover:text-white transition"
          aria-label="View all courses"
        >
          View All Courses
        </Link>
      )}
    </main>
  );
}

export default Courses;
