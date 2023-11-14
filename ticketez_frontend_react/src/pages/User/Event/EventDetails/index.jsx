/* eslint-disable jsx-a11y/alt-text */
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import img from '~/assets/img';

const EventDetails = () => {
    return (
        <>
            <div className="tw-container tw-mx-auto tw-px-[150px] tw-bg-white tw-text-black">
                <Row gutter={22}>
                    <Col lg={16}>
                        <img src={img.event} width="100%" height={344} className="tw-rounded-md tw-mt-[59px]" />
                        <div className="tw-font-bold tw-text-pink-500 tw-text-left tw-text-4xl tw-mt-[-40px] tw-mb-[25px]">
                            Ngày vàng nạp dế nhân đôi điểm tích lũy, nhận quà tẹt ga
                        </div>
                        <Typography>
                            Chần chờ là mất ưu đãi ngon, dân mê phim điện ảnh nhanh tay mở website
                            https://momo.vn/cinema lên, đặt vé xem phim ngay và luôn. Nhập thêm mã “XEMGI” là tới công
                            chuyện, hời thêm deal 10.000Đ chấn động các rạp liền! Nào cùng nhập mã thần sầu, chốt đơn
                            mau mau, tận hưởng bao phim HOT! Lưu ý: Chương trình áp dụng cho hóa đơn từ 200.000Đ khi đặt
                            qua website https://momo.vn/cinema. Thời gian diễn ra chương trình 22/08/2023 - 30/09/2023
                            Đối tượng tham gia: Dành riêng cho những khách hàng nhận được thông báo về chương trình qua
                            ứng dụng MoMo. Hướng dẫn nhập mã, nhận ưu đãi: 👉 Bước 1: Vào website https://momo.vn/cinema
                            và chọn “ĐẶT VÉ NGAY”. 👉 Bước 2: Chọn rạp, phim, suất chiếu, ghế và nhấn “Mua vé”. 👉 Bước
                            3: Chọn bắp nước và nhấn “Tiếp tục”. 👉 Bước 4: Mở app MoMo và quét mã QR trên màn hình hiển
                            thị để thanh toán. 👉 Bước 5: Kiểm tra thông tin thanh toán và nhấn “Tiếp tục”. 👉 Bước 6:
                            Tại màn hình thanh toán, phần ƯU ĐÃI, bấm “Chọn thẻ quà tặng”, nhập mã “XEMGI” vào ô Mã
                            khuyến mãi và bấm “Áp dụng”. 👉 Bước 7: Xem lại thông tin, số tiền và xác nhận thanh toán.
                            👉 Bước 8: Xuất trình QR code để nhận vé vào rạp. Điều kiện & điều khoản Mỗi khách hàng chỉ
                            được hưởng ưu đãi tối đa 1 lần (1 lần/1 tài khoản MoMo/1 CMND/1 SĐT/1 thiết bị). Chương
                            trình áp dụng cho khách hàng đã xác thực tài khoản và đã liên kết MoMo với tài khoản ngân
                            hàng. Không áp dụng chung với các chương trình khuyến mãi khác. Thẻ quà tặng không được cộng
                            gộp, không được hoàn lại và không có giá trị quy đổi thành tiền mặt. Lưu ý: Do số lượng quà
                            tặng có hạn nên chương trình có thể kết thúc sớm hơn so với dự kiến.
                        </Typography>
                    </Col>
                    <Col lg={8} style={{ borderLeft: '1px solid #D4D4D4' }}>
                        <p className="tw-font-semibold tw-text-pink-500 tw-text-left tw-text-3xl tw-mt-[19px] tw-mb-[10px]">
                            <FontAwesomeIcon icon={faFireFlameCurved} className="text-2xl mr-1" />
                            Tin tức liên quan
                        </p>
                        <Row className="tw-h-24 tw-mb-[45px]">
                            <Col lg={8}>
                                <img
                                    src={img.event}
                                    width={113}
                                    height={54}
                                    className="tw-rounded-md tw-mt-2 tw-mr-[20px]"
                                />
                            </Col>
                            <Col lg={16}>
                                <div
                                    className="
                                        tw-leading-normal 
                                        tw-text-left tw-line-clamp-3 tw-max-w-[180px]
                                        tw-mt-2 text-2xl  tw-font-semibold tw-no-underline  hover:tw-underline"
                                >
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="tw-leading-normal tw-text-left tw-text-gray-500 tw-line-clamp-3 tw-max-w-[220px] tw-mt-2 tw-text-lg tw-no-underline ">
                                    11/12/2023
                                </span>
                            </Col>
                        </Row>
                        <Row className="tw-h-24 tw-mb-[45px]">
                            <Col lg={8}>
                                <img
                                    src={img.event}
                                    width={113}
                                    height={54}
                                    className="tw-rounded-md tw-mt-2 tw-mr-[20px]"
                                />
                            </Col>
                            <Col lg={16}>
                                <div
                                    className="
                                        tw-leading-normal 
                                        tw-text-left tw-line-clamp-3 tw-max-w-[180px]
                                        tw-mt-2 text-2xl  tw-font-semibold tw-no-underli hover:tw-underline"
                                >
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="tw-leading-normal tw-text-left tw-text-gray-500 tw-line-clamp-3 tw-max-w-[220px] tw-mt-2 tw-text-lg tw-no-underline ">
                                    11/12/2023
                                </span>
                            </Col>
                        </Row>
                        <Row className="tw-h-24 tw-mb-[45px]">
                            <Col lg={8}>
                                <img
                                    src={img.event}
                                    width={113}
                                    height={54}
                                    className="tw-rounded-md tw-mt-2 tw-mr-[10px]"
                                />
                            </Col>
                            <Col lg={16}>
                                <div
                                    className="
                                        tw-leading-normal 
                                        tw-text-left tw-line-clamp-3 tw-max-w-[180px]
                                        tw-mt-2 text-2xl  tw-font-semibold tw-no-underline  hover:tw-underline"
                                >
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="tw-leading-normal tw-text-left tw-text-gray-500 tw-line-clamp-3 tw-max-w-[220px] tw-mt-2 tw-text-lg tw-no-underline ">
                                    11/12/2023
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default EventDetails;
