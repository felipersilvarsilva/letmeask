import { useContext } from 'react'
import { AuthContext } from 'auth/AuthContext';

export function useAuth(){
  const value = useContext(AuthContext)

  return value;
  
}