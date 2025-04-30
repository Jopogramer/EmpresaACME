import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {
  transform(value: string | null | undefined, fallback: string): string {
    if (!value || value.trim() === '') {
      return fallback;
    }
    return value;
  }
}
