import './Toast.css';
import { useEffect } from 'react';
import { useToast } from '../../hooks';

const Toast = props => {
  const { toast, resetToast } = useToast();
  const toastIconClasses =
    toast.type === 'danger'
      ? 'fas fa-exclamation-circle'
      : toast.type === 'success'
      ? 'fas fa-check-circle'
      : 'fas fa-bell';

  const toastStatus = toast.status;

  useEffect(() => {
    let timer;

    if (toastStatus) {
      timer = setTimeout(() => {
        resetToast();
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [toastStatus]);

  return (
    <div className={`toast ${toast.type}`}>
      <span className="icon small white">
        <i className={toastIconClasses}></i>
      </span>
      {` ${toast.message}`}
    </div>
  );
};
export { Toast };
