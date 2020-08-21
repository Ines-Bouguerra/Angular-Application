import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';

import {Params, ActivatedRoute} from "@angular/router";
import {getLocaleId, Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import { trigger, state, style, animate, transition } from '@angular/animations';
const DISH = {
  id: '0',
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  featured: true,
  label: 'Hot',
  price: '4.99',
  // tslint:disable-next-line:max-line-length
  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
    {
      rating: 5,
      comment: 'Imagine all the eatables, living in conFusion!',
      author: 'John Lemon',
      date: '2012-10-16T17:57:28.556094Z'
    }, {
      rating: 4,
      comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
      author: 'Paul McVites',
      date: '2014-09-05T17:57:28.556094Z'
    },
    {
      rating: 3,
      comment: 'Eat it, just eat it!',
      author: 'Michael Jaikishan',
      date: '2015-02-13T17:57:28.556094Z'
    },
    {
      rating: 4,
      comment: 'Ultimate, Reaching for the stars!',
      author: 'Ringo Starry',
      date: '2013-12-02T17:57:28.556094Z'
    },
    {
      rating: 2,
      comment: 'It\'s your birthday, we\'re gonna party!',
      author: '25 Cent',
      date: '2011-12-02T17:57:28.556094Z'
    }
  ]
};

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})


export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  currentDate = new Date();
  errMess: string;
  dishes: Dish[];
  dishcopy: Dish;
  visibility = 'shown';

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private c: FormBuilder, @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      },errmess => this.errMess = <any>errmess);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {

    this.commentForm = this.c.group({
      name: ['', Validators.required],
      star: [''],
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'star': 5,
    'comment': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'comment must be at least 10 characters long.',
      'maxlength': 'comment cannot be more than 50 characters long.'
    }
  };

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.data=new Date().toISOString()
    console.log(this.comment);
    this.dishcopy.comments.push();
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
          this.dish = dish; this.dishcopy = dish;
        },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm({
      name: '',
      star: 5,
      comment: ''
    });
    this.commentForm = this.c.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      star: [''],
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });


  }


}
