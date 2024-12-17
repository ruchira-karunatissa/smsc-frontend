// src/components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles = [] }) => {
  const { keycloak } = useAuth();

  const hasRequiredRoles = () => {
    console.log('Available roles:', keycloak?.realmAccess?.roles);
    console.log('Required roles:', roles);

    if (!roles.length) return true;
    return roles.some(role => keycloak?.hasRealmRole(role));
  };

  if (!hasRequiredRoles()) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <h3 className="font-medium">Access Denied</h3>
        <p>Required roles: {roles.join(', ')}</p>
        <p className="mt-2 text-sm">Available roles: {keycloak?.realmAccess?.roles?.join(', ') || 'None'}</p>
      </div>
    );
  }

  return <>{children}</>;
};