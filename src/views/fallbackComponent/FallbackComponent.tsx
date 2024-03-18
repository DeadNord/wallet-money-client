import React from 'react';
import s from './FallbackComponent.module.scss';

interface FallbackProps {
  errorMessage?: string;
}

const FallbackComponent: React.FC<FallbackProps> = ({ errorMessage }) => {
  return (
    <div className={s.fallbackBackground}>
      <div className={s.fallbackContainer}>
        <h1 className={s.fallbackHeader}>Something went wrong.</h1>
        <details className={s.fallbackDetails} style={{ whiteSpace: 'pre-wrap' }}>
          {errorMessage && <section className={s.fallbackMessage}>{errorMessage}</section>}
        </details>
      </div>
    </div>
  );
};

export default FallbackComponent;
