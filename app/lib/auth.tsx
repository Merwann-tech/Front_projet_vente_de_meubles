"use client";
import { useEffect, useState } from "react";
import { checkTokenRole } from "./verifyToken";


export default function Authorization({
  minRole = 'user', 
  children,
  fallback = <div className="text-red-500 text-center mt-12 text-xl">Accès refusé.</div>,
}: {
  minRole?: 'user' | 'moderator' | 'admin',
  children: React.ReactNode,
  fallback?: React.ReactNode,
}) {
  const [role, setRole] = useState<'none' | 'user' | 'moderator' | 'admin' | 'pending'>('pending');
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    checkTokenRole(token).then(setRole);
  }, []);

  const roleOrder = {
    'none': 0,
    'user': 1,
    'moderator': 2,
    'admin': 3,
  };

  if (role === 'pending') {
    return <div className="text-center mt-12">Vérification des droits...</div>;
  }

  if (roleOrder[role] < roleOrder[minRole]) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}