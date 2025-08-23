import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hooks/useUser'
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import Model from "../components/Model.jsx";
import { Plus } from 'lucide-react';
import AddIncomeForm from '../components/AddIncomeForm.jsx';
import axios from 'axios';
import DeleteAlert from '../components/DeleteAlert.jsx';
import IncomeOverview from '../components/IncomeOverview.jsx';

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ state: false, data: null });


  //fetching income details from api
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status == 200) {
        console.log("Income list", response.data);
        setIncomeData(response.data);
      }

    }
    catch (error) {
      console.log("failed to fetch income data ", error);
      toast.error(error.response?.data?.message || "failed to fetch income data");
    } finally {
      setLoading(false);
    }
  }
  //fetch categories for income
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      console.log(response.data);
      if (response.status === 200) {
        setCategories(response.data);
      }
    }
    catch (error) {
      console.log("failed to fetch income by categories : ", error);
      toast.error(error.data?.message || "Failed to fetch income categories");
    }
  }

  //save income details
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;
    if (!name.trim()) {
      toast.error("Please enter a name ");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0');
      return;
    }
    if (!date) {
      toast.error("Date is required ");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (date > today) {
      toast.error('Date cannot be in the future');
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, { name, amount: Number(amount), date, icon, categoryId });
      if (response.status === 201) {
        setOpenAddIncomeModel(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.log('Error adding income ', error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Income deleted successfully');
      fetchIncomeDetails();
    } catch (error) {
      console.log("failed to delete income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, [])


  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" });
      let fileName = "income-details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded income details successfully");
    } catch (error) {
      console.error('Error downloading income details :', error);
      toast.error(error.response?.data?.message || "Failed to download income file");
    }
  }

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (response.status === 200) {
        toast.success("Emailed income details successfully");
      }
    } catch (error) {
      console.error('Error emailing income details :', error);
      toast.error(error.response?.data?.message || "Failed to email income file");
    }
  }


return (
  <Dashboard activeMenu="Income">
    <div className="my-6 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div>
          {/* overview for income with line chart */}
          <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModel(true)} />
        </div>
        <IncomeList
          transactions={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadIncomeDetails}
          onEmail={handleEmailIncomeDetails}
        />
        {/* Add income model */}

        <Model isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income">
          <AddIncomeForm onAddIncome={(income) => handleAddIncome(income)} categories={categories} />
        </Model>

        {/* Delete income model */}
        <Model isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income">
          <DeleteAlert
            content="Are you sure you want to delete these income details ? "
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </div>
  </Dashboard>
)
}

export default Income