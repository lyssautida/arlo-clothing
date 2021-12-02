import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }
`

export const Home = styled(Link)`
  text-decoration: none;
  font-family: 'Roboto';
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #ed2f59;
  span {
    color: #fff;
    margin-right: 1rem;
  }
`

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #fff;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
`