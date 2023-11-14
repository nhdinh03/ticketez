/* eslint-disable jsx-a11y/alt-text */
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React from 'react';
import EventListTinTuc from './EventList/EventTinTuc';
import EventRight from './EvenRight';
import {  useLocation } from 'react-router-dom';
import EventListKhuyenMai from './EventList/EventKhuyenMai';

const Event = () => {
    const location = useLocation();

    // Check if the current path is '/event'
    const isEventTinTucPage = location.pathname === '/su-kien/tin-tuc';
    const isEventKhuyenMaiPage = location.pathname === '/su-kien/khuyen-mai';

    return (
        <>
            <div className="tw-container tw-mx-auto tw-px-[150px] tw-bg-white tw-text-black  tw-mt-5">
                <Row gutter={22}>
                    <Col lg={16}>
                       
                        {isEventTinTucPage && (
                            <>
                                <EventListTinTuc />
                            </>
                        )}
                        {isEventKhuyenMaiPage && (
                            <>
                                <EventListKhuyenMai />
                            </>
                        )}
                    </Col>
                    <Col lg={8} style={{ borderLeft: '1px solid #D4D4D4' }}>
                        <p className="tw-font-semibold tw-text-pink-500 tw-text-left tw-text-3xl tw-mt-[19px] tw-mb-[10px]">
                            <FontAwesomeIcon icon={faFireFlameCurved} className="text-2xl mr-1" />
                            Tin tức liên quan
                        </p>
                        <EventRight />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Event;
