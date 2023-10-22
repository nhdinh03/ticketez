import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, Table, DatePicker, Pagination, Select } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import style from './CinemaComplex.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import axiosClient from '~/api/global/axiosClient';
import { cinemaComplexApi, provinceApi } from '~/api/admin';
import funcUtils from '~/utils/funcUtils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';
import cinemaChainsApi from '~/api/admin/managementCinema/cinemaChainApi';
dayjs.extend(customParseFormat);

const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const AdminCinemaComplex = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    // const [checkNick, setCheckNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [posts, setPosts] = useState([]);


    const [workSomeThing, setWorkSomeThing] = useState(false);
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    const [province, setProvince] = useState([]);
    const [cinemaChains, setCinemaChains] = useState([]);
    const [openingTime, setOpeningTime] = useState(null);
const [closingTime, setClosingTime] = useState(null);

    //call api
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await cinemaComplexApi.getPage(currentPage, pageSize);
                const [province, cinemaChains] = await Promise.all([provinceApi.get(), cinemaChainsApi.get()]);
                setProvince(province.data);
                setCinemaChains(cinemaChains.data)
    
                console.log(res);
                //    console.log(resType);
                setTotalItems(res.totalItems);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    funcUtils.notify(error.response.data, 'error');
                } else {
                    console.log(error);
                }
            }
        };
        getList();
    }, [currentPage, pageSize, workSomeThing])
    

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
        Table.EXPAND_COLUMN,
        // {
        //     title: 'id',
        //     dataIndex: 'id',
        //     width: '10%',
        //     // ...getColumnSearchProps('id'),
        //     sorter: (a, b) => a.id - b.id,
        //     // defaultSortOrder: 'descend',
        // },
        {
            title: 'Cụm rạp',
            dataIndex: 'name',
            width: '10%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '20%',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Giờ mở cửa',
            dataIndex: 'openingTime',
            width: '10%',
        },
        {
            title: 'Giờ đóng cửa',
            dataIndex: 'closingTime',
            width: '10%',
        },
        {
            title: 'Thuộc tỉnh',
            dataIndex: 'province',
            ...getColumnSearchProps('province'),
            render: (province) => <span>{province.name}</span>
        },
        {
            title: 'Thuộc loại',
            dataIndex: 'cinemaChain',
            ...getColumnSearchProps('cinemaChain'),
            render: (cinemaChains) => <span>{cinemaChains.name}</span>
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={faPen}
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
                        <FontAwesomeIcon icon={faTrash} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

   
    const showModal = () => {
        form.resetFields();
        setEditData(null);
        setOpen(true);
        setResetForm(true);
    };

    const handleDelete = async (record) => {
        try {
            const res = await cinemaComplexApi.delete(record.id);
            console.log(res);
            if (res.status === 200) {
                funcUtils.notify(res.data, 'success');
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 409) {
                funcUtils.notify(error.response.data, 'error');
            }
        }
        setWorkSomeThing(!workSomeThing);
        
    };

    const handleEditData = (record) => {
        const formattedStartime = dayjs(record.openingTime, 'HH:mm:ss');
        const formattedEndtime = dayjs(record.closingTime, 'HH:mm:ss');
        setOpen(true);
        setResetForm(false);
        setEditData(record);
        //  message.success(record.id);
        form.setFieldsValue({
            ...record,
            openingTime: formattedStartime,
            closingTime: formattedEndtime,
            province: record.province.id,
            cinemaChain: record.cinemaChain.id
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values.province);
            console.log(values.cinemaChain);

            if (editData) {
                values ={
                    ...values,
                    openingTime: values.openingTime.format('HH:mm:ss'),
                    closingTime: values.closingTime.format('HH:mm:ss'),
                }
                const resp = await cinemaComplexApi.put(editData.id, values, values.province, values.cinemaChain);
                console.log(resp);
                funcUtils.notify('Cập nhật thành công', 'success');
            }
            console.log(values);
            if (!editData) {
                try {
                    values ={
                        ...values,
                        openingTime: values.openingTime.format('HH:mm:ss'),
                        closingTime: values.closingTime.format('HH:mm:ss'),
                    }
                    console.log(values);
                    const resp = await cinemaComplexApi.post(values, values.province, values.cinemaChain);
                    // message.success('Thêm thành công');
                    funcUtils.notify('Thêm thành công', 'success');
                } catch (error) {
                    console.log(error);
                    funcUtils.notify('Thêm thất bại', 'error');
                }
            }
            setOpen(false);
            form.resetFields();
            setLoading(false);
            setWorkSomeThing(!workSomeThing);
            // getList();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
      
    }, []);

    //form
    const handleResetForm = () => {
        form.resetFields();
        console.log(form);
    };
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    dayjs.extend(customParseFormat);
const onChangeStartTime = (time, timeString) => {
    setOpeningTime(timeString);
    console.log(setOpeningTime);
};
const onChangeEndTime = (time, timeString) => {
    setClosingTime(timeString);
    console.log(setClosingTime)
};


    return (
        <>    
                <Row>
                    <Col span={22}>
                        <h1 className={cx('title')}>Bảng dữ liệu</h1>
                    </Col>
                    <Col span={2}>
                        <Button
                            type="primary"
                            className={cx('button-title')}
                            icon={<PlusOutlined />}
                          
                            onClick={showModal}
                        >
                            Thêm
                        </Button>
                    </Col>
                    <BaseModal
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
                                name="name"
                                label="Cụm rạp"
                                rules={[{ required: true, message: 'Vui lòng nhập cụm rạp' }]}
                            >
                                <Input placeholder="Please input your name" />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="address"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input placeholder="Please input your name" />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input placeholder="Please input your name" />
                            </Form.Item>
                            <Form.Item 
                              {...formItemLayout}
                              name="openingTime"
                              label="Giờ bắt đầu"
                              rules={[{ required: true, message: 'Vui lòng nhập' }]}
                             >

                            <TimePicker value={openingTime} onChange={onChangeStartTime} defaultOpenValue={dayjs('00:00', 'HH:mm')} />
                            </Form.Item>
                        <Form.Item 
                          {...formItemLayout}
                          name="closingTime" 
                          label="Giờ kết thúc"
                          rules={[{ required: true, message: 'Vui lòng nhập' }]}
                      >

                        <TimePicker value={closingTime} onChange={onChangeEndTime} defaultOpenValue={dayjs('00:00', 'HH:mm')} />

                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="province"
                            label="Thuộc tỉnh"
                            rules={[{ required: true, message: 'Vui lòng chọn loại rạp' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: editData?.province?.id, // Sử dụng cinemaType từ record khi có
                                        label: editData?.province?.name,
                                    },
                                    ...province.map((namepr) => ({
                                        value: namepr.id,
                                        label: namepr.name,
                                    })),
                                ]}
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="cinemaChain"
                            label="Thuộc loại"
                            rules={[{ required: true, message: 'Vui lòng chọn loại rạp' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: editData?.cinemaChains?.id, // Sử dụng cinemaType từ record khi có
                                        label: editData?.cinemaChains?.name,
                                    },
                                    ...cinemaChains.map((namepr) => ({
                                        value: namepr.id,
                                        label: namepr.name,
                                    })),
                                ]}
                                allowClear
                            />
                        </Form.Item>
                        </Form>
                    </BaseModal>
                </Row>

                <BaseTable
                    columns={columns}
                    onClick={() => {
                        handleDelete();
                    }}
                    // dataSource={posts}Pagination = false 
                    pagination={false}
                    dataSource={posts.map((post) => ({ ...post, key: post.id }))}
                   
                />
                <div className={cx('wrapp-pagination')}>
                <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default AdminCinemaComplex;
