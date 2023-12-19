import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Grade } from '../entities/grade.entity';

@Injectable()
export class GradesRepository {
  constructor(@Inject(Grade) private gradesRepository: typeof Grade) {}

  async setLastSubmitted(transaction: Transaction) {
    return this.gradesRepository.update(
      { isLastSubmitted: false },
      {
        where: {},
        transaction,
        returning: false,
      },
    );
  }
}
