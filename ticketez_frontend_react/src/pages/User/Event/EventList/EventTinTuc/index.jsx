/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import uploadApi from '~/api/service/uploadApi';
import eventAPI from '~/api/user/event/eventAPI';

const EventListTinTuc = () => {
    const [dataEventByNew, setDataEventByNew] = useState(null);
    const [dataCardLoadMore, setDataCardLoadMore] = useState([]);
    const [loadingCard, SetLoadingCard] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        const getList = async () => {
            SetLoadingCard(true);
            try {
                const res = await eventAPI.getEventByNew();

                setDataEventByNew(res.data);
                SetLoadingCard(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, []);

    useEffect(() => {
        const getList = async () => {
            SetLoadingCard(true);
            try {
                const res = await fetch(`http://localhost:8081/api/event/get/event-by-news?page=${page}&limit=2`);

                const json = await res.json();
                console.log(json);
                setDataCardLoadMore((pre) => [...pre, ...json.data]);
                setTotalPage(json.totalPages);
                SetLoadingCard(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, [page]);

    return (
        <>
            {dataEventByNew && dataEventByNew.length > 0 ? (
                <>
                    <div className=" tw-text-pink-500 tw-text-left tw-text-5xl tw-mt-[13px] tw-mb-[10px] tw-font-[var(--font-family)]">
                        Tin tức
                    </div>
                    <Link to={`/su-kien/tin-tuc/${dataEventByNew[0]?.id}`}>
                        <img
                            src={uploadApi.get(dataEventByNew[0]?.banner)}
                            width="100%"
                            height={344}
                            className="tw-rounded-md "
                        />
                    </Link>
                    <div className=" tw-text-gray-500 tw-text-left tw-text-xl tw-mt-[-40px]  tw-mb-[25px] tw-font-[var(--font-family)]">
                        {moment(dataEventByNew[0]?.startDate).format('DD-MM-YYYY ')}
                    </div>
                    <h1 className="tw-font-[var(--font-family)]  tw-text-left tw-text-4xl tw-mt-[-20px] hover:tw-text-pink-500 ">
                        {dataEventByNew[0]?.name}
                    </h1>
                </>
            ) : null}
            <div>
                <div>
                    <Row gutter={24} className=" ">
                        {dataCardLoadMore?.map((user) => (
                            <Col lg={12} xs={24} key={user.id} className="tw-leading-normal tw-mb-[15px]">
                                <Link to={`/su-kien/tin-tuc/${user.id}`}>
                                    <img
                                        src={uploadApi.get(user.banner)}
                                        width={380}
                                        height={184}
                                        className="tw-mt-2 tw-mr-[20px] tw-rounded-lg tw-opacity-100 hover:tw-opacity-50"
                                    />
                                    <div className="tw-font-[var(--font-family)] tw-text-gray-400 tw-text-left tw-text-xl tw-mb-[25px]">
                                        {moment(user.startDate).format('DD-MM-YYYY ')}
                                    </div>
                                    <div className="tw-font-[var(--font-family)] tw-text-left tw-text-2xl tw-mt-[-20px] hover:tw-underline">
                                        <span className="tw-text-gray-800">{user.name} </span>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    {page < totalPage && (
                        <Button
                            onClick={() => setPage(page + 1)}
                            className="tw-rounded-full tw-border tw-w-[140px] tw-h-[33px] tw-border-pink-600 tw-py-1 tw-pl-4 tw-pr-6 tw-mb-[30px] tw-font-semibold tw-text-pink-500 tw-transition-all hover:tw-bg-pink-50 hover:tw-text-pink-800"
                        >
                            {loadingCard ? (
                                'Đang tải...'
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="tw-mr-2 tw-inline-block tw-h-5 tw-w-[10px] tw-animate-bounce tw-fill-pink-500 hover:tw-fill-pink-800"
                                        height="1em"
                                        viewBox="0 0 384 512"
                                    >
                                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                    </svg>
                                    Tải thêm
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default EventListTinTuc;
