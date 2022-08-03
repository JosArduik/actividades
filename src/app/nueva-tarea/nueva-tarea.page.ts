import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.page.html',
  styleUrls: ['./nueva-tarea.page.scss'],
})
export class NuevaTareaPage implements OnInit {
  categorias = []
  categorySelectedCategory

  newTaskObj = {}
  itemName
  itemDueDate
  itemPriority
  itemCategory

  constructor(public modalCtrl:ModalController, public alertController: AlertController, public todoService:TodoService) { 

  }

  ngOnInit() {
    this.categorias.push('Trabajo')
    this.categorias.push('Institucional')
    this.categorias.push('Personal')
  }

  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority, itemCategory:this.categorySelectedCategory})
    //console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate

    if(uid){
      await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      this.mensaje();
      //console.log("No puede guardar una actividad vacia")
    }
    this.dismis()
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categorias[index]
    //console.log(this.categorySelectedCategory);
  }

  async dismis(){
    await this.modalCtrl.dismiss(this.newTaskObj)
  }

  async mensaje() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: 'Todos los campos son obligatorios.',
      buttons: ['ACEPTAR']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);
  }

}
