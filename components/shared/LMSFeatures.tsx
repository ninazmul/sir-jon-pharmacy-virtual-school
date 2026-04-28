"use client";

import { ISettingSafe } from "@/lib/database/models/setting.model";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaCertificate,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { JSX } from "react";

const ICONS: Record<string, JSX.Element> = {
  FaBookOpen: <FaBookOpen className="w-8 h-8 text-maroon" />,
  FaChalkboardTeacher: <FaChalkboardTeacher className="w-8 h-8 text-maroon" />,
  FaCertificate: <FaCertificate className="w-8 h-8 text-maroon" />,
  FaUsers: <FaUsers className="w-8 h-8 text-maroon" />,
};

function LMSFeatures({ setting }: { setting: ISettingSafe | null }) {
  // Prefer site theme but keep consistent maroon/primary palette
  const bgClass = setting?.theme ? "" : "bg-primary/5";
  const features = setting?.features?.items || [
    {
      title: "Structured Curriculum",
      description: "Clear learning paths and outcomes",
      icon: "FaBookOpen",
    },
    {
      title: "Expert Instructors",
      description: "Certified teachers and mentors",
      icon: "FaChalkboardTeacher",
    },
    {
      title: "Recognized Certificates",
      description: "Provincial and industry-recognized credentials",
      icon: "FaCertificate",
    },
    {
      title: "Student Community",
      description: "Peer groups, clubs and support",
      icon: "FaUsers",
    },
  ];

  return (
    <section
      aria-label="Platform features"
      className={`w-full py-12 md:py-20 px-6 md:px-12 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-maroon/10 text-maroon border border-maroon/20 shadow-sm">
            {setting?.features?.badge || "Platform Features"}
          </span>

          <h2 className="text-2xl md:text-4xl font-extrabold text-maroon">
            {setting?.features?.title || "Empower Your Learning Journey"}
          </h2>

          <p
            className="max-w-3xl text-gray-700 text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html:
                setting?.features?.description ||
                "Flexible, accredited programs with expert instructors and strong student support.",
            }}
          />
        </motion.header>

        {/* Features grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {features.map((item, i) => (
            <motion.article
              key={i}
              className="relative flex flex-col items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ translateY: -6 }}
              transition={{ duration: 0.35 }}
              aria-labelledby={`feature-${i}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-maroon/5 border border-maroon/10">
                {ICONS[item.icon || "FaBookOpen"] || (
                  <FaBookOpen className="w-8 h-8 text-maroon" />
                )}
              </div>

              <div className="flex-1">
                <h3
                  id={`feature-${i}`}
                  className="text-lg font-semibold text-gray-900"
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>

              {/* Accent bar for visual consistency */}
              <div className="absolute right-4 bottom-4 w-10 h-1 rounded bg-maroon/80" />
            </motion.article>
          ))}
        </motion.div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/about"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full border-2 border-maroon text-maroon font-semibold hover:bg-maroon/10 transition"
          >
            Learn More About Our Approach
          </a>

          <a
            href="/courses"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-maroon text-white font-semibold hover:opacity-95 transition"
          >
            Browse Courses
          </a>
        </div>
      </div>
    </section>
  );
}

export default LMSFeatures;
