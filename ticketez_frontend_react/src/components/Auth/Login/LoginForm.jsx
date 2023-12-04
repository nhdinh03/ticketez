import React, { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss';
import img from '~/assets/img';
import authApi from '~/api/user/Security/authApi';
import { getRolesFromLocalStorage } from '~/utils/authUtils';
import funcUtils from '~/utils/funcUtils';
import { validateId, validatePassword } from '../Custom';


const { Header, Content } = Layout;


const LoginForm = () => {
    const [countdown, setCountdown] = useState(0);
    const [emailForOtp, setEmailForOtp] = useState('');
    const [isOtpButtonDisabled, setOtpButtonDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let intervalId;

        if (isOtpButtonDisabled && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((countdown) => countdown - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [isOtpButtonDisabled, countdown]);


    const onFinish = async (values) => {
        if (!validateId(values.id)) return;
        if (!validatePassword(values.password)) return;
        try {
            const response = await authApi.getLogin({
                id: values.id,
                password: values.password,
                otp: values.otp,

            });

            const user = await authApi.getUser();
            console.log(user);
            const roles = getRolesFromLocalStorage();
            if (roles.includes('SUPER_ADMIN')) {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/admin/index');
            } else {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            funcUtils.notify('Sai mật khẩu hoặc tài khoản, Kiểm tra Mã OTP', 'error');
        }
    };


    const handleResendOtp = async () => {
        setOtpButtonDisabled(true);
        setCountdown(5);
        try {
            const response = await authApi.regenerateOtp(emailForOtp);
            funcUtils.notify('Mã OTP đã được cập nhật. Vui lòng xác minh tài khoản trong vòng 1 phút !', 'success');
            console.log(response);
        } catch (error) {
            funcUtils.notify('Kiểm tra lại email của bạn đúng chưa !', 'error');
        }
        setTimeout(() => {
            setOtpButtonDisabled(false);
        }, 5000);
    };


    return (
        <Layout className="layout">

            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.loginContainer}>
                        <h1 className={styles.title}>Đăng Nhập</h1>
                        <p className={styles.welcomeText}>Chào mừng bạn đến giao diện người dùng TicketEZ Vui lòng nhập thông tin của bạn dưới đây để đăng nhập.</p>
                        <Form
                            name="basic"
                            className={styles.loginForm}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className='formLabel'>
                                <p className={styles.formLabel}><h4>Tên Tài khoản:</h4></p>
                            </div>
                            <Form.Item
                                // label="Tên tài khoản"
                                name="id"
                                rules={[{ required: true, message: 'Không được bỏ trống tài khoản !' }]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Tên Tài khoản" className={styles.input} />
                            </Form.Item>

                            <div className='formLabel'>
                                <p className={styles.formLabelPassword}><h4>Mật khẩu:</h4></p>
                            </div>
                            <Form.Item
                                // label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Không được bỏ trống mật khẩu !' }]}
                                className={styles.formItem}
                            >
                                <Input.Password type="password" placeholder="Mật khẩu" className={styles.input} />

                            </Form.Item>
                            <Form.Item
                                name="otp"
                                rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
                                className={styles.formItem}
                            >
                                <Input
                                    placeholder="Nhập mã OTP"
                                    className={styles.input}

                                />
                            </Form.Item>
                            <Form.Item className={styles.formItem}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Input
                                        style={{ flex: 1, marginRight: '8px' }}
                                        placeholder="Email để nhận mã OTP"
                                        name='email'
                                        value={emailForOtp}
                                        onChange={(e) => setEmailForOtp(e.target.value)}
                                        className={styles.input}
                                    />
                                    <Button
                                        onClick={handleResendOtp}
                                        disabled={isOtpButtonDisabled}
                                        className={styles.input}
                                    >
                                        {isOtpButtonDisabled ? `Gửi lại sau (${countdown}s)` : 'Gửi mã'}
                                    </Button>
                                </div>
                            </Form.Item>

                            <Form.Item className={styles.formItem}>
                                <Checkbox className={styles.checkbox}>Nhớ tài khoản</Checkbox>
                                <a className={styles.forgot} href="">
                                    Quên mât khẩu
                                </a>

                            </Form.Item>
                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton}>
                                    Đăng nhập
                                </Button>
                                <p className={styles.signup}>
                                    Bạn chưa có tài khoản <a href="http://localhost:3000/Register">Đăng ký</a>
                                </p>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src={img.logoLogin1} alt="Login" className={styles.imageStyle} />
                </div>
            </Content>

        </Layout>
    );
};

export default LoginForm;