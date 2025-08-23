import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'

import axiosConfig from '../util/axiosConfig'
import { API_ENDPOINTS } from '../util/apiEndpoints'
import toast from 'react-hot-toast'
import ExpenseList from '../components/ExpenseList'
import Model from '../components/Model.jsx'
import AddExpenseForm from '../components/AddExpenseForm.jsx'
import DeleteAlert from '../components/DeleteAlert.jsx'
import ExpenseOverview from '../components/ExpenseOverview.jsx'

const Expense = () => {
  useUser()

  const [expenseData, setExpenseData] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })

  //fetching expense details from api
  const fetchExpenseDetails = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES)
      if (response.status === 200) {
        console.log('Expense list', response.data)
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log('failed to fetch expense data ', error)
      toast.error(error.response?.data?.message || 'failed to fetch expense data')
    } finally {
      setLoading(false)
    }
  }

  //fetch categories for expense
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('expense'))
      if (response.status === 200) {
        setCategories(response.data)
      }
    } catch (error) {
      console.log('failed to fetch expense by categories : ', error)
      toast.error(error.data?.message || 'Failed to fetch expense categories')
    }
  }

  //save expense details
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense
    if (!name.trim()) {
      toast.error('Please enter a name ')
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0')
      return
    }
    if (!date) {
      toast.error('Date is required ')
      return
    }
    const today = new Date().toISOString().split('T')[0]
    if (date > today) {
      toast.error('Date cannot be in the future')
      return
    }
    if (!categoryId) {
      toast.error('Please select a category')
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      })
      if (response.status === 201) {
        setOpenAddExpenseModel(false)
        toast.success('Expense added successfully')
        fetchExpenseDetails()
        fetchExpenseCategories()
      }
    } catch (error) {
      console.log('Error adding expense ', error)
      toast.error(error.response?.data?.message || 'Failed to add expense')
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      toast.success('Expense deleted successfully')
      fetchExpenseDetails()
    } catch (error) {
      console.log('failed to delete expense', error)
      toast.error(error.response?.data?.message || 'Failed to delete expense')
    }
  }

  useEffect(() => {
    fetchExpenseDetails()
    fetchExpenseCategories()
  }, [])

  // download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: 'blob',
      })
      let fileName = 'expense-details.xlsx'
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Downloaded expense details successfully')
    } catch (error) {
      console.error('Error downloading expense details :', error)
      toast.error(error.response?.data?.message || 'Failed to download expense file')
    }
  }

  // email expense details
  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE)
      if (response.status === 200) {
        toast.success('Emailed expense details successfully')
      }
    } catch (error) {
      console.error('Error emailing expense details :', error)
      toast.error(error.response?.data?.message || 'Failed to email expense file')
    }
  }

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-6 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* overview for expense with line chart */}
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />
          {/* Add expense modal */}
          <Model
            isOpen={openAddExpenseModel}
            onClose={() => setOpenAddExpenseModel(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Model>

          {/* Delete expense modal */}
          <Model
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete these expense details ? "
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Model>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense
