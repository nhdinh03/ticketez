import React, {  useState, useEffect } from 'react';
import {
    Button,
    Input,
    Space,
    Col,
    Row,
    Form,
    message,
    Popconfirm,
    Upload,
    Image,
    Pagination,
    DatePicker,
    Select,
} from 'antd';
import {  PlusOutlined } from '@ant-design/icons';
import BaseTable from '~/components/common/BaseTable/BaseTable';
import BaseModal from '~/components/common/BaseModal/BaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import TextArea from 'antd/es/input/TextArea';
import mpaaRatingApi from '~/api/admin/managementMovie/mpaaRating';
import uploadApi from '~/api/service/uploadApi';
import funcUtils from '~/utils/funcUtils';
import articleApi from '~/api/admin/managementMovie/article';
import moment from 'moment';
import dayjs from 'dayjs';
import { movieApi } from '~/api/admin';


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const { Option } = Select;

const Article = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [checkNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [dataMovie, setDataMovie] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [posts, setPosts] = useState([]);
    console.log("kkkk",dataMovie);
    //phân trang
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tạif
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    const [workSomeThing, setWorkSomeThing] = useState(false);

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await articleApi.getByPage(currentPage, pageSize);
                setPosts(res.data);
                setTotalItems(res.totalItems);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();

        const getListMovie = async () => {
            setLoading(true);
            try {
                const res = await movieApi.getAll();
                setDataMovie(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getListMovie();
    }, [currentPage, pageSize, workSomeThing]);


    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: '6%',
            defaultSortOrder: 'sorting',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên',
            dataIndex: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'banner',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        width={105}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        alt="ảnh rỗng"
                        src={`http://localhost:8081/api/upload/${record.banner}`}
                    />
                </Space>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create_date',
            width: '10%',
            render: (endTime) => {
                return endTime ? moment(endTime).format('DD-MM-YYYY') : '';
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'content',
        },

        {
            title: 'Thao tác',
            width: '10%',
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
        try {
            const res = await mpaaRatingApi.delete(record.id);
            if (res.status === 200) {
                if (fileList.length > 0) {
                    await uploadApi.delete(record.icon);
                }
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
         const formattedEndTime = dayjs(record.create_date, 'YYYY-MM-DD HH:mm:ss');
        const newUploadFile = {
            uid: record.id.toString(),
            name: record.banner,
            url: `http://localhost:8081/api/upload/${record.banner}`,
        };
        setFileList([newUploadFile]);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
        form.setFieldsValue({
            ...record,
            create_date:  formattedEndTime,
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            if (fileList.length > 0) {
                if (editData) {
                    let putData = {
                        id: editData.id,
                        ...values,
                    };
                    if (putData.banner.file) {
                        const file = putData.banner.fileList[0].originFileObj;
                        const images = await uploadApi.put(editData.banner, file);
                        putData = {
                            ...putData,
                            banner: images,
                        };
                    }
                  
                    try {
                        const resPut = await articleApi.update(putData.id, putData);
                        if (resPut.status === 200) {
                            funcUtils.notify('Cập nhật danh sách phim thành công', 'success');
                        }
                    } catch (error) {
                        if (error.status === 500) {
                            funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                        }
                        console.log(error);
                    }
                } else {
                    try {
                        const file = values.banner.fileList[0].originFileObj;
                        const images = await uploadApi.post(file);
                        const postData = {
                            ...values,
                            banner: images,
                        };
                        const resPost = await articleApi.create(postData);
                        if (resPost.status === 200) {
                            funcUtils.notify('Thêm danh sách phim thành công', 'success');
                        }
                    } catch (error) {
                        if (error.status === 500) {
                            funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                        }
                        // upload
                        if (error.response.data.error) {
                            funcUtils.notify(error.response.data.error, 'error');
                        }
                        console.log(error);
                    }
                }
                setOpen(false);
                form.resetFields();
                setLoading(false);
                setFileList([]);
                setWorkSomeThing(!workSomeThing);
            } else {
                setLoading(false);
                message.error('vui lòng chọn ảnh');
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            message.error('Có lỗi xảy ra vui lòng thử lại');
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    //phân trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    //form
    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
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

    const propsUpload = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    return (
        <div>
            <Row>
                <Col span={22}>
                    <h1>Bảng dữ liệu</h1>
                </Col>
                <Col span={2}>
                    <Button type="primary" className=" tw-mt-[20px]" icon={<PlusOutlined />} onClick={showModal}>
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
                        resetForm && (
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
                            label="Chọn ảnh"
                            name="banner"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                        >
                            <Upload
                                {...propsUpload}
                                listType="picture-card"
                                onChange={onChangeUpload}
                                onPreview={onPreview}
                                fileList={fileList}
                                name="icon"
                                maxCount={1}
                            >
                                {fileList.length < 2 && '+ Tải lên'}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="title"
                            label="Nhập tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Input placeholder="Vui lòng nhập tên " />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="create_date"
                            label="Chọn ngày"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                        >
                            <DatePicker placeholder="Chọn ngày" format={'DD-MM-YYYY'} />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="content"
                            label="Nhập mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                            <TextArea placeholder="Vui lòng nhập mô tả" />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="movie"
                            label="Chọn phim"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn phân loại phim' }]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                // onChange={(value) => onChangSelectFormatMovie(value)}
                                // disabled={!selectedOption3}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn phim"
                                optionFilterProp="children"
                                optionLabelProp="label"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {dataMovie && dataMovie.length > 0
                                    ? dataMovie.map((formatMovie) => (
                                          <Option key={formatMovie.id} value={formatMovie.id} label={formatMovie.title}>
                                              <Space style={{ justifyContent: 'flex-start', display: 'flex' }}>
                                                  <div>
                                                      <span role="img" aria-label="China">
                                                          <img
                                                              alt=""
                                                              className="tw-w-[40px] tw-h-[50px] tw-rounded-md"
                                                              src={uploadApi.get(formatMovie.poster)}
                                                          />
                                                      </span>
                                                  </div>
                                                  <span>{formatMovie.title}</span>
                                              </Space>
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                    </Form>
                </BaseModal>
            </Row>

            <BaseTable
                pagination={false}
                columns={columns}
                onClick={() => {
                    handleDelete();
                }}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.id,
                }))}
            />
            <div>
                <Pagination
                    style={{ float: 'right', marginTop: '10px' }}
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Article;
