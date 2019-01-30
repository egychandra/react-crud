import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // UNTUK MENAMPUNG id: unique, name, status 
      displayForm: false, // Buat state displayForm untuk menampung tampilan form
      taskEditing: null, // BUAT state taskEditing untuk menampung data yang akan di edit
      cariData: { // UNTUK MENAMPUNG DATA YANG DI FILTER/CARI
        name: '',
        status: -1,
      },
      kataKunci: '', //UNTUK MENAMPUNG PENCARIAN DARI COMPONENT Control.JS
      // sort : { // UNTUK MENAMPUNG DATA DARI <TaskSortControl />
      //   berdasarkan : 'name', // CARI BERDASARKAN name
      //   value : 1,
      // }
      sortBerdasarkanNama: 'name',  // sortBerdasarkanNama UNTUK MENAMPUNG ISI sort DARI TaskSortControl.js berdasarkan name, name disini berupa name dan status
      sortBerdasarkanValue: 1, // sortBerdasarkanValue UNTUK MENAMPUNG ISI sort DARI TaskSortControl.js berdasarkan value, value disini berupa -1 jika aktif dan 1 jika tidak aktif
    }
  }

  // LIFECYCLE REACTJS componentWillMount AKAN SELALU DIJALANKAN TERLEBIH DAHULU, MAKA DARI ITU SETIAP APLIKASI BERJALAN componentWillMount AKAN LANGSUNG MENJALANKAN DENGAN DATA YANG TERSIMPAN DI LOCAL STORAGE DAN DI setState ke tasks WALAUPUN BELUM DI CLIK onGenerateData
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  _onGenerateData = () => { // JIKA INI DIJALANKAN MAKA DATA DI LOCAL STORAGE AKAN BERISI DATA DARI FUNGSI INI
    const tasks = [
      {
        id: this.generateID(),
        name: 'Belajar ReactJS',
        status: true,
      },
      {
        id: this.generateID(),
        name: 'Belajar Java',
        status: false,
      },
      {
        id: this.generateID(),
        name: 'Belajar JavaScript',
        status: true,
      }
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); //FUNGSI INI UNTUK MENYIMPAN KE LOCAL STORAGE, CEK PADA APPLICATION DI GOOGLE CHROM NYA
  }

  // MEMBUAT DATA RANDOM 4 HURUF/ANGKA ACAK
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  // DATA RANDOM DARI FUNCTION S4 DI OLAH KEMBALI UNTUK MENGHASILKAN HURUF/ANGKA ACAK SEBANYAK => "ad15cbae-ad86-af66-c42e-2a7c3ede255a"
  generateID() { // FUNGSI INI UNTUK MEMBUAT id 
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  // FUNGSI UNTUK MENAMPILKAN FORM
  _onDisplayForm = () => { //Them Task
    if (this.state.displayForm && this.state.taskEditing !== null) {
      this.setState({
        displayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        displayForm: !this.state.displayForm,
        taskEditing: null
      });
    }
  }

  // UNTUK MENUTUP TAMPILAN FORM
  _onCloseForm = () => {
    this.setState({
      displayForm: false
    });
  }

  // UNTUK MENAMPILKAN FORM
  _onShowForm = () => {
    this.setState({
      displayForm: true
    });
  }

  // FUNGSI UNTUK MENYIMPAN/SAVE PADA FORM TAMBAH DAN EDIT
  _handleSubmit = (data) => { // DATA DISINI ADALAH APA YANG DIBAWA onSubmit DARI <TaskForm /> YAITU ISI STATE YANG ADA DI <TaskForm />
    // console.log(data);
    const { tasks } = this.state; // tasks = this.state.tasks
    if (data.id === "") {
      data.id = this.generateID();  // DISINI KITA generateID untuk mengisi id nya.
      tasks.push(data); // task kita push(KITA ISI) dengan data, data ini berasal dari onSubmit <TaskForm />
    } else {
      //Editing
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // SEMUA DATA YANG DI SUBMIT AKAN TERSIMPAN KE LOCAL STORAGE
  }

  // FUNGSI UNTUK MERUBAH STATUS DARI AKTIF DAN TIDAK AKTIF
  _handleUpdateStatus = (id) => { // Id disini berasal dari <TaskItem /> dikirim ke <TaskList /> kemudian diterima disini
    // console.log(id);
    const { tasks } = this.state;
    const index = this.findIndex(id); // KITA AKAN MENCARI INDEX DARI id TERSEBUT DENGAN MEMBUAT FUNCTION findIndex, KE findIndex
    console.log(index);
    if (index !== -1) { // SETELAH KITA MENEMUKAN INDEX, JIKA index tidak sama denngan -1
      tasks[index].status = !tasks[index].status; // MAKA tasks[INDEX ARRAY].status = tidak tasks[INDEX ARRAY].status
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks)); //SIMPAN KE LOCALSTORAGE
    }
  }

  // FUNGSI UNTUK MENCARI INDEX
  findIndex = (id) => {
    const { tasks } = this.state;
    let hasil = -1;
    tasks.forEach((task, index) => { //tasks kita forEach value dan index nya, 
      if (task.id === id) { // jika task.id sama dengan id
        hasil = index; // return hasilnya pasti index
      }
    });
    return hasil;
  }

  // FUNGSI UNTUK DELETE
  _handleOnDelete = (id) => { // Id disini berasal dari <TaskItem /> dikirim ke <TaskList /> kemudian diterima disini
    // console.log(id);
    const { tasks } = this.state;
    const index = this.findIndex(id); // KITA AKAN MENCARI INDEX DARI id TERSEBUT DENGAN MEMBUAT FUNCTION findIndex, KE findIndex
    console.log(index);
    if (index !== -1) { // SETELAH KITA MENEMUKAN INDEX, JIKA index tidak sama denngan -1
      tasks.splice(index, 1) // HAPUS TASKS DENGAN FUNGSI SPLICE BERDASARKAN INDEX ATAU ID nya
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks)); //SIMPAN KE LOCALSTORAGE
    }
    this._onCloseForm(); // SETELAH DELETE, FORM TAMBAH LANGSUNG CLOSE
  }

  // FUNGSI UNTUK EDIT
  _handleOnEdit = (id) => {
    const { tasks } = this.state;
    const index = this.findIndex(id); // KITA AKAN MENCARI INDEX DARI id TERSEBUT DENGAN MEMBUAT FUNCTION findIndex, KE findIndex
    const taskEditing = tasks[index]; // tasks[index] TAMPUNG DI taskEditing
    // console.log(taskEditing);
    this.setState({
      taskEditing: taskEditing
    });
    this._onShowForm();
  }

  // FUNGSI UNTUK PENCARIAN
  _handlePencarian = (cariNama, cariStatus) => { // cariNama, cariStatus HARUS SAMA DENGAN YANG ADA DI TaskList
    // console.log(cariNama, '-', cariStatus);
    // console.log(typeof(cariStatus)); //CEK DULU TIPE DATA NYA, HARUS NYA cariStatus TIPE DATA NYA NUMBER/INTEGER
    cariStatus = parseInt(cariStatus, 10); // DENGAN FUNGSI INI, YANG AWAL NYA cariStatus TERDETEKSI TIPE DATA NYA STRING DIRUBAH MENJADI NUMBER, BIASANYA NANTI MENGGUNAKAN PropType
    // console.log(typeof(cariStatus));
    this.setState({
      cariData: {
        name: cariNama.toLowerCase(), // PADA STATE filter, name DI ISI OLEH cariNama, FUNGSI toLowerCase AGAR TIDAK MEMPERDULIKAN BESAR KECIL NYA HURUF
        status: cariStatus, // PADA STATE filter, status DI ISI OLEH cariNama
      }
    })
  }

  // FUNGSI PENCARIAN DENGAN KATA KUNCI
  _handleCariDenganKataKunci = (kataKunci) => { // kataKunci DISINI BERASAL DARI Search.js YANG DITERIMA Control.js KEMUDIAN DIKIRIM KESINI
    this.setState({
      kataKunci: kataKunci
    })
  }

  _handleOnSorting = (sortBerdasarkanNama, sortBerdasarkanValue) => { // sortBerdasarkanNama, sortBerdasarkanValue DISINI BERASAL DARI TaskSortControl ke TaskControl
    // console.log(sortBerdasarkanNama, '-', sortBerdasarkanValue);
    this.setState({
      sortBerdasarkanNama: sortBerdasarkanNama, // sortBerdasarkanNama SEBELAH KIRI ADALAH STATE : DIISI DENGAN sortBerdasarkanNama BERASAL DARI TaskSortControl ke TaskControl
      sortBerdasarkanValue: sortBerdasarkanValue,// sortBerdasarkanValue SEBELAH KIRI ADALAH STATE : DIISI DENGAN sortBerdasarkanValue BERASAL DARI TaskSortControl ke TaskControl
    });
    // console.log(this.state);
  }

  render() {
    let { tasks, displayForm, taskEditing, cariData, kataKunci, sortBerdasarkanNama, sortBerdasarkanValue } = this.state; // let tasks = this.state.tasks
    /* ========= RENDER BERDASARKAN PENCARIAN PADA TASKLIST =========== */
    if (cariData) { // INI DIGUNAKAN UNTUK MENAMPILKAN DATA YANG DI FILTER/CARI. JIKA cariData
      if (cariData.name) { // JIKA cariData adalah name
        tasks = tasks.filter((task) => { // MAKA DATA tasks DI CARI DENGAN FUNGSI filter DENGAN PARAMETER task
          return task.name.toLowerCase().indexOf(cariData.name) !== -1; // TAMPILKAN DATA task BERDASARKAN name DENGAN INDEX BERDASARKAN name YANG TIDAK SAMA DENGAN -1, toLowerCase FUNGSI UNTUK TIDAK MEMPERDULIKAN HURUF KECIL ATAU BESAR, dan indexOf UNTUK MENCARI BERDASARKAN INDEX
        });
      }
      tasks = tasks.filter((task) => { // MAKA DATA tasks DI CARI DENGAN FUNGSI filter DENGAN PARAMETER task
        if (cariData.status === -1) { // JIKA cariData ADALAH status YANG SAMA DENGAN -1
          return task; // TAMPILKAN DATA
        } else { // JIKA cariData adalah status YANG TIDAK SAMA DENGAN -1
          return task.status === (cariData.status === 1 ? true : false); // MAKA TAMPILKAN DATA task YANG ISI NYA status SAMA DENGAN ( JIKA cariData ISI NYA status SAMA DENGAN 1 ADALAH true, SEBALIKNYA JIKA cariData ISI NYA status TIDAK SAMA DENGAN 1 MAKA false)
        }
      });
    }
    /* ============RENDER PENCARIAN BERDASARKAN KATA KUNCI DARI Search.js ke Control.js=======*/
    if (kataKunci) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(kataKunci) !== -1;
      });
    }
    /* ============ RENDER SORTING BERDASARKAN TaskSortControl ================*/
    if (sortBerdasarkanNama === "name") { // JIKA sortBerdasarkanNama SAMA DENGAN name
      tasks.sort((a, b) => { // DATA tasks DI FILTER/SARING DENGAN FUNGSI sort DENGAN a ADALAH INDEX, b ADALAH VALUE SEPERTI map()
        if (a.name > b.name) return sortBerdasarkanValue; // JIKA a.name LEBIH BESAR DARI b.name MAKA TAMPILKAN sortBerdasarkanValue
        else if (a.name < b.name) return -sortBerdasarkanValue; // SEBALIKNYA JIKA a.name LEBIH KECIL DARI b.name MAKA TAMPILKAN -sortBerdasarkanValue
        else return 0; // JIKA KONDISI DIATAS TIDAK TERPENUHI RETURN 0 YANG ARTINYA DATA TIDAK DITEMUKAN
      });
    } else { // MAKA
      tasks.sort((a, b) => { // SAMA DENGAN ATAS, INI BERDASARKAN STATUS
        if (a.status > b.status) return -sortBerdasarkanValue;
        else if (a.status < b.status) return sortBerdasarkanValue;
        else return 0;
      });
    }
    const elementTaskForm = displayForm ?
      <TaskForm
        onSubmitDiApp={this._handleSubmit}
        task={taskEditing} // { taskEditing } ditampung di task, jadi taskEditing ini menampung data yang di edit kemudian masukan kedalam task
        onCloseFormApp={this._onCloseForm} /> : ''; // JIKA displayForm === true TAMPILKAN <TaskForm /> SEBALIKNYA JIKA diplayForm === false JANGAN TAMPILKAN, PADA <TaskForm TERDAPAT onCloseForm, onCloseForm KIRIM KE TaskForm sebagai PROPS

    return (
      <div className="container">
        <div className="text-center">
          <h1>ReactJS CRUD</h1><hr />
        </div>
        <div className="row">
          <div className={displayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            {elementTaskForm}
          </div>
          <div className={displayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}> {/* JIKA displayForm === true MAKA TAMPILAN col-8 SEBALIKNYA JIKA displayForm === false TAMPILAN col-12*/}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this._onDisplayForm}
            >
              <span className="fa fa-plus mr-5"></span>{displayForm ? "Tutup Form" : "Tambah"} {/*  JIKA displayForm sama dengan true MAKA TEXT TUTUP FORM, SEBALIKNYA*/}
            </button>
            <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this._onGenerateData} // SAAT DI CLICK AKAN MENYIMPAN DATA tasks KEDALAM LOCAL STORAGE
            >
              Generate Data
            </button>
            <TaskControl
              cariDenganKataKunciDariApp={this._handleCariDenganKataKunci}
              onSortingDariApp={this._handleOnSorting} // FUNGSI UNTUK SORTING
              sortBerdasarkanNamaDariApp={sortBerdasarkanNama} // sortBerdasarkanNamaDariApp KIRIM SEBAGAI PROPS KE TaskControl DENGAN ISI sortBerdasarkanNama
              sortBerdasarkanValueDariApp={sortBerdasarkanValue} // sortBerdasarkanValueDariApp KIRIM SEBAGAI PROPS KE TaskControl DENGAN ISI sortBerdasarkanValue
            />
            <TaskList
              tasks={tasks} // tasks berisi data tasks yang diparsing ke TaskList
              onUpdateStatus={this._handleUpdateStatus} // KETIKA DI CLICK AKAN BERUBAH DARI AKTIF KE TIDAK AKTIF BEGITUPUN SEBALLIKNYA
              handleOnDelete={this._handleOnDelete}
              onEditTask={this._handleOnEdit}
              onPencarian={this._handlePencarian} // INI FUNGSI UNTUK FILTER/PENCARIAN MENGACU KE TaskList
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
