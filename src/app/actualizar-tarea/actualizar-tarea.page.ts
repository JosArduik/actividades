import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.page.html',
  styleUrls: ['./actualizar-tarea.page.scss'],
})
export class ActualizarTareaPage implements OnInit {
  @Input() task;
  categorias = []
  categorySelectedCategory

  newTaskObj = {}
  itemName
  itemDueDate
  itemPriority
  itemCategory

  constructor(public modalCtrl:ModalController, public todoService:TodoService) { 

  }

  ngOnInit() {
    this.categorias.push('Trabajo')
    this.categorias.push('Institucional')
    this.categorias.push('Personal')

    this.itemName = this.task.value.itemName
    this.itemDueDate = this.task.value.itemDueDate
    this.itemPriority = this.task.value.itemPriority
    this.categorySelectedCategory = this.task.value.itemCategory
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categorias[index]
    //console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtrl.dismiss()
  }

  async update(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority, itemCategory:this.categorySelectedCategory})
    let uid = this.task.key
    await this.todoService.updateTask(uid,this.newTaskObj)
    this.dismis()
  }

}
