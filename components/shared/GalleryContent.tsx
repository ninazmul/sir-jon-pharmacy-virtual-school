"use client";

import { ISettingSafe } from "@/lib/database/models/setting.model";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IGallery } from "@/lib/database/models/gallery.model";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryContent({ photos }: { photos: IGallery[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (photos.length ? (prev + 1) % photos.length : 0));
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) =>
      photos.length ? (prev - 1 + photos.length) % photos.length : 0,
    );
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, photos.length]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
  }, [modalOpen]);

  const currentPhoto = photos[currentIndex];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
            Gallery
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover professional photos from our campus and events.
          </p>
        </motion.div>

        <div className="mt-8">
          {photos.length === 0 ? (
            <div className="flex items-center justify-center min-h-[40vh] rounded-md bg-white dark:bg-gray-800 p-8 shadow-sm">
              <div className="text-center">
                <p className="text-gray-500 mb-4">No images available.</p>
                <a
                  href="/contact"
                  className="inline-block px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Request Photos
                </a>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              }}
            >
              {photos.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => openModal(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                  className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  aria-label={`Open image ${image.title || index + 1}`}
                >
                  <Image
                    src={image.image}
                    alt={image.title || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-0 right-0 bottom-0 text-white text-sm p-2 text-left bg-black/30">
                    {image.title}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {modalOpen && currentPhoto && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Image viewer"
            >
              <motion.div
                className="absolute inset-0 bg-black/85"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              />

              <motion.div
                className="relative z-10 w-full max-w-6xl mx-auto"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow-2xl">
                  <div className="relative w-full h-[64vh] md:h-[76vh] bg-black flex items-center justify-center">
                    <Image
                      src={currentPhoto.image}
                      alt={currentPhoto.title || "Gallery image"}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {currentPhoto.title || "Untitled"}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={prevPhoto}
                        aria-label="Previous image"
                        className="inline-flex items-center gap-2 bg-gray-800 text-white hover:opacity-95"
                      >
                        <ChevronLeft /> Prev
                      </Button>

                      <Button
                        size="sm"
                        onClick={nextPhoto}
                        aria-label="Next image"
                        className="inline-flex items-center gap-2 bg-gray-800 text-white hover:opacity-95"
                      >
                        Next <ChevronRight />
                      </Button>

                      <Button
                        ref={closeBtnRef}
                        size="sm"
                        onClick={closeModal}
                        aria-label="Close viewer"
                        className="inline-flex items-center gap-2 bg-rose-600 text-white hover:opacity-95"
                      >
                        <X /> Close
                      </Button>
                    </div>
                  </div>

                  <div className="border-t bg-white dark:bg-gray-900 p-2 overflow-x-auto">
                    <div className="flex gap-2 items-center">
                      {photos.map((thumb, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`flex-shrink-0 w-28 h-16 overflow-hidden border ${
                            i === currentIndex
                              ? "ring-2 ring-primary/40 border-primary"
                              : "border-gray-200 dark:border-gray-700"
                          } focus:outline-none`}
                          aria-label={`View thumbnail ${i + 1}`}
                        >
                          <Image
                            src={thumb.image}
                            alt={thumb.title || `Thumbnail ${i + 1}`}
                            width={160}
                            height={96}
                            className="object-cover w-full h-full"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
