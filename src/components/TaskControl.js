import React from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

class Control extends React.Component {

  render() {
    let { onSortingDariApp, sortBerdasarkanNamaDariApp, sortBerdasarkanValueDariApp } = this.props; // BAWA onSortingDariApp dari App.js
    return (
      <div className="row mt-15">
        <TaskSearchControl 
          cariKataKunciDariKontrol={this.props.cariDenganKataKunciDariApp}
        />
        <TaskSortControl 
          onSortingDariControl={onSortingDariApp}  // onSortingDariApp dari App.js
          sortBerdasarkanNamaDariControl={sortBerdasarkanNamaDariApp} // sortBerdasarkanNamaDariControl BERISI DATA DARI sortBerdasarkanNamaDariApp YANG BERASAL DARI App.js DENGAN DATA sortBerdasarkanNama
          sortBerdasarkanValueDariControl={sortBerdasarkanValueDariApp} // sortBerdasarkanValueDariControl BERISI DATA DARI sortBerdasarkanValueDariApp YANG BERASAL DARI App.js DENGAN DATA sortBerdasarkanValue
        />
      </div>
    )
  }
}

export default Control;