import React, { useState, useEffect } from "react";
import { getTransactionsLists, addTransaction , } from "../../services/accountTransactionService.js";
import { toast } from 'react-toastify';
import CustomInput from "../../BaseComponenets/CustomInput.js";
import CustomSelect from "../../BaseComponenets/CustomSelect.js";
import "./Form.css";

const Form = ({ closePopup, parseListToOptions, setTransactions }) => {
  const [loading, setLoading] = useState(false);
  const [operationsOptions, setOperationsOptions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    englishFullName: "",
    dateOfBirth: "",
    userId: 0,
    operationId: "",
    accountNumber: "",
    amount: 0.0,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    englishFullName: "",
    dateOfBirth: "",
    userId: "",
    operationId: "",
    amount: "",
    accountNumber: "",
  });

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const lists = await getTransactionsLists();
    const operationsOptions = parseListToOptions(
      lists.operationsTypeList,
      'operationId',
      'operationDesc'
    );
    setOperationsOptions(operationsOptions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!/^[א-ת\s'-]{1,20}$/.test(formData.fullName)) {
      formErrors.fullName = "שם מלא חייב להיות בעברית, עד 20 תווים ובלי סימנים מיוחדים!";
      isValid = false;
    }

    if (!/^[a-zA-Z\s'-]{1,15}$/.test(formData.englishFullName)) {
      formErrors.englishFullName = "שם באנגלית חייב להיות עד 15 תווים ובלי סימנים מיוחדים!";
      isValid = false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      formErrors.dateOfBirth = "יש להכניס תאריך לידה בפורמט yyyy-mm-dd!";
      isValid = false;
    }

    if (!/^\d{9}$/.test(formData.userId)) {
      formErrors.userId = "תעודת זהות חייבת להיות 9 ספרות!";
      isValid = false;
    }

    if (formData.operationId === 0 || formData.operationId === "") {
      formErrors.operationId = "יש לבחור פעולה!";
      isValid = false;
    }

    if (!formData.amount || !/^\d{1,10}$/.test(formData.amount)) {
      formErrors.amount = "סכום חייב להיות עד 10 ספרות!";
      isValid = false;
    }
    

    if (!/^\d{1,10}$/.test(formData.accountNumber)) {
      formErrors.accountNumber = "מספר חשבון חייב להיות עד 10 ספרות!";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await addTransaction(formData);
      setTransactions(response.transactions);

      if (response.code >= 200 && response.code < 300) {
        toast.success("הפעולה בוצעה בהצלחה!");
      } else {
        toast.error("הפעולה נכשלה!");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("אירעה שגיאה בעת הוספת העסקה.");
    } finally {
      
      setLoading(false);
      closePopup();
    }
  };

  return (
    <div className="popup-wrapper" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h1>טופס הוספת עסקה</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <CustomInput
              type="text"
              name="fullName"
              label="שם מלא"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <CustomInput
              type="text"
              name="englishFullName"
              label="שם מלא באנגלית"
              id="englishFullName"
              value={formData.englishFullName}
              onChange={handleChange}
            />
            {errors.englishFullName && <span className="error-text">{errors.englishFullName}</span>}
          </div>

          <div className="form-row">
            <CustomInput
              type="date"
              name="dateOfBirth"
              label="תאריך לידה"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-row">
            <CustomInput
              type="text"
              name="userId"
              label="תעודת זהות"
              id="userId"
              value={formData.userId}
              onChange={handleChange}
            />
            {errors.userId && <span className="error-text">{errors.userId}</span>}
          </div>

          <div className="form-row">
            <CustomSelect
              name="operationId"
              label="פעולה"
              id="operationId"
              value={formData.operationId}
              onChange={handleChange}
              options={operationsOptions}
            />
            {errors.operationId && <span className="error-text">{errors.operationId}</span>}
          </div>

          <div className="form-row">
            <CustomInput
              type="text"
              name="accountNumber"
              label="מספר חשבון"
              id="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
            {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
          </div>

          <div className="form-row">
            <CustomInput
              type="text"
              name="amount"
              label="סכום"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          <button type="submit" disabled={loading}>שלח</button>
        </form>
      </div>
    </div>
  );
};


export default Form;
