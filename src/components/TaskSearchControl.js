import React from 'react';

class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      kataKunci : '',
    }
  }

  // UNTUK FUNGSI PENCARIAN DENGAN KATA KUNCI
  _handleCariKataKunci = (event) => { // CATATAN : SETIAP FUNGSI onChange SELALU MEMBAWA PARAMETER EVENT
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name] : value // [name] INI BERASAL DARI name DARI INPUT
    })
  }

  _handlePencarianKataKunci = () => {
    const { cariKataKunciDariKontrol } = this.props;
    const { kataKunci } = this.state;
    cariKataKunciDariKontrol(kataKunci)
  }

  render() {
    let { kataKunci } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input
          name="kataKunci" // ini KALAU DI _handleCariKataKunci SAMA DENGAN [name]
          type="text"
          className="form-control"
          placeholder="Masukkan kata kunci"
          value={ kataKunci } // kataKunci DISINI BERASAL DARI STATE
          onChange={ this._handleCariKataKunci }
        />
        <span className="input-group-btn">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={this._handlePencarianKataKunci}
            >
            <span className="fa fa-search mr-5"></span>Tim
          </button>
        </span>
      </div>
    </div>
    
    )
  }
}

export default Search;