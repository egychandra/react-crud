import React from 'react';

class TaskItem extends React.Component {


  _handleOnUpdateStatus = () => {
    const { onUpdateStatus, task } = this.props; // onUpdateStatus berasal App.js kemudian dikirim ke <TaskList /> dan diterima disini sebagai props, sedangkan task berasal dari TaskList
    onUpdateStatus(task.id); // onUpdateStatus berasal dari <TaskList /> yang membawa task.id
  }

  _handleDelete = () => {
    const { handleOnDelete, task } = this.props; // handleOnDelete berasal App.js kemudian dikirim ke <TaskList /> dan diterima disini sebagai props, sedangkan task berasal dari TaskList
    handleOnDelete(task.id) // handleOnDelete berasal dari <TaskList /> yang membawa task.id
  }

  _handleEdit = () => {
    const { onEditTask, task} = this.props; // onEditTask berasal App.js kemudian dikirim ke <TaskList /> dan diterima disini sebagai props, sedangkan task berasal dari TaskList
    onEditTask(task.id) // onEditTask berasal dari <TaskList /> yang membawa task.id
  }

  render() {
    const { task, index } = this.props; // task DISINI DI AMBIL DARI <TaskList />

    return (
      <tr>
        <td>{ index + 1 }</td> {/* INDEX DISINI ADALAH INDEX ARRAY DARI TASK YANG DIMULAI DARI 0, KITA MAU DI TAMPIILAN DIMULAI DARI 1 MAKANYA DI + 1*/}
        <td>{ task.name }</td>
        <td className="text-center">
          <span 
          className={ task.status === true ? "label label-danger" : "label label-success"} //JIKA task.status sama dengan true maka label pakai yang danger, sebaliknya jika false pakai yang label success
          onClick={ this._handleOnUpdateStatus }
          > 
          {task.status === true ? "Aktif" : "Tidak Aktif"}</span> {/* JIKA task.status sama dengan true maka Tulisan menjadi Aktif, sebaliknya jika false Tulisan menjadi Tidak Aktif*/}
        </td>
        <td className="text-center">
            <button 
              className="btn btn-warning" 
              type="button"
              onClick={this._handleEdit}
              >
            <span className="fa fa-pencil mr-5"></span>Edit
            </button>
          &nbsp;
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={ this._handleDelete }
            >
            <span className="fa fa-trash mr-5"></span>Delete
            </button>
        </td>
      </tr>
    )
  }
}

export default TaskItem;