import {Pipe, PipeTransform} from '@angular/core';
import {Specialization} from "../../core/interfaces/specialization";

@Pipe({
  name: 'arrayMapping',
  standalone: true
})
export class ArrayMappingPipe implements PipeTransform {

  transform(value: any, array: any[], matchKey: string, targetKey: string): unknown {
    return array.find((element) => {
      return element[matchKey] === value
    })?.[targetKey];
  }

}
