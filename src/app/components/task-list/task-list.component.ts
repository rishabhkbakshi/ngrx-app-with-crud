import { Component, Input, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { LOCALE, timeZones } from '../../shared/constent';
import { AddUpdateTaskDialogComponent } from '../modal-popups/add-update-task-dialog/add-update-task-dialog.component';
import { DeleteTaskConfirmationDialogComponent } from '../modal-popups/delete-task-confirmation-dialog/delete-task-confirmation-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Input() zoneStr: string = '';
  localeStr: string = LOCALE

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnChanges(_changes: SimpleChange) {
    if (this.zoneStr === timeZones[1].zone) {
      this.tasks.sort((a: Task, b: Task) => {
        return (new Date(a.lastModified).getTime()) - (new Date(b.lastModified).getTime());
      })
    } else if (this.zoneStr === timeZones[2].zone) {
      this.tasks.sort((a: Task, b: Task) => {
        return (new Date(b.lastModified).getTime()) - (new Date(a.lastModified).getTime());
      })
    } else {
      this.tasks.sort((a: Task, b: Task) => a.id - b.id);
    }
  }

  ngOnInit(): void {

  }

  updateTask(type: string, id: number = 0) {
    let dialogRef = this.dialog.open(AddUpdateTaskDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {
        actionType: type,
        task: id != 0 ? this.tasks.find((elem) => elem.id === id) : undefined
      }
    })
    dialogRef.afterClosed().subscribe((_result: any) => { });
  }

  deleteTask(index: number) {
    let dialogRef = this.dialog.open(DeleteTaskConfirmationDialogComponent, {
      width: '250px',
      disableClose: true,
      data: { index }
    })
    dialogRef.afterClosed().subscribe((_result: any) => { });
  }

  get noDataFound(): boolean {
    return this.tasks && this.tasks.length === 0;
  }

}
