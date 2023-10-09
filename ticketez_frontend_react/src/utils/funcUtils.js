import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const funcUtils = {
    notify: function (content, type) {
        const option = {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        };

        if (!content) return toast.error('Có lỗi vui lòng liên hệ quản trị viên!', option);

        switch (type) {
            case 'error':
                return toast.error(content, option);

            case 'warning':
                return toast.warning(content, option);

            case 'success':
                return toast.success(content, option);

            default:
                break;
        }
    },
  
};

export default funcUtils;
