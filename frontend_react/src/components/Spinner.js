import React from 'react';
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
