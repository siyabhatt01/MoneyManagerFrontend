import React from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'


export const Expense = () => {
  useUser();
  return (
    <Dashboard activeMenu="Expense">
        This the expense page
    </Dashboard>
  )
}

export default Expense;