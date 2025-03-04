"use client";

import { useState } from 'react';
import { TeachingUnit, ScoreUpdate } from '../types';
import ScoreInput from '@/components/ui/input/ScoreInput';
import { cn } from '@/lib/utils';

interface TeachingUnitCellProps {
  unit: TeachingUnit;
  studentId: string;
  matricule: string;
  onScoreChange: (update: ScoreUpdate) => void;
}

export const TeachingUnitCell = ({ 
  unit, 
  studentId,
  matricule,
  onScoreChange 
}: TeachingUnitCellProps) => {
  const [localScores, setLocalScores] = useState(unit.elements.map(el => ({
    ...el,
    score: el.score
  })));

  // ... reste du TeachingUnitCell ...
};