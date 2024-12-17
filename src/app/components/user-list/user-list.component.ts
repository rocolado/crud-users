import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  displayedColumns: string[] = ['nif', 'nombre', 'primerApellido', 'segundoApellido', 'tipo', 'acciones'];
  users: User[] = [];
  filteredUsers: User[] = [];

  filtersForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
    this.buildForm();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  private buildForm() {
    this.filtersForm = this.fb.group({
       userType: ['todos'],
    });
  }

  filterUsers(event: any): void {
    const userType: string = event.value;

    if (userType === 'todos') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => user.tipo.toLowerCase() === userType.toLowerCase());
    }
  }

  addUser() {
    this.router.navigate(['/create']);
  }

  viewUser(id: number) {
    this.router.navigate([`/detail/${id}`]);
  }

  editUser(id: number) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteUser(element: User) {
    Swal.fire({
      heightAuto: false,
      title: 'Eliminar',
      text: `¿Está seguro de que desea borrar el usuario ${element.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A65A',
      cancelButtonColor: '#D73925',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(element.id).subscribe((data: any) => {
          this.users = data;
        });
      }
    });
  }
}
