import React from "react";
import styles from "./DataTable.module.css";

function DataTable({ data }) {
  const parsedData = data.split("\n").map((row) => row.split(","));

  const fieldMapping = JSON.parse(localStorage.getItem("fieldMapping")) || {
    Имя: 0,
    "Номер телефона": 1,
    email: 2,
    "Дата рождения": 3,
    Адрес: 4,
  };

  const visibleFields = Object.keys(fieldMapping);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {visibleFields.map((field) => (
            <th key={field}>
              <span>{field}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {parsedData.slice(1).map((row, rowIndex) => {
          if (row.join("").trim() === "") {
            return null;
          }
          return (
            <tr key={rowIndex}>
              {visibleFields.map((field) => (
                <td key={field}>
                  <span>{row[fieldMapping[field]]}</span>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
