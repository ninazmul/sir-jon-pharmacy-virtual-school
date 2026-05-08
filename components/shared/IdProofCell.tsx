"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IdProofCellProps {
  idProof?: string;
  englishName?: string;
  adminRole: string;
}

export default function IdProofCell({
  idProof,
  englishName,
  adminRole,
}: IdProofCellProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (adminRole !== "Admin") return null;

  const idProofSrc = idProof || "/assets/images/placeholder.png";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = idProofSrc;
    link.download = `${englishName || "id-proof"}.png`;
    link.click();
  };

  return (
    <td>
      <Image
        src={idProofSrc}
        alt={englishName ? `${englishName}'s ID Proof` : "ID Proof"}
        width={40}
        height={40}
        className="w-10 h-10 object-cover rounded-md border border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {englishName ? `${englishName}'s ID Proof` : "ID Proof"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-center">
            <Image
              src={idProofSrc}
              alt="ID Proof"
              width={400}
              height={400}
              className="w-full h-auto object-contain rounded-md border border-gray-200"
            />
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <Button onClick={handleDownload} className="bg-blue-600 text-white">
              Download
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </td>
  );
}
