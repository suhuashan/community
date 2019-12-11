
import { useState, useEffect } from 'react';
import get from 'lodash/get';
import ajax from '@/util/request';

export default (url) => {
    const [hotData, setHotData] = useState([]);

    /**
     * @description: 获取热门话题
     */
    function getHotInfo (limit, offset) {
        ajax({
            url,
            method: 'POST',
            data: {
                limit,
                offset
            }
        }).then((res) => {
            setHotData(get(res, 'data.list', []));
        });
    }

    /**
     * @description: 获取更多话题
     */
    function getMoreData () {
        let hotDataLen = hotData.length;
        getHotInfo(5, hotDataLen);
    }

    useEffect(() => {
        getHotInfo(5, 0);
    }, []);

    return {
        hotData,
        getMoreData
    }
}