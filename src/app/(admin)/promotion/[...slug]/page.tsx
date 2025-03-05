"use client";

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/ui/button/Button';
import BasicTableOne from '@/components/tables/BasicTableOne';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { mockData } from '@/components/promotion/data';
import { ResultsModal } from '@/components/promotion/ResultsModal';
import useAuthStore from '../../../../../store/userStore';
import StudentPercentageTable from '@/components/tables/StudentPercentageTable';
import apiPromotion from '../../../../../api/promotion';

export default function Page() {
  const params = useParams();
  const current = params.slug ? [...params.slug].map(param => decodeURIComponent(param)) : null;
  
  const [promotion, setPromotion] = useState<any>(null);
  const [students, setStudents] = useState<any>(null);
  const { jurys, token } = useAuthStore();

  if (!current) return <div>Loading...</div>;

  useEffect(() => {

    const currPromotion = jurys.find(jury => 
      jury.id_niveau === parseInt(current[1]) && 
      jury.id_annee === parseInt(current[0])
    );
    setPromotion(currPromotion);

  }, [params.slug, jurys]);

  const { 
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal
  } = useModal();

  const handleSave = () => {
    console.log("Saving changes...");
    closeFullscreenModal();
  };

  useEffect(() => {
    
    
    if (token) {
      apiPromotion.getCotes({
        anneeId: parseInt(current[0]),
        promotionId: parseInt(current[1]),
        token: token
      }).then(data => {
        setStudents(data);
      })
      .catch(err => console.error(err));
    }
  }
  , [token]);
  
  return (
    <div>
      <PageBreadcrumb pageTitle={`${current ? decodeURIComponent(current[2]) : ""}`} />
      <div className='space-y-6'>
        <ComponentCard title={`${promotion?.vision ? 'Résultat accessible' : 'Résultat non accessible'}`}>
          {/* <Button size='sm' variant='outline' onClick={openFullscreenModal}>
            Open Modal
          </Button>
          
          <ResultsModal
            isOpen={isFullscreenModalOpen}
            onClose={closeFullscreenModal}
            students={mockData}
            onSave={handleSave}
          />

          <BasicTableOne /> */}
          <StudentPercentageTable data={students || { unites: {} }} anneeId={promotion?.id_annee}/>
        </ComponentCard>
      </div>
    </div>
  );
}
