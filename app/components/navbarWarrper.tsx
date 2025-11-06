"use client";
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import { checkTokenRole } from '../lib/verifyToken';

const NavbarWrapper: React.FC = () => {
  const [role, setRole] = useState<'none' | 'user' | 'moderator' | 'admin'>('none');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setRole('none');
      return;
    }
    checkTokenRole(token).then(setRole);
  }, []);

  return <Navbar role={role} />;
};

export default NavbarWrapper;