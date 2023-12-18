import {
  Injectable
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { GradesRepository } from '../repository/grades.repository';

@Injectable()
export class GradesService {
  constructor(
    private gradesRepository: GradesRepository
  ) {}

  setLastSubmitted(transaction: Transaction) {
    return this.gradesRepository.setLastSubmitted(transaction);
  }
  
}
