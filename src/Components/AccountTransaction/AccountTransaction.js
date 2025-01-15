import React, { useState } from "react";
import "./AccountTransaction.css";
import Form from "../Form/Form";
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { deleteTransaction } from "../../services/accountTransactionService";


const AccountTransaction = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
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
      label: item[labelFieldName]
    }));

    const handleDelete = async (transactionId) => {
      setLoading(true);
      try {
            const response = await deleteTransaction(transactionId);
            setTransactions(response.transactions);
      
            if (response.code >= 200 && response.code < 300) {
              toast.success("הפעולה בוצעה בהצלחה!");
            } else {
              toast.error("הפעולה נכשלה!");
            }
          } catch (error) {
            console.error("Error adding transaction:", error);
            toast.error("אירעה שגיאה בעת מחיקת העסקה.");
          } finally {
            
            setLoading(false);
            closePopup();
          }

    };
  
 
    const renderTransactions = () => {
      console.log("Transactions array:", transactions);

      return transactions.map((transaction, index) => (
        
        <tr key={index}>
          <td>{format(new Date(transaction.transactionDate), 'dd/MM/yyyy')}</td>
          <td>{transaction.fullName}</td>
          <td>{transaction.operationDesc}</td>
          <td>{transaction.accountNumber}</td>
          <td>{transaction.amount}</td>
          <td>
          <button disabled className="update-button" onClick={() => console.log("not in use")}>עדכן</button> 
          <button className="delete-button" disabled={loading} onClick={() => handleDelete(transaction.transactionId)}>מחק</button>
          </td>
       
        </tr>
      ));
    };
  
    return (
      <div className="account-transaction">
         <h1 className="page-title">היסטוריית פעולות </h1>
        <button className="add-transaction-button" onClick={openPopup}>הוספה</button>
        {isPopupOpen && <Form closePopup={closePopup} setTransactions={setTransactions} parseListToOptions={parseListToOptions}/>}
        
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
          <tbody>
            {renderTransactions()}
          </tbody>
        </table>
      </div>
    );
  
};

export default AccountTransaction;
