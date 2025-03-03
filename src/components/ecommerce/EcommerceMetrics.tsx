"use client";
import { BoxIconLine, GroupIcon } from "@/icons";
// import Badge from "../ui/badge/Badge";
 import { AxiosError } from 'axios';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from 'react';

import { getResults } from '../../../api/dashboardManagement';

export const EcommerceMetrics = ({ promotionId, anneeId }) => {
  const [results, setResults] = useState({ passed: 0, failed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults(promotionId, anneeId);
        setResults(data); 
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Erreur lors de la récupération des résultats'); // Gérer l'erreur Axios
        } else {
          setError('Erreur inattendue lors de la récupération des résultats'); // Gérer les autres erreurs
        }
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchResults();
  }, [promotionId, anneeId]);

  if (loading) {
    return <Loader2 />;
  }

  if (error) {
    return <div>Erreur: {error}</div>; // Afficher un message d'erreur
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nombre de réussites
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
               {loading ? <Loader2 /> : results.passed}

            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nombre d&apos;échecs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
               {loading ? <Loader2 /> : results.failed}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
