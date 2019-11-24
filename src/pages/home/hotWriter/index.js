import React, { useState, useEffect } from 'react';
import { List, Icon, Tooltip } from 'antd';
import ajax from '@/util/request';
import { GET_HOT_WRITER } from '@/const/api';
import get from 'lodash/get';

import './index.less';

function HotWriter () {
    const [hotWriter, setHotWriter] = useState();

    function getHotWriter (limit, offset) {
        ajax({
            url: GET_HOT_WRITER,
            data: {
                limit,
                offset
            }
        }).then(res => {
            setHotWriter(get(res, 'data.list', []));
        });
    }

    function getMoreWriter () {
        let offset = hotWriter.length;
        getHotWriter(5, offset);
    }

    useEffect(() => {
        getHotWriter(5, 0);
    }, []);

    return (
        <section className="hot-writer">
            <List
                size="small"
                header={<div>热榜作者</div>}
                footer={
                    <div className="more-writer" onClick={getMoreWriter}>更多作者</div>
                }
                bordered
                dataSource={hotWriter}
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