import { Component, EventEmitter, Input, Output, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark-form-panel',
  imports: [MatFormField, MatError, MatIconModule, MatInputModule, MatExpansionModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './bookmark-form-panel.html',
  styleUrl: './bookmark-form-panel.scss',
})
export class BookmarkFormPanel implements OnInit, OnDestroy {
  @Input() panelTitle = '';
  @Input() panelDescription = '';
  @Input() icon = '';
  @Input() buttonText = '';
  @Input() title!: WritableSignal<string>;
  @Input() link!: WritableSignal<string>;
  @Output() submit = new EventEmitter<void>();

  protected titleControl = new FormControl('', [Validators.required]);
  protected linkControl = new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+\..+/)]);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Initialize form controls with signal values
    this.titleControl.setValue(this.title());
    this.linkControl.setValue(this.link());

    // Sync form controls to signals
    this.titleControl.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.title.set(value || '');
      });

    this.linkControl.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.link.set(value || '');
      });

    // Mark as touched on blur to show errors
    this.titleControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.titleControl.untouched) {
        // Will be set on blur
      }
    });

    this.linkControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.linkControl.untouched) {
        // Will be set on blur
      }
    });
  }

  protected onTitleBlur(): void {
    this.titleControl.markAsTouched();
  }

  protected onLinkBlur(): void {
    this.linkControl.markAsTouched();
  }

  protected getTitleErrorMessage(): string {
    if (this.titleControl.hasError('required')) {
      return 'Title is required';
    }
    return '';
  }

  protected getLinkErrorMessage(): string {
    if (this.linkControl.hasError('required')) {
      return 'Link is required';
    }
    if (this.linkControl.hasError('pattern')) {
      return 'Link must start with http:// or https:// and include a domain extension (e.g., .com, .org)';
    }
    return '';
  }

  protected isFormValid(): boolean {
    return this.titleControl.valid && this.linkControl.valid;
  }

  protected onSubmit(): void {
    this.titleControl.markAsTouched();
    this.linkControl.markAsTouched();

    if (this.isFormValid()) {
      this.title.set(this.titleControl.value?.trim() || '');
      this.link.set(this.linkControl.value?.trim() || '');
      this.submit.emit();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
