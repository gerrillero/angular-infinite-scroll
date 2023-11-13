import { Component, inject } from '@angular/core';
import { ProductsApiService } from './api/products-api.service';
import { BehaviorSubject, Observable, scan, switchMap, tap } from 'rxjs';
import { ProductsPaginator } from './models/models';
import { PexelService } from './api/pexel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  images: any[] = [];
  currentPage = 1;
  totalPages = 1;

  perPage: number = 25;

  private imageService = inject(PexelService);

  ngOnInit(): void {
    this.loadImages('nature', this.currentPage);
  }

  loadImages(query: string, page: number): void {
    this.imageService.getImages(query, page, this.perPage).subscribe((data: any) => {
      console.log(data);
      this.images = [...this.images, ...data.photos];
      this.totalPages = Math.ceil(data.total_results / data.per_page);
    });
  }

  loadMoreImages(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadImages('nature', this.currentPage);
    }
  }


  // private api = inject(ProductsApiService);

  // public paginator$: Observable<ProductsPaginator>;

  // public loading$ = new BehaviorSubject(true);
  // private page$ = new BehaviorSubject(1);

  // constructor() {
  //   this.paginator$ = this.loadProducts$();
  // }

  // private loadProducts$(): Observable<ProductsPaginator> {
  //   return this.page$.pipe(
  //     tap(() => this.loading$.next(true)),
  //     switchMap((page) => this.api.getProducts$(page)),
  //     scan(this.updatePaginator, {items: [], page: 0, hasMorePages: true} as ProductsPaginator),
  //     tap(() => this.loading$.next(false)),
  //   );
  // }

  // private updatePaginator(accumulator: ProductsPaginator, value: ProductsPaginator): ProductsPaginator {
  //   if (value.page === 1) {
  //     return value;
  //   }

  //   accumulator.items.push(...value.items);
  //   accumulator.page = value.page;
  //   accumulator.hasMorePages = value.hasMorePages;

  //   return accumulator;
  // }

  // public loadMoreProducts(paginator: ProductsPaginator) {
  //   if (!paginator.hasMorePages) {
  //     return;
  //   }
  //   this.page$.next(paginator.page + 1);
  // }
}
