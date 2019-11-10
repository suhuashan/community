import React, {useState, useEffect} from 'react';
import { Card, Pagination, Button, Icon } from 'antd';
import './index.less';
import get from 'lodash/get';
import ajax from '@/util/request';
import uuid from '@/util/uuid';


function CardList () {
    const [cardList, setCardList] = useState([]);
    const [cardListNum, setCardListNum] = useState(0);

    /**
     * @description: 获取卡片信息
     * @param {Number} limit
     * @param {Number} offset
     */
    function getCardList (limit, offset) {
        ajax({
            url: '/home/cardList.json',
            data: {
                limit,
                offset
            }
        }).then( res => {
            setCardList(get(res, 'data.list', []));
            setCardListNum(get(res, 'data.total', 0));
        });
    }

    /**
     * @description: 监听分页组件的变化
     * @param {Number} current
     * @param {Number} pageSize 
     */  
    function onPaginationChange (current, pageSize) {
        let offset = (current - 1) * pageSize;
        getCardList(pageSize, offset);
    }  

    /**
     * @description: 查看卡片详情
     * @param {String} id 
     */    
    function viewCardInfo (id) {
        
    }

    useEffect(() => {
        getCardList(10, 0);
    }, []);

    return (
        <section className="card-list">
            {
                cardList.map((item, index) => (
                    <Card size="small" 
                          title={
                              <div className="card-header">
                                <div className="card-header__content">{item.title}</div>
                                <Button type="link" 
                                        className="card-header__btn"
                                        onClick={viewCardInfo(item.id)}>查看</Button>
                              </div>
                          }
                          key={uuid(index)}
                          className="card-item">
                            <div className="card-content">
                                {item.content}
                            </div>
                            <div>
                                <span className="card-info"><Icon type="eye" className="card-info__icon"/>{item.views}</span>
                                <span className="card-info" ><Icon type="history" className="card-info__icon"/>{item.time}</span>
                                <span className="card-info"><Icon type="user" className="card-info__icon"/>{item.author}</span>
                            </div>
                    </Card>
                ))
            }
            <Pagination
                onChange={onPaginationChange}
                onShowSizeChange={onPaginationChange}
                showSizeChanger
                defaultCurrent={1}
                total={cardListNum}
                />
        </section>
    )
}

export default CardList;