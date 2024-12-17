import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudios, ExperienciaLaboral, User } from '../../models/user.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent {
  form!: FormGroup;
  editUser!: User;
  isEdit: boolean = false;

   constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.loadData();
    this.buildForm();
  }

  private async loadData() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      await firstValueFrom(this.userService.getUserById(id)).then(
        (user: User) => {
          this.editUser = user;
        }
      );
    }

    if (this.route.snapshot.routeConfig?.path?.includes('detail')) {
      this.isEdit = true;
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [{value: this.editUser ? this.editUser.id : '', disabled: this.isEdit}],
      nif: [{value: this.editUser ? this.editUser.nif : '', disabled: this.isEdit}, Validators.required],
      nombre: [{value: this.editUser ? this.editUser.nombre : '', disabled: this.isEdit}, Validators.required],
      primerApellido: [{value: this.editUser ? this.editUser.primerApellido : '', disabled: this.isEdit}, Validators.required],
      segundoApellido: [{value: this.editUser ? this.editUser.segundoApellido : '', disabled: this.isEdit}],
      genero: [{value: this.editUser ? this.editUser.genero : '', disabled: this.isEdit}],
      fechaNacimiento: [{value: this.editUser ? this.editUser.fechaNacimiento : '', disabled: this.isEdit}],
      calle: [{value: this.editUser ? this.editUser.direccion.calle : '', disabled: this.isEdit}],
      numero: [{value: this.editUser ? this.editUser.direccion.numero : '', disabled: this.isEdit}],
      puerta: [{value: this.editUser ? this.editUser.direccion.puerta : '', disabled: this.isEdit}],
      codigoPostal: [{value: this.editUser ? this.editUser.direccion.codigoPostal : '', disabled: this.isEdit}],
      ciudad: [{value: this.editUser ? this.editUser.direccion.ciudad : '', disabled: this.isEdit}],
      tipo: [{value: this.editUser ? this.editUser.tipo : '', disabled: this.isEdit}],
      empresa: [{value: '', disabled: this.isEdit}],
      puesto: [{value: '', disabled: this.isEdit}],
      fechaExperiencia: [{value: '', disabled: this.isEdit}],
      institucion: [{value: '', disabled: this.isEdit}],
      titulacion: [{value: '', disabled: this.isEdit}],
      fechaEstudios: [{value: '', disabled: this.isEdit}],
    });

    this.loadExperienciaLaboral();
    this.loadEstudios();
  }

  loadExperienciaLaboral() {
    if (this.editUser) {
      this.editUser.experienciaLaboral?.forEach((experiencia: ExperienciaLaboral) => {
        this.form.get('empresa')?.setValue(experiencia.empresa);
        this.form.get('puesto')?.setValue(experiencia.puesto);
        this.form.get('fechaExperiencia')?.setValue(experiencia.fecha);
      })
    }
  }

  loadEstudios() {
    if (this.editUser) {
      this.editUser.estudios?.forEach((estudios: Estudios) => {
        this.form.get('institucion')?.setValue(estudios.institucion);
        this.form.get('titulacion')?.setValue(estudios.titulacion);
        this.form.get('fechaEstudios')?.setValue(estudios.fecha);
      })
    }
  }

  getTypeUser() {
    return this.form.get('tipo')?.value;
  }

  save() {
    this.router.navigate([`/`]);
  }

  cancel() {
    this.router.navigate([`/`]);
  }
}
