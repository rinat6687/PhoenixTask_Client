import React, { useState } from "react";
import "./AccountTransaction.css";
import Form from "../Form/Form";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../services/accountTransactionService";

const AccountTransaction = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const parseListToOptions = (list, valueFieldName, labelFieldName) =>
    list.map((item) => ({
      value: item[valueFieldName],
      label: item[labelFieldName],
    }));

  const handleAdd = () => {
    setSelectedRow(null);
    openPopup();
  };

  const handleDelete = async (transactionId) => {
    setLoading(true);
    try {
      const response = await deleteTransaction(transactionId);
      setTransactions(response.transactions);
      notifyUser(response);
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("אירעה שגיאה.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (rowData) => {
    
    setSelectedRow(rowData);
    openPopup();
  };

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      if (selectedRow) {
        // update transaction
        const response = await updateTransaction(formData);
        notifyUser(response);
        setSelectedRow(null);
      } else {
        // add new transaction
        const response = await addTransaction(formData);
        notifyUser(response);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("אירעה שגיאה.");
    } finally {
      setLoading(false);
      closePopup();
    }
  };

  const notifyUser = (response) => {
    if (response.code >= 200 && response.code < 300) {
      toast.success("הפעולה בוצעה בהצלחה!");
    } else {
      toast.error("הפעולה נכשלה!");
    }

    setTransactions(response.transactions);
  };

  const renderTransactions = () => {
    console.log("Transactions array:", transactions);

    return transactions.map((row, index) => (
      <tr key={index}>
        <td>{format(new Date(row.transactionDate), "dd/MM/yyyy")}</td>
        <td>{row.fullName}</td>
        <td>{row.operationDesc}</td>
        <td>{row.accountNumber}</td>
        <td>{row.amount}</td>
        <td>
          <button className="update-button" onClick={() => handleUpdate(row)}>
            עדכן
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(row.transactionId)}
            disabled={loading}>
            מחק
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="account-transaction">
      <h1 className="page-title">היסטוריית פעולות </h1>
      <button className="add-transaction-button" onClick={handleAdd}>
        הוספה
      </button>
      {isPopupOpen && (
        <Form
          closePopup={closePopup}
          parseListToOptions={parseListToOptions}
          onSave={handleSave}
          row={selectedRow}
        />
      )}

      <table className="transactions-table rtl-table">
        <thead>
          <tr>
            <th>תאריך</th>
            <th>שם מלא</th>
            <th>סוג פעולה</th>
            <th>מספר חשבון</th>
            <th>סכום</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderTransactions()}</tbody>
      </table>
    </div>
  );
};

export default AccountTransaction;
