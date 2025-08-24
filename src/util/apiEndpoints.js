// export const BASE_URL="https://moneymanager-2baw.onrender.com/api/v1";
export const BASE_URL="http://localhost:8080/api/v1";

const CLOUDINARY_CLOUD_NAME= "dmkiiunsw";

export const API_ENDPOINTS={
    LOGIN : "/login",
    REGISTER : "/register",
    GET_USER_INFO : "/profile",
    GET_ALL_CATEGORIES : "/categories",
    ADD_CATEGORY : "/categories",
    UPDATE_CATEGORY : (categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES : "/income",
    CATEGORY_BY_TYPE : (type)=>`/categories/${type}`,
    ADD_INCOME : "/income",
    DELETE_INCOME : (incomeId)=>`/income/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD : "excel/download/income",
    EMAIL_INCOME : "/email/income-excel",
    GET_ALL_EXPENSES : "/expenses",
    ADD_EXPENSE : "/expenses",
    DELETE_EXPENSE : (expenseId)=>`/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD : "excel/download/expense",
    EMAIL_EXPENSE : "/email/expense-excel",
    APPLY_FILTER : "/filter",
    UPLOAD_IMAGE : `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload` 
     
}  