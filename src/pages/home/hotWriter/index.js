import React from 'react';
import { List, Icon, Tooltip } from 'antd';
import { GET_HOT_WRITER } from '@/const/api';
import useGetHomeData from '../hooks';

import './index.less';

function HotWriter () {
    const { hotData, getMoreData } = useGetHomeData(GET_HOT_WRITER);

    return (
        <section className="hot-writer">
            <List
                size="small"
                header={<div>热榜作者</div>}
                footer={
                    <div className="more-writer" onClick={getMoreData}>更多作者</div>
                }
                bordered
                dataSource={hotData}
                renderItem={item => 
                <List.Item>
                    <Tooltip placement="topLeft" title={item.writer}>
                        <span className="writer-name common-ellipsis">{item.writer}</span>
                    </Tooltip>
                    <span className="article-num"><Icon type="crown" />{item.article}</span>
                </List.Item>}
            />
        </section>
    )
}

export default HotWriter;