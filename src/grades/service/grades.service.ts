import { Injectable } from '@nestjs/common';


@Injectable()
export class GradesService {

  findAll() {
    return `This action returns all grades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grade`;
  }

}
