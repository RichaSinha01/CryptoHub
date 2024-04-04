import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);  //THis is gonna give access to all the coins
  const [searchTerm, setSearchTerm] = useState('');

  //To filter only the searched coint in the array of all the coins we use useEffect
  useEffect(() => {
  
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);  //If any of the values change it will reflect on the app

  if(isFetching) return <Loader />;

  return ( //Gutters is used to give the space between the elements top, bottom and left, right  and xs property shows that how the app gonna be wide on extra small devices sm = small and lg = large
  // And use millify because the numbers are long so this is going to make them redable
    <> 
      {!simplified && (
        <div className = "search-crypto">
          <Input placeholder='Search Cryptocurrency' onChange = {(e) => setSearchTerm(e.target.value)}></Input>
        </div> 
      )}
      <Row gutter = {[32, 32]} className = "crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs = {24} sm = {12} lg = {6} className = "crypto-card" key = {currency.uuid}>
            <Link to = {`/crypto/${currency.uuid}`}>
              <Card 
                title = {`${currency.rank}. ${currency.name}`}
                extra = {<img className = "crypto-image" src = {currency.iconUrl} />}
                hoverable
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p> 
                <p>Daily Change : {millify(currency.change)}</p>   
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies