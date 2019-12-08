import React, { useState, useEffect } from 'react';
import { List, Icon, Tooltip } from 'antd';
import './index.less';
import ajax from '@/util/request';
import { GET_HOT_POINT } from '@/const/api';
import get from 'lodash/get';

function HotPoint () {
    const [hotList, setHotList] = useState([]);

    /**
     * @description: 获取热门话题
     */
    function getHotPoint (limit, offset) {
        ajax({
            url: GET_HOT_POINT,
            method: 'POST',
            data: {
                limit,
                offset
            }
        }).then((res) => {
            setHotList(get(res, 'data.list', []));
        });
    }

    /**
     * @description: 获取更多话题
     */
    function getMorePoint () {
        let hotListLen = hotList.length;
        getHotPoint(5, hotListLen);
    }

    useEffect(() => {
        getHotPoint(5, 0);
    }, []);

    return (
        <section className="hot-point">
            <List
                size="small"
                header={<div>热门话题</div>}
                footer={
                    <div className="more-point" onClick={getMorePoint}>更多话题</div>
                }
                bordered
                dataSource={hotList}
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