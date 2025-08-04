import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | number, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    switch (format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'dd/MM/yyyy HH:mm':
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'relative':
        return this.getRelativeTime(date);
      default:
        return `${day}/${month}/${year}`;
    }
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

    return this.transform(date, 'dd/MM/yyyy');
  }
}
