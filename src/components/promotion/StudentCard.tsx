"use client";

import Image from 'next/image';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  showRank?: boolean;
  rank?: number;
}

export const StudentCard = ({ student, showRank, rank }: StudentCardProps) => {
  return (
    <div className="flex items-start gap-3 p-4 pl-10">
      <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-primary/20">
        <Image
          src={student.photoUrl}
          alt={`${student.firstName} ${student.lastName}`}
          fill
          className="object-cover"
        />
      </div>
      {/* ... reste du StudentCard ... */}
    </div>
  );
};