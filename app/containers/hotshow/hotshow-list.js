import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBanner } from '../../actions/hotshow-action';
import Loading from '../../compoments/comm/loading';
import Item from '../../compoments/hotshow/item';
import Banner from './banner-ctn';
//import Foot from '../../compoments/comm/foot';
import { size } from '../../util/style';

class HotShowList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //顶部轮播
        let { hotshows, bannerAction  } = this.props;
        let subs = hotshows.data.subjects;
        bannerAction(subs);
        // ListView
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let data = this._renderList();
        
        this.setState({
            dataSource: ds.cloneWithRows(data),
        })
    }

    _renderList() {
        let { hotshows } = this.props,
            ary = hotshows.data.subjects, subsAry = [], row=[],
            _that = this;
        row.push(<Banner/>);
        for(let i = 0, item; item = ary[i++];) {
            //一行两个
            subsAry.push(
                <Item key={i} rank={i} data={item} navigation={this.props.navigation} />
            );
            if(subsAry.length == 2) {
                row.push(subsAry);
                subsAry = [];
            }
        }
        return row;
    }
    _renderRow(data) {
        return(
            <View style={{marginTop: 1, flexWrap:'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>{data}</View>
        );
    }
	render() {
        //removeClippedSubviews 处理 banner 图片不显示
        return  <ListView removeClippedSubviews={false} dataSource={this.state.dataSource}  renderRow={this._renderRow.bind(this)}/>
    }
}

function mapStateToProps(state) {
    return {
        hotshows: state.hotshows,
        navigation: state.navigation.data
    }
}
function macthDispatchToProps(dispatch) {
    return bindActionCreators({ bannerAction: addBanner}, dispatch);
}
let style = StyleSheet.create({
    listbox: {
        marginBottom: 80,
    }
});

export default connect(mapStateToProps, macthDispatchToProps)(HotShowList);