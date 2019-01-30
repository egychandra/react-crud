import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cariNama : '', // INI UNTUK MENAMPUNG SEARCH/PENCARIAN BERDASARKAN NAMA
      cariStatus : -1, // INI UNTUK MENAMPUNG PENCARIAN BERDASARKAN STATUS, JIKA PENCARIAN SEMUA STATUS : -1, JIKA PENCARIAN YANG AKTIF : 1, SEDANGKAN YANG NON AKTIF : 0
    }
  }

  _handleCari = (event) => {
    const { onPencarian } = this.props; // onPencarian BERASAL DARI App.js
    const { cariNama, cariStatus } = this.state; // cariNama, cariStatus BERASAL DARI STATE DISINI SENDIRI
    const target = event.target;
    const name = target.name;
    let value = target.value;
    onPencarian(
      name === "cariNama" ? value : cariNama,
      name === "cariStatus" ? value : cariStatus,
    )
    this.setState({
      [name] : value
    })
  }

  render() {
    const { tasks, onUpdateStatus, handleOnDelete, onEditTask } = this.props; //AMBIL tasks, onUpdateStatus, handleOnDelete DARI App.js
    const { cariNama, cariStatus } = this.state; // INISIALISASI DULU STATE NYA DISINI
    const elementTasks = tasks.map((task, index) => {
      return <TaskItem 
                key={task.id} 
                index={index} 
                task={task} // INI task YANG DIBAWA KE TaskItem DAN KE TaskForm
                onUpdateStatus={ onUpdateStatus } // onUpdateStatus BERASAL DARI App.js, masukan kedalam <TaskItem /> utuk dikirim ke <TaskItem /> tersebut
                handleOnDelete={ handleOnDelete } // handleOnDelete BERASAL DARI App.js, masukan kedalam <TaskItem /> utuk dikirim ke <TaskItem /> tersebut
                onEditTask={ onEditTask } // onEditTask BERASAL DARI App.js, masukan kedalam <TaskItem /> utuk dikirim ke <TaskItem /> tersebut
              /> //KIRIM task SEBAGAI PROPS KE <TaskItem/>
    })
    return (
      <div className="row mt-15">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <table className="table table-bordered table-hover mt-15">
      <thead>
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">Nama</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              className="form-control"
              name="cariNama" // SESUAIKAN DENGAN STATE
              value={ cariNama } // VALUE DI ISI DENGAN STATE
              onChange={this._handleCari}
            />
          </td>
          <td>
            <select
              className="form-control"
              name="cariStatus" // SESUAIKAN DENGAN STATE
              value={ cariStatus } // VALUE DI ISI DENGAN STATE
              onChange={this._handleCari}
            >
              <option value={-1}>Semua</option>
              <option value={0}>Non Aktif</option>
              <option value={1}>Aktif</option>
            </select>
          </td>
          <td></td>
        </tr>
        {elementTasks}
      </tbody>
    </table>
 </div>
 </div>
    )
  }
}

export default TaskList;