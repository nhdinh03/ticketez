import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, Table, DatePicker, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import BaseTable from '~/components/common/BaseTable/BaseTable';
// import BaseModal from '~/components/common/BaseModal/BaseModal';
import Highlighter from 'react-highlight-words';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Actor.module.scss';
import axiosClient from '~/api/global/axiosClient';
import moment from 'moment';
const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminActor = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            width: '10%',
            defaultSortOrder: 'sorting',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            width: '30%',
            ...getColumnSearchProps('fullname'),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            ...getColumnSearchProps('birthday'),
        },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            ...getColumnSearchProps('avatar'),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={faPen}
                        className={cx('icon-pen')}
                        onClick={() => {
                            handleEditData(record);
                        }}
                    />

                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record)}
                    >
                        <FontAwesomeIcon icon={faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // modal
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [fileList, setFileList] = useState([]);
    
    const onChangeUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const showModal = () => {
        form.resetFields();
        setEditData(null);
        setOpen(true);
        setResetForm(true);
        setFileList([]);
    };

    const handleDelete = async (record) => {
        const res = await axiosClient.delete(`actor/${record.id}`);
        if (res.code === 500) {
            message.error('Không thể xoá vì ');
        }
        console.log(res);
        getList();
        message.success('Xóa dữ liệu thành công');
    };

    const handleEditData = (record) => {
        const formatDate = moment(record.birthday, 'YYYY-MM-DD');

        setOpen(true);
        setResetForm(false);
        setEditData(record);
        form.setFieldsValue({
            ...record,
            birthday: formatDate,
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values);
            // console.log(fileList);
            values = {
                ...values,
                avatar: fileList[0]?.name || editData?.avatar || 'No avatar',
            };
            if (editData) {
                values = {
                    id: editData.id,
                    ...values,
                };
                const res = await axiosClient.put(`actor/${editData.id}`, values);
                console.log(res);

                message.success('cập nhật thành công');
            }

            if (!editData) {
                // values = {
                //     ...values,
                //     avatar: fileList[0].name,
                // };
                // try {
                //     const res = await axiosClient.post('actor', values);
                //     console.log(res);
                // } catch (error) {
                //     console.log(error);
                // }

                // if (fileList.length > 0) {
                    let file = fileList[0];
                    console.log(file);
                    var formData = new FormData();
                    formData.append('file_to_upload', file);
                    console.log(formData.get('file_to_upload'));
                    try {
                        const res = await axiosClient.post('upload', formData);
                        console.log(res);
                    } catch (error) {
                        console.log(error);
                    }
                   
                // }
                message.success('Thêm thành công');
            }

            setOpen(false);
            form.resetFields();
            setLoading(false);
            setFileList([]);
            getList();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        getList();
    }, []);

    //form
    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        console.log(form);
    };
    //call api
    const [posts, setPosts] = useState([]);
    const getList = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('actor');
            // console.log(res);
            setPosts(res.data);
            setLoading(false);
            // console.log(res.data);
            // axios
            //     .get('https://jsonplaceholder.typicode.com/posts')
            //     .then((response) => {
            //         setPosts(response.data);
            //         console.log(response);
            //         setLoading(false);
            //     })
            //     .catch((error) => {
            //         console.error('Error fetching data:', error);
            //     });
        } catch (error) {
            console.log(error);
        }
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div>
            <Row>
                <Col span={22}>
                    <h1 className={cx('title')}>Bảng dữ liệu</h1>
                </Col>
                <Col span={2}>
                    <Button type="primary" className={cx('button-title')} icon={<PlusOutlined />} onClick={showModal}>
                        Thêm
                    </Button>
                </Col>
                <Modal
                    open={open}
                    width={'60%'}
                    title={editData ? 'Cập nhật' : 'Thêm mới'}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Thoát
                        </Button>,
                        resetForm && ( // Conditionally render the "Làm mới" button only when editing
                            <Button key="reset" onClick={handleResetForm}>
                                Làm mới
                            </Button>
                        ),
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            {editData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>,
                    ]}
                >
                    <Form form={form} name="dynamic_rule" style={{ maxWidth: 1000 }}>
                        <Form.Item
                            {...formItemLayout}
                            name="fullname"
                            label="Họ và tên"
                            // rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Input placeholder="Please input your name" />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="birthday"
                            label="Ngày sinh"
                            // rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}
                        >
                            <DatePicker placeholder="chọn ngày" format="DD-MM-YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Ảnh"
                            name="avatar"
                            rules={[{ required: true, message: 'Vui lòng ' }]}
                        >
                            {/* <ImgCrop rotationSlider> */}
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChangeUpload}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            {/* </ImgCrop> */}
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>
            <Table
                columns={columns}
                onClick={() => {
                    handleDelete();
                }}
                // dataSource={posts}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.id,
                    birthday: `${('0' + new Date(post.birthday).getDate()).slice(-2)}-${(
                        '0' +
                        (new Date(post.birthday).getMonth() + 1)
                    ).slice(-2)}-${new Date(post.birthday).getFullYear()}`,
                }))}
                // expandable={{
                //     expandedRowRender: (record) => (
                //         <p
                //             style={{
                //                 margin: 0,
                //             }}
                //         >
                //             {record.body}
                //         </p>
                //     ),
                // }}
            />
        </div>
    );
};

export default AdminActor;
