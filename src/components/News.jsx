import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const count = simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(newsCategory, count);
  const { data } = useGetCryptosQuery(100);

  const demoImage = 'http://cpinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';
  
  console.log(cryptoNews);
  //if(!cryptoNews?.data) return 'Loading...';
  if(isFetching)  return <Loader />;

  return (
    <>
      <Row gutter = { [24, 24] }>
        {!simplified && (
          <Col span = {24}>
            <Select
              showSearch
              className = "select-news"
              placeholder = "Select a crypto"
              optionFilterProp='children'
              onChange={(data) => setNewsCategory(data)}
              filterOption = {(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value = "Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => <Option value = {coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )}
        {cryptoNews?.map((news, i) => (
            <Col xs = {24} sm = {12} lg = {8} key = {i}>
              <Card hoverable className = "news-card">
                <a href = {news.link} target = "_blank" rel = "noreferrer">
                  <div className = "news-image-container">
                    <Title className = "news-title" level={4}>{news.title}</Title>
                    <img src= {news.image || demoImage} alt="news" style={{ width: '100px', height: '100px' }} />
                  </div>
                  <p>
                    {news.summary.length > 100 ? `${news.summary.substring(0, 100)} ...` : news.summary}
                  </p>
                  <div className = "provider-container">
                    <Avatar src = {news?.image || demoImage} alt = "news"  />
                    <Text >{moment(news.published).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
        ))}
      </Row>
    </>
  )
}

export default News    