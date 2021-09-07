import './App.css';
import { Component } from 'react'
const PRODUCTS = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
// 搜索栏
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleStock = this.handleStock.bind(this)
  }
  handleSearch(e) {
    this.props.handleSearch(e.target.value)
  }
  handleStock(e) {
    this.props.handleStock(e.target.checked)
  }
  render() {
    return (
      <form>
        <input value={this.props.searchValue} onChange={this.handleSearch} placeholder="查询" /> <br/>
        <input type="checkbox" checked={this.props.isStock} onChange={this.handleStock} />Only show products in stock
      </form>
    )
  }
}
// 分类行
class ProductCategoryRow extends Component {
  render() {
    return (
      <tr colSpan="2">
        <th>{this.props.category}</th>
      </tr>
    )
  }
}
// 数据行
class ProductRow extends Component {
  render() {
    const product = this.props.product
    const name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>
    return (
      <th>
        <tr>{name}</tr>
        <tr>{product.price}</tr>
      </th>
    )
  }
}
// 数据表格
class ProductTable extends Component {
  render(){
    // 获取过滤框文本
    const searchValue = this.props.searchValue
    const isStock = this.props.isStock
    const rows = []
    let lastCategory = null
    this.props.products.forEach(item => {
      // 根据输入条件过滤
      if(item.name.indexOf(searchValue) === -1) {
        return -1
      }
      // 根据勾选条件过滤
      if(isStock && !item.stocked ) {
        return -1
      }
      if(item.category !== lastCategory) {
        rows.push(
        <ProductCategoryRow
          category={item.category}
          key={item.category}
        />)
      }
      rows.push(
        <ProductRow product={item} key={item.name}></ProductRow>
      )
      lastCategory = item.category
    })
    return (
      <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    )
  }
}
class FilterableProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',  // 搜索字段
      isStock: false,  // check勾选标志位
    }
    // 给时间绑定this
    this.handleSearch = this.handleSearch.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }
  handleSearch(value) {
    this.setState({
      searchValue: value
    })
  }

  handleStock(value) {
    this.setState(state => ({
      isStock: value
    }))
  }
  render() {
    const products = this.props.products
    return (
      <div>
        {/* 搜索控件 */}
        <SearchBar searchValue={this.state.searchValue} handleSearch={this.handleSearch} handleStock={this.handleStock} />
        {/* 表格控件 */}
        <ProductTable products={products} searchValue={this.state.searchValue} isStock={this.state.isStock} />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export default App;

// 1. react style是一个对象， style={{color:'red'}}
// 2.受控组件组成的组件最好有自己的处理事件  SearchBar 里有自己的handleSearch handleStock
// 3.记得给事件绑定this，循环里渲染要有key值
