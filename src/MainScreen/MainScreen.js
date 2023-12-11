import React, { useRef, useState, useEffect } from "react";
import styles from "./Modal.module.css";
import DataTable from "../DataTable/DataTable";

function MainScreen() {
  const fileInputRef = useRef(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files[0];
    if (file) {
      const isValidFileType = file.type === "text/csv";
      if (isValidFileType) {
        const reader = new FileReader();
        reader.onload = () => {
          const csvData = reader.result;
          localStorage.setItem("csvData", csvData);
          setData(csvData);
        };
        reader.readAsText(file);
      } else {
        setError("Неправильный формат файла. Разрешены только файлы .CSV");
      }
    }
  };

  const handleNewFile = () => {
    localStorage.removeItem("csvData");
    handleFileChange();
    setData(null);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("csvData");
    if (savedData) {
      setData(savedData);
    }
  }, []);

  return (
    <>
      {data ? (
        <section className={styles.Overlay}>
          <button className={styles.NewFileButton} onClick={handleNewFile}>
            Загрузить новый файл
          </button>
          <DataTable data={data} />
        </section>
      ) : (
        <div className={styles.mainScreenContainer}>
          <div className={styles.mainScreen}>
            <h2 className={styles.Message}>Выберите файл в формате CSV</h2>
            <label className={styles.customFileUpload}>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className={styles.button}
              >
                Выберите файл
              </button>
            </label>
            {error && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <p className={styles.errorText}>{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MainScreen;
