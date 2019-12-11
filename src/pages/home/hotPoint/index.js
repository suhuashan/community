import React from 'react';
import { List, Icon, Tooltip } from 'antd';
import './index.less';
import { GET_HOT_POINT } from '@/const/api';
import useGetHomeData from '../hooks';

function HotPoint () {
    const { hotData, getMoreData } = useGetHomeData(GET_HOT_POINT);

    return (
        <section className="hot-point">
            <List
                size="small"
                header={<div>热门话题</div>}
                footer={
                    <div className="more-point" onClick={getMoreData}>更多话题</div>
                }
                bordered
                dataSource={hotData}
                renderItem={item => 
                <List.Item>
                    
                    <Tooltip placement="topLeft" title={item.title}>
                        <span className="point-title common-ellipsis">{item.title}</span>
                    </Tooltip>
                    <span className="point-views"><Icon type="eye"/>{item.views}</span>
                </List.Item>}
            />
        </section>
    )
}

export default HotPoint;