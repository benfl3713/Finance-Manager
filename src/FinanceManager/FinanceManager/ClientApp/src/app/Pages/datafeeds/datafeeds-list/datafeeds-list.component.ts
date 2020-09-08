import { Component, OnInit, Input } from '@angular/core';
import { DatafeedsService } from '../../../Services/datafeeds.service';

@Component({
  selector: 'app-datafeeds-list',
  templateUrl: './datafeeds-list.component.html',
  styleUrls: ['./datafeeds-list.component.css'],
})
export class DatafeedsListComponent implements OnInit {
  constructor(private datafeedsService: DatafeedsService) {}

  @Input() provider: string;
  datafeeds: any[] = [];
  displayedColumns: string[] = ['provider', 'vendor', 'lastUpdated', 'actions'];

  ngOnInit(): void {
    this.loadDatafeeds();
  }

  loadDatafeeds() {
    this.datafeedsService
      .getDatafeeds(this.provider)
      .subscribe((d) => (this.datafeeds = d));
  }
}
