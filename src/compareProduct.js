import React from 'react';
import axios from 'axios';
import './compareProduct.css';

class CompareProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showData: [],
            filterData: []
        }
    }
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/photos")
            .then(res => {
                const data = res.data;
                const filterArray = data && data.slice(0, 5);
                this.setState({ showData: filterArray });
            })

    }
    triggerEventOnComparison = (e, id) => {
        let filteredValue = this.state.filterData;
        let compareData = this.state.showData && this.state.showData.find((itemData) => itemData && itemData.id === id)
        if (!this.state[id]) {
            this.setState({ [id]: true })
            filteredValue && filteredValue.push(compareData);
        } else {
            filteredValue = filteredValue && filteredValue.filter((data) => data.id !== id)
            this.setState({ [id]: false });

        }
        this.setState({ filterData: filteredValue })
        // console.log('dfgdgd', id);
    }
    render() {
        console.log(this.state.filterData);
        // console.log(item);
        return (
            <div className="container">
                <div className="data-container">
                    {this.state.showData && this.state.showData.map((item) => {
                        return (
                            <div className="showData-container">
                                <div className="show-image">
                                    <img src={item && item.url} alt={item && item.url} />
                                </div>
                                <span>{item && item.id}</span>
                                <span>{item && item.title}</span>
                                <span>{item && item.url}</span>
                                {this.state[item.id] ?
                                    <button onClick={(e) => { this.triggerEventOnComparison(e, item.id) }}>remove</button>
                                    :
                                    <button onClick={(e) => { this.triggerEventOnComparison(e, item.id) }}>compare</button>
                                }
                            </div>);
                    })}

                    <div className="compare-table" style={{ width: '88%' }}>
                        {this.state.filterData && this.state.filterData.length ?
                            <table style={{ width: '93%', marginLeft: '100px', marginTop: '50px' }}>
                                <caption style={{ border: '2px solid', marginBottom: '10px', }}>Comparison</caption>
                                <tr>
                                    <th>Photo</th>
                                    <th>Id</th>
                                    <th>Url</th>
                                    <th>title</th>
                                </tr>
                                <tbody>
                                    {this.state.filterData && this.state.filterData.map((item, index) => {
                                        return <tr key={index}>
                                            <td><img src={item && item.thumbnailUrl} alt={item && item.thumbnailUrl} /></td>
                                            <td>{item && item.title}</td>
                                            <td>{item && item.id}</td>
                                            <td>{item && item.url}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table> : null}
                    </div>



                </div>
            </div >
        );
    }
}
export default CompareProduct;
