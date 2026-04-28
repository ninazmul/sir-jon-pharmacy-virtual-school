"use client";

import { useState, useEffect, useMemo } from "react";
import { getSetting } from "@/lib/actions";
import Image from "next/image";
import { CourseLink } from "@/components/shared/CourseLink";
import { ICourseSafe } from "@/lib/database/models/course.model";
import { getCourses } from "@/lib/actions/course.actions";
import CountdownTimer from "@/components/shared/CountdownTimer";
import Link from "next/link";
import { motion } from "framer-motion";

type TabKey = "all" | "upcoming" | "ongoing" | "old";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ongoing");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [courses, setCourses] = useState<ICourseSafe[]>([]);
  const [themeColor, setThemeColor] = useState("#7C0A02"); // maroon fallback
  const [loading, setLoading] = useState(true);

  const categories = useMemo(
    () => [
      "All Categories",
      "Design",
      "Front End Development",
      "IT Security",
      "Management",
      "Mobile Application Development",
      "Web Development",
      "Programming",
      "Office Application",
      "Video Editing & Motion",
      "Marketing",
      "Workshop",
      "Networking",
      "Database Administration",
      "Freelancing",
    ],
    [],
  );

  // Load theme
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const setting = await getSetting();
        if (!mounted) return;
        setThemeColor(setting?.theme || "#7C0A02");
      } catch (err) {
        console.error("Failed to load setting", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Load courses
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const data = await getCourses({
          tab: activeTab,
          category:
            selectedCategory === "All Categories" ? "" : selectedCategory,
        });
        if (!mounted) return;
        setCourses(data || []);
      } catch (err) {
        console.error("Failed to load courses", err);
        if (mounted) setCourses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeTab, selectedCategory]);

  const formatPrice = (value: any) => {
    const n = Number(value || 0);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <main className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      {/* Page header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-maroon">
          Explore Our Courses
        </h1>
        <p className="mt-3 text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          Find flexible, accredited programs taught by experienced instructors.
          Filter by category or status.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-6 justify-between mb-8">
        {/* Category select */}
        <div className="w-full md:w-1/2">
          <label htmlFor="category" className="sr-only">
            Select category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setActiveTab("all");
            }}
            className="w-full md:w-3/4 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-60"
            aria-label="Filter courses by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap justify-center md:justify-end">
          {(["all", "upcoming", "ongoing", "old"] as TabKey[]).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab !== "all") setSelectedCategory("All Categories");
                }}
                className={`px-4 py-2 rounded-xl font-semibold transition focus:outline-none focus-visible:ring-2 ${
                  active
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={active ? { backgroundColor: `maroon` } : {}}
                aria-pressed={active}
              >
                {tab === "all" && "All Courses"}
                {tab === "upcoming" && "Upcoming"}
                {tab === "ongoing" && "Ongoing"}
                {tab === "old" && "Archived"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          // Loading skeleton grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse border rounded-2xl overflow-hidden bg-white shadow-sm"
                aria-hidden
              >
                <div className="w-full h-44 bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                    <div className="h-8 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No courses found for this selection.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block px-5 py-3 rounded-full border-2 border-maroon text-maroon font-semibold hover:bg-maroon hover:text-white transition"
            >
              Contact Support
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
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
          </div>
        )}
      </div>
    </main>
  );
}
