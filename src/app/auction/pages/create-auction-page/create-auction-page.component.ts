import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from '~/app/shared/models/routes/routes.enum';
import { APIService } from '~/app/shared/services/api/api.service';
import {
  APIResponseInterface,
  Photo,
} from '~/app/shared/services/api/interface/APIResponse.interface';
import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { StateEnum } from '~/app/shared/models/auction/state.enum';
import { AuctionedItemProductModel } from '~/app/shared/models/auction/auctioned-item-product.model';
import { User } from '~/app/shared/models/user/user.model';
import { UserAuthenticatedStoreService } from '~/app/shared/stores/user/user-authenticated.store.service';
import { AuctionStoreService } from '~/app/shared/stores/auction/auction.store.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-auction-page',
  templateUrl: './create-auction-page.component.html',
  styleUrls: ['./create-auction-page.component.css'],
})
export class CreateAuctionPageComponent {
  protected readonly AuctionCategory = AuctionCategory;
  protected readonly StateEnum = StateEnum;

  form: FormGroup;
  photos: Photo[];
  currentStep: number;
  isFormError: boolean;
  authenticatedUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: APIService,
    private userAuthenticatedStoreService: UserAuthenticatedStoreService,
    private auctionStoreService: AuctionStoreService,
  ) {
    this.isFormError = false;
    this.currentStep = 1;
    this.photos = [];
    this.authenticatedUser = {} as User;

    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.minLength(3)])],
      description: ['', Validators.compose([Validators.minLength(15)])],
      category: ['', Validators.required],
      state: [StateEnum.Good, Validators.required],
      photos: [[]],
      initialPrice: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      finalPrice: ['', Validators.pattern(/^\d+$/)],
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      localisation: ['', Validators.compose([Validators.minLength(3)])],
    });

    this.userAuthenticatedStoreService.userAuthenticated$.subscribe(
      (user: User) => {
        this.authenticatedUser = user;
      },
    );
  }

  nextStep(): void {
    if (this.currentFormFieldsValidity) {
      this.currentStep++;
      this.isFormError = false;
    } else {
      this.isFormError = true;
    }
  }

  previousStep(): void {
    this.currentStep--;
    this.isFormError = false;
  }

  goHome(): void {
    void this.router.navigate([RoutesEnum.Auction]);
  }

  onSubmit(): void {
    this.auctionStoreService.addAuctionItem(this.auctionedItemProduct);
    void this.router.navigate([RoutesEnum.Auction]);
  }

  get currentFormFieldsValidity(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.areFieldValid(['title', 'description']);
      case 2:
        return this.areFieldValid(['category', 'state', 'photos']);
      default:
        return (
          this.areFieldValid([
            'initialPrice',
            'finalPrice',
            'duration',
            'localisation',
          ]) &&
          (Number(this.form.get('initialPrice')?.value) <
            Number(this.form.get('finalPrice')?.value) ||
            Number(this.form.get('finalPrice')?.value) === 0) &&
          Number(this.form.get('duration')?.value) <= 24
        );
    }
  }

  areFieldValid(fields: string[]): boolean {
    return fields.every((field: string) => {
      return this.form.get(field)?.valid;
    });
  }

  get progressWidth(): string {
    const stepWidth = 25;
    return `${this.currentStep * stepWidth}%`;
  }

  onCategorySelected(selectedCategory: AuctionCategory): void {
    this.apiService
      .getImageByType(selectedCategory)
      .subscribe((response: APIResponseInterface) => {
        this.photos = response.photos.slice(0, 12);
      });
  }

  get auctionedItemProduct(): AuctionedItemProductModel {
    return {
      ...this.form.value,
      id: parseInt(uuidv4()),
      creator: this.authenticatedUser.email,
      currentPrice: Number(this.form.get('initialPrice')?.value),
      time: Number(this.form.get('duration')?.value) * 3600,
      lastBidder: {},
      autoBidder: {},
    } as AuctionedItemProductModel;
  }
}
