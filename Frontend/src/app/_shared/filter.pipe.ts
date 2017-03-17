import {Pipe, PipeTransform} from '@angular/core';
/**
 * based on: http://blogs.msmvps.com/deborahk/creating-a-filter-pipe-in-angular-2/
 * to-do: fix it so that it works
 */
@Pipe({
name: 'filterpipe'
})
export class FilterPipe implements PipeTransform {
transform(value: any, args: string[]): any {
let filter = args[0];

if (filter && Array.isArray(value)) {
let filterKeys = Object.keys(filter);
return value.filter(item =>
filterKeys.reduce((memo, keyName) =>
memo && item[keyName].toLowerCase() === filter[keyName].toLowerCase(), true));
} else {
return value;
}
}
}