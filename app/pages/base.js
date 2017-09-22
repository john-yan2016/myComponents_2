import React, {Component} from 'react';
import {
    tools,
    Icon,
} from 'yrui';
let localdata = tools.$storage;
import {Tooltip,message} from 'antd';
import './base.less';
import {getService} from './myFetch';
import {port} from './apiprefix';
// import Nav from '../components/nav/nav';
import SearchInput from '../components/home/searchipt';
const logoUrl = require('../styles/images/logo.png');
const logoTextUrl = require('../styles/images/logo-3.png');

export default class Frame extends Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      actived: location.hash.split('?')[0].slice(2).split('/')[0],
      userName:'',
      totalCountData: {total:0,dataTotal:0,departmentTotal:0},
    };
  }
  //导航点击切换状态
  handleNavClick=(value)=>{
    if(value!==this.state.actived){
      this.context.router.push(value);
      this.setState({
        actived: value,
      });
    }
  }
  //头部搜索
  search = (e) => {
    this.context.router.push({pathname:'homesearch',query:{_s:e,_t:new Date().getTime()}});
    this.setState({
      actived: 'homesearch',
    });
  }
  //点击登陆
  handleLoginClick = () => {
    location.hash='#/login';
    this.setState({
      actived: 'login',
    });
  }
  //点击注册
  handleRegisterClick= () => {
    location.hash='#/register';
    this.setState({
      actived: 'register',
    });
  }
  logout = () => {
    //退出登录;
    let {keys} = Object;//keys=Object.keys,引入Object.keys()方法遍历localStorage并返回所有Item的名称
    for(let i of keys(localStorage)){
      if(i!=='userUuid'){//除了userUuid以外全部清除
        localStorage.removeItem(i);
      }
    }
    let that = this;
    message.config({top: 24});
    message.success('退出成功！',2);
    setTimeout(function(){that.setState({userName:''});},500);
    let hash = location.hash;
    if(hash==='#/demand_request'||hash==='#/demand_release'){//如果是需求申请或者需求发布页面，由于没有权限了，就跳回首页
      location.hash='#';
    }
  }
  componentWillMount() {
    if(localStorage.userName){
      this.timeControl();
      this.setState({
        userName:localStorage.userName,
      });
    }
  }
  componentDidMount(){
    getService(port+ '/metadatamanage/manage/getTotalCount', data => {
      data.code === '1' && this.setState({totalCountData: data.data});
    });
  }
  componentWillUnmount(){
    if(localStorage.userName){
      this.timeControl();
    }
  }
  timeRecord = () =>{
    let renderTime = new Date().getTime(); //返回 1970 年 1 月 1 日至今的毫秒数
    localdata.set('renderTime',renderTime);
  }
  timeControl = () =>{
    if(localStorage.renderTime){
      let closeTime = new Date().getTime();
      let timeDifference=Math.abs(closeTime-localStorage.renderTime);
      if(timeDifference>1.8E6){//30分钟后需要重新登录
        let {keys} = Object;//keys=Object.keys,引入Object.keys()方法遍历localStorage并返回所有Item的名称
        for(let i of keys(localStorage)){
          if(i!=='userUuid'){//除了userUuid以外全部清除
            localStorage.removeItem(i);
          }
        }
      }
    }else{
      return false;
    }
  }
  render() {
    window.scrollTo(0,0);
    if(localStorage.userName){
      this.timeRecord();
    }
    const {actived, userName, totalCountData} = this.state;
    const nav = {'data':0,'api':1,'app':2,'map':3,'openIndex':4,'demand_request':5,'demand_realese':6,'login':0,'register':0,'homesearch':0};
    const bgImg = `url(${require('../styles/images/banner.jpg')})`;
    return (
      <div className="base">
        <div className="header" style={{backgroundImage:bgImg,backgroundPosition:`50% ${-nav[actived]*400-50}px`}}>
          <div className="header_top">
          <div className="logo-box">
            <a href="#">
            <img className="logoImg" src={logoUrl} />
            <img className="textImg" src={logoTextUrl} />
            </a>
          </div>
          <div className="nav-box">
            <ul>
              {navData.map((i,j)=><li className={actived===i.url?'active':''} key={j} onClick={this.handleNavClick.bind(this,i.url)}><span>{i.text}</span></li>)}  
            </ul>
            {/* <Nav navData={navData} /> */}
          </div>
          <div className="search-box">
            <SearchInput className="basesearch" search={this.search.bind(this)}/>
          </div>
          <div className="login-box">
            {
              userName?[
                <Tooltip key="1" placement="bottom" title="个人中心">
                <a href="#/personal" title={'欢迎您，'+userName}><Icon fa="user-circle" /></a>
                </Tooltip>
                ,
                <Tooltip  key="2" placement="bottom" title="退出登录">
                <a className="register" onClick={this.logout}><Icon fa="arrow-circle-right" /></a>
                </Tooltip>
                ,
              ]:[
                <Tooltip key="1" placement="bottom" title="登录">
                <a onClick={this.handleLoginClick}><Icon fa="user-circle-o" /></a>
                </Tooltip>
                ,
                <Tooltip key="2" placement="bottom" title="注册">
                <a className="register" onClick={this.handleRegisterClick}><Icon fa="user-plus" /></a>
                </Tooltip>,
              ]
            }
          </div>
          </div>
          <div className="news-box"><span><Icon fa="volume-up" /></span><span>已开放：</span><span className="newData">{totalCountData.total}</span><span>条数据；</span>
          <span className="newData">{totalCountData.dataTotal}</span><span>个数据资源；</span><span className="newData">{totalCountData.departmentTotal}</span><span>个部门</span></div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}


const navData = [{text: '首页', url: '/'},{text: '数据目录',url: 'data'},{text: 'API服务',url: 'api'},{text: 'APP应用',url: 'app'},{text: '地图服务',url: 'map'},{text: '开放指数',url: 'openIndex'},{text: '数据申请',url:'demand_request'},{text: '数据开放',url:'demand_release'}];
