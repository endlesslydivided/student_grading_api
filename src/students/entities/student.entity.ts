import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Grade } from '../../grades/entities/grade.entity';

@Table({ timestamps: true, tableName: 'students' })
export class Student extends Model<Student> {
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Grade, { as: 'grades', foreignKey: 'studentId' })
  grades: Grade[];
}
