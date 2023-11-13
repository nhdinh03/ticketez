/* eslint-disable jsx-a11y/alt-text */
import { faFire, faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import img from '~/assets/img';


const Event = () => {
    return (
        <>
            <div className="container mx-auto px-[150px] bg-white text-black">
                <Row gutter={22}>
                    <Col lg={16}>
                        <img src={img.event} width="100%" height={344} className="rounded-md mt-[59px]" />
                        <div className="font-bold text-pink-500 text-left text-4xl mt-[-40px] mb-[25px]">
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
                        <p className="font-semibold text-pink-500 text-left text-3xl mt-[19px] mb-[10px]">
                            <FontAwesomeIcon icon={faFireFlameCurved} className="text-2xl mr-1" />
                            Tin tức liên quan
                        </p>
                        <Row gutter={24} className="h-24 mb-[45px]">
                            <Col lg={8}>
                                <img src={img.event} width={113} height={54} className="rounded-md mt-2 mr-[20px]" />
                            </Col>
                            <Col lg={16}>
                                <div className="leading-normal text-left line-clamp-3 max-w-[180px]  mt-2 text-2xl  font-semibold no-underline hover:underline">
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="leading-normal text-left text-gray-500 line-clamp-3 max-w-[220px] mt-2 text-lg no-underline ">
                                    11/12/2023
                                </span>
                            </Col>
                        </Row>
                        <Row gutter={24} className="h-24 mb-[45px]">
                            <Col lg={8}>
                                <img src={img.event} width={113} height={54} className="rounded-md mt-2 mr-[20px]" />
                            </Col>
                            <Col lg={16} >
                                <div className="leading-normal text-left line-clamp-3 max-w-[180px]  mt-2 text-2xl  font-semibold no-underline hover:underline">
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="leading-normal text-left text-gray-500 line-clamp-3 max-w-[220px]  mt-2 text-lg no-underline ">
                                    11/12/2023
                                </span>
                            </Col>
                        </Row>
                        <Row gutter={24} className="h-24 mb-[20px]">
                            <Col lg={8}>
                                <img src={img.event} width={113} height={54} className="rounded-md mt-2 mr-[20px]" />
                            </Col>
                            <Col lg={16}>
                                <div className="leading-normal text-left line-clamp-3 max-w-[180px]  mt-2 text-2xl  font-semibold no-underline hover:underline">
                                    Mua/nạp Data chỉ từ 1.000Đ hốt lộc đến 1.111.111Đ liền tay. Duy nhất ngày 11/11,
                                </div>
                                <span className="leading-normal text-left text-gray-500 line-clamp-3 max-w-[220px] mt-2 text-lg no-underline ">
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

export default Event;
