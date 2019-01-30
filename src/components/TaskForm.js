import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '', // INI UNTUK MENAMPUNG DATA id BARU
      name: '', // INI UNTUK MENAMPUNG DATA name BARU
      status: false, // INI UNTUK MENAMPUNG DATA status BARU
    }
  }

  componentWillMount() { //SAAT TOMBOL EDIT DI CLIK INI LANGSUNG DI JALANKAN
    const { task } = this.props; //task berasal dari App.js
    if(task){ // JIKA task ada
      this.setState({ // MAKA setState
        id : task.id,
        name : task.name,
        status : task.status
      });
      console.log(this.state);
    }
  }

  componentWillReceiveProps(nextProps) { //JIKA SEBELUMNYA SAAT FORM EDIT TAMPIL, KETIKA TOMBOL EDIT DI CLIK, FORM TIDAK TERISI DATA YANG AKAN DI EDIT, DENGAN componentWillReceiveProps INI SOLUSI NYA, MAKA KETIKA TOMBOL EDIT DICLIK DATA YANG AKAN DI EDIT AKAN TAMPIL DI FORM EDIT
    if(nextProps && nextProps.task){ // JIKA nextProps DAN nextProps YANG BERISI task YANG DIBAWA DARI TaskList
      this.setState({ // MAKA setState
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status
      });
    } else if (!nextProps.task){ // MAKA JIKA !nextProps.task
      this.setState({ // SetState
        id : '',
        name : '',
        status : false
      })
    }
  }

  _onCloseForm = () => {
    const { onCloseFormApp } = this.props; //onCloseFormApp BERASAL DARI App.js
    onCloseFormApp();
  }

  _onChange = (params) => { //INI MENERIMA INPUTAN DARI NAME INPUT DAN SELECT
    const target = params.target;
    const name = target.name;
    let value = target.value;
    if (name === "status") { // JIKA name === status, name DISINI BUKAN name YANG ADA PADA state, TAPI name DARI INPUTAN
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  }

  _handleSimpan = (params) => { //TERIMA INPUTAN APA SAJA DAN TAMPUNG DI params
    const { onSubmitDiApp } = this.props // onSubmitDiApp DISINI BERASAL DARI App.js
    params.preventDefault();
    onSubmitDiApp(this.state); // onSubmit BERISI STATE YANG ADA DI SINI YANG AKAN DIBAWA KE onSubmitDiApp YANG DI App.js
    this._handleOnClear(); this._onCloseForm(); // INI DIMASUKAN AGAR SAAT SETELAH TOMBOL SIMPAN DITEKAN SECARA OTOMATIS FORM AKAN CLOSE NGE DIRECT KE <TaskList />
    
  }

  _handleOnClear = () => {
    this.setState({
      name : '',
      status: false
    })
  }

  render() {
    const { id } = this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            { id !== '' ? "Form Edit" : "Form Tambah"} {/* JIKA id !== '' Maka Menjadi Form Edit, Sebaliknya */}
          <span
              className="fa fa-times-circle text-right"
              onClick={this._onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this._handleSimpan}> {/* DENGAN FORM BUAT onSubmit */}
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this._onChange}
              />
            </div>
            <label>Status</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this._onChange}
            >
              <option value={true}>Aktif</option>
              <option value={false}>Non Aktif</option>
            </select><br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-5"></span>Simpan
                  </button>&nbsp;
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={this._handleOnClear}
                >
                <span className="fa fa-close mr-5"></span>Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default TaskForm;
