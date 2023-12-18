import { Column, DataType, Default, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Grade } from "../../grades/entities/grade.entity";

@Table({timestamps:true})
export class Subject extends Model<Subject> {

    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID, primaryKey: true })
    id: string;

    @Column({type:DataType.STRING, allowNull: false, unique:true})
    name: string;

    @HasMany(() => Grade,{as:'grades',foreignKey:'subjectId'})
    grades: Grade[]

    @HasOne(() => Grade,{as:'medianGrade'})
    medianGrade: Grade

    @HasOne(() => Grade,{as:'averageGrade'})
    averageGrade: Grade
}
