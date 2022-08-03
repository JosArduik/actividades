import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevaTareaPage } from '../nueva-tarea/nueva-tarea.page';
import { TodoService } from '../todo.service';
import { ActualizarTareaPage } from '../actualizar-tarea/actualizar-tarea.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList = []

today : number = Date.now()

  constructor(public modalCtrl:ModalController, public todoService:TodoService) {
    this.getAllTask()
  }

  async addNewItem(){
    const modal = await this.modalCtrl.create({
      component: NuevaTareaPage
    })
    modal.onDidDismiss().then(newTask => {
      this.getAllTask()
    })
    return await modal.present()
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTask()
    //console.log(this.todoService.getAllTask());
  }

  eliminar(key){
    this.todoService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask){
    const modal = await this.modalCtrl.create({
      component: ActualizarTareaPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })
    return await modal.present()
  }

}
