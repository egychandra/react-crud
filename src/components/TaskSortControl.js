import React from 'react';

class Sort extends React.Component {

  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  // }


  // FUNGSI UNTUK MENGHANDLE SORT CONTROL
  _handleSortControl = (sortBerdasarkanNamaDariApp, sortBerdasarkanValueDariApp) => { // sortBerdasarkanNama DISINI MENAMPUNG ('name'), DAN sortBerdasarkanValue MENAMPUNG (-1)
  const { onSortingDariControl } = this.props; // onSortingDariControl BERASAL DARI TaskControl.js
  onSortingDariControl(sortBerdasarkanNamaDariApp, sortBerdasarkanValueDariApp); // onSortingDariControl BERASAL DARI TaskControl DI ISI PARAMETER sortBerdasarkanNama, sortBerdasarkanValue YANG AKAN DIKIRIM KE App.js
  }

  render() {
    const { sortBerdasarkanNamaDariControl, sortBerdasarkanValueDariControl } = this.props;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">

          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sorting<span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this._handleSortControl('name', 1)}> {/* BUAT EVENT CLIK DENGAN ARROW FUNCTION YANG BERISI name, value SAMA DENGAN STATE YANG ADA DI App.js*/}
              <a
                role="button"
                className={(sortBerdasarkanNamaDariControl === "name" && sortBerdasarkanValueDariControl === 1)
                  ? "sort_selected" : ""
                } // JIKA sort.berdasarkan SAMA DENGAN "name" dan sort.value SAMA DENGAN 1, MAKA className="sort_selected" INI UNTUK MEMUNCULKAN ICON CEKLIS
              >
                <span className="fa fa-sort-alpha-asc pr-5">
                  Nama A-Z
              </span>
              </a>
            </li>
            <li onClick={() => this._handleSortControl('name', -1)}> {/* BUAT EVENT CLIK DENGAN ARROW FUNCTION YANG BERISI name, value SAMA DENGAN STATE YANG ADA DI App.js*/}
              <a
                role="button"
                className={(sortBerdasarkanNamaDariControl === "name" && sortBerdasarkanValueDariControl === -1)
                  ? "sort_selected" : ""
                } // JIKA sort.berdasarkan SAMA DENGAN "name" dan sort.value SAMA DENGAN 1, MAKA className="sort_selected" INI UNTUK MEMUNCULKAN ICON CEKLIS
              >
                <span className="fa fa-sort-alpha-desc pr-5">
                  Nama Z-A
              </span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={() => this._handleSortControl('status', 1)}> {/* BUAT EVENT CLIK DENGAN ARROW FUNCTION YANG BERISI name, value SAMA DENGAN STATE YANG ADA DI App.js*/}
              <a
                role="button"
                className={(sortBerdasarkanNamaDariControl === "status" && sortBerdasarkanValueDariControl === 1)
                  ? "sort_selected" : ""
                } // JIKA sort.berdasarkan SAMA DENGAN "name" dan sort.value SAMA DENGAN 1, MAKA className="sort_selected" INI UNTUK MEMUNCULKAN ICON CEKLIS
              >
                Status Aktif
            </a>
            </li>
            <li onClick={() => this._handleSortControl('status', -1)}> {/* BUAT EVENT CLIK DENGAN ARROW FUNCTION YANG BERISI name, value SAMA DENGAN STATE YANG ADA DI App.js*/}
              <a
                role="button"
                className={(sortBerdasarkanNamaDariControl === "status" && sortBerdasarkanValueDariControl === -1)
                  ? "sort_selected" : ""
                } // JIKA sort.berdasarkan SAMA DENGAN "name" dan sort.value SAMA DENGAN 1, MAKA className="sort_selected" INI UNTUK MEMUNCULKAN ICON CEKLIS
              >
                Status Tidak Aktif
            </a>
            </li>
          </ul>

        </div>
      </div>

    )
  }
}

export default Sort;