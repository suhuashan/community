import React, { useState } from 'react';
import { List } from 'antd';
import './index.less';

function HotPoint () {
    const [hotList, setHotList] = useState([]);

    return (
        <section className="hot-point">
            <List
                size="small"
                header={<div>热门话题</div>}
                footer={<div>更多话题</div>}
                bordered
                dataSource={hotList}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
        </section>
    )
}

export default HotPoint;